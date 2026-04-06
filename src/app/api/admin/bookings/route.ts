import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = (page - 1) * limit;

  const conditions = status ? eq(bookings.status, status) : undefined;

  const [data, [countResult]] = await Promise.all([
    db
      .select()
      .from(bookings)
      .where(conditions)
      .orderBy(desc(bookings.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(bookings)
      .where(conditions),
  ]);

  return Response.json({
    bookings: data,
    total: countResult.count,
    page,
    totalPages: Math.ceil(countResult.count / limit),
  });
}
