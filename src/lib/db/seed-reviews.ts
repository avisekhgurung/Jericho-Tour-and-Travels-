import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  // Dynamic import AFTER env is loaded.
  const { fetchAndCacheReviews } = await import("../google-reviews");
  const r = await fetchAndCacheReviews();
  console.log(JSON.stringify(r, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
