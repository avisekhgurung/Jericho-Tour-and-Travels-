import { db } from "@/lib/db";
import { invoices, type InvoiceItem } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [invoice] = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, parseInt(id)))
    .limit(1);

  if (!invoice) {
    return Response.json({ error: "Invoice not found" }, { status: 404 });
  }
  return Response.json(invoice);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (body.status) updates.status = body.status;
  if (body.notes !== undefined) updates.notes = body.notes;
  if (body.customerName !== undefined) updates.customerName = body.customerName;
  if (body.customerPhone !== undefined) updates.customerPhone = body.customerPhone;
  if (body.customerEmail !== undefined) updates.customerEmail = body.customerEmail;
  if (body.customerAddress !== undefined) updates.customerAddress = body.customerAddress;
  if (body.invoiceDate !== undefined) updates.invoiceDate = body.invoiceDate;
  if (body.dueDate !== undefined) updates.dueDate = body.dueDate;

  // If items or tax change, recompute money fields
  if (body.items !== undefined || body.taxPercent !== undefined) {
    const existingRow = await db.select().from(invoices).where(eq(invoices.id, parseInt(id))).limit(1);
    const existing = existingRow[0];
    if (!existing) return Response.json({ error: "Invoice not found" }, { status: 404 });

    const items: InvoiceItem[] = body.items !== undefined
      ? (body.items as InvoiceItem[]).map((it) => ({
          description: String(it.description || "").trim(),
          quantity: Number(it.quantity) || 0,
          rate: Math.round(Number(it.rate) || 0),
          amount: (Number(it.quantity) || 0) * Math.round(Number(it.rate) || 0),
        })).filter((it) => it.description && it.quantity > 0)
      : (existing.items as InvoiceItem[]);

    const subtotal = items.reduce((s, it) => s + it.amount, 0);
    const taxPercent = body.taxPercent !== undefined
      ? Math.max(0, Math.min(100, Number(body.taxPercent) || 0))
      : existing.taxPercent;
    const taxAmount = Math.round((subtotal * taxPercent) / 100);

    updates.items = items;
    updates.subtotal = subtotal;
    updates.taxPercent = taxPercent;
    updates.taxAmount = taxAmount;
    updates.total = subtotal + taxAmount;
  }

  const [updated] = await db
    .update(invoices)
    .set(updates)
    .where(eq(invoices.id, parseInt(id)))
    .returning();

  if (!updated) return Response.json({ error: "Invoice not found" }, { status: 404 });
  return Response.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [deleted] = await db
    .delete(invoices)
    .where(eq(invoices.id, parseInt(id)))
    .returning();

  if (!deleted) return Response.json({ error: "Invoice not found" }, { status: 404 });
  return Response.json({ ok: true });
}
