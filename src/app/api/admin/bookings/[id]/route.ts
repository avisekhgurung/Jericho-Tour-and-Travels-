import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [booking] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, parseInt(id)))
    .limit(1);

  if (!booking) {
    return Response.json({ error: "Booking not found" }, { status: 404 });
  }

  return Response.json(booking);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (body.status) updates.status = body.status;
  if (body.adminNotes !== undefined) updates.adminNotes = body.adminNotes;
  if (body.invoiceAmount !== undefined) updates.invoiceAmount = body.invoiceAmount;

  const [updated] = await db
    .update(bookings)
    .set(updates)
    .where(eq(bookings.id, parseInt(id)))
    .returning();

  if (!updated) {
    return Response.json({ error: "Booking not found" }, { status: 404 });
  }

  return Response.json(updated);
}
