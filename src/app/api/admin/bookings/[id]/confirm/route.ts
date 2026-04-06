import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendBookingConfirmation } from "@/lib/email";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const updates: Record<string, unknown> = {
    status: "confirmed",
    updatedAt: new Date(),
  };
  if (body.invoiceAmount) updates.invoiceAmount = body.invoiceAmount;
  if (body.adminNotes) updates.adminNotes = body.adminNotes;

  const [booking] = await db
    .update(bookings)
    .set(updates)
    .where(eq(bookings.id, parseInt(id)))
    .returning();

  if (!booking) {
    return Response.json({ error: "Booking not found" }, { status: 404 });
  }

  const emailResult = await sendBookingConfirmation(booking);

  return Response.json({
    success: true,
    booking,
    emailSent: emailResult.success,
    emailError: emailResult.error || null,
  });
}
