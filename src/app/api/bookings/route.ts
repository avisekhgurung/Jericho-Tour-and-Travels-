import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { bookingSchema } from "@/lib/validations";
import { sendAdminBookingNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const type = data.lookingFor === "Car Rental" ? "car_rental" : "tour_package";

    const [booking] = await db
      .insert(bookings)
      .values({
        type,
        name: data.name,
        email: data.email,
        phone: data.phone,
        destination: data.destination || null,
        tourPlan: data.tourPlan || null,
        noOfPeople: data.noOfPeople || null,
        travelDate: data.travelDate || null,
        carFrom: data.carFrom || null,
        dropLocation: data.dropLocation || null,
        selectTime: data.selectTime || null,
        bookingDate: data.bookingDate,
      })
      .returning();

    // Send admin notification email (non-blocking)
    sendAdminBookingNotification(booking);

    return Response.json({ success: true, bookingId: booking.id }, { status: 201 });
  } catch (error) {
    console.error("Booking creation error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
