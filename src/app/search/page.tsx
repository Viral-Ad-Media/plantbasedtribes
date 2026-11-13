import type { Metadata } from "next";
import { PostGrid } from "@/components/post-card";
import { searchPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default async function Search({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q ?? "").trim().slice(0, 100);
  const results = q ? await searchPosts(q) : [];
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold text-leaf-900">Search</h1>
      <form className="mt-6 flex max-w-xl gap-2" action="/search">
        <input
          name="q"
          defaultValue={q}
          placeholder="Try “soup” or “peanut”"
          className="flex-1 rounded-full border border-leaf-200 px-5 py-3 outline-none focus:ring-2 focus:ring-leaf-400"
        />
        <button className="rounded-full bg-leaf-900 px-6 font-semibold text-white">Search</button>
      </form>
      {q && (
        <div className="mt-10">
          <p className="mb-6 text-muted">
            {results.length} result{results.length === 1 ? "" : "s"} for “{q}”
          </p>
          <PostGrid posts={results} />
        </div>
      )}
    </div>
  );
}
