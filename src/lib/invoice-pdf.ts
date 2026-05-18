import { jsPDF } from "jspdf";

export type InvoicePdfData = {
  invoiceNumber: string;
  status?: string; // shown as a coloured badge if provided
  invoiceDate: string; // pre-formatted display string
  dueDate?: string;

  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  customerAddress?: string | null;

  /**
   * Generic two-column rows shown in the "Details" table.
   * Use this for booking-style invoices that don't have priced line items
   * (e.g. "Destination | Darjeeling", "Travel Date | 2026-05-20").
   */
  detailRows?: Array<[string, string]>;

  /**
   * Priced line items shown in a 4-column table (Description | Qty | Rate | Amount).
   * Money fields are in paisa.
   */
  lineItems?: Array<{
    description: string;
    quantity: number;
    rate: number; // paisa
    amount: number; // paisa
  }>;

  /** Money fields, all in paisa */
  subtotal?: number;
  taxPercent?: number;
  taxAmount?: number;
  total?: number | null; // null/undefined => "To be discussed"

  notes?: string | null;
};

const COLORS = {
  primary: [11, 60, 93] as [number, number, number],
  gold: [229, 168, 50] as [number, number, number],
  lightBlue: [180, 200, 220] as [number, number, number],
  grayText: [80, 80, 80] as [number, number, number],
  darkText: [40, 40, 40] as [number, number, number],
  mutedText: [100, 100, 100] as [number, number, number],
  labelText: [120, 120, 120] as [number, number, number],
  rowAlt: [249, 250, 251] as [number, number, number],
};

function rupees(paisa: number): string {
  return `Rs. ${(paisa / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const STATUS_STYLES: Record<string, { fill: [number, number, number]; text: [number, number, number]; label: string }> = {
  confirmed: { fill: [220, 252, 231], text: [21, 128, 61], label: "CONFIRMED" },
  paid: { fill: [220, 252, 231], text: [21, 128, 61], label: "PAID" },
  draft: { fill: [241, 245, 249], text: [71, 85, 105], label: "DRAFT" },
  pending: { fill: [254, 249, 195], text: [161, 98, 7], label: "PENDING" },
  rejected: { fill: [254, 226, 226], text: [185, 28, 28], label: "REJECTED" },
  cancelled: { fill: [254, 226, 226], text: [185, 28, 28], label: "CANCELLED" },
};

export function buildInvoicePdf(data: InvoicePdfData): jsPDF {
  const doc = new jsPDF();
  const pageW = doc.internal.pageSize.getWidth();

  // === Header background ===
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageW, 42, "F");
  doc.setFillColor(...COLORS.gold);
  doc.rect(0, 42, pageW, 3, "F");

  // Company name & contact
  doc.setTextColor(...COLORS.gold);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("JERICHO TOUR & TRAVELS", pageW / 2, 20, { align: "center" });
  doc.setTextColor(...COLORS.lightBlue);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Darjeeling & Sikkim | Rangbull, West Bengal", pageW / 2, 28, { align: "center" });
  doc.text("Phone: +91 74780 29354 | WhatsApp: +91 74780 29354", pageW / 2, 34, { align: "center" });

  // === Invoice title ===
  let y = 55;
  doc.setTextColor(...COLORS.primary);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 20, y);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.mutedText);
  doc.text(`#${data.invoiceNumber}`, pageW - 20, y - 4, { align: "right" });
  doc.text(`Date: ${data.invoiceDate}`, pageW - 20, y + 4, { align: "right" });
  if (data.dueDate) {
    doc.text(`Due: ${data.dueDate}`, pageW - 20, y + 12, { align: "right" });
  }

  // === Status badge ===
  if (data.status) {
    y += 12;
    const styleKey = data.status.toLowerCase();
    const s = STATUS_STYLES[styleKey] || STATUS_STYLES.draft;
    doc.setFillColor(...s.fill);
    doc.roundedRect(20, y - 5, 50, 10, 3, 3, "F");
    doc.setTextColor(...s.text);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(s.label, 24, y + 1);
  }

  // === Divider ===
  y += 14;
  doc.setDrawColor(...COLORS.gold);
  doc.setLineWidth(0.5);
  doc.line(20, y, pageW - 20, y);

  // === Customer details ===
  y += 12;
  doc.setTextColor(...COLORS.primary);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Customer Details", 20, y);
  y += 10;

  const custFields: Array<[string, string | null | undefined]> = [
    ["Name", data.customerName],
    ["Phone", data.customerPhone],
    ["Email", data.customerEmail || undefined],
    ["Address", data.customerAddress || undefined],
  ];
  custFields.forEach(([label, value]) => {
    if (!value) return;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLORS.labelText);
    doc.setFontSize(10);
    doc.text(`${label}:`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.darkText);
    // Wrap long addresses
    const split = doc.splitTextToSize(value, pageW - 90);
    doc.text(split, 50, y);
    y += 7 * Math.max(1, split.length);
  });

  // === Line items table ===
  y += 6;
  doc.setTextColor(...COLORS.primary);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(data.lineItems ? "Items" : "Booking Details", 20, y);
  y += 10;

  if (data.lineItems && data.lineItems.length > 0) {
    // 4-column priced table: Description | Qty | Rate | Amount
    const colDesc = 25;
    const colQty = pageW - 90;
    const colRate = pageW - 65;
    const colAmount = pageW - 25;

    doc.setFillColor(...COLORS.primary);
    doc.rect(20, y - 5, pageW - 40, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Description", colDesc, y + 1);
    doc.text("Qty", colQty, y + 1, { align: "right" });
    doc.text("Rate", colRate, y + 1, { align: "right" });
    doc.text("Amount", colAmount, y + 1, { align: "right" });
    y += 10;

    data.lineItems.forEach((item, i) => {
      const descLines = doc.splitTextToSize(item.description, colQty - colDesc - 5);
      const rowH = 6 + (descLines.length - 1) * 5;

      if (i % 2 === 0) {
        doc.setFillColor(...COLORS.rowAlt);
        doc.rect(20, y - 5, pageW - 40, rowH + 4, "F");
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...COLORS.darkText);
      doc.text(descLines, colDesc, y + 1);
      doc.setTextColor(...COLORS.mutedText);
      doc.text(String(item.quantity), colQty, y + 1, { align: "right" });
      doc.text(rupees(item.rate), colRate, y + 1, { align: "right" });
      doc.setTextColor(...COLORS.darkText);
      doc.setFont("helvetica", "bold");
      doc.text(rupees(item.amount), colAmount, y + 1, { align: "right" });
      y += rowH + 4;
    });

    // Subtotal / Tax / Total
    y += 4;
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(pageW / 2, y, pageW - 20, y);
    y += 6;

    if (data.subtotal !== undefined) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...COLORS.mutedText);
      doc.text("Subtotal", pageW - 65, y, { align: "right" });
      doc.setTextColor(...COLORS.darkText);
      doc.text(rupees(data.subtotal), pageW - 25, y, { align: "right" });
      y += 6;
    }
    if (data.taxAmount && data.taxAmount > 0) {
      doc.setTextColor(...COLORS.mutedText);
      doc.text(`Tax (${data.taxPercent || 0}%)`, pageW - 65, y, { align: "right" });
      doc.setTextColor(...COLORS.darkText);
      doc.text(rupees(data.taxAmount), pageW - 25, y, { align: "right" });
      y += 6;
    }
    y += 2;
  } else if (data.detailRows && data.detailRows.length > 0) {
    // Two-column table for booking-style invoices
    doc.setFillColor(...COLORS.primary);
    doc.rect(20, y - 5, pageW - 40, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Item", 25, y + 1);
    doc.text("Details", pageW / 2, y + 1);
    y += 10;

    data.detailRows.forEach(([label, value], i) => {
      if (i % 2 === 0) {
        doc.setFillColor(...COLORS.rowAlt);
        doc.rect(20, y - 5, pageW - 40, 10, "F");
      }
      doc.setTextColor(...COLORS.mutedText);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(label, 25, y + 1);
      doc.setTextColor(30, 30, 30);
      doc.setFont("helvetica", "bold");
      doc.text(value, pageW / 2, y + 1);
      y += 10;
    });
  }

  // === Total bar ===
  y += 4;
  const totalLabel = data.total == null ? "Total Amount" : "Total Amount";
  const totalValue = data.total == null ? "To be discussed" : rupees(data.total);
  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(20, y - 5, pageW - 40, 20, 3, 3, "F");
  doc.setTextColor(...COLORS.lightBlue);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(totalLabel, 25, y + 4);
  doc.setTextColor(...COLORS.gold);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(totalValue, pageW - 25, y + 5, { align: "right" });

  // === Notes ===
  if (data.notes) {
    y += 28;
    doc.setTextColor(...COLORS.mutedText);
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    const noteLines = doc.splitTextToSize(`Note: ${data.notes}`, pageW - 40);
    doc.text(noteLines, 20, y);
  }

  // === Footer ===
  const footerY = doc.internal.pageSize.getHeight() - 25;
  doc.setDrawColor(...COLORS.gold);
  doc.setLineWidth(0.5);
  doc.line(20, footerY - 5, pageW - 20, footerY - 5);
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Jericho Tour & Travels | Rangbull, Darjeeling, West Bengal, India", pageW / 2, footerY, { align: "center" });
  doc.text("Phone: +91 74780 29354 | Email: jerichotourandtravels@gmail.com", pageW / 2, footerY + 5, { align: "center" });
  doc.text("Thank you for choosing Jericho Tour & Travels!", pageW / 2, footerY + 12, { align: "center" });

  return doc;
}
