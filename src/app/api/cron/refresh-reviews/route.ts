import { NextRequest } from "next/server";
import { fetchAndCacheReviews } from "@/lib/google-reviews";

// Vercel Cron hits this endpoint every 6h. Locally, anyone with the CRON_SECRET
// can trigger it via `curl -H "Authorization: Bearer $CRON_SECRET" .../api/cron/refresh-reviews`.
export const dynamic = "force-dynamic";

async function handle(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization") ?? "";
  const isVercelCron = req.headers.get("x-vercel-cron") === "1";
  const provided = auth.replace(/^Bearer\s+/i, "");

  if (!isVercelCron && (!secret || provided !== secret)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const result = await fetchAndCacheReviews();
  const status = result.ok ? 200 : 500;
  return Response.json(result, { status });
}

export const GET = handle;
export const POST = handle;
