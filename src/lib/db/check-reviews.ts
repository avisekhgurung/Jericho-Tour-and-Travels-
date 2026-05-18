import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { getCachedReviews } = await import("../google-reviews");
  const bundle = await getCachedReviews(20);
  console.log("META:", bundle.meta);
  console.log(`REVIEWS (${bundle.reviews.length}):`);
  for (const r of bundle.reviews) {
    console.log(
      `  ⭐${r.rating} ${r.authorName} (${r.authorReviewCount ?? "?"} reviews, LG=${r.authorIsLocalGuide}) — ${r.text?.slice(0, 60) ?? "<no text>"}...`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
