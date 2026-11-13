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
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold text-leaf-900">Hi, {session.user.name}</h1>
      <p className="mt-2 text-muted">{session.user.email}</p>
      <div className="mt-8 flex gap-3">
        {role === "admin" && (
          <Link href="/admin" className="rounded-full bg-leaf-900 px-5 py-2 font-medium text-white">
            Manage posts
          </Link>
        )}
        <SignOutButton />
      </div>
    </div>
  );
}
