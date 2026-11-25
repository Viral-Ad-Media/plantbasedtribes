import type { Metadata } from "next";
import { PostGrid } from "@/components/post-card";
import { searchPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default async function Search({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q ?? "").trim().slice(0, 100);
  const results = q ? await searchPosts(q) : [];
  return (
    <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-20 lg:px-10">
      <h1 className="display text-[2.5rem] text-ink md:text-6xl">Search</h1>
      <form className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row" action="/search" role="search">
        <label htmlFor="q" className="sr-only">
          Search recipes and guides
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Try “soup” or “peanut”"
          className="field flex-1 rounded-full px-5"
        />
        <button className="btn">Search recipes</button>
      </form>
      {q && (
        <div className="mt-10 md:mt-14">
          <p className="mb-6 text-lg text-muted">
            {results.length} result{results.length === 1 ? "" : "s"} for “{q}”
          </p>
          <PostGrid posts={results} />
        </div>
      )}
    </div>
  );
}
