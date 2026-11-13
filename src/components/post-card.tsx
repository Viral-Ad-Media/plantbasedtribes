import Image from "next/image";
import Link from "next/link";

type CardPost = { slug: string; title: string; excerpt: string; image: string | null; imageAlt: string | null };

export function PostCard({ post, priority = false }: { post: CardPost; priority?: boolean }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-leaf-100 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-leaf-50">
        {post.image && (
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            priority={priority}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-leaf-900">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted">{post.excerpt}</p>
      </div>
    </Link>
  );
}

export function PostGrid({ posts }: { posts: CardPost[] }) {
  if (!posts.length) return <p className="text-muted">Nothing here yet.</p>;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <PostCard key={p.slug} post={p} priority={i < 3} />
      ))}
    </div>
  );
}
