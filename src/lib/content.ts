import "server-only";
import { and, desc, eq, inArray, like, or, sql } from "drizzle-orm";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { db, schema } from "@/db";
export { SITE } from "@/lib/site";

const { post, category, postCategory } = schema;


export function renderMarkdown(md: string) {
  const html = marked.parse(md, { async: false }) as string;
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height", "loading"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}

export async function getPublishedPosts(opts: { limit?: number; offset?: number } = {}) {
  return db
    .select()
    .from(post)
    .where(eq(post.status, "published"))
    .orderBy(desc(post.publishedAt), desc(post.id))
    .limit(opts.limit ?? 100)
    .offset(opts.offset ?? 0);
}

export async function getPostBySlug(slug: string, includeDrafts = false) {
  const rows = await db
    .select()
    .from(post)
    .where(includeDrafts ? eq(post.slug, slug) : and(eq(post.slug, slug), eq(post.status, "published")))
    .limit(1);
  return rows[0] ?? null;
}

export async function getPostCategories(postId: number) {
  return db
    .select({ id: category.id, name: category.name, path: category.path })
    .from(postCategory)
    .innerJoin(category, eq(postCategory.categoryId, category.id))
    .where(eq(postCategory.postId, postId));
}

export async function getAllCategories() {
  return db.select().from(category).orderBy(category.path);
}

export async function getCategoryByPath(path: string) {
  const rows = await db.select().from(category).where(eq(category.path, path)).limit(1);
  return rows[0] ?? null;
}

/** Posts in a category or any of its sub-categories. */
export async function getPostsInCategory(path: string) {
  const cats = await db
    .select({ id: category.id })
    .from(category)
    .where(or(eq(category.path, path), like(category.path, `${path}/%`)));
  if (!cats.length) return [];
  const ids = cats.map((c) => c.id);
  return db
    .selectDistinct({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      imageAlt: post.imageAlt,
      publishedAt: post.publishedAt,
    })
    .from(post)
    .innerJoin(postCategory, eq(postCategory.postId, post.id))
    .where(and(eq(post.status, "published"), inArray(postCategory.categoryId, ids)))
    .orderBy(desc(post.publishedAt));
}

export async function getRelatedPosts(postId: number, limit = 3) {
  return db
    .selectDistinct({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      imageAlt: post.imageAlt,
      publishedAt: post.publishedAt,
    })
    .from(post)
    .innerJoin(postCategory, eq(postCategory.postId, post.id))
    .where(
      and(
        eq(post.status, "published"),
        sql`${post.id} <> ${postId}`,
        inArray(
          postCategory.categoryId,
          db.select({ id: postCategory.categoryId }).from(postCategory).where(eq(postCategory.postId, postId)),
        ),
      ),
    )
    .orderBy(desc(post.publishedAt))
    .limit(limit);
}

export async function searchPosts(q: string) {
  const term = `%${q.replace(/[%_]/g, "")}%`;
  return db
    .select()
    .from(post)
    .where(and(eq(post.status, "published"), or(sql`${post.title} ilike ${term}`, sql`${post.excerpt} ilike ${term}`)))
    .orderBy(desc(post.publishedAt))
    .limit(50);
}
