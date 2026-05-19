"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";

export function ReviewSubmissionForm() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      authorName: String(fd.get("authorName") ?? ""),
      authorEmail: String(fd.get("authorEmail") ?? ""),
      authorLocation: String(fd.get("authorLocation") ?? ""),
      rating,
      title: String(fd.get("title") ?? ""),
      text: String(fd.get("text") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { ok: boolean; message?: string; error?: string };
      setResult({
        ok: res.ok && data.ok,
        message:
          res.ok && data.ok
            ? data.message ?? "Thanks for your review!"
            : data.error ?? "Something went wrong. Please try again.",
      });
      if (res.ok && data.ok) form.reset();
    } catch {
      setResult({ ok: false, message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const displayRating = hoverRating ?? rating;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Rating */}
      <div>
        <label className="mb-2 block text-sm font-medium text-primary">Your rating</label>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            const filled = value <= displayRating;
            return (
              <button
                type="button"
                key={value}
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(null)}
                aria-label={`${value} star${value > 1 ? "s" : ""}`}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`size-8 ${filled ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-gray-300"}`}
                />
              </button>
            );
          })}
          <span className="ml-2 text-sm text-muted-foreground">{rating} / 5</span>
        </div>
      </div>

      {/* Name + Email side by side on desktop */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="rev-name" className="mb-1 block text-sm font-medium text-primary">
            Your name <span className="text-red-500">*</span>
          </label>
          <input
            id="rev-name"
            name="authorName"
            type="text"
            required
            maxLength={80}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="rev-email" className="mb-1 block text-sm font-medium text-primary">
            Email <span className="text-red-500">*</span>{" "}
            <span className="text-xs font-normal text-gray-400">(kept private)</span>
          </label>
          <input
            id="rev-email"
            name="authorEmail"
            type="email"
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="rev-location" className="mb-1 block text-sm font-medium text-primary">
            City <span className="text-xs font-normal text-gray-400">(optional)</span>
          </label>
          <input
            id="rev-location"
            name="authorLocation"
            type="text"
            maxLength={80}
            placeholder="e.g. Kolkata"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="rev-title" className="mb-1 block text-sm font-medium text-primary">
            Headline <span className="text-xs font-normal text-gray-400">(optional)</span>
          </label>
          <input
            id="rev-title"
            name="title"
            type="text"
            maxLength={120}
            placeholder="e.g. Wonderful Darjeeling trip!"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="rev-text" className="mb-1 block text-sm font-medium text-primary">
          Your review <span className="text-red-500">*</span>
        </label>
        <textarea
          id="rev-text"
          name="text"
          required
          minLength={20}
          maxLength={2000}
          rows={5}
          placeholder="Tell us about your trip — what did you enjoy? How was the service?"
          className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <p className="mt-1 text-xs text-gray-400">Minimum 20 characters · Max 2000</p>
      </div>

      {/* Honeypot — hidden from real users, visible to bots. */}
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="rev-website">Website</label>
        <input id="rev-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
      >
        <Send className="size-4" />
        {submitting ? "Submitting…" : "Submit Review"}
      </button>

      {result && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            result.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"
          }`}
        >
          {result.message}
        </div>
      )}

      <p className="text-xs text-gray-400">
        Your review will be visible on our website after a quick review by our team (usually within 24 hours).
      </p>
    </form>
  );
}
