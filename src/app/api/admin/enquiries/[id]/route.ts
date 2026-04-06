import { db } from "@/lib/db";
import { enquiries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [enquiry] = await db
    .select()
    .from(enquiries)
    .where(eq(enquiries.id, parseInt(id)))
    .limit(1);

  if (!enquiry) {
    return Response.json({ error: "Enquiry not found" }, { status: 404 });
  }

  return Response.json(enquiry);
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

  const [updated] = await db
    .update(enquiries)
    .set(updates)
    .where(eq(enquiries.id, parseInt(id)))
    .returning();

  if (!updated) {
    return Response.json({ error: "Enquiry not found" }, { status: 404 });
  }

  return Response.json(updated);
}
