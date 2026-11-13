import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostGrid } from "@/components/post-card";
import { SITE, getPostBySlug, getPostCategories, getRelatedPosts, renderMarkdown } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPostBySlug((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/${p.slug}` },
    openGraph: { title: p.title, description: p.excerpt, type: "article", images: p.image ? [p.image] : [] },
  };
}

function minutes(n: number | null) {
  if (!n) return null;
  return n >= 60 ? `${Math.floor(n / 60)} hr ${n % 60 ? `${n % 60} min` : ""}`.trim() : `${n} min`;
}

export default async function PostPage({ params }: Props) {
  const p = await getPostBySlug((await params).slug);
  if (!p) notFound();
  const [cats, related] = await Promise.all([getPostCategories(p.id), getRelatedPosts(p.id)]);
  const html = renderMarkdown(p.content);
  const isRecipe = p.kind === "recipe";

  const jsonLd = isRecipe
    ? {
        "@context": "https://schema.org",
        "@type": "Recipe",
        name: p.title,
        description: p.excerpt,
        image: p.image ? [`${SITE.url}${p.image}`] : undefined,
        prepTime: p.prepMinutes ? `PT${p.prepMinutes}M` : undefined,
        cookTime: p.cookMinutes ? `PT${p.cookMinutes}M` : undefined,
        recipeYield: p.servings ?? undefined,
        recipeCategory: cats[0]?.name,
        suitableForDiet: "https://schema.org/VeganDiet",
        datePublished: p.publishedAt.toISOString(),
      }
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: p.title,
        description: p.excerpt,
        image: p.image ? [`${SITE.url}${p.image}`] : undefined,
        datePublished: p.publishedAt.toISOString(),
        dateModified: p.updatedAt.toISOString(),
      };

  const facts = [
    ["Prep", minutes(p.prepMinutes)],
    ["Cook", minutes(p.cookMinutes)],
    ["Serves", p.servings],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="mx-auto max-w-3xl px-4 pt-10 text-center">
        <div className="flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <Link key={c.id} href={`/category/${c.path}`} className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-leaf-700">
              {c.name}
            </Link>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-leaf-900 md:text-5xl">{p.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">{p.excerpt}</p>
        {facts.length > 0 && (
          <dl className="mx-auto mt-6 flex max-w-md justify-center divide-x divide-leaf-200 rounded-2xl bg-leaf-50 py-3">
            {facts.map(([k, v]) => (
              <div key={k} className="px-5">
                <dt className="text-xs uppercase tracking-wide text-muted">{k}</dt>
                <dd className="font-semibold text-leaf-900">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>
      {p.image && (
        <div className="relative mx-auto mt-8 aspect-[16/10] max-w-4xl overflow-hidden md:rounded-3xl">
          <Image src={p.image} alt={p.imageAlt ?? p.title} fill priority sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
        </div>
      )}
      <div
        className="prose prose-lg prose-recipe prose-headings:font-bold prose-a:text-leaf-700 mx-auto mt-10 max-w-3xl px-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-6xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-leaf-900">You might also like</h2>
          <PostGrid posts={related} />
        </section>
      )}
    </article>
  );
}
