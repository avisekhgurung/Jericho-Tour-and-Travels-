"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, X, AlertTriangle, Loader2 } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  lookingFor: string;
  destination: string;
  tourPlan: string;
  noOfPeople: string;
  bookingDate: string;
  travelDate: string;
  carFrom: string;
  dropLocation: string;
  selectTime: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  lookingFor: "Tour Package",
  destination: "",
  tourPlan: "",
  noOfPeople: "",
  bookingDate: "",
  travelDate: "",
  carFrom: "",
  dropLocation: "",
  selectTime: "",
};

type ToastState = {
  show: boolean;
  type: "success" | "error";
  title: string;
  message: string;
};

function Toast({ toast, onClose }: { toast: ToastState; onClose: () => void }) {
  useEffect(() => {
    if (toast.show && toast.type === "success") {
      const timer = setTimeout(onClose, 6000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, toast.type, onClose]);

  if (!toast.show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm animate-[scaleIn_0.3s_ease-out] overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="size-4" />
          </button>

          {/* Icon header */}
          <div
            className={`flex flex-col items-center px-6 pt-8 pb-4 ${
              toast.type === "success"
                ? "bg-gradient-to-b from-green-50 to-white"
                : "bg-gradient-to-b from-red-50 to-white"
            }`}
          >
            <div
              className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                toast.type === "success"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="size-8" />
              ) : (
                <AlertTriangle className="size-8" />
              )}
            </div>

            <h3
              className={`text-lg font-bold ${
                toast.type === "success" ? "text-green-800" : "text-red-800"
              }`}
            >
              {toast.title}
            </h3>
          </div>

          {/* Body */}
          <div className="px-6 pb-6 text-center">
            <p className="mb-5 text-sm text-gray-600">{toast.message}</p>

            <button
              onClick={onClose}
              className={`w-full rounded-xl py-3 text-sm font-semibold text-white transition-all hover:shadow-lg ${
                toast.type === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {toast.type === "success" ? "Great, Thank You!" : "Try Again"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function HeroBookingForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const closeToast = () => setToast((prev) => ({ ...prev, show: false }));

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setToast({
          show: true,
          type: "success",
          title: "Booking Submitted!",
          message:
            "Thank you for choosing Jericho Tour & Travels! Our team will review your booking and contact you within 24 hours to confirm the details.",
        });
        setForm(initialState);
      } else {
        setToast({
          show: true,
          type: "error",
          title: "Submission Failed",
          message:
            "We couldn't process your booking right now. Please try again or call us directly at +91 74780 29354.",
        });
      }
    } catch {
      setToast({
        show: true,
        type: "error",
        title: "Connection Error",
        message:
          "Unable to reach our servers. Please check your internet connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast toast={toast} onClose={closeToast} />

      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="rounded-t-2xl bg-gradient-to-r from-[#E5A832] to-[#F4C430] px-4 py-5 text-center sm:rounded-t-3xl sm:px-8 sm:py-8">
          <h2 className="text-primary" style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)", fontWeight: 700, marginBottom: "0.25rem" }}>
            BOOK A TOUR WITH US
          </h2>
          <p className="text-primary/80" style={{ fontSize: "clamp(0.875rem, 3vw, 1.25rem)" }}>
            100% comfort within the budget
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 px-4 py-5 sm:space-y-6 sm:px-6 sm:py-8 md:px-8">
          <div>
            <label className="mb-1.5 block text-sm text-primary sm:mb-2 sm:text-base" style={{ fontWeight: 600 }}>
              Name <span className="text-[#E5A832]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Enter Your Name"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <label className="mb-1.5 block text-sm text-primary sm:mb-2 sm:text-base" style={{ fontWeight: 600 }}>
                Email <span className="text-[#E5A832]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="Enter Your Email"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-primary sm:mb-2 sm:text-base" style={{ fontWeight: 600 }}>
                Phone <span className="text-[#E5A832]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                placeholder="Enter Your Phone number"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-primary sm:mb-2 sm:text-base" style={{ fontWeight: 600 }}>
              Looking for <span className="text-[#E5A832]">*</span>
            </label>
            <select
              name="lookingFor"
              value={form.lookingFor}
              onChange={(event) => setForm({ ...form, lookingFor: event.target.value })}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
            >
              <option value="Tour Package">Tour Package</option>
              <option value="Car Rental">Car Rental</option>
            </select>
          </div>

          {form.lookingFor === "Car Rental" ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label className="mb-1.5 block text-sm text-primary sm:mb-2 sm:text-base" style={{ fontWeight: 600 }}>
                    Where Car From <span className="text-[#E5A832]">*</span>
                  </label>
                  <input
                    type="text"
                    name="carFrom"
                    value={form.carFrom}
                    onChange={(event) => setForm({ ...form, carFrom: event.target.value })}
                    placeholder="Pickup Location"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-primary sm:mb-2 sm:text-base" style={{ fontWeight: 600 }}>
                    Drop Location
                  </label>
                  <input
                    type="text"
                    name="dropLocation"
                    value={form.dropLocation}
                    onChange={(event) => setForm({ ...form, dropLocation: event.target.value })}
                    placeholder="Drop Location"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label className="mb-1.5 block text-sm text-primary sm:mb-2 sm:text-base" style={{ fontWeight: 600 }}>
                    Select Time <span className="text-[#E5A832]">*</span>
                  </label>
                  <select
                    name="selectTime"
                    value={form.selectTime}
                    onChange={(event) => setForm({ ...form, selectTime: event.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  >
                    <option value="">Select Time</option>
                    <option value="06:00 AM">06:00 AM</option>
                    <option value="07:00 AM">07:00 AM</option>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-primary sm:mb-2 sm:text-base" style={{ fontWeight: 600 }}>
                    Booking Date <span className="text-[#E5A832]">*</span>
                  </label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={form.bookingDate}
                    onChange={(event) => setForm({ ...form, bookingDate: event.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label className="mb-1.5 block text-sm text-primary sm:mb-2 sm:text-base" style={{ fontWeight: 600 }}>
                    Tour Destination <span className="text-[#E5A832]">*</span>
                  </label>
                  <select
                    name="destination"
                    value={form.destination}
                    onChange={(event) => setForm({ ...form, destination: event.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  >
                    <option value="">Choose Destination</option>
                    <option value="Darjeeling">Darjeeling</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Darjeeling and Sikkim">Darjeeling and Sikkim</option>
                    <option value="Dooars">Dooars</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-primary sm:mb-2 sm:text-base" style={{ fontWeight: 600 }}>
                    Tour Plan <span className="text-[#E5A832]">*</span>
                  </label>
                  <select
                    name="tourPlan"
                    value={form.tourPlan}
                    onChange={(event) => setForm({ ...form, tourPlan: event.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  >
                    <option value="">Choose Day</option>
                    <option value="1N/2D">1N/2D</option>
                    <option value="2N/3D">2N/3D</option>
                    <option value="3N/4D">3N/4D</option>
                    <option value="4N/5D">4N/5D</option>
                    <option value="5N/6D">5N/6D</option>
                    <option value="6N/7D">6N/7D</option>
                    <option value="7N/8D">7N/8D</option>
                    <option value="8N/9D">8N/9D</option>
                    <option value="9N/10D">9N/10D</option>
                    <option value="10D+">10D+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label className="mb-1.5 block text-sm text-primary sm:mb-2 sm:text-base" style={{ fontWeight: 600 }}>
                    No of People <span className="text-[#E5A832]">*</span>
                  </label>
                  <select
                    name="noOfPeople"
                    value={form.noOfPeople}
                    onChange={(event) => setForm({ ...form, noOfPeople: event.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  >
                    <option value="">Select here..</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10+">10+</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-primary sm:mb-2 sm:text-base" style={{ fontWeight: 600 }}>
                    Booking Date <span className="text-[#E5A832]">*</span>
                  </label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={form.bookingDate}
                    onChange={(event) => setForm({ ...form, bookingDate: event.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-primary sm:mb-2 sm:text-base" style={{ fontWeight: 600 }}>
                  Travel Date <span className="text-[#E5A832]">*</span>
                </label>
                <input
                  type="date"
                  name="travelDate"
                  value={form.travelDate}
                  onChange={(event) => setForm({ ...form, travelDate: event.target.value })}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#E5A832] to-[#F4C430] py-3 text-primary shadow-lg transition-all hover:shadow-xl disabled:opacity-60 sm:py-4"
            style={{ fontWeight: 700, fontSize: "clamp(0.938rem, 3vw, 1.125rem)" }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Book Now"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
