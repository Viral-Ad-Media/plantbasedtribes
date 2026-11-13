import type { Metadata } from "next";
import { PostGrid } from "@/components/post-card";
import { getPublishedPosts } from "@/lib/content";

export const metadata: Metadata = { title: "All posts" };

export default async function Blog() {
  const posts = await getPublishedPosts({ limit: 500 });
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold text-leaf-900">All posts</h1>
      <p className="mt-2 text-muted">{posts.length} recipes and guides.</p>
      <div className="mt-10">
        <PostGrid posts={posts} />
      </div>
    </div>
  );
}
