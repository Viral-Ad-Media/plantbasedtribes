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
      <header className="mx-auto max-w-4xl px-6 pt-12 text-center md:pt-20">
        <h1 className="display text-[2.5rem] text-ink md:text-6xl">{p.title}</h1>
        <p className="mx-auto mt-5 max-w-[38rem] text-lg leading-relaxed text-muted">{p.excerpt}</p>
        {facts.length > 0 && (
          <dl className="mx-auto mt-8 flex w-fit divide-x divide-line rounded-2xl border border-line bg-white py-3">
            {facts.map(([k, v]) => (
              <div key={k} className="px-6">
                <dt className="text-[13px] font-medium text-muted">{k}</dt>
                <dd className="mt-0.5 font-semibold whitespace-nowrap text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>
      {p.image && (
        <div className="relative mx-auto mt-10 aspect-[16/10] max-w-5xl overflow-hidden bg-surface md:mt-14 md:rounded-3xl">
          <Image src={p.image} alt={p.imageAlt ?? p.title} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>
      )}
      <div
        className="prose prose-lg prose-recipe prose-a:font-semibold mx-auto mt-12 max-w-[40rem] px-6 md:mt-16 md:px-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {cats.length > 0 && (
        <nav aria-label="Filed under" className="mx-auto mt-12 max-w-[40rem] border-t border-line px-6 pt-8 md:px-0">
          <p className="text-[13px] font-medium text-muted">Filed under</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cats.map((c) => (
              <Link key={c.id} href={`/category/${c.path}`} className="chip">
                {c.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pt-24 md:pt-32 lg:px-10">
          <h2 className="display text-3xl text-ink md:text-[2.75rem]">
            You might also like. <span className="text-muted">More from the same shelf.</span>
          </h2>
          <div className="mt-8 md:mt-12">
            <PostGrid posts={related} />
          </div>
        </section>
      )}
    </article>
  );
}
