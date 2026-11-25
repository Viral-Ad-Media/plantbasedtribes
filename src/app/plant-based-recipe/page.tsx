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
    <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-20 lg:px-10">
      <h1 className="display text-[2.5rem] text-ink md:text-6xl">
        Plant-based recipes. <span className="text-muted">Every one of them.</span>
      </h1>
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line py-8 md:mt-14 md:grid-cols-4">
        {GROUPS.map((g) => {
          const list = g.paths ? cats.filter((c) => g.paths!.includes(c.path)) : cats.filter((c) => c.parentPath === g.parent);
          return (
            <div key={g.title}>
              <h2 className="font-sans text-[13px] font-medium text-muted">{g.title}</h2>
              <ul className="mt-2">
                {list.map((c) => (
                  <li key={c.id}>
                    <Link href={`/category/${c.path}`} className="inline-flex min-h-9 items-center text-ink">
                      <span className="link-draw">{c.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="mt-10 md:mt-14">
        <PostGrid posts={recipes} />
      </div>
    </div>
  );
}
