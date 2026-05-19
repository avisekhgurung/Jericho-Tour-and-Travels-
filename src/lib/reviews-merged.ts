import { db } from "./db";
import { googleReviews, googleReviewsMeta, userReviews } from "./db/schema";
import { and, desc, eq, isNotNull, ne, sql } from "drizzle-orm";

export type MergedReview = {
  id: string; // prefixed: "g:<id>" or "u:<id>" so React keys are unique
  source: "google" | "user";
  authorName: string;
  authorThumbnail: string | null;
  authorMeta: string | null; // e.g. "Local Guide · 15 reviews" or "Mumbai"
  rating: number;
  title: string | null;
  text: string;
  date: Date | null;
  dateLabel: string | null;
};

export type MergedReviewsBundle = {
  reviews: MergedReview[];
  stats: {
    googleRating: number | null; // 0..5
    googleTotal: number | null; // total on Google (may be > what we cached)
    googleShown: number; // currently visible Google reviews we have cached
    userTotal: number; // approved customer-submitted reviews
    combinedAvg: number | null; // average across both sources (visible only)
    lastSyncedAt: Date | null;
  };
};

/**
 * Read both Google + user-submitted reviews, merged and sorted by date (newest first).
 * Pass limit=null for "all", or a number to cap.
 */
export async function getMergedReviews(limit: number | null = null): Promise<MergedReviewsBundle> {
  const [googleRows, userRows, metaRow] = await Promise.all([
    db
      .select()
      .from(googleReviews)
      .where(
        and(
          eq(googleReviews.hidden, false),
          isNotNull(googleReviews.text),
          ne(googleReviews.text, "")
        )
      )
      .orderBy(desc(googleReviews.reviewDate), desc(googleReviews.id)),
    db
      .select()
      .from(userReviews)
      .where(eq(userReviews.status, "approved"))
      .orderBy(desc(userReviews.approvedAt), desc(userReviews.id)),
    db.select().from(googleReviewsMeta).limit(1),
  ]);

  const meta = metaRow[0];

  const googleMerged: MergedReview[] = googleRows.map((r) => ({
    id: `g:${r.id}`,
    source: "google",
    authorName: r.authorName,
    authorThumbnail: r.authorThumbnail,
    authorMeta: r.authorIsLocalGuide
      ? `Local Guide · ${r.authorReviewCount ?? 0} reviews`
      : `${r.authorReviewCount ?? 0} reviews`,
    rating: r.rating,
    title: null,
    text: r.text ?? "",
    date: r.reviewDate,
    dateLabel: r.reviewDateLabel,
  }));

  const userMerged: MergedReview[] = userRows.map((r) => ({
    id: `u:${r.id}`,
    source: "user",
    authorName: r.authorName,
    authorThumbnail: null,
    authorMeta: r.authorLocation || null,
    rating: r.rating,
    title: r.title,
    text: r.text,
    date: r.approvedAt ?? r.createdAt,
    dateLabel: null,
  }));

  // Merge by date (newest first). Items without dates go to the end.
  const combined = [...googleMerged, ...userMerged].sort((a, b) => {
    const ad = a.date?.getTime() ?? 0;
    const bd = b.date?.getTime() ?? 0;
    return bd - ad;
  });

  const sliced = limit == null ? combined : combined.slice(0, limit);

  // Compute combined average over visible (shown) reviews
  const visibleRatings = combined.map((r) => r.rating);
  const combinedAvg =
    visibleRatings.length > 0
      ? visibleRatings.reduce((a, b) => a + b, 0) / visibleRatings.length
      : null;

  return {
    reviews: sliced,
    stats: {
      googleRating: meta?.businessRating != null ? meta.businessRating / 10 : null,
      googleTotal: meta?.totalReviews ?? null,
      googleShown: googleMerged.length,
      userTotal: userMerged.length,
      combinedAvg,
      lastSyncedAt: meta?.lastFetchedAt ?? null,
    },
  };
}

/**
 * Count user-submitted reviews from a given email or IP within the last N hours.
 * Used for soft rate-limiting on the public submission endpoint.
 */
export async function recentSubmissionsBy(opts: {
  email?: string;
  ip?: string;
  hours: number;
}): Promise<number> {
  const cutoff = new Date(Date.now() - opts.hours * 60 * 60 * 1000);
  const conditions = [sql`${userReviews.createdAt} >= ${cutoff}`];
  if (opts.email) conditions.push(sql`lower(${userReviews.authorEmail}) = lower(${opts.email})`);
  if (opts.ip) conditions.push(sql`${userReviews.submittedFromIp} = ${opts.ip}`);
  const where = conditions.reduce((acc, c, i) => (i === 0 ? c : sql`${acc} AND ${c}`));
  const [{ count } = { count: 0 }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(userReviews)
    .where(where);
  return count;
}
