import { db } from "@/lib/db";
import { bookings, enquiries } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
  const [bookingStats] = await db
    .select({
      total: sql<number>`count(*)::int`,
      pending: sql<number>`count(*) filter (where ${bookings.status} = 'pending')::int`,
      confirmed: sql<number>`count(*) filter (where ${bookings.status} = 'confirmed')::int`,
      rejected: sql<number>`count(*) filter (where ${bookings.status} = 'rejected')::int`,
    })
    .from(bookings);

  const [enquiryStats] = await db
    .select({
      total: sql<number>`count(*)::int`,
      new: sql<number>`count(*) filter (where ${enquiries.status} = 'new')::int`,
      contacted: sql<number>`count(*) filter (where ${enquiries.status} = 'contacted')::int`,
      closed: sql<number>`count(*) filter (where ${enquiries.status} = 'closed')::int`,
    })
    .from(enquiries);

  const recentBookings = await db
    .select()
    .from(bookings)
    .orderBy(sql`${bookings.createdAt} desc`)
    .limit(5);

  return Response.json({
    bookings: bookingStats,
    enquiries: enquiryStats,
    recentBookings,
  });
}
