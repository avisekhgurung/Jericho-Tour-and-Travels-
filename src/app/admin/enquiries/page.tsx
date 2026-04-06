"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Enquiry = {
  id: number;
  status: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  createdAt: string;
};

const tabs = [
  { label: "All", value: "" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Closed", value: "closed" },
];

const statusColor: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  closed: "bg-gray-100 text-gray-600",
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (filter) params.set("status", filter);

    fetch(`/api/admin/enquiries?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setEnquiries(data.enquiries);
        setTotalPages(data.totalPages);
      })
      .finally(() => setLoading(false));
  }, [filter, page]);

  return (
    <div className="space-y-4 sm:space-y-6">
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

      <div className="rounded-xl bg-white shadow-sm">
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            {/* Mobile: Card layout */}
            <div className="divide-y divide-gray-50 sm:hidden">
              {enquiries.map((e) => (
                <Link key={e.id} href={`/admin/enquiries/${e.id}`} className="flex items-center justify-between px-4 py-3 active:bg-gray-50">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">#{e.id}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor[e.status]}`}>
                        {e.status}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-gray-700">{e.name}</p>
                    <p className="text-xs text-gray-400">{e.destination} &middot; {e.travelDate}</p>
                  </div>
                  <svg className="size-4 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
              {enquiries.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-gray-400">No enquiries found</p>
              )}
            </div>

            {/* Desktop: Table */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-gray-500">
                    <th className="px-5 py-3 font-medium">ID</th>
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Phone</th>
                    <th className="px-5 py-3 font-medium">Destination</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Travel Date</th>
                    <th className="px-5 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((e) => (
                    <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium">#{e.id}</td>
                      <td className="px-5 py-3">{e.name}</td>
                      <td className="px-5 py-3">{e.phone}</td>
                      <td className="px-5 py-3">{e.destination}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[e.status]}`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">{e.travelDate}</td>
                      <td className="px-5 py-3">
                        <Link href={`/admin/enquiries/${e.id}`} className="text-accent hover:underline">View</Link>
                      </td>
                    </tr>
                  ))}
                  {enquiries.length === 0 && (
                    <tr><td colSpan={7} className="px-5 py-8 text-center text-gray-400">No enquiries found</td></tr>
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
