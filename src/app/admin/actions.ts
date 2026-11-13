"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/auth";

const PostInput = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug may only use lowercase letters, numbers and dashes"),
  excerpt: z.string().trim().max(500),
  content: z.string().max(100_000),
  image: z
    .string()
    .trim()
    .refine((v) => v === "" || v.startsWith("/images/") || v.startsWith("https://"), "Image must be /images/… or https://")
    .transform((v) => v || null),
  imageAlt: z.string().trim().max(200).transform((v) => v || null),
  kind: z.enum(["recipe", "article"]),
  status: z.enum(["draft", "published"]),
  prepMinutes: z.coerce.number().int().min(0).max(10000).nullable(),
  cookMinutes: z.coerce.number().int().min(0).max(10000).nullable(),
  servings: z.string().trim().max(50).transform((v) => v || null),
});

export type FormState = { error?: string } | undefined;

function parse(form: FormData) {
  const num = (k: string) => (form.get(k) ? form.get(k) : null);
  return PostInput.safeParse({
    title: form.get("title"),
    slug: form.get("slug"),
    excerpt: form.get("excerpt") ?? "",
    content: form.get("content") ?? "",
    image: form.get("image") ?? "",
    imageAlt: form.get("imageAlt") ?? "",
    kind: form.get("kind"),
    status: form.get("status"),
    prepMinutes: num("prepMinutes"),
    cookMinutes: num("cookMinutes"),
    servings: form.get("servings") ?? "",
  });
}

export async function savePost(id: number | null, _prev: FormState, form: FormData): Promise<FormState> {
  const session = await requireAdmin();
  if (!session) return { error: "You need to be signed in as an admin." };
  const parsed = parse(form);
  if (!parsed.success) return { error: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") };
  const data = parsed.data;
  const categoryIds = form.getAll("categories").map(Number).filter(Number.isInteger);

  const clash = await db.select({ id: schema.post.id }).from(schema.post).where(eq(schema.post.slug, data.slug)).limit(1);
  if (clash[0] && clash[0].id !== id) return { error: "Another post already uses that slug." };

  let postId = id;
  if (id) {
    await db.update(schema.post).set({ ...data, updatedAt: new Date() }).where(eq(schema.post.id, id));
  } else {
    const [row] = await db
      .insert(schema.post)
      .values({ ...data, authorId: session.user.id })
      .returning({ id: schema.post.id });
    postId = row.id;
  }
  await db.delete(schema.postCategory).where(eq(schema.postCategory.postId, postId!));
  if (categoryIds.length) {
    await db.insert(schema.postCategory).values(categoryIds.map((categoryId) => ({ postId: postId!, categoryId })));
  }
  revalidatePath("/", "layout");
  redirect(`/admin?saved=${encodeURIComponent(data.slug)}`);
}

export async function deletePost(id: number) {
  if (!(await requireAdmin())) return;
  await db.delete(schema.post).where(eq(schema.post.id, id));
  revalidatePath("/", "layout");
  redirect("/admin");
}
