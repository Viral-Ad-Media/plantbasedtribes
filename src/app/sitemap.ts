import type { MetadataRoute } from "next";
import { getAllCategories, getPublishedPosts } from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, cats] = await Promise.all([getPublishedPosts({ limit: 5000 }), getAllCategories()]);
  const pages = ["", "/plant-based-recipe", "/blog", "/tips", "/about-author"].map((p) => ({ url: `${SITE.url}${p}` }));
  return [
    ...pages,
    ...posts.map((p) => ({
      url: `${SITE.url}/${p.slug}`,
      lastModified: p.updatedAt,
      images: p.image ? [`${SITE.url}${p.image}`] : undefined,
    })),
    ...cats.map((c) => ({ url: `${SITE.url}/category/${c.path}` })),
  ];
}
