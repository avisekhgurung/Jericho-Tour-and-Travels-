"use client";

import { useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import type { MergedReview } from "@/lib/reviews-merged";
import { ReviewCard } from "./review-card";
import { ReviewCardSkeleton } from "./review-card-skeleton";

const PAGE_SIZE = 10;
const SKELETON_DURATION_MS = 450; // tiny artificial delay so the skeleton is visible — feels intentional, not glitchy

// Reviews payload (date arrives as ISO string from the server component → cast back to Date)
type ReviewWire = Omit<MergedReview, "date"> & { date: string | null };

function hydrate(r: ReviewWire): MergedReview {
  return { ...r, date: r.date ? new Date(r.date) : null };
}

export function ReviewsList({ reviews }: { reviews: ReviewWire[] }) {
  const hydrated = reviews.map(hydrate);
  const [visible, setVisible] = useState(Math.min(PAGE_SIZE, hydrated.length));
  const [, startTransition] = useTransition();
  const [skeletonsToShow, setSkeletonsToShow] = useState(0);

  const remaining = hydrated.length - visible;
  const showMore = () => {
    const next = Math.min(PAGE_SIZE, remaining);
    if (next === 0) return;
    setSkeletonsToShow(next);
    // brief skeleton flash then reveal the real cards
    window.setTimeout(() => {
      startTransition(() => {
        setVisible((v) => v + next);
        setSkeletonsToShow(0);
      });
    }, SKELETON_DURATION_MS);
  };

  if (hydrated.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center text-muted-foreground shadow-sm">
        <p className="text-sm">No reviews yet. Be the first to share your experience using the form on the right!</p>
      </div>
    );
  }

  const shown = hydrated.slice(0, visible);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {shown.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
        {skeletonsToShow > 0 &&
          Array.from({ length: skeletonsToShow }).map((_, i) => <ReviewCardSkeleton key={`skel-${i}`} />)}
      </div>

      {remaining > 0 && skeletonsToShow === 0 && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            onClick={showMore}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
          >
            Show {Math.min(PAGE_SIZE, remaining)} more
            <ChevronDown className="size-4" />
          </button>
          <p className="text-xs text-muted-foreground">
            Showing {visible} of {hydrated.length}
          </p>
        </div>
      )}

      {remaining === 0 && skeletonsToShow === 0 && hydrated.length > PAGE_SIZE && (
        <p className="mt-8 text-center text-xs text-muted-foreground">
          You&apos;ve seen all {hydrated.length} reviews · Thank you for reading!
        </p>
      )}
    </div>
  );
}
