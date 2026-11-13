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
      <section className="bg-leaf-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="font-script text-2xl text-leaf-700">Welcome to the tribe</p>
            <h1 className="mt-2 text-4xl font-bold leading-tight text-leaf-900 md:text-5xl">
              Plant-based food that&apos;s easy, colourful and full of flavour.
            </h1>
            <p className="mt-4 max-w-prose text-lg text-muted">
              Weeknight soups, big bright salads, smoothies and treats, plus friendly guides for anyone starting out
              on a plant-based diet.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/plant-based-recipe" className="rounded-full bg-leaf-900 px-6 py-3 font-semibold text-white hover:bg-leaf-700">
                Browse recipes
              </Link>
              <Link
                href="/plant-based-diet-guide-for-beginners"
                className="rounded-full bg-sun-400 px-6 py-3 font-semibold text-leaf-900 hover:brightness-95"
              >
                Beginner&apos;s guide
              </Link>
            </div>
          </div>
          {hero?.image && (
            <Link href={`/${hero.slug}`} className="group relative block aspect-[5/4] overflow-hidden rounded-3xl shadow-lg">
              <Image src={hero.image} alt={hero.imageAlt ?? hero.title} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              <span className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 px-4 py-3 text-sm font-semibold text-leaf-900 backdrop-blur">
                Latest: {hero.title}
              </span>
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-leaf-900">Find your next favourite</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {COLLECTIONS.map((c) => (
            <Link key={c.path} href={`/category/${c.path}`} className="group relative aspect-square overflow-hidden rounded-2xl">
              <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 16vw, 50vw" className="object-cover transition group-hover:scale-105" />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 text-sm font-semibold text-white">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-leaf-900">Fresh from the kitchen</h2>
          <Link href="/blog" className="text-sm font-semibold text-leaf-700 hover:underline">
            See all →
          </Link>
        </div>
        <div className="mt-6">
          <PostGrid posts={latest} />
        </div>
      </section>

      {guides.length > 0 && (
        <section className="mx-auto mt-16 max-w-6xl px-4">
          <div className="rounded-3xl bg-leaf-900 p-8 text-white md:p-12">
            <p className="font-script text-2xl text-sun-400">New to plant-based?</p>
            <h2 className="mt-1 text-3xl font-bold">Start here</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {guides.slice(0, 3).map((g) => (
                <Link key={g.slug} href={`/${g.slug}`} className="rounded-2xl bg-white/10 p-5 hover:bg-white/15">
                  <p className="font-semibold">{g.title}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-leaf-100">{g.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
