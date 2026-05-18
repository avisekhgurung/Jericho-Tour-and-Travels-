"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

type Invoice = {
  id: number;
  invoiceNumber: string;
  status: string;
  customerName: string;
  customerPhone: string;
  total: number;
  invoiceDate: string;
  createdAt: string;
};

const tabs = [
  { label: "All", value: "" },
  { label: "Draft", value: "draft" },
  { label: "Paid", value: "paid" },
  { label: "Cancelled", value: "cancelled" },
];

const statusColor: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  paid: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (filter) params.set("status", filter);

    fetch(`/api/admin/invoices?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data.invoices);
        setTotalPages(data.totalPages);
      })
      .finally(() => setLoading(false));
  }, [filter, page]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5 overflow-x-auto sm:gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => { setFilter(tab.value); setPage(1); }}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                filter === tab.value
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Link
          href="/admin/invoices/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary/90 sm:px-4 sm:text-sm"
        >
          <Plus className="size-3.5 sm:size-4" />
          New Invoice
        </Link>
      </div>

      <div className="rounded-xl bg-white shadow-sm">
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            {/* Mobile */}
            <div className="divide-y divide-gray-50 sm:hidden">
              {invoices.map((inv) => (
                <Link key={inv.id} href={`/admin/invoices/${inv.id}`} className="flex items-center justify-between px-4 py-3 active:bg-gray-50">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">{inv.invoiceNumber}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor[inv.status] || "bg-gray-100 text-gray-700"}`}>
                        {inv.status}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-gray-700">{inv.customerName}</p>
                    <p className="text-xs text-gray-400">
                      {inv.customerPhone} &middot; {inv.invoiceDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">₹{(inv.total / 100).toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
              {invoices.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-gray-400">No invoices yet</p>
              )}
            </div>

            {/* Desktop */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-gray-500">
                    <th className="px-5 py-3 font-medium">Invoice #</th>
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Phone</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Total</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-primary">{inv.invoiceNumber}</td>
                      <td className="px-5 py-3">{inv.customerName}</td>
                      <td className="px-5 py-3">{inv.customerPhone}</td>
                      <td className="px-5 py-3">{inv.invoiceDate}</td>
                      <td className="px-5 py-3 font-medium">₹{(inv.total / 100).toLocaleString("en-IN")}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[inv.status] || "bg-gray-100 text-gray-700"}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <Link href={`/admin/invoices/${inv.id}`} className="text-accent hover:underline">View</Link>
                      </td>
                    </tr>
                  ))}
                  {invoices.length === 0 && (
                    <tr><td colSpan={7} className="px-5 py-8 text-center text-gray-400">No invoices yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 sm:px-5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg px-3 py-1.5 text-xs hover:bg-gray-100 disabled:opacity-50 sm:text-sm"
            >
              Previous
            </button>
            <span className="text-xs text-gray-500 sm:text-sm">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg px-3 py-1.5 text-xs hover:bg-gray-100 disabled:opacity-50 sm:text-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
