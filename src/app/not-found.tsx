import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-script text-3xl text-leaf-700">Oops</p>
      <h1 className="mt-2 text-4xl font-bold text-leaf-900">We couldn&apos;t find that page</h1>
      <p className="mt-4 text-muted">It may have moved. Try searching, or head back to the recipes.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/plant-based-recipe" className="rounded-full bg-leaf-900 px-6 py-3 font-semibold text-white">Recipes</Link>
        <Link href="/search" className="rounded-full border border-leaf-200 px-6 py-3 font-semibold">Search</Link>
      </div>
    </div>
  );
}
