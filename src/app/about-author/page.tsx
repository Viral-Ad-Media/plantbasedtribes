import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Why Plant Based Tribes exists, and what you'll find here.",
};

export default function About() {
  return (
    <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 pt-12 md:grid-cols-12 md:gap-12 md:pt-20 lg:px-10">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface md:col-span-5">
        <Image src="/brand/pretty-farmer-43YXKDP-1.jpg" alt="Fresh produce from the garden" fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
      </div>
      <div className="md:col-span-7">
        <h1 className="display text-[2.5rem] text-ink md:text-6xl">
          About Plant Based Tribes. <span className="text-muted">Hello and welcome.</span>
        </h1>
        <div className="prose prose-lg prose-recipe mt-8 max-w-[38rem]">
          <p>
            Plant Based Tribes started with a simple idea: eating more plants should feel exciting, not restrictive.
            Every recipe here is fully plant-based, made from ingredients you can find in an ordinary supermarket, and
            tested to work on a busy weeknight.
          </p>
          <p>
            You&apos;ll find cosy soups, big crunchy salads, noodle bowls, smoothies and a few treats, plus guides for
            anyone taking their first steps into a plant-based diet. Whether you&apos;re fully vegan or just trying a
            meat-free Monday, you&apos;re part of the tribe.
          </p>
          <p>
            Got a question or a recipe request? Sign up for an account and keep an eye out for new recipes every
            month.
          </p>
        </div>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
          <Link href="/plant-based-recipe" className="btn">
            Explore recipes
          </Link>
          <Link href="/plant-based-diet-guide-for-beginners" className="link-arrow justify-center">
            Read the beginner&apos;s guide
          </Link>
        </div>
      </div>
    </div>
  );
}
