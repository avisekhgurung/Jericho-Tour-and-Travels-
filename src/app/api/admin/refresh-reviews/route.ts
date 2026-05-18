import { getSession } from "@/lib/auth";
import { fetchAndCacheReviews } from "@/lib/google-reviews";
import { db } from "@/lib/db";
import { googleReviews, googleReviewsMeta } from "@/lib/db/schema";
import { eq, isNotNull, sql } from "drizzle-orm";

// Admin-only: read current sync status (GET) or trigger a manual refresh (POST).
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const [meta] = await db.select().from(googleReviewsMeta).limit(1);
  const [{ count: totalCached } = { count: 0 }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(googleReviews);
  const [{ count: visibleWithText } = { count: 0 }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(googleReviews)
    .where(eq(googleReviews.hidden, false));
  const [{ count: hiddenCount } = { count: 0 }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(googleReviews)
    .where(eq(googleReviews.hidden, true));
  // Reviews with non-empty text (what actually shows on the homepage)
  const [{ count: withText } = { count: 0 }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(googleReviews)
    .where(isNotNull(googleReviews.text));

  return Response.json({
    ok: true,
    meta: meta ?? null,
    counts: {
      totalCached,
      visible: visibleWithText,
      hidden: hiddenCount,
      withText,
    },
  });
}

export async function POST() {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const result = await fetchAndCacheReviews();
  const status = result.ok ? 200 : 500;
  return Response.json(result, { status });
}
