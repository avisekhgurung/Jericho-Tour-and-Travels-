import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { userReviews } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

// Admin: approve / reject / hide / delete a user-submitted review.
// Body: { action: 'approve' | 'reject' | 'reset', adminNotes?: string }
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) return Response.json({ ok: false, error: "Invalid id" }, { status: 400 });

  let body: { action?: string; adminNotes?: string } = {};
  try {
    body = await req.json();
  } catch {
    /* allow empty body */
  }

  const now = new Date();
  let newStatus: string;
  let approvedAt: Date | null;
  switch (body.action) {
    case "approve":
      newStatus = "approved";
      approvedAt = now;
      break;
    case "reject":
      newStatus = "rejected";
      approvedAt = null;
      break;
    case "reset":
      newStatus = "pending";
      approvedAt = null;
      break;
    default:
      return Response.json({ ok: false, error: "action must be approve|reject|reset" }, { status: 400 });
  }

  const [updated] = await db
    .update(userReviews)
    .set({
      status: newStatus,
      approvedAt,
      adminNotes: body.adminNotes ?? null,
      updatedAt: now,
    })
    .where(eq(userReviews.id, id))
    .returning();

  if (!updated) return Response.json({ ok: false, error: "not found" }, { status: 404 });

  // Bust the homepage + /reviews page ISR cache so the new approved review shows up immediately.
  if (body.action === "approve" || body.action === "reject") {
    revalidatePath("/");
    revalidatePath("/reviews");
  }

  return Response.json({ ok: true, review: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) return Response.json({ ok: false, error: "Invalid id" }, { status: 400 });

  await db.delete(userReviews).where(eq(userReviews.id, id));
  revalidatePath("/");
  revalidatePath("/reviews");
  return Response.json({ ok: true });
}
