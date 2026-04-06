import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  lookingFor: z.enum(["Tour Package", "Car Rental"]),
  // Tour fields
  destination: z.string().optional(),
  tourPlan: z.string().optional(),
  noOfPeople: z.string().optional(),
  travelDate: z.string().optional(),
  // Car rental fields
  carFrom: z.string().optional(),
  dropLocation: z.string().optional(),
  selectTime: z.string().optional(),
  // Common
  bookingDate: z.string().min(1, "Booking date is required"),
});

export const enquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email"),
  destination: z.string().min(1, "Destination is required"),
  travelDate: z.string().min(1, "Travel date is required"),
  message: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});
