/** Usage: npm run make-admin -- you@example.com */
import "dotenv/config";
import { eq } from "drizzle-orm";
import { db, schema } from "../src/db";

async function main() {
  const email = process.argv[2];
  if (!email) throw new Error("Pass the email of an existing account");
  const rows = await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.email, email)).returning();
  if (!rows.length) throw new Error(`No account with email ${email}. Sign up on the site first.`);
  console.log(`${email} is now an admin.`);
  process.exit(0);
}
main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
