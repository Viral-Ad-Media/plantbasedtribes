import Image from "next/image";
import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { getSession } from "@/lib/auth";

export async function SiteHeader() {
  const session = await getSession();
  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "admin";
  const account = isAdmin
    ? { href: "/admin", label: "Admin" }
    : session
      ? { href: "/account", label: "Account" }
      : { href: "/sign-in", label: "Sign in" };

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-6 md:h-[72px] lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${SITE.name} home`}>
          <Image src="/brand/leaves.png" alt="" width={44} height={18} priority />
          <span className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">{SITE.name}</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="link-draw py-1 text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1 text-[15px] font-medium">
          <Link
            href="/search"
            aria-label="Search"
            className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          <Link href={account.href} className="link-draw ml-2 py-1 text-ink">
            {account.label}
          </Link>
        </div>
      </div>
      <nav aria-label="Main" className="flex gap-1 overflow-x-auto border-t border-line px-4 text-[15px] font-medium lg:hidden">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="flex min-h-11 shrink-0 items-center px-2 text-ink">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
