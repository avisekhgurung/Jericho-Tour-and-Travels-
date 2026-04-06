import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

async function check() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT id, email, password_hash FROM admin_users`;
  console.log("Admin users found:", rows.length);

  if (rows.length > 0) {
    console.log("Email:", rows[0].email);
    const match = await bcrypt.compare("jericho@2026", rows[0].password_hash);
    console.log("Password 'jericho@2026' matches:", match);
  } else {
    console.log("No admin users found! Re-seeding...");
    const hash = await bcrypt.hash("jericho@2026", 12);
    await sql`INSERT INTO admin_users (email, password_hash) VALUES ('avisekhgurung099@gmail.com', ${hash})`;
    console.log("Admin user re-seeded.");
  }
}

check().catch(console.error);
