"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Save, X, AlertTriangle, Mail, CheckCircle2, Download } from "lucide-react";
import { jsPDF } from "jspdf";

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
  updatedAt: string;
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

type ToastData = {
  show: boolean;
  type: "success" | "error" | "warning";
  title: string;
  message: string;
};

function AdminToast({ toast, onClose }: { toast: ToastData; onClose: () => void }) {
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, onClose]);

  if (!toast.show) return null;

  const styles = {
    success: { bg: "bg-green-50 border-green-200", icon: "bg-green-100 text-green-600", title: "text-green-800", msg: "text-green-700" },
    error: { bg: "bg-red-50 border-red-200", icon: "bg-red-100 text-red-600", title: "text-red-800", msg: "text-red-700" },
    warning: { bg: "bg-yellow-50 border-yellow-200", icon: "bg-yellow-100 text-yellow-600", title: "text-yellow-800", msg: "text-yellow-700" },
  };
  const s = styles[toast.type];

  return (
    <div className="fixed top-4 right-4 z-[100] w-full max-w-sm animate-[slideIn_0.3s_ease-out]">
      <div className={`flex items-start gap-3 rounded-xl border p-4 shadow-lg ${s.bg}`}>
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${s.icon}`}>
          {toast.type === "success" ? <CheckCircle2 className="size-5" /> : toast.type === "error" ? <AlertTriangle className="size-5" /> : <Mail className="size-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold ${s.title}`}>{toast.title}</p>
          <p className={`mt-0.5 text-xs ${s.msg}`}>{toast.message}</p>
        </div>
        <button onClick={onClose} className="shrink-0 text-gray-400 hover:text-gray-600">
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}

export default function BookingDetailPage() {
  const params = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");
  const [actionLoading, setActionLoading] = useState("");
  const [toast, setToast] = useState<ToastData>({ show: false, type: "success", title: "", message: "" });

  const showToast = useCallback((type: ToastData["type"], title: string, message: string) => {
    setToast({ show: true, type, title, message });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  const handleDownloadInvoice = useCallback(() => {
    if (!booking) return;

    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();
    const invoiceNo = `#JTT-${String(booking.id).padStart(4, "0")}`;
    const invoiceDate = new Date(booking.updatedAt || booking.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    const amountVal = booking.invoiceAmount ? `Rs. ${(booking.invoiceAmount / 100).toLocaleString("en-IN")}` : "To be discussed";

    // Header background
    doc.setFillColor(11, 60, 93); // primary
    doc.rect(0, 0, pageW, 42, "F");

    // Gold accent line
    doc.setFillColor(229, 168, 50); // gold
    doc.rect(0, 42, pageW, 3, "F");

    // Company name
    doc.setTextColor(229, 168, 50);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("JERICHO TOUR & TRAVELS", pageW / 2, 20, { align: "center" });
    doc.setTextColor(180, 200, 220);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Darjeeling & Sikkim | Rangbull, West Bengal", pageW / 2, 28, { align: "center" });
    doc.text("Phone: +91 74780 29354 | WhatsApp: +91 74780 29354", pageW / 2, 34, { align: "center" });

    // Invoice title section
    let y = 55;
    doc.setTextColor(11, 60, 93);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 20, y);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(invoiceNo, pageW - 20, y - 4, { align: "right" });
    doc.text(`Date: ${invoiceDate}`, pageW - 20, y + 4, { align: "right" });

    // Confirmed badge
    y += 12;
    doc.setFillColor(220, 252, 231);
    doc.roundedRect(20, y - 5, 50, 10, 3, 3, "F");
    doc.setTextColor(21, 128, 61);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("CONFIRMED", 24, y + 1);

    // Divider
    y += 14;
    doc.setDrawColor(229, 168, 50);
    doc.setLineWidth(0.5);
    doc.line(20, y, pageW - 20, y);

    // Customer details section
    y += 12;
    doc.setTextColor(11, 60, 93);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Customer Details", 20, y);

    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    const custDetails = [
      ["Name", booking.name],
      ["Email", booking.email],
      ["Phone", booking.phone],
    ];
    custDetails.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(120, 120, 120);
      doc.text(`${label}:`, 20, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);
      doc.text(value, 65, y);
      y += 7;
    });

    // Booking details section
    y += 6;
    doc.setTextColor(11, 60, 93);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Booking Details", 20, y);

    y += 10;

    // Table header
    doc.setFillColor(11, 60, 93);
    doc.rect(20, y - 5, pageW - 40, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Item", 25, y + 1);
    doc.text("Details", pageW / 2, y + 1);
    y += 10;

    // Table rows
    const rows: [string, string][] = [
      ["Service Type", booking.type === "tour_package" ? "Tour Package" : "Car Rental"],
      ["Booking Date", booking.bookingDate],
    ];

    if (booking.type === "tour_package") {
      if (booking.destination) rows.push(["Destination", booking.destination]);
      if (booking.tourPlan) rows.push(["Tour Plan", booking.tourPlan]);
      if (booking.noOfPeople) rows.push(["No of People", booking.noOfPeople]);
      if (booking.travelDate) rows.push(["Travel Date", booking.travelDate]);
    } else {
      if (booking.carFrom) rows.push(["Pickup From", booking.carFrom]);
      if (booking.dropLocation) rows.push(["Drop Location", booking.dropLocation]);
      if (booking.selectTime) rows.push(["Pickup Time", booking.selectTime]);
    }

    rows.forEach(([label, value], i) => {
      if (i % 2 === 0) {
        doc.setFillColor(249, 250, 251);
        doc.rect(20, y - 5, pageW - 40, 10, "F");
      }
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(label, 25, y + 1);
      doc.setTextColor(30, 30, 30);
      doc.setFont("helvetica", "bold");
      doc.text(value, pageW / 2, y + 1);
      y += 10;
    });

    // Amount section
    y += 4;
    doc.setFillColor(11, 60, 93);
    doc.roundedRect(20, y - 5, pageW - 40, 20, 3, 3, "F");
    doc.setTextColor(180, 200, 220);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Total Amount", 25, y + 4);
    doc.setTextColor(229, 168, 50);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(amountVal, pageW - 25, y + 5, { align: "right" });

    // Notes
    if (booking.adminNotes) {
      y += 28;
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.text(`Note: ${booking.adminNotes}`, 20, y);
    }

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 25;
    doc.setDrawColor(229, 168, 50);
    doc.setLineWidth(0.5);
    doc.line(20, footerY - 5, pageW - 20, footerY - 5);
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Jericho Tour & Travels | Rangbull, Darjeeling, West Bengal, India", pageW / 2, footerY, { align: "center" });
    doc.text("Phone: +91 74780 29354 | Email: jerichotourandtravels@gmail.com", pageW / 2, footerY + 5, { align: "center" });
    doc.text("Thank you for choosing Jericho Tour & Travels!", pageW / 2, footerY + 12, { align: "center" });

    // Save
    doc.save(`Invoice-${invoiceNo.replace("#", "")}.pdf`);
    showToast("success", "Invoice Downloaded", `PDF invoice ${invoiceNo} has been downloaded successfully.`);
  }, [booking, showToast]);

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
    if (!amount || parseFloat(amount) <= 0) {
      showToast("error", "Invoice Required", "Please enter a valid invoice amount before confirming the booking.");
      return;
    }
    if (!confirm("Confirm this booking? A confirmation email with invoice will be sent to the customer.")) return;

    setActionLoading("confirm");
    try {
      const res = await fetch(`/api/admin/bookings/${params.id}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceAmount: Math.round(parseFloat(amount) * 100),
          adminNotes: notes,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setBooking(data.booking);
        if (data.emailSent) {
          showToast("success", "Booking Confirmed!", `Invoice email sent successfully to ${data.booking.email}`);
        } else {
          showToast("warning", "Booking Confirmed", `Booking confirmed but email failed: ${data.emailError || "Unknown error"}. Please contact the customer manually.`);
        }
      } else {
        showToast("error", "Confirmation Failed", data.error || "Something went wrong.");
      }
    } catch {
      showToast("error", "Network Error", "Could not reach the server. Please try again.");
    } finally {
      setActionLoading("");
    }
  };

  const handleReject = async () => {
    if (!confirm("Reject this booking? The customer will be notified via email.")) return;

    setActionLoading("reject");
    try {
      const res = await fetch(`/api/admin/bookings/${params.id}/reject`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setBooking(data.booking);
        if (data.emailSent) {
          showToast("success", "Booking Rejected", `Rejection notification sent to ${data.booking.email}`);
        } else {
          showToast("warning", "Booking Rejected", `Booking rejected but email failed. Please inform the customer manually.`);
        }
      } else {
        showToast("error", "Rejection Failed", data.error || "Something went wrong.");
      }
    } catch {
      showToast("error", "Network Error", "Could not reach the server. Please try again.");
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
        showToast("success", "Saved!", "Notes and invoice amount have been updated successfully.");
      } else {
        showToast("error", "Save Failed", "Could not save changes. Please try again.");
      }
    } catch {
      showToast("error", "Network Error", "Could not reach the server.");
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
    <>
      <AdminToast toast={toast} onClose={closeToast} />

      <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
        <Link href="/admin/bookings" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary sm:text-sm">
          <ArrowLeft className="size-3.5 sm:size-4" /> Back to Bookings
        </Link>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-primary sm:text-xl">Booking #JTT-{String(booking.id).padStart(4, "0")}</h2>
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
          <h3 className="mb-3 text-sm font-semibold text-primary sm:mb-4 sm:text-base">Invoice & Notes</h3>

          <div className="mb-3 sm:mb-4">
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Invoice Amount (₹) {booking.status === "pending" && <span className="text-red-500">*</span>}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none"
            />
            {booking.invoiceAmount && (
              <p className="mt-1 text-xs text-gray-400">
                Current: ₹{(booking.invoiceAmount / 100).toLocaleString("en-IN")}
              </p>
            )}
          </div>

          <div className="mb-4 sm:mb-5">
            <label className="mb-1 block text-xs font-medium text-gray-500">Admin Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="Internal notes about this booking..."
            />
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={handleSaveNotes}
              disabled={!!actionLoading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-60 sm:px-4 sm:text-sm"
            >
              <Save className="size-3.5 sm:size-4" />
              {actionLoading === "notes" ? "Saving..." : "Save"}
            </button>

            {booking.status === "pending" && (
              <>
                <button
                  onClick={handleConfirm}
                  disabled={!!actionLoading}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-60 sm:px-4 sm:text-sm"
                >
                  <CheckCircle className="size-3.5 sm:size-4" />
                  {actionLoading === "confirm" ? "Confirming..." : "Confirm & Send Invoice"}
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

        {/* Confirmed status + Download Invoice */}
        {booking.status === "confirmed" && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="size-5 shrink-0 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">Booking Confirmed</p>
                <p className="text-xs text-green-700">Confirmation email with invoice was sent to {booking.email}</p>
              </div>
            </div>
            <button
              onClick={handleDownloadInvoice}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 sm:w-auto sm:px-5"
            >
              <Download className="size-4" />
              Download Invoice PDF
            </button>
          </div>
        )}
        {booking.status === "rejected" && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <XCircle className="size-5 shrink-0 text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-800">Booking Rejected</p>
              <p className="text-xs text-red-700">Rejection notification was sent to {booking.email}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
