import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth-form";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Your account", robots: { index: false } };

export default async function Account() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  const role = (session.user as { role?: string }).role;
  return (
    <div className="mx-auto max-w-md px-6 pt-12 md:pt-20">
      <h1 className="display text-4xl text-ink md:text-5xl">Hi, {session.user.name}</h1>
      <p className="mt-3 text-lg text-muted">{session.user.email}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {role === "admin" && (
          <Link href="/admin" className="btn">
            Manage posts
          </Link>
        )}
        <SignOutButton />
      </div>
    </div>
  );
}
