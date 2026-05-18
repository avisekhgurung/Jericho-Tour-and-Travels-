import { pgTable, serial, text, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";

export type InvoiceItem = {
  description: string;
  quantity: number;
  rate: number; // in paisa (per unit)
  amount: number; // in paisa (quantity * rate)
};

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'tour_package' | 'car_rental'
  status: text("status").notNull().default("pending"), // 'pending' | 'confirmed' | 'rejected'
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  // Tour-specific fields
  destination: text("destination"),
  tourPlan: text("tour_plan"),
  noOfPeople: text("no_of_people"),
  travelDate: text("travel_date"),
  // Car-rental-specific fields
  carFrom: text("car_from"),
  dropLocation: text("drop_location"),
  selectTime: text("select_time"),
  // Common fields
  bookingDate: text("booking_date").notNull(),
  adminNotes: text("admin_notes"),
  invoiceAmount: integer("invoice_amount"), // stored in paisa
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  status: text("status").notNull().default("new"), // 'new' | 'contacted' | 'closed'
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  destination: text("destination").notNull(),
  travelDate: text("travel_date").notNull(),
  message: text("message"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(), // e.g. "MAN-2026-001"
  status: text("status").notNull().default("draft"), // 'draft' | 'paid' | 'cancelled'
  // Customer
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  customerAddress: text("customer_address"),
  // Line items
  items: jsonb("items").$type<InvoiceItem[]>().notNull(),
  // Money — all stored in paisa (integer)
  subtotal: integer("subtotal").notNull(),
  taxPercent: integer("tax_percent").notNull().default(0), // e.g. 18 for 18% GST
  taxAmount: integer("tax_amount").notNull().default(0),
  total: integer("total").notNull(),
  // Meta
  invoiceDate: text("invoice_date").notNull(), // ISO date string
  dueDate: text("due_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Cached Google reviews pulled from SerpAPI on a 6-hour schedule.
export const googleReviews = pgTable("google_reviews", {
  id: serial("id").primaryKey(),
  reviewId: text("review_id").notNull().unique(), // Google's review_id — used for dedup/upsert
  rating: integer("rating").notNull(),
  text: text("text"),
  reviewDate: timestamp("review_date"), // ISO date of the review from Google
  reviewDateLabel: text("review_date_label"), // human label e.g. "7 months ago"
  authorName: text("author_name").notNull(),
  authorThumbnail: text("author_thumbnail"),
  authorLink: text("author_link"),
  authorIsLocalGuide: boolean("author_is_local_guide").notNull().default(false),
  authorReviewCount: integer("author_review_count"),
  position: integer("position"), // position in the SerpAPI response (top-first)
  likes: integer("likes").notNull().default(0),
  hidden: boolean("hidden").notNull().default(false), // admin can hide bad reviews from the site
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Singleton meta row tracking last fetch + business-level stats.
export const googleReviewsMeta = pgTable("google_reviews_meta", {
  id: serial("id").primaryKey(),
  businessTitle: text("business_title"),
  businessRating: integer("business_rating_x10"), // store rating * 10 to keep integer (e.g. 50 = 5.0)
  totalReviews: integer("total_reviews"),
  lastFetchedAt: timestamp("last_fetched_at"),
  lastError: text("last_error"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
