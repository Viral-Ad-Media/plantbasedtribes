import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db, schema } from "@/db";
import { getAllCategories } from "@/lib/content";
import { deletePost } from "../../actions";
import { PostForm } from "../../post-form";

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const [post] = await db.select().from(schema.post).where(eq(schema.post.id, id)).limit(1);
  if (!post) notFound();
  const [categories, links] = await Promise.all([
    getAllCategories(),
    db.select().from(schema.postCategory).where(eq(schema.postCategory.postId, id)),
  ]);
  return (
    <div>
      <PostForm post={post} categories={categories} selected={links.map((l) => l.categoryId)} />
      <form action={deletePost.bind(null, id)} className="mt-10 border-t border-leaf-100 pt-6">
        <button className="text-sm font-medium text-red-700 hover:underline">Delete this post</button>
      </form>
    </div>
  );
}
