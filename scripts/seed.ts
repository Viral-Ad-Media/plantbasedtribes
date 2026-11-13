/**
 * Seeds categories and posts from src/db/seed-data.json (recovered from the
 * old site's Rank Math sitemaps) plus content/posts/<slug>.md.
 * Safe to re-run: posts and categories are upserted by slug/path.
 */
import "dotenv/config";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { sql } from "drizzle-orm";
import { db, schema } from "../src/db";

type SeedPost = { slug: string; title: string; updatedAt: string; image: string | null; category: string };
type SeedCat = { path: string; slug: string; name: string; parent: string | null };
const data = JSON.parse(readFileSync(path.join(__dirname, "../src/db/seed-data.json"), "utf8")) as {
  posts: SeedPost[];
  categories: SeedCat[];
};

const CATEGORY_NAMES: Record<string, string> = {
  "noodles-and-sushi": "Noodles & Sushi",
  "desserts-and-snacks": "Desserts & Snacks",
  "10-ingredients-or-less": "10 Ingredients or Less",
  "30-minutes-or-less": "30 Minutes or Less",
  "gluten-free": "Gluten-Free",
  "kids-friendly": "Kid-Friendly",
  "beginners-guide": "Beginner's Guide",
  recipe: "Recipes",
};

function frontmatter(src: string) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {} as Record<string, string>, body: src };
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, "$1");
  }
  return { meta, body: m[2].trim() + "\n" };
}

function publishedFromImage(image: string | null, idx: number) {
  const m = image?.match(/\/images\/(\d{4})\/(\d{2})\//);
  const d = m ? new Date(Date.UTC(+m[1], +m[2] - 1, 1)) : new Date(Date.UTC(2022, 4, 1));
  d.setUTCDate(1 + (idx % 27));
  d.setUTCHours(9);
  return d;
}

async function main() {
  // Categories (parents first)
  const cats = [...data.categories].sort((a, b) => a.path.split("/").length - b.path.split("/").length);
  for (const c of cats) {
    const name = CATEGORY_NAMES[c.slug] ?? c.name;
    await db
      .insert(schema.category)
      .values({ path: c.path, slug: c.slug, name, parentPath: c.parent })
      .onConflictDoUpdate({ target: schema.category.path, set: { name, parentPath: c.parent } });
  }
  const catRows = await db.select().from(schema.category);
  const catId = new Map(catRows.map((c) => [c.path, c.id]));

  let withContent = 0;
  for (const [idx, p] of data.posts.entries()) {
    const file = path.join(__dirname, "../content/posts", `${p.slug}.md`);
    const { meta, body } = existsSync(file) ? frontmatter(readFileSync(file, "utf8")) : { meta: {} as Record<string, string>, body: "" };
    if (body) withContent++;
    const values = {
      slug: p.slug,
      title: meta.title || p.title,
      excerpt: meta.excerpt || "",
      content: body,
      image: p.image,
      imageAlt: meta.imageAlt || meta.title || p.title,
      kind: meta.kind === "article" ? "article" : "recipe",
      prepMinutes: meta.prep ? Number(meta.prep) : null,
      cookMinutes: meta.cook ? Number(meta.cook) : null,
      servings: meta.servings || null,
      status: body ? "published" : "draft",
      publishedAt: publishedFromImage(p.image, idx),
      updatedAt: new Date(p.updatedAt),
    };
    const [row] = await db
      .insert(schema.post)
      .values(values)
      .onConflictDoUpdate({ target: schema.post.slug, set: { ...values } })
      .returning({ id: schema.post.id });

    const paths = [p.category, ...(meta.categories ? meta.categories.split(",").map((s) => s.trim()) : [])];
    await db.delete(schema.postCategory).where(sql`${schema.postCategory.postId} = ${row.id}`);
    const ids = [...new Set(paths.map((x) => catId.get(x)).filter((x): x is number => !!x))];
    if (ids.length) await db.insert(schema.postCategory).values(ids.map((categoryId) => ({ postId: row.id, categoryId })));
  }
  console.log(`Seeded ${catRows.length} categories and ${data.posts.length} posts (${withContent} with content).`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
