import type { Metadata } from "next";
import { Star } from "lucide-react";
import { getMergedReviews } from "@/lib/reviews-merged";
import { ReviewsList } from "@/components/reviews-list";
import { ReviewSubmissionForm } from "@/components/review-submission-form";

// ISR — page is regenerated at most every 30 minutes. Admin actions also revalidate this path explicitly.
export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Reviews | Jericho Tour & Travels",
  description:
    "Read what travellers say about Jericho Tour & Travels — verified Google reviews plus first-hand customer experiences.",
};

export default async function ReviewsPage() {
  const { reviews, stats } = await getMergedReviews(null);

  const visibleCount = reviews.length;
  const headlineRating =
    stats.combinedAvg != null ? stats.combinedAvg : stats.googleRating ?? 5;

  // Wire the Date objects across the server/client boundary as ISO strings.
  const wireReviews = reviews.map((r) => ({
    ...r,
    date: r.date ? r.date.toISOString() : null,
  }));

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary/80 px-3 py-12 text-white sm:px-4 sm:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-bold sm:text-5xl">What Our Travellers Say</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80 sm:mt-4 sm:text-base">
            Real, verified experiences from our customers — synced from Google and shared directly on our site.
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-sm sm:gap-4 sm:px-6 sm:py-4">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold sm:text-3xl">{headlineRating.toFixed(1)}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-yellow-400 text-yellow-400 sm:size-5" />
                ))}
              </div>
            </div>
            <span className="hidden text-white/40 sm:inline">|</span>
            <span className="text-sm text-white/90 sm:text-base">
              <strong>{visibleCount}</strong> review{visibleCount === 1 ? "" : "s"}
            </span>
            {stats.googleTotal != null && stats.googleTotal > stats.googleShown && (
              <>
                <span className="hidden text-white/40 sm:inline">|</span>
                <span className="text-xs text-white/70 sm:text-sm">
                  From {stats.googleTotal} ratings on Google
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Body: grid + submission form side-by-side on desktop */}
      <section className="bg-muted px-3 py-10 sm:px-4 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_22rem]">
          {/* Reviews list with Show More pagination */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary sm:text-xl">
                {visibleCount} review{visibleCount === 1 ? "" : "s"}
              </h2>
              <a
                href="#share-your-review"
                className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline lg:hidden"
              >
                Share yours →
              </a>
            </div>

            <ReviewsList reviews={wireReviews} />
          </div>

          {/* Sidebar with submission form */}
          <aside id="share-your-review" className="scroll-mt-24">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="text-lg font-bold text-primary sm:text-xl">Share your experience</h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Travelled with us? We&apos;d love to hear about it. Your review helps other travellers.
              </p>
              <div className="mt-5">
                <ReviewSubmissionForm />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
