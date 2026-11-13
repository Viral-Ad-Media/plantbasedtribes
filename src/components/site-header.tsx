import Image from "next/image";
import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { getSession } from "@/lib/auth";

export async function SiteHeader() {
  const session = await getSession();
  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "admin";
  return (
    <header className="sticky top-0 z-30 border-b border-leaf-100 bg-[#fffdf8]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label={`${SITE.name} home`}>
          <Image src="/brand/leaves.png" alt="" width={48} height={20} priority />
          <span className="text-lg font-bold tracking-tight text-leaf-900">{SITE.name}</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-ink md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-leaf-700">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/search" aria-label="Search" className="rounded-full p-2 hover:bg-leaf-50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          {isAdmin ? (
            <Link href="/admin" className="rounded-full bg-leaf-900 px-4 py-1.5 font-medium text-white">
              Admin
            </Link>
          ) : session ? (
            <Link href="/account" className="rounded-full border border-leaf-200 px-4 py-1.5 font-medium">
              Account
            </Link>
          ) : (
            <Link href="/sign-in" className="rounded-full border border-leaf-200 px-4 py-1.5 font-medium hover:bg-leaf-50">
              Sign in
            </Link>
          )}
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-leaf-100 px-4 py-2 text-sm md:hidden">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="shrink-0 hover:text-leaf-700">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
