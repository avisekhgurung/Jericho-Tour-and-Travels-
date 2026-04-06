import { neon } from "@neondatabase/serverless";

async function updateEmail() {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`UPDATE admin_users SET email = 'jerichotourandtravels@gmail.com' WHERE email = 'avisekhgurung099@gmail.com'`;
  const rows = await sql`SELECT id, email FROM admin_users`;
  console.log("Updated admin user:", rows);
}

updateEmail().catch(console.error);
