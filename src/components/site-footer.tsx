import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-leaf-900 text-leaf-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{SITE.name}</p>
          <p className="mt-2 font-script text-xl text-sun-400">Eat more plants, feel more alive.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link href="/category/soups">Soups</Link>
          <Link href="/category/salads">Salads</Link>
          <Link href="/category/noodles-and-sushi">Noodles &amp; sushi</Link>
          <Link href="/category/drinks">Drinks</Link>
          <Link href="/category/desserts-and-snacks">Desserts &amp; snacks</Link>
          <Link href="/category/articles">Guides</Link>
          <Link href="/tips">Tips</Link>
          <Link href="/blog">All posts</Link>
        </div>
        <p className="text-sm text-leaf-200">
          Recipes are for general inspiration. Talk to a qualified professional before making big changes to your
          diet.
          <br />© {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
