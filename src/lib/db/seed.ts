import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { adminUsers } from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error("DATABASE_URL is required");
    process.exit(1);
  }

  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);

  const email = "avisekhgurung099@gmail.com";
  const password = "jericho@2026";

  const passwordHash = await bcrypt.hash(password, 12);

  await db.insert(adminUsers).values({ email, passwordHash }).onConflictDoNothing();

  console.log(`Admin user seeded: ${email}`);
  console.log(`Password: ${password}`);
  console.log("Please change this password after first login!");
}

seed().catch(console.error);
