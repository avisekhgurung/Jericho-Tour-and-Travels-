"use client";

import { useCallback, useEffect, useState } from "react";
import { Star, Check, X as XIcon, Trash2, RotateCcw, Inbox } from "lucide-react";

type Review = {
  id: number;
  status: "pending" | "approved" | "rejected";
  authorName: string;
  authorEmail: string;
  authorLocation: string | null;
  rating: number;
  title: string | null;
  text: string;
  submittedFromIp: string | null;
  adminNotes: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse = {
  ok: boolean;
  reviews: Review[];
  total: number;
  countsByStatus: Record<string, number>;
};

const TABS = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function AdminReviewsPage() {
  const [tab, setTab] = useState<TabKey>("pending");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(async (status: TabKey) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reviews?status=${status}`);
      if (!res.ok) throw new Error("Failed");
      const json = (await res.json()) as ApiResponse;
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(tab);
  }, [tab, load]);

  async function act(id: number, action: "approve" | "reject" | "reset") {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error("Failed");
      await load(tab);
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: number) {
    if (!confirm("Delete this review permanently? This can't be undone.")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      await load(tab);
    } finally {
      setBusyId(null);
    }
  }

  const counts = data?.countsByStatus ?? {};

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
        <h1 className="text-lg font-bold text-primary sm:text-xl">Customer-submitted Reviews</h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Approve reviews to display them on the public website. Google reviews are synced separately on the dashboard.
        </p>

        {/* Tabs */}
        <div className="mt-4 flex flex-wrap gap-2">
          {TABS.map((t) => {
            const active = t.key === tab;
            const count = counts[t.key] ?? 0;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t.label}
                <span
                  className={`inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                    active ? "bg-white/20 text-white" : "bg-white text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center rounded-xl bg-white shadow-sm">
          <div className="h-7 w-7 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : !data || data.reviews.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-xl bg-white text-center text-gray-400 shadow-sm">
          <Inbox className="size-8" />
          <p className="text-sm">No {tab} reviews</p>
          {tab === "pending" && (
            <p className="text-xs text-gray-400">
              When customers submit reviews on the website, they&apos;ll appear here for your approval.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {data.reviews.map((r) => (
            <ReviewItem
              key={r.id}
              review={r}
              busy={busyId === r.id}
              tab={tab}
              onApprove={() => act(r.id, "approve")}
              onReject={() => act(r.id, "reject")}
              onReset={() => act(r.id, "reset")}
              onDelete={() => remove(r.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewItem({
  review,
  busy,
  tab,
  onApprove,
  onReject,
  onReset,
  onDelete,
}: {
  review: Review;
  busy: boolean;
  tab: TabKey;
  onApprove: () => void;
  onReject: () => void;
  onReset: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-primary sm:text-base">{review.authorName}</p>
            <span className="text-xs text-gray-400">·</span>
            <p className="text-xs text-gray-500">{review.authorEmail}</p>
            {review.authorLocation && (
              <>
                <span className="text-xs text-gray-400">·</span>
                <p className="text-xs text-gray-500">{review.authorLocation}</p>
              </>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-yellow-400 text-yellow-400" />
              ))}
              {Array.from({ length: 5 - review.rating }).map((_, i) => (
                <Star key={`e-${i}`} className="size-3.5 text-gray-200" />
              ))}
            </div>
            <span className="text-xs text-gray-400">
              Submitted {new Date(review.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {review.title && (
        <h3 className="mt-2 text-sm font-bold text-primary sm:text-base">{review.title}</h3>
      )}
      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
        {review.text}
      </p>

      {review.submittedFromIp && (
        <p className="mt-2 text-[10px] text-gray-400">From IP: {review.submittedFromIp}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
        {tab === "pending" && (
          <>
            <button
              onClick={onApprove}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <Check className="size-3.5" /> Approve
            </button>
            <button
              onClick={onReject}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <XIcon className="size-3.5" /> Reject
            </button>
          </>
        )}
        {tab === "approved" && (
          <button
            onClick={onReject}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <XIcon className="size-3.5" /> Unpublish
          </button>
        )}
        {tab === "rejected" && (
          <button
            onClick={onReset}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-600 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <RotateCcw className="size-3.5" /> Move back to pending
          </button>
        )}
        <button
          onClick={onDelete}
          disabled={busy}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
        >
          <Trash2 className="size-3.5" /> Delete
        </button>
      </div>
    </article>
  );
}
