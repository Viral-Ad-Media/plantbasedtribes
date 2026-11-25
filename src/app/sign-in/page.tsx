import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Welcome back", robots: { index: false } };

export default async function Page() {
  if (await getSession()) redirect("/account");
  return (
    <div className="mx-auto max-w-md px-6 pt-12 md:pt-20">
      <h1 className="display text-4xl text-ink md:text-5xl">Welcome back</h1>
      <AuthForm mode="sign-in" />
    </div>
  );
}
