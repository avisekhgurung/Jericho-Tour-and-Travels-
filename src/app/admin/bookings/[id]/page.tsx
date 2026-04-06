"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

type Booking = {
  id: number;
  type: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  destination: string | null;
  tourPlan: string | null;
  noOfPeople: string | null;
  travelDate: string | null;
  carFrom: string | null;
  dropLocation: string | null;
  selectTime: string | null;
  bookingDate: string;
  adminNotes: string | null;
  invoiceAmount: number | null;
  createdAt: string;
};

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

function DetailRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-gray-800">{value || "N/A"}</p>
    </div>
  );
}

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  useEffect(() => {
    fetch(`/api/admin/bookings/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setBooking(data);
        setNotes(data.adminNotes || "");
        setAmount(data.invoiceAmount ? String(data.invoiceAmount / 100) : "");
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleConfirm = async () => {
    if (!confirm("Confirm this booking? An email will be sent to the customer.")) return;
    setActionLoading("confirm");
    try {
      const res = await fetch(`/api/admin/bookings/${params.id}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceAmount: amount ? Math.round(parseFloat(amount) * 100) : undefined }),
      });
      if (res.ok) {
        const data = await res.json();
        setBooking(data.booking);
      }
    } finally {
      setActionLoading("");
    }
  };

  const handleReject = async () => {
    if (!confirm("Reject this booking? The customer will be notified.")) return;
    setActionLoading("reject");
    try {
      const res = await fetch(`/api/admin/bookings/${params.id}/reject`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setBooking(data.booking);
      }
    } finally {
      setActionLoading("");
    }
  };

  const handleSaveNotes = async () => {
    setActionLoading("notes");
    try {
      const res = await fetch(`/api/admin/bookings/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminNotes: notes,
          invoiceAmount: amount ? Math.round(parseFloat(amount) * 100) : undefined,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setBooking(data);
      }
    } finally {
      setActionLoading("");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!booking) return <p className="text-center text-gray-500">Booking not found</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
      <Link href="/admin/bookings" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary sm:text-sm">
        <ArrowLeft className="size-3.5 sm:size-4" /> Back to Bookings
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-primary sm:text-xl">Booking #{booking.id}</h2>
          <p className="text-xs text-gray-500 capitalize sm:text-sm">{booking.type.replace("_", " ")}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium sm:px-4 sm:py-1.5 sm:text-sm ${statusColor[booking.status]}`}>
          {booking.status}
        </span>
      </div>

      {/* Customer Details */}
      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <h3 className="mb-3 text-sm font-semibold text-primary sm:mb-4 sm:text-base">Customer Details</h3>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <DetailRow label="Name" value={booking.name} />
          <DetailRow label="Email" value={booking.email} />
          <DetailRow label="Phone" value={booking.phone} />
          <DetailRow label="Booking Date" value={booking.bookingDate} />
        </div>
      </div>

      {/* Service Details */}
      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <h3 className="mb-3 text-sm font-semibold text-primary sm:mb-4 sm:text-base">Service Details</h3>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {booking.type === "tour_package" ? (
            <>
              <DetailRow label="Destination" value={booking.destination} />
              <DetailRow label="Tour Plan" value={booking.tourPlan} />
              <DetailRow label="No of People" value={booking.noOfPeople} />
              <DetailRow label="Travel Date" value={booking.travelDate} />
            </>
          ) : (
            <>
              <DetailRow label="Pickup From" value={booking.carFrom} />
              <DetailRow label="Drop Location" value={booking.dropLocation} />
              <DetailRow label="Pickup Time" value={booking.selectTime} />
            </>
          )}
        </div>
      </div>

      {/* Admin Actions */}
      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <h3 className="mb-3 text-sm font-semibold text-primary sm:mb-4 sm:text-base">Admin Notes & Invoice</h3>

        <div className="mb-3 sm:mb-4">
          <label className="mb-1 block text-xs text-gray-500">Invoice Amount (INR)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 5000"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none"
          />
        </div>

        <div className="mb-3 sm:mb-4">
          <label className="mb-1 block text-xs text-gray-500">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none"
            placeholder="Internal notes..."
          />
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={handleSaveNotes}
            disabled={actionLoading === "notes"}
            className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-60 sm:px-4 sm:text-sm"
          >
            {actionLoading === "notes" ? "Saving..." : "Save Notes"}
          </button>

          {booking.status === "pending" && (
            <>
              <button
                onClick={handleConfirm}
                disabled={!!actionLoading}
                className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-60 sm:px-4 sm:text-sm"
              >
                <CheckCircle className="size-3.5 sm:size-4" />
                {actionLoading === "confirm" ? "Confirming..." : "Confirm"}
              </button>
              <button
                onClick={handleReject}
                disabled={!!actionLoading}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-60 sm:px-4 sm:text-sm"
              >
                <XCircle className="size-3.5 sm:size-4" />
                {actionLoading === "reject" ? "Rejecting..." : "Reject"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
