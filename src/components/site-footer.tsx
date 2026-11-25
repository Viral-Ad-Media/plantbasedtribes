import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/category/soups", label: "Soups" },
  { href: "/category/salads", label: "Salads" },
  { href: "/category/noodles-and-sushi", label: "Noodles & sushi" },
  { href: "/category/drinks", label: "Drinks" },
  { href: "/category/desserts-and-snacks", label: "Desserts & snacks" },
  { href: "/category/articles", label: "Guides" },
  { href: "/tips", label: "Tips" },
  { href: "/blog", label: "All posts" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-surface md:mt-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/brand/leaves.png" alt="" width={44} height={18} />
            <span className="font-display text-lg font-semibold tracking-[-0.02em]">{SITE.name}</span>
          </Link>
          <p className="mt-3 max-w-xs text-muted">Eat more plants, feel more alive.</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 md:col-span-4">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="flex min-h-10 items-center text-ink">
              <span className="link-draw">{l.label}</span>
            </Link>
          ))}
        </nav>
        <div className="text-sm leading-relaxed text-muted md:col-span-4">
          <p>
            Recipes are for general inspiration. Talk to a qualified professional before making big changes to your
            diet.
          </p>
          <p className="mt-3">© {new Date().getFullYear()} {SITE.name}</p>
        </div>
      </div>
    </footer>
  );
}
