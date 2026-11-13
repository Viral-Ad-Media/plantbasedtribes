import type { Metadata } from "next";
import Link from "next/link";
import { PostGrid } from "@/components/post-card";
import { getAllCategories, getPublishedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Plant-based recipes",
  description: "Every plant-based recipe on the site: soups, salads, noodles, drinks, desserts and more.",
};

const GROUPS = [
  { title: "By course", paths: ["soups", "salads", "noodles-and-sushi", "mains", "drinks", "desserts-and-snacks"] },
  { title: "By diet", parent: "recipe/diet" },
  { title: "By season", parent: "recipe/season" },
  { title: "By method", parent: "method" },
];

export default async function Recipes() {
  const [posts, cats] = await Promise.all([getPublishedPosts({ limit: 500 }), getAllCategories()]);
  const recipes = posts.filter((p) => p.kind === "recipe");
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold text-leaf-900">Plant-based recipes</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-4">
        {GROUPS.map((g) => {
          const list = g.paths ? cats.filter((c) => g.paths!.includes(c.path)) : cats.filter((c) => c.parentPath === g.parent);
          return (
            <div key={g.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">{g.title}</h2>
              <ul className="mt-2 space-y-1">
                {list.map((c) => (
                  <li key={c.id}>
                    <Link href={`/category/${c.path}`} className="text-leaf-900 hover:underline">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="mt-12">
        <PostGrid posts={recipes} />
      </div>
    </div>
  );
}
