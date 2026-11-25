import Image from "next/image";
import Link from "next/link";
import { PostGrid } from "@/components/post-card";
import { getPostsInCategory, getPublishedPosts } from "@/lib/content";

const COLLECTIONS = [
  { path: "soups", label: "Soups", image: "/images/2022/06/butternut-squash-soup-recipe.jpg" },
  { path: "salads", label: "Salads", image: "/images/2022/05/quinoa-chickpea-salad-with-roasted-red-pepper-hummus-dressing.jpg" },
  { path: "noodles-and-sushi", label: "Noodles & sushi", image: "/images/2022/05/sesame-soba.jpg" },
  { path: "drinks", label: "Drinks", image: "/images/2022/06/green-berry-smoothie.jpg" },
  { path: "desserts-and-snacks", label: "Desserts", image: "/images/2022/06/summer-fruit-tart.jpg" },
  { path: "method/30-minutes-or-less", label: "30 minutes or less", image: "/images/2022/05/peanut-noodle-kale-bowl.jpg" },
];

export default async function Home() {
  const [latest, guides] = await Promise.all([
    getPublishedPosts({ limit: 9 }),
    getPostsInCategory("articles"),
  ]);
  const hero = latest.find((p) => p.kind === "recipe") ?? latest[0];

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-12 pb-16 md:grid-cols-12 md:gap-12 md:pt-20 md:pb-24 lg:px-10">
        <div className="md:col-span-6">
          <h1 className="display enter text-[2.75rem] text-ink sm:text-6xl lg:text-[4.25rem]">
            Plant-based food that&apos;s easy and colourful.{" "}
            <span className="text-muted">Full of flavour, every night.</span>
          </h1>
          <p className="enter enter-2 mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">
            Weeknight soups, big bright salads, smoothies and treats, plus friendly guides for anyone starting out on
            a plant-based diet.
          </p>
          <div className="enter enter-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
            <Link href="/plant-based-recipe" className="btn w-full sm:w-auto">
              Browse recipes
            </Link>
            <Link href="/plant-based-diet-guide-for-beginners" className="link-arrow justify-center">
              Read the beginner&apos;s guide
            </Link>
          </div>
        </div>
        {hero?.image && (
          <Link
            href={`/${hero.slug}`}
            aria-label={`Latest recipe: ${hero.title}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-surface md:col-span-6 md:aspect-[5/6] lg:aspect-[1/1]"
          >
            <Image
              src={hero.image}
              alt={hero.imageAlt ?? hero.title}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="card-photo object-cover"
            />
          </Link>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-12 md:pt-20 lg:px-10">
        <h2 className="display text-3xl text-ink md:text-[2.75rem]">
          Find your next favourite. <span className="text-muted">Pick a course.</span>
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 md:mt-12 md:grid-cols-3 lg:grid-cols-6">
          {COLLECTIONS.map((c) => (
            <Link key={c.path} href={`/category/${c.path}`} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
                <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 16vw, 50vw" className="card-photo object-cover" />
              </div>
              <p className="mt-3 flex items-center gap-1.5 font-medium text-ink">
                {c.label}
                <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-[3px]">
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-24 md:pt-32 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-3xl text-ink md:text-[2.75rem]">
            Fresh from the kitchen. <span className="text-muted">The latest recipes and guides.</span>
          </h2>
          <Link href="/blog" className="link-arrow">
            See all posts
          </Link>
        </div>
        <div className="mt-8 md:mt-12">
          <PostGrid posts={latest} />
        </div>
      </section>

      {guides.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pt-24 md:pt-32 lg:px-10">
          <div className="rounded-3xl bg-leaf-900 px-6 py-10 text-white md:px-12 md:py-16">
            <h2 className="display text-3xl md:text-[2.75rem]">
              New to plant-based? <span className="text-leaf-200">Start here.</span>
            </h2>
            <div className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-6">
              {guides.slice(0, 3).map((g) => (
                <Link
                  key={g.slug}
                  href={`/${g.slug}`}
                  className="group flex flex-col rounded-2xl border border-white/15 p-6 transition duration-150 hover:-translate-y-0.5 hover:border-white/35"
                >
                  <p className="font-display text-xl font-semibold leading-snug tracking-[-0.015em]">{g.title}</p>
                  <p className="mt-2 line-clamp-2 leading-relaxed text-leaf-100">{g.excerpt}</p>
                  <span className="mt-6 font-semibold text-white" aria-hidden="true">
                    Read the guide{" "}
                    <span className="inline-block transition-transform duration-150 group-hover:translate-x-[3px]">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
