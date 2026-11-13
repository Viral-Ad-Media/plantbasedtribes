import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { db, schema } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    // New sign-ups are readers. Promote an editor with `npm run make-admin`.
    disableSignUp: process.env.DISABLE_SIGNUP === "true",
  },
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "reader", input: false },
    },
  },
  plugins: [nextCookies()],
});

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session || (session.user as { role?: string }).role !== "admin") return null;
  return session;
}
