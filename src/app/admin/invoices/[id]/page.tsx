"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Trash2 } from "lucide-react";
import { buildInvoicePdf } from "@/lib/invoice-pdf";
import type { InvoiceItem } from "@/lib/db/schema";

type Invoice = {
  id: number;
  invoiceNumber: string;
  status: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  customerAddress: string | null;
  items: InvoiceItem[];
  subtotal: number;
  taxPercent: number;
  taxAmount: number;
  total: number;
  invoiceDate: string;
  dueDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

const statusColor: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  paid: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

function formatINR(paisa: number): string {
  return `₹${(paisa / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/invoices/${params.id}`)
      .then((res) => res.json())
      .then(setInvoice)
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleDownload = useCallback(() => {
    if (!invoice) return;
    const doc = buildInvoicePdf({
      invoiceNumber: invoice.invoiceNumber,
      status: invoice.status,
      invoiceDate: formatDate(invoice.invoiceDate),
      dueDate: invoice.dueDate ? formatDate(invoice.dueDate) : undefined,
      customerName: invoice.customerName,
      customerPhone: invoice.customerPhone,
      customerEmail: invoice.customerEmail,
      customerAddress: invoice.customerAddress,
      lineItems: invoice.items,
      subtotal: invoice.subtotal,
      taxPercent: invoice.taxPercent,
      taxAmount: invoice.taxAmount,
      total: invoice.total,
      notes: invoice.notes,
    });
    doc.save(`Invoice-${invoice.invoiceNumber}.pdf`);
  }, [invoice]);

  const handleStatusChange = async (newStatus: string) => {
    if (!invoice || newStatus === invoice.status) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/invoices/${invoice.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) setInvoice(await res.json());
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!invoice) return;
    if (!confirm(`Delete invoice ${invoice.invoiceNumber}? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/invoices/${invoice.id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/invoices");
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }
  if (!invoice) return <p className="text-center text-gray-500">Invoice not found</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
      <Link href="/admin/invoices" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary sm:text-sm">
        <ArrowLeft className="size-3.5 sm:size-4" /> Back to Invoices
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-primary sm:text-xl">{invoice.invoiceNumber}</h2>
          <p className="text-xs text-gray-500 sm:text-sm">Created {formatDate(invoice.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={invoice.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updatingStatus}
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[invoice.status] || "bg-gray-100 text-gray-700"} cursor-pointer disabled:opacity-60`}
          >
            <option value="draft">draft</option>
            <option value="paid">paid</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
      </div>

      {/* Customer */}
      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <h3 className="mb-3 text-sm font-semibold text-primary sm:text-base">Customer</h3>
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-4">
          <Row label="Name" value={invoice.customerName} />
          <Row label="Phone" value={invoice.customerPhone} />
          <Row label="Email" value={invoice.customerEmail || "—"} />
          <Row label="Address" value={invoice.customerAddress || "—"} multiline />
        </div>
      </div>

      {/* Items */}
      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <h3 className="mb-3 text-sm font-semibold text-primary sm:text-base">Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-gray-500">
              <tr className="border-b border-gray-100">
                <th className="py-2 pr-2 font-medium">Description</th>
                <th className="py-2 px-2 text-right font-medium">Qty</th>
                <th className="py-2 px-2 text-right font-medium">Rate</th>
                <th className="py-2 pl-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((it, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 pr-2">{it.description}</td>
                  <td className="py-2 px-2 text-right text-gray-600">{it.quantity}</td>
                  <td className="py-2 px-2 text-right text-gray-600">{formatINR(it.rate)}</td>
                  <td className="py-2 pl-2 text-right font-medium">{formatINR(it.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-1 border-t border-gray-100 pt-3 text-sm">
          <div className="flex justify-end gap-6">
            <span className="text-gray-500">Subtotal</span>
            <span className="w-32 text-right">{formatINR(invoice.subtotal)}</span>
          </div>
          {invoice.taxAmount > 0 && (
            <div className="flex justify-end gap-6">
              <span className="text-gray-500">Tax ({invoice.taxPercent}%)</span>
              <span className="w-32 text-right">{formatINR(invoice.taxAmount)}</span>
            </div>
          )}
          <div className="mt-2 flex justify-end gap-6 border-t border-gray-100 pt-2">
            <span className="font-semibold text-primary">Total</span>
            <span className="w-32 text-right text-lg font-bold text-primary">{formatINR(invoice.total)}</span>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <h3 className="mb-3 text-sm font-semibold text-primary sm:text-base">Details</h3>
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-4">
          <Row label="Invoice date" value={formatDate(invoice.invoiceDate)} />
          <Row label="Due date" value={invoice.dueDate ? formatDate(invoice.dueDate) : "—"} />
        </div>
        {invoice.notes && (
          <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">Notes</p>
            <p className="whitespace-pre-wrap">{invoice.notes}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-between gap-3">
        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100"
        >
          <Trash2 className="size-4" /> Delete
        </button>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
        >
          <Download className="size-4" /> Download PDF
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</p>
      <p
        className={`mt-0.5 text-sm font-medium text-gray-800 ${
          multiline ? "whitespace-pre-wrap break-words" : "break-words"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
