import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostGrid } from "@/components/post-card";
import { getAllCategories, getCategoryByPath, getPostsInCategory } from "@/lib/content";

type Props = { params: Promise<{ path: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = await getCategoryByPath((await params).path.join("/"));
  return cat ? { title: cat.name, description: cat.description ?? `Plant-based ${cat.name.toLowerCase()} recipes.` } : {};
}

export default async function CategoryPage({ params }: Props) {
  const path = (await params).path.join("/");
  const cat = await getCategoryByPath(path);
  if (!cat) notFound();
  const [posts, all] = await Promise.all([getPostsInCategory(path), getAllCategories()]);
  const children = all.filter((c) => c.parentPath === path);
  const crumbs = path.split("/").slice(0, -1).map((_, i, arr) => arr.slice(0, i + 1).join("/"));

  return (
    <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-20 lg:px-10">
      <nav aria-label="Breadcrumb" className="text-[15px] text-muted">
        <Link href="/plant-based-recipe" className="link-draw">Recipes</Link>
        {crumbs.map((c) => (
          <span key={c}>
            {" / "}
            <Link href={`/category/${c}`} className="link-draw">{all.find((x) => x.path === c)?.name ?? c}</Link>
          </span>
        ))}
      </nav>
      <h1 className="mt-3 display text-[2.5rem] text-ink md:text-6xl">{cat.name}</h1>
      {cat.description && <p className="mt-5 max-w-[38rem] text-lg leading-relaxed text-muted">{cat.description}</p>}
      {children.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {children.map((c) => (
            <Link key={c.id} href={`/category/${c.path}`} className="chip">
              {c.name}
            </Link>
          ))}
        </div>
      )}
      <div className="mt-10 md:mt-14">
        <PostGrid posts={posts} />
      </div>
    </div>
  );
}
