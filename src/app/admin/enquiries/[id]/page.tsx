"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Enquiry = {
  id: number;
  status: string;
  name: string;
  phone: string;
  email: string;
  destination: string;
  travelDate: string;
  message: string | null;
  adminNotes: string | null;
  createdAt: string;
};

const statusColor: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  closed: "bg-gray-100 text-gray-600",
};

export default function EnquiryDetailPage() {
  const params = useParams();
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/enquiries/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setEnquiry(data);
        setNotes(data.adminNotes || "");
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  const updateStatus = async (status: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes: notes }),
      });
      if (res.ok) setEnquiry(await res.json());
    } finally {
      setActionLoading(false);
    }
  };

  const saveNotes = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: notes }),
      });
      if (res.ok) setEnquiry(await res.json());
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!enquiry) return <p className="text-center text-gray-500">Enquiry not found</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
      <Link href="/admin/enquiries" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary sm:text-sm">
        <ArrowLeft className="size-3.5 sm:size-4" /> Back to Enquiries
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-primary sm:text-xl">Enquiry #{enquiry.id}</h2>
          <p className="text-xs text-gray-500 sm:text-sm">
            {new Date(enquiry.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium sm:px-4 sm:py-1.5 sm:text-sm ${statusColor[enquiry.status]}`}>
          {enquiry.status}
        </span>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <h3 className="mb-3 text-sm font-semibold text-primary sm:mb-4 sm:text-base">Contact Details</h3>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Name</p>
            <p className="mt-0.5 text-sm font-medium text-gray-800">{enquiry.name}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Phone</p>
            <p className="mt-0.5 text-sm font-medium text-gray-800">{enquiry.phone}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Email</p>
            <p className="mt-0.5 text-sm font-medium text-gray-800">{enquiry.email}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Destination</p>
            <p className="mt-0.5 text-sm font-medium text-gray-800">{enquiry.destination}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Travel Date</p>
            <p className="mt-0.5 text-sm font-medium text-gray-800">{enquiry.travelDate}</p>
          </div>
        </div>
        {enquiry.message && (
          <div className="mt-3 sm:mt-4">
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Message</p>
            <p className="mt-1 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">{enquiry.message}</p>
          </div>
        )}
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <h3 className="mb-3 text-sm font-semibold text-primary sm:mb-4 sm:text-base">Admin Notes & Actions</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mb-3 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none sm:mb-4"
          placeholder="Internal notes..."
        />

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={saveNotes}
            disabled={actionLoading}
            className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-60 sm:px-4 sm:text-sm"
          >
            Save Notes
          </button>
          {enquiry.status !== "contacted" && (
            <button
              onClick={() => updateStatus("contacted")}
              disabled={actionLoading}
              className="rounded-lg bg-yellow-500 px-3 py-2 text-xs font-medium text-white hover:bg-yellow-600 disabled:opacity-60 sm:px-4 sm:text-sm"
            >
              Mark Contacted
            </button>
          )}
          {enquiry.status !== "closed" && (
            <button
              onClick={() => updateStatus("closed")}
              disabled={actionLoading}
              className="rounded-lg bg-gray-600 px-3 py-2 text-xs font-medium text-white hover:bg-gray-700 disabled:opacity-60 sm:px-4 sm:text-sm"
            >
              Close Enquiry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
