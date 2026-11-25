import Image from "next/image";
import Link from "next/link";

type CardPost = { slug: string; title: string; excerpt: string; image: string | null; imageAlt: string | null };

export function PostCard({ post, priority = false }: { post: CardPost; priority?: boolean }) {
  return (
    <Link href={`/${post.slug}`} className="card group flex flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        {post.image && (
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="card-photo object-cover"
            priority={priority}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.015em] text-ink">{post.title}</h3>
        <p className="mt-2 line-clamp-2 leading-relaxed text-muted">{post.excerpt}</p>
      </div>
    </Link>
  );
}

export function PostGrid({ posts }: { posts: CardPost[] }) {
  if (!posts.length) return <p className="text-muted">Nothing here yet.</p>;
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {posts.map((p, i) => (
        <PostCard key={p.slug} post={p} priority={i < 3} />
      ))}
    </div>
  );
}
