import { db } from "@/lib/db";
import { invoices, type InvoiceItem } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = (page - 1) * limit;

  const conditions = status ? eq(invoices.status, status) : undefined;

  const [data, [countResult]] = await Promise.all([
    db
      .select()
      .from(invoices)
      .where(conditions)
      .orderBy(desc(invoices.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(invoices)
      .where(conditions),
  ]);

  return Response.json({
    invoices: data,
    total: countResult.count,
    page,
    totalPages: Math.ceil(countResult.count / limit),
  });
}

/**
 * Generate the next sequential invoice number for the current year, format: MAN-YYYY-NNN
 */
async function nextInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `MAN-${year}-`;

  // Find the max sequence number for this year's prefix
  const [row] = await db
    .select({
      maxNum: sql<number>`COALESCE(MAX(CAST(SUBSTRING(${invoices.invoiceNumber} FROM ${prefix.length + 1}) AS INTEGER)), 0)`,
    })
    .from(invoices)
    .where(sql`${invoices.invoiceNumber} LIKE ${prefix + "%"}`);

  const next = (row?.maxNum || 0) + 1;
  return `${prefix}${String(next).padStart(3, "0")}`;
}

export async function POST(request: Request) {
  const body = await request.json();

  // Validate required fields
  const requiredErrors: string[] = [];
  if (!body.customerName?.trim()) requiredErrors.push("customerName");
  if (!body.customerPhone?.trim()) requiredErrors.push("customerPhone");
  if (!body.invoiceDate?.trim()) requiredErrors.push("invoiceDate");
  if (!Array.isArray(body.items) || body.items.length === 0) requiredErrors.push("items");
  if (requiredErrors.length) {
    return Response.json({ error: `Missing or invalid fields: ${requiredErrors.join(", ")}` }, { status: 400 });
  }

  // Normalise items (amounts in paisa)
  const items: InvoiceItem[] = body.items.map((it: { description?: string; quantity?: number; rate?: number }) => {
    const description = String(it.description || "").trim();
    const quantity = Number(it.quantity) || 0;
    const rate = Math.round(Number(it.rate) || 0); // already in paisa from the client
    return { description, quantity, rate, amount: quantity * rate };
  }).filter((it: InvoiceItem) => it.description && it.quantity > 0);

  if (items.length === 0) {
    return Response.json({ error: "At least one valid line item is required (description + quantity > 0)" }, { status: 400 });
  }

  const subtotal = items.reduce((s, it) => s + it.amount, 0);
  const taxPercent = Math.max(0, Math.min(100, Number(body.taxPercent) || 0));
  const taxAmount = Math.round((subtotal * taxPercent) / 100);
  const total = subtotal + taxAmount;

  const invoiceNumber = await nextInvoiceNumber();

  const [created] = await db
    .insert(invoices)
    .values({
      invoiceNumber,
      status: body.status || "draft",
      customerName: String(body.customerName).trim(),
      customerPhone: String(body.customerPhone).trim(),
      customerEmail: body.customerEmail ? String(body.customerEmail).trim() : null,
      customerAddress: body.customerAddress ? String(body.customerAddress).trim() : null,
      items,
      subtotal,
      taxPercent,
      taxAmount,
      total,
      invoiceDate: String(body.invoiceDate).trim(),
      dueDate: body.dueDate ? String(body.dueDate).trim() : null,
      notes: body.notes ? String(body.notes).trim() : null,
    })
    .returning();

  return Response.json(created, { status: 201 });
}
