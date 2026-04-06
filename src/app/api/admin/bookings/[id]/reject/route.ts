import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendBookingRejection } from "@/lib/email";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [booking] = await db
    .update(bookings)
    .set({ status: "rejected", updatedAt: new Date() })
    .where(eq(bookings.id, parseInt(id)))
    .returning();

  if (!booking) {
    return Response.json({ error: "Booking not found" }, { status: 404 });
  }

  const emailResult = await sendBookingRejection(booking);

  return Response.json({
    success: true,
    booking,
    emailSent: emailResult.success,
    emailError: emailResult.error || null,
  });
}
