import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
      <h1 className="display text-[2.5rem] text-ink md:text-6xl">
        We couldn&apos;t find that page. <span className="text-muted">It may have moved.</span>
      </h1>
      <p className="mt-5 text-lg text-muted">Try searching, or head back to the recipes.</p>
      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-7">
        <Link href="/plant-based-recipe" className="btn">Browse recipes</Link>
        <Link href="/search" className="link-arrow">Search the site</Link>
      </div>
    </div>
  );
}
