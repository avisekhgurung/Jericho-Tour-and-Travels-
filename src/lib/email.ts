import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "jerichotourandtravels@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "Jericho Tours <bookings@jerichotourandtravels.com>";

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
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
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
    if (error) {
      console.error("Admin notification email error:", error);
      return { success: false, error: error.message };
    }
    console.log("Admin notification sent:", data?.id);
    return { success: true };
  } catch (error) {
    console.error("Failed to send admin booking notification:", error);
    return { success: false, error: String(error) };
  }
}

export async function sendAdminEnquiryNotification(enquiry: EnquiryData) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
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
          </div>
        </div>
      `,
    });
    if (error) console.error("Enquiry notification error:", error);
    else console.log("Enquiry notification sent:", data?.id);
  } catch (error) {
    console.error("Failed to send admin enquiry notification:", error);
  }
}

export async function sendBookingConfirmation(booking: BookingData): Promise<{ success: boolean; error?: string }> {
  const amountStr = booking.invoiceAmount
    ? `₹${(booking.invoiceAmount / 100).toLocaleString("en-IN")}`
    : "To be discussed";

  const details =
    booking.type === "tour_package"
      ? `
        <tr><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Destination</td><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${booking.destination}</td></tr>
        <tr><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Tour Plan</td><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${booking.tourPlan}</td></tr>
        <tr><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">No of People</td><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${booking.noOfPeople}</td></tr>
        <tr><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Travel Date</td><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${booking.travelDate}</td></tr>
      `
      : `
        <tr><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Pickup From</td><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${booking.carFrom}</td></tr>
        <tr><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Drop Location</td><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${booking.dropLocation || "N/A"}</td></tr>
        <tr><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Pickup Time</td><td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${booking.selectTime}</td></tr>
      `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: booking.email,
      subject: `Booking Confirmed! - Jericho Tour & Travels #JTT-${String(booking.id).padStart(4, "0")}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #E5A832, #F4C430); padding: 30px 24px; text-align: center;">
            <h1 style="color: #0b3c5d; margin: 0; font-size: 22px; letter-spacing: 0.5px;">JERICHO TOUR & TRAVELS</h1>
            <p style="color: #0b3c5d; margin: 6px 0 0; font-size: 13px; opacity: 0.8;">Darjeeling & Sikkim</p>
          </div>

          <!-- Invoice Header -->
          <div style="background: white; padding: 24px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #E5A832;">
              <div style="display: inline-block; background: #dcfce7; color: #15803d; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;">✓ BOOKING CONFIRMED</div>
              <p style="color: #6b7280; margin: 10px 0 0; font-size: 14px;">Invoice #JTT-${String(booking.id).padStart(4, "0")}</p>
              <p style="color: #9ca3af; margin: 4px 0 0; font-size: 12px;">Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          </div>

          <!-- Customer Info -->
          <div style="background: white; padding: 0 24px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
            <p style="margin: 0 0 4px; font-size: 15px;">Dear <strong>${booking.name}</strong>,</p>
            <p style="margin: 0 0 20px; color: #6b7280; font-size: 14px; line-height: 1.6;">
              Thank you for choosing Jericho Tour & Travels! Your ${booking.type === "tour_package" ? "tour package" : "car rental"} booking has been confirmed. Below are your booking details and invoice.
            </p>
          </div>

          <!-- Booking Details Table -->
          <div style="background: white; padding: 0 24px 24px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px;">
              <tr style="background: #0b3c5d;">
                <td colspan="2" style="padding: 12px; color: white; font-weight: 600; font-size: 14px;">Booking Details</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Service Type</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${booking.type === "tour_package" ? "Tour Package" : "Car Rental"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Booking Date</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${booking.bookingDate}</td>
              </tr>
              ${details}
            </table>
          </div>

          <!-- Invoice Amount -->
          <div style="background: white; padding: 0 24px 24px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
            <div style="background: linear-gradient(135deg, #0b3c5d, #164e78); border-radius: 10px; padding: 20px; text-align: center;">
              <p style="color: #9ca3af; margin: 0 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Total Amount</p>
              <p style="color: #E5A832; margin: 0; font-size: 28px; font-weight: 700;">${amountStr}</p>
            </div>
          </div>

          <!-- Contact Info -->
          <div style="background: white; padding: 0 24px 24px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
            <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 14px;">
              <p style="margin: 0; font-size: 13px; color: #92400e;">
                <strong>Payment & Queries:</strong> Please contact us for payment details or any questions about your booking.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #0b3c5d; color: white; padding: 20px 24px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600;">Jericho Tour & Travels</p>
            <p style="margin: 0 0 2px; font-size: 12px; color: #94a3b8;">Rangbull, Darjeeling, West Bengal</p>
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">Phone: +91 70638 93698 | WhatsApp: +91 70638 93698</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Confirmation email error:", error);
      return { success: false, error: error.message };
    }
    console.log("Confirmation email sent to", booking.email, "id:", data?.id);
    return { success: true };
  } catch (error) {
    console.error("Failed to send booking confirmation:", error);
    return { success: false, error: String(error) };
  }
}

export async function sendBookingRejection(booking: BookingData): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: booking.email,
      subject: `Booking Update - Jericho Tour & Travels #JTT-${String(booking.id).padStart(4, "0")}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E5A832, #F4C430); padding: 30px 24px; text-align: center;">
            <h1 style="color: #0b3c5d; margin: 0; font-size: 22px;">JERICHO TOUR & TRAVELS</h1>
          </div>
          <div style="background: white; padding: 24px; border: 1px solid #e5e7eb;">
            <p>Dear <strong>${booking.name}</strong>,</p>
            <p style="color: #6b7280; line-height: 1.6;">Unfortunately, we are unable to process your booking <strong>#JTT-${String(booking.id).padStart(4, "0")}</strong> at this time.</p>
            <p style="color: #6b7280; line-height: 1.6;">Please contact us directly and we will be happy to help you find an alternative arrangement.</p>
            <div style="background: #f9fafb; border-radius: 8px; padding: 14px; margin: 16px 0;">
              <p style="margin: 0; font-size: 14px;"><strong>Phone:</strong> +91 70638 93698</p>
              <p style="margin: 4px 0 0; font-size: 14px;"><strong>WhatsApp:</strong> +91 70638 93698</p>
            </div>
            <p style="color: #6b7280;">We apologize for any inconvenience.</p>
            <p>Warm regards,<br><strong>Jericho Tour & Travels</strong></p>
          </div>
          <div style="background: #0b3c5d; color: #94a3b8; padding: 16px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px;">
            Rangbull, Darjeeling, West Bengal
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Rejection email error:", error);
      return { success: false, error: error.message };
    }
    console.log("Rejection email sent to", booking.email, "id:", data?.id);
    return { success: true };
  } catch (error) {
    console.error("Failed to send booking rejection:", error);
    return { success: false, error: String(error) };
  }
}
