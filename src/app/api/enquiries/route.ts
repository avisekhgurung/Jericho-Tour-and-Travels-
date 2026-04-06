import { db } from "@/lib/db";
import { enquiries } from "@/lib/db/schema";
import { enquirySchema } from "@/lib/validations";
import { sendAdminEnquiryNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const [enquiry] = await db
      .insert(enquiries)
      .values({
        name: data.name,
        phone: data.phone,
        email: data.email,
        destination: data.destination,
        travelDate: data.travelDate,
        message: data.message || null,
      })
      .returning();

    sendAdminEnquiryNotification(enquiry);

    return Response.json({ success: true, enquiryId: enquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Enquiry creation error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
