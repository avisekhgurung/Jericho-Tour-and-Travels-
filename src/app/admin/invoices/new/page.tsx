"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

type DraftItem = {
  description: string;
  quantity: string; // kept as string for input control
  rate: string; // rupees as string for input control
};

function rupeesToPaisa(str: string): number {
  const n = parseFloat(str);
  if (Number.isNaN(n) || n < 0) return 0;
  return Math.round(n * 100);
}

function formatINR(paisa: number): string {
  return `₹${(paisa / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function NewInvoicePage() {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(today);
  const [dueDate, setDueDate] = useState("");
  const [taxPercent, setTaxPercent] = useState("0");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("draft");
  const [items, setItems] = useState<DraftItem[]>([
    { description: "", quantity: "1", rate: "" },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, it) => {
      const qty = parseFloat(it.quantity) || 0;
      const rate = rupeesToPaisa(it.rate);
      return sum + qty * rate;
    }, 0);
    const taxPct = Math.max(0, Math.min(100, parseFloat(taxPercent) || 0));
    const tax = Math.round((subtotal * taxPct) / 100);
    return { subtotal, tax, total: subtotal + tax };
  }, [items, taxPercent]);

  const updateItem = (idx: number, field: keyof DraftItem, value: string) => {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, [field]: value } : it)));
  };

  const addItem = () => setItems((prev) => [...prev, { description: "", quantity: "1", rate: "" }]);
  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client validation
    if (!customerName.trim()) return setError("Customer name is required");
    if (!customerPhone.trim()) return setError("Customer phone is required");
    if (!invoiceDate) return setError("Invoice date is required");
    const validItems = items.filter(
      (it) => it.description.trim() && (parseFloat(it.quantity) || 0) > 0
    );
    if (validItems.length === 0) return setError("Add at least one line item with a description and quantity");

    setSaving(true);
    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail: customerEmail || null,
          customerAddress: customerAddress || null,
          invoiceDate,
          dueDate: dueDate || null,
          taxPercent: parseFloat(taxPercent) || 0,
          notes: notes || null,
          status,
          items: validItems.map((it) => ({
            description: it.description.trim(),
            quantity: parseFloat(it.quantity) || 0,
            rate: rupeesToPaisa(it.rate),
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save invoice");
        setSaving(false);
        return;
      }
      router.push(`/admin/invoices/${data.id}`);
    } catch {
      setError("Network error — could not reach the server");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
      <Link href="/admin/invoices" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary sm:text-sm">
        <ArrowLeft className="size-3.5 sm:size-4" /> Back to Invoices
      </Link>

      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-primary sm:text-xl">New Invoice</h2>

        {/* Customer */}
        <h3 className="mb-3 text-sm font-semibold text-primary sm:text-base">Customer</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <Field label="Name *" value={customerName} onChange={setCustomerName} placeholder="Customer full name" />
          <Field label="Phone *" value={customerPhone} onChange={setCustomerPhone} placeholder="+91 …" />
          <Field label="Email" value={customerEmail} onChange={setCustomerEmail} placeholder="optional" type="email" />
          <Field label="Address" value={customerAddress} onChange={setCustomerAddress} placeholder="optional" />
        </div>
      </div>

      {/* Invoice meta */}
      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <h3 className="mb-3 text-sm font-semibold text-primary sm:text-base">Invoice details</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          <Field label="Invoice date *" value={invoiceDate} onChange={setInvoiceDate} type="date" />
          <Field label="Due date" value={dueDate} onChange={setDueDate} type="date" />
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none"
            >
              <option value="draft">Draft</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-primary sm:text-base">Line items</h3>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
          >
            <Plus className="size-3.5" /> Add row
          </button>
        </div>

        <div className="space-y-2">
          {items.map((item, idx) => {
            const qty = parseFloat(item.quantity) || 0;
            const rate = rupeesToPaisa(item.rate);
            const line = qty * rate;
            return (
              <div key={idx} className="grid grid-cols-12 gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2 sm:gap-3 sm:p-3">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(idx, "description", e.target.value)}
                  placeholder="Description (e.g. Darjeeling 3N4D package)"
                  className="col-span-12 rounded-md border border-gray-200 bg-white px-2.5 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none sm:col-span-6"
                />
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(idx, "quantity", e.target.value)}
                  placeholder="Qty"
                  className="col-span-3 rounded-md border border-gray-200 bg-white px-2.5 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none sm:col-span-2"
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.rate}
                  onChange={(e) => updateItem(idx, "rate", e.target.value)}
                  placeholder="Rate (₹)"
                  className="col-span-5 rounded-md border border-gray-200 bg-white px-2.5 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none sm:col-span-2"
                />
                <div className="col-span-3 flex items-center justify-end pr-1 text-right text-sm font-semibold text-primary sm:col-span-1">
                  {formatINR(line)}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  disabled={items.length <= 1}
                  className="col-span-1 flex items-center justify-center rounded-md text-gray-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-30"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div className="mt-4 space-y-1 border-t border-gray-100 pt-3 text-sm">
          <div className="flex justify-end gap-6">
            <span className="text-gray-500">Subtotal</span>
            <span className="w-32 text-right font-medium">{formatINR(totals.subtotal)}</span>
          </div>
          <div className="flex items-center justify-end gap-6">
            <label className="flex items-center gap-2 text-gray-500">
              Tax %
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={taxPercent}
                onChange={(e) => setTaxPercent(e.target.value)}
                className="w-16 rounded-md border border-gray-200 px-2 py-1 text-right text-xs focus:ring-2 focus:ring-primary/50 focus:outline-none"
              />
            </label>
            <span className="w-32 text-right font-medium">{formatINR(totals.tax)}</span>
          </div>
          <div className="mt-2 flex justify-end gap-6 border-t border-gray-100 pt-2 text-base">
            <span className="font-semibold text-primary">Total</span>
            <span className="w-32 text-right text-lg font-bold text-primary">{formatINR(totals.total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <label className="mb-1 block text-xs font-medium text-gray-500">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Payment terms, thank-you note, etc."
          className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none"
        />
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Link
          href="/admin/invoices"
          className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Create Invoice"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none"
      />
    </div>
  );
}
