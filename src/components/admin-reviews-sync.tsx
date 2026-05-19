"use client";

import { useEffect, useState } from "react";
import { RefreshCw, Star } from "lucide-react";

type SyncStatus = {
  ok: boolean;
  meta: {
    businessTitle: string | null;
    businessRating: number | null; // already *10
    totalReviews: number | null;
    lastFetchedAt: string | null;
    lastError: string | null;
  } | null;
  counts: {
    totalCached: number;
    visible: number;
    hidden: number;
    withText: number;
  };
};

function formatTimeAgo(iso: string | null) {
  if (!iso) return "never";
  const then = new Date(iso).getTime();
  const ms = Date.now() - then;
  const mins = Math.floor(ms / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} day(s) ago`;
}

export function AdminReviewsSync() {
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  async function loadStatus() {
    const res = await fetch("/api/admin/refresh-reviews");
    if (res.ok) setStatus(await res.json());
  }

  useEffect(() => {
    loadStatus();
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    setFlash(null);
    try {
      const res = await fetch("/api/admin/refresh-reviews", { method: "POST" });
      const data = (await res.json()) as { ok: boolean; fetched?: number; error?: string };
      if (data.ok) {
        setFlash(`Fetched ${data.fetched ?? 0} reviews from Google. Homepage will reflect changes within a few minutes.`);
      } else {
        setFlash(`Refresh failed: ${data.error ?? "unknown error"}`);
      }
      await loadStatus();
    } catch (e) {
      setFlash(`Network error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setRefreshing(false);
    }
  }

  if (!status) {
    return (
      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm text-gray-400">Loading review sync status…</p>
      </div>
    );
  }

  const rating = status.meta?.businessRating != null ? status.meta.businessRating / 10 : null;

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-primary sm:text-base">Google Reviews Sync</h2>
          <p className="mt-0.5 text-[11px] text-gray-500 sm:text-xs">
            Auto-refreshes once a day · last synced{" "}
            <span className="font-medium text-gray-700">{formatTimeAgo(status.meta?.lastFetchedAt ?? null)}</span>
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 sm:text-sm"
        >
          <RefreshCw className={`size-3.5 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing…" : "Refresh now"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-lg bg-gray-50 p-2.5">
          <p className="text-[10px] uppercase tracking-wide text-gray-500">Rating</p>
          <p className="mt-0.5 flex items-center gap-1 text-base font-bold text-primary">
            {rating?.toFixed(1) ?? "—"}
            <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-2.5">
          <p className="text-[10px] uppercase tracking-wide text-gray-500">On Google</p>
          <p className="mt-0.5 text-base font-bold text-primary">{status.meta?.totalReviews ?? "—"}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-2.5">
          <p className="text-[10px] uppercase tracking-wide text-gray-500">Cached</p>
          <p className="mt-0.5 text-base font-bold text-primary">{status.counts.totalCached}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-2.5">
          <p className="text-[10px] uppercase tracking-wide text-gray-500">Showing on site</p>
          <p className="mt-0.5 text-base font-bold text-primary">{status.counts.withText - status.counts.hidden}</p>
        </div>
      </div>

      {status.meta?.lastError && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
          Last sync error: {status.meta.lastError}
        </p>
      )}

      {flash && (
        <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">{flash}</p>
      )}
    </div>
  );
}
