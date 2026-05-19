import Image from "next/image";
import { Star } from "lucide-react";
import type { MergedReview } from "@/lib/reviews-merged";

function formatRelative(date: Date | null) {
  if (!date) return null;
  const ms = Date.now() - date.getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  if (days < 1) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function GoogleBadge() {
  return (
    <span className="text-sm font-bold" aria-label="Google review">
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC05" }}>o</span>
      <span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span>
      <span style={{ color: "#EA4335" }}>e</span>
    </span>
  );
}

export function ReviewCard({ review }: { review: MergedReview }) {
  const relLabel = review.dateLabel ?? formatRelative(review.date);
  return (
    <article className="flex flex-col rounded-xl bg-white p-5 shadow-md sm:rounded-2xl sm:p-6">
      <div className="mb-3 flex items-center gap-3">
        {review.authorThumbnail ? (
          <Image
            src={review.authorThumbnail}
            alt={review.authorName}
            width={48}
            height={48}
            className="size-12 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
            {review.authorName.charAt(0)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold" style={{ color: "#0B3C5D" }}>
            {review.authorName}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {review.authorMeta ?? "Customer"}
            {relLabel && <> · {relLabel}</>}
          </p>
        </div>
        {review.source === "google" ? (
          <GoogleBadge />
        ) : (
          <span className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-accent">
            Customer
          </span>
        )}
      </div>

      <div className="mb-2 flex">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
        ))}
        {Array.from({ length: 5 - review.rating }).map((_, i) => (
          <Star key={`empty-${i}`} className="size-4 fill-transparent text-gray-200" />
        ))}
      </div>

      {review.title && (
        <h3 className="mb-1 text-sm font-bold" style={{ color: "#0B3C5D" }}>
          {review.title}
        </h3>
      )}

      {review.text ? (
        <p className="text-sm leading-relaxed text-muted-foreground">
          &ldquo;{review.text}&rdquo;
        </p>
      ) : (
        <p className="rounded-md bg-gray-50 px-3 py-2 text-xs italic text-gray-400">
          Verified {review.rating}-star rating — no written review
        </p>
      )}
    </article>
  );
}
