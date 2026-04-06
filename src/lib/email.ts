import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@jerichotours.com";

type BookingData = {
  id: number;
  type: string;
  name: string;
  email: string;
  phone: string;
  destination?: string | null;
  tourPlan?: string | null;
  noOfPeople?: string | null;
  travelDate?: string | null;
  carFrom?: string | null;
  dropLocation?: string | null;
  selectTime?: string | null;
  bookingDate: string;
  invoiceAmount?: number | null;
};

type EnquiryData = {
  id: number;
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  message?: string | null;
};

export async function sendAdminBookingNotification(booking: BookingData) {
  const details =
    booking.type === "tour_package"
      ? `Destination: ${booking.destination}\nTour Plan: ${booking.tourPlan}\nPeople: ${booking.noOfPeople}\nTravel Date: ${booking.travelDate}`
      : `Pickup: ${booking.carFrom}\nDrop: ${booking.dropLocation}\nTime: ${booking.selectTime}`;

  try {
    await resend.emails.send({
      from: "Jericho Tours <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `New Booking #${booking.id} - ${booking.type === "tour_package" ? "Tour Package" : "Car Rental"} from ${booking.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0b3c5d; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Booking Received!</h2>
          </div>
          <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
            <p><strong>Booking #${booking.id}</strong></p>
            <p><strong>Type:</strong> ${booking.type === "tour_package" ? "Tour Package" : "Car Rental"}</p>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Booking Date:</strong> ${booking.bookingDate}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb;">
            <pre style="background: #f9fafb; padding: 12px; border-radius: 4px; white-space: pre-wrap;">${details}</pre>
            <p style="margin-top: 16px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/bookings/${booking.id}"
                 style="background: #E5A832; color: #0b3c5d; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                View in Dashboard
              </a>
            </p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send admin booking notification:", error);
  }
}

export async function sendAdminEnquiryNotification(enquiry: EnquiryData) {
  try {
    await resend.emails.send({
      from: "Jericho Tours <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `New Enquiry #${enquiry.id} from ${enquiry.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0b3c5d; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Enquiry Received!</h2>
          </div>
          <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
            <p><strong>Name:</strong> ${enquiry.name}</p>
            <p><strong>Phone:</strong> ${enquiry.phone}</p>
            <p><strong>Email:</strong> ${enquiry.email}</p>
            <p><strong>Destination:</strong> ${enquiry.destination}</p>
            <p><strong>Travel Date:</strong> ${enquiry.travelDate}</p>
            ${enquiry.message ? `<p><strong>Message:</strong> ${enquiry.message}</p>` : ""}
            <p style="margin-top: 16px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/enquiries/${enquiry.id}"
                 style="background: #E5A832; color: #0b3c5d; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                View in Dashboard
              </a>
            </p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send admin enquiry notification:", error);
  }
}

export async function sendBookingConfirmation(booking: BookingData) {
  const amountStr = booking.invoiceAmount
    ? `₹${(booking.invoiceAmount / 100).toLocaleString("en-IN")}`
    : "To be discussed";

  const details =
    booking.type === "tour_package"
      ? `
        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Destination</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.destination}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Tour Plan</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.tourPlan}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">No of People</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.noOfPeople}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Travel Date</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.travelDate}</td></tr>
      `
      : `
        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Pickup From</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.carFrom}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Drop Location</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.dropLocation || "N/A"}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Pickup Time</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.selectTime}</td></tr>
      `;

  try {
    await resend.emails.send({
      from: "Jericho Tours <onboarding@resend.dev>",
      to: booking.email,
      subject: `Booking Confirmed! - Jericho Tour & Travels #${booking.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #E5A832, #F4C430); padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #0b3c5d; margin: 0; font-size: 24px;">Jericho Tour & Travels</h1>
            <p style="color: #0b3c5d; margin: 8px 0 0;">Rangbull, Darjeeling</p>
          </div>

          <div style="background: white; padding: 24px; border: 1px solid #e5e7eb;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #16a34a; margin: 0;">Booking Confirmed!</h2>
              <p style="color: #6b7280;">Reference: #JTT-${String(booking.id).padStart(4, "0")}</p>
            </div>

            <p>Dear <strong>${booking.name}</strong>,</p>
            <p>Your ${booking.type === "tour_package" ? "tour package" : "car rental"} booking has been confirmed. Here are your booking details:</p>

            <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
              <tr style="background: #f9fafb;">
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Service</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.type === "tour_package" ? "Tour Package" : "Car Rental"}</td>
              </tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Booking Date</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.bookingDate}</td></tr>
              ${details}
              <tr style="background: #f9fafb;">
                <td style="padding: 8px; font-weight: bold; font-size: 16px;">Amount</td>
                <td style="padding: 8px; font-weight: bold; font-size: 16px; color: #E5A832;">${amountStr}</td>
              </tr>
            </table>
          </div>

          <div style="background: #0b3c5d; color: white; padding: 16px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="margin: 0 0 8px;">For queries, contact us:</p>
            <p style="margin: 0;">Phone: +91 98765 43210 | Email: info@jerichotours.com</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send booking confirmation:", error);
  }
}

export async function sendBookingRejection(booking: BookingData) {
  try {
    await resend.emails.send({
      from: "Jericho Tours <onboarding@resend.dev>",
      to: booking.email,
      subject: `Booking Update - Jericho Tour & Travels #${booking.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #E5A832, #F4C430); padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #0b3c5d; margin: 0; font-size: 24px;">Jericho Tour & Travels</h1>
          </div>
          <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
            <p>Dear <strong>${booking.name}</strong>,</p>
            <p>Unfortunately, we are unable to process your booking #JTT-${String(booking.id).padStart(4, "0")} at this time.</p>
            <p>Please contact us directly and we will be happy to help you find an alternative arrangement.</p>
            <p>Phone: +91 98765 43210<br>WhatsApp: +91 98765 43210</p>
            <p>We apologize for any inconvenience.</p>
            <p>Warm regards,<br><strong>Jericho Tour & Travels</strong></p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send booking rejection:", error);
  }
}
