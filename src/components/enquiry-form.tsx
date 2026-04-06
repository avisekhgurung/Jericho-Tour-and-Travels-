"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type EnquiryFormState = {
  name: string;
  phone: string;
  email: string;
  destination: string;
  travelDate: string;
  message: string;
};

const initialState: EnquiryFormState = {
  name: "",
  phone: "",
  email: "",
  destination: "",
  travelDate: "",
  message: "",
};

const destinations = ["Darjeeling", "Sikkim", "Gangtok", "Kalimpong", "Pelling", "Lachung", "Other"];

export function EnquiryForm() {
  const [form, setForm] = useState<EnquiryFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitResult({ success: true, message: "Enquiry sent successfully! We will get back to you soon." });
        setForm(initialState);
      } else {
        setSubmitResult({ success: false, message: "Something went wrong. Please try again." });
      }
    } catch {
      setSubmitResult({ success: false, message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-primary">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-primary">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
          required
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
          placeholder="+91 98765 43210"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-primary">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label htmlFor="destination" className="mb-2 block text-primary">
          Destination *
        </label>
        <select
          id="destination"
          name="destination"
          value={form.destination}
          onChange={(event) => setForm({ ...form, destination: event.target.value })}
          required
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        >
          <option value="">Select destination</option>
          {destinations.map((destination) => (
            <option key={destination} value={destination}>
              {destination}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="travelDate" className="mb-2 block text-primary">
          Travel Date *
        </label>
        <input
          type="date"
          id="travelDate"
          name="travelDate"
          value={form.travelDate}
          onChange={(event) => setForm({ ...form, travelDate: event.target.value })}
          min={minDate}
          required
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-primary">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          rows={4}
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
          placeholder="Tell us about your travel plans..."
        />
      </div>

      {submitResult && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            submitResult.success
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {submitResult.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-white shadow-lg transition-all duration-300 hover:bg-accent/90 hover:shadow-xl disabled:opacity-60"
      >
        <span>{isSubmitting ? "Sending..." : "Send Enquiry"}</span>
        {!isSubmitting && <ArrowRight className="size-5" />}
      </button>
    </form>
  );
}
