import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Welcome back", robots: { index: false } };

export default async function Page() {
  if (await getSession()) redirect("/account");
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold text-leaf-900">Welcome back</h1>
      <AuthForm mode="sign-in" />
    </div>
  );
}
