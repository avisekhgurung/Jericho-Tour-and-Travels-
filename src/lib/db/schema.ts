import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

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

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
