import { db } from "./db";
import { googleReviews, googleReviewsMeta } from "./db/schema";
import { sql, desc, eq, and, isNotNull, ne } from "drizzle-orm";

// Response shape we care about from SerpAPI `engine=google_maps_reviews`.
type SerpReview = {
  review_id: string;
  rating: number;
  date?: string;
  iso_date?: string;
  snippet?: string;
  extracted_snippet?: { original?: string };
  position?: number;
  likes?: number;
  user?: {
    name?: string;
    link?: string;
    thumbnail?: string;
    local_guide?: boolean;
    reviews?: number;
  };
};

type SerpReviewsResponse = {
  place_info?: {
    title?: string;
    rating?: number;
    reviews?: number;
  };
  reviews?: SerpReview[];
  serpapi_pagination?: {
    next?: string; // full URL to the next page, includes api_key
    next_page_token?: string;
  };
  error?: string;
};

export type CachedReview = {
  id: number;
  reviewId: string;
  rating: number;
  text: string | null;
  reviewDate: Date | null;
  reviewDateLabel: string | null;
  authorName: string;
  authorThumbnail: string | null;
  authorLink: string | null;
  authorIsLocalGuide: boolean;
  authorReviewCount: number | null;
};

export type ReviewsBundle = {
  meta: {
    businessTitle: string | null;
    businessRating: number | null; // 0..5
    totalReviews: number | null;
    lastFetchedAt: Date | null;
  };
  reviews: CachedReview[];
};

/**
 * Fetch the latest reviews from SerpAPI and upsert them into the DB.
 * Called by the cron endpoint (every 6h) and the admin manual-refresh endpoint.
 */
export async function fetchAndCacheReviews(): Promise<{
  ok: boolean;
  fetched: number;
  error?: string;
}> {
  const apiKey = process.env.SERPAPI_KEY;
  const dataId = process.env.GOOGLE_REVIEWS_DATA_ID;
  if (!apiKey || !dataId) {
    const error = "SERPAPI_KEY or GOOGLE_REVIEWS_DATA_ID not set";
    await writeMeta({ lastError: error });
    return { ok: false, fetched: 0, error };
  }

  const firstUrl = new URL("https://serpapi.com/search.json");
  firstUrl.searchParams.set("engine", "google_maps_reviews");
  firstUrl.searchParams.set("data_id", dataId);
  firstUrl.searchParams.set("hl", "en");
  firstUrl.searchParams.set("api_key", apiKey);
  // newestFirst keeps fresh reviews on top; we then walk a few pages to also pull older ones with text.
  firstUrl.searchParams.set("sort_by", "newestFirst");

  // Walk up to MAX_PAGES (covers ~24 reviews) per refresh. Costs 1-3 SerpAPI credits per refresh,
  // which is well inside the 250/mo free tier even with the 6h cron schedule.
  const MAX_PAGES = 3;
  const allReviews: SerpReview[] = [];
  let placeInfo: SerpReviewsResponse["place_info"];
  let nextUrl: string | null = firstUrl.toString();
  let pages = 0;

  try {
    while (nextUrl && pages < MAX_PAGES) {
      // SerpAPI's pagination "next" URL omits the api_key — re-attach it so page 2+ don't 401.
      const parsed = new URL(nextUrl);
      if (!parsed.searchParams.get("api_key")) {
        parsed.searchParams.set("api_key", apiKey);
      }
      const res = await fetch(parsed.toString(), { cache: "no-store" });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} — ${text.slice(0, 200)}`);
      }
      const json = (await res.json()) as SerpReviewsResponse;
      if (json.error) throw new Error(`serpapi error: ${json.error}`);
      if (!placeInfo && json.place_info) placeInfo = json.place_info;
      if (json.reviews?.length) allReviews.push(...json.reviews);
      nextUrl = json.serpapi_pagination?.next ?? null;
      pages++;
    }
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    await writeMeta({ lastError: `fetch failed: ${error}` });
    return { ok: false, fetched: 0, error };
  }

  let upserted = 0;
  for (const r of allReviews) {
    if (!r.review_id || !r.user?.name) continue;
    const reviewDate = r.iso_date ? new Date(r.iso_date) : null;
    const text = r.extracted_snippet?.original ?? r.snippet ?? null;
    const row = {
      reviewId: r.review_id,
      rating: Math.round(r.rating),
      text,
      reviewDate,
      reviewDateLabel: r.date ?? null,
      authorName: r.user.name,
      authorThumbnail: r.user.thumbnail ?? null,
      authorLink: r.user.link ?? null,
      authorIsLocalGuide: r.user.local_guide ?? false,
      authorReviewCount: r.user.reviews ?? null,
      position: r.position ?? null,
      likes: r.likes ?? 0,
      updatedAt: new Date(),
    };
    await db
      .insert(googleReviews)
      .values(row)
      .onConflictDoUpdate({
        target: googleReviews.reviewId,
        set: {
          rating: row.rating,
          text: row.text,
          reviewDate: row.reviewDate,
          reviewDateLabel: row.reviewDateLabel,
          authorName: row.authorName,
          authorThumbnail: row.authorThumbnail,
          authorLink: row.authorLink,
          authorIsLocalGuide: row.authorIsLocalGuide,
          authorReviewCount: row.authorReviewCount,
          position: row.position,
          likes: row.likes,
          updatedAt: row.updatedAt,
        },
      });
    upserted++;
  }

  await writeMeta({
    businessTitle: placeInfo?.title ?? null,
    businessRating:
      placeInfo?.rating != null ? Math.round(placeInfo.rating * 10) : null,
    totalReviews: placeInfo?.reviews ?? null,
    lastFetchedAt: new Date(),
    lastError: null,
  });

  return { ok: true, fetched: upserted };
}

/**
 * Read the cached reviews for the public site. Excludes admin-hidden ones.
 * Pass `limit` to control how many to surface on the homepage (default 6).
 */
export async function getCachedReviews(limit = 6): Promise<ReviewsBundle> {
  // Only surface reviews with actual text — star-only ratings make blank testimonial cards.
  const rows = await db
    .select()
    .from(googleReviews)
    .where(
      and(
        eq(googleReviews.hidden, false),
        isNotNull(googleReviews.text),
        ne(googleReviews.text, "")
      )
    )
    .orderBy(desc(googleReviews.reviewDate), desc(googleReviews.id))
    .limit(limit);

  const meta = await db.select().from(googleReviewsMeta).limit(1);
  const m = meta[0];

  return {
    meta: {
      businessTitle: m?.businessTitle ?? null,
      businessRating: m?.businessRating != null ? m.businessRating / 10 : null,
      totalReviews: m?.totalReviews ?? null,
      lastFetchedAt: m?.lastFetchedAt ?? null,
    },
    reviews: rows.map((r) => ({
      id: r.id,
      reviewId: r.reviewId,
      rating: r.rating,
      text: r.text,
      reviewDate: r.reviewDate,
      reviewDateLabel: r.reviewDateLabel,
      authorName: r.authorName,
      authorThumbnail: r.authorThumbnail,
      authorLink: r.authorLink,
      authorIsLocalGuide: r.authorIsLocalGuide,
      authorReviewCount: r.authorReviewCount,
    })),
  };
}

// Upsert the single meta row (id=1).
async function writeMeta(patch: {
  businessTitle?: string | null;
  businessRating?: number | null;
  totalReviews?: number | null;
  lastFetchedAt?: Date | null;
  lastError?: string | null;
}) {
  const existing = await db.select().from(googleReviewsMeta).limit(1);
  if (existing.length === 0) {
    await db.insert(googleReviewsMeta).values({
      businessTitle: patch.businessTitle ?? null,
      businessRating: patch.businessRating ?? null,
      totalReviews: patch.totalReviews ?? null,
      lastFetchedAt: patch.lastFetchedAt ?? null,
      lastError: patch.lastError ?? null,
    });
    return;
  }
  await db
    .update(googleReviewsMeta)
    .set({
      ...patch,
      updatedAt: new Date(),
    })
    .where(sql`id = ${existing[0].id}`);
}
