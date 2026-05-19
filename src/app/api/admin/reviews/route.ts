import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { userReviews } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// Admin: list user-submitted reviews. Filter by ?status=pending|approved|rejected (default pending).
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const status = req.nextUrl.searchParams.get("status") ?? "pending";
  const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10);
  const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "20", 10);
  const offset = (page - 1) * limit;

  const [rows, [{ count } = { count: 0 }], counts] = await Promise.all([
    db
      .select()
      .from(userReviews)
      .where(eq(userReviews.status, status))
      .orderBy(desc(userReviews.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(userReviews)
      .where(eq(userReviews.status, status)),
    db
      .select({
        status: userReviews.status,
        count: sql<number>`count(*)::int`,
      })
      .from(userReviews)
      .groupBy(userReviews.status),
  ]);

  return Response.json({
    ok: true,
    reviews: rows,
    total: count,
    page,
    totalPages: Math.ceil(count / limit) || 1,
    countsByStatus: Object.fromEntries(counts.map((c) => [c.status, c.count])),
  });
}
