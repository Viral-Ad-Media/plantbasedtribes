import type { Metadata } from "next";
import { PostGrid } from "@/components/post-card";
import { getPublishedPosts } from "@/lib/content";

export const metadata: Metadata = { title: "All posts" };

export default async function Blog() {
  const posts = await getPublishedPosts({ limit: 500 });
  return (
    <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-20 lg:px-10">
      <h1 className="display text-[2.5rem] text-ink md:text-6xl">All posts</h1>
      <p className="mt-4 text-lg text-muted">{posts.length} recipes and guides.</p>
      <div className="mt-10 md:mt-14">
        <PostGrid posts={posts} />
      </div>
    </div>
  );
}
