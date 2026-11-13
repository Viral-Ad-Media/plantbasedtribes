"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email"));
    const password = String(f.get("password"));
    const res =
      mode === "sign-in"
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({ email, password, name: String(f.get("name")) });
    setPending(false);
    if (res.error) return setError(res.error.message ?? "Something went wrong");
    router.push("/account");
    router.refresh();
  }

  const input = "w-full rounded-xl border border-leaf-200 px-4 py-3 outline-none focus:ring-2 focus:ring-leaf-400";
  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      {mode === "sign-up" && (
        <label className="block">
          <span className="text-sm font-medium">Name</span>
          <input name="name" required autoComplete="name" className={input} />
        </label>
      )}
      <label className="block">
        <span className="text-sm font-medium">Email</span>
        <input name="email" type="email" required autoComplete="email" className={input} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={10}
          autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
          className={input}
        />
      </label>
      {error && <p className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}
      <button disabled={pending} className="w-full rounded-full bg-leaf-900 py-3 font-semibold text-white disabled:opacity-60">
        {pending ? "Please wait…" : mode === "sign-in" ? "Sign in" : "Create account"}
      </button>
      <p className="text-center text-sm text-muted">
        {mode === "sign-in" ? (
          <>No account yet? <Link href="/sign-up" className="font-semibold text-leaf-700">Sign up</Link></>
        ) : (
          <>Already a member? <Link href="/sign-in" className="font-semibold text-leaf-700">Sign in</Link></>
        )}
      </p>
    </form>
  );
}

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
      }}
      className="rounded-full border border-leaf-200 px-5 py-2 font-medium hover:bg-leaf-50"
    >
      Sign out
    </button>
  );
}
