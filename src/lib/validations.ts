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

export const userReviewSchema = z.object({
  authorName: z.string().trim().min(2, "Name is required").max(80, "Name too long"),
  authorEmail: z.string().trim().email("Valid email is required"),
  authorLocation: z.string().trim().max(80).optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  title: z.string().trim().max(120).optional().or(z.literal("")),
  text: z
    .string()
    .trim()
    .min(20, "Review must be at least 20 characters")
    .max(2000, "Review too long (max 2000 characters)"),
  // honeypot — bots fill hidden fields. Must be empty for legit submissions.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type UserReviewInput = z.infer<typeof userReviewSchema>;
