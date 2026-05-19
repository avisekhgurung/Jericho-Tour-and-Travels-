import { db } from "@/lib/db";
import { userReviews } from "@/lib/db/schema";
import { userReviewSchema } from "@/lib/validations";
import { recentSubmissionsBy } from "@/lib/reviews-merged";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// Public submission endpoint. Goes to status=pending and waits for admin approval.
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = userReviewSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Validation failed" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Honeypot: if filled, silently accept (so bots think they succeeded) but don't save.
  if (data.website && data.website.length > 0) {
    return Response.json({ ok: true, message: "Thanks for your review!" });
  }

  // Best-effort client IP (Vercel sets x-forwarded-for; fallback to a placeholder).
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0]?.trim() || "unknown";

  // Rate-limit: max 2 submissions per email in 24h, OR 5 from same IP in 24h.
  const [byEmail, byIp] = await Promise.all([
    recentSubmissionsBy({ email: data.authorEmail, hours: 24 }),
    recentSubmissionsBy({ ip, hours: 24 }),
  ]);
  if (byEmail >= 2 || byIp >= 5) {
    return Response.json(
      { ok: false, error: "You've submitted a review recently. Please try again later." },
      { status: 429 }
    );
  }

  await db.insert(userReviews).values({
    status: "pending",
    authorName: data.authorName,
    authorEmail: data.authorEmail.toLowerCase(),
    authorLocation: data.authorLocation || null,
    rating: data.rating,
    title: data.title || null,
    text: data.text,
    submittedFromIp: ip,
  });

  return Response.json({
    ok: true,
    message: "Thank you! Your review has been received and will appear after a quick review by our team.",
  });
}
