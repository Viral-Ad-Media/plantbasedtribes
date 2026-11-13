import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Why Plant Based Tribes exists, and what you'll find here.",
};

export default function About() {
  return (
    <div className="mx-auto grid max-w-5xl items-start gap-10 px-4 py-14 md:grid-cols-[2fr_3fr]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
        <Image src="/brand/pretty-farmer-43YXKDP-1.jpg" alt="Fresh produce from the garden" fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
      </div>
      <div>
        <p className="font-script text-2xl text-leaf-700">Hello and welcome</p>
        <h1 className="mt-1 text-4xl font-bold text-leaf-900">About Plant Based Tribes</h1>
        <div className="prose prose-lg mt-6 text-ink">
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
        <div className="mt-8 flex gap-3">
          <Link href="/plant-based-recipe" className="rounded-full bg-leaf-900 px-6 py-3 font-semibold text-white">
            Explore recipes
          </Link>
          <Link href="/plant-based-diet-guide-for-beginners" className="rounded-full border border-leaf-200 px-6 py-3 font-semibold">
            Beginner&apos;s guide
          </Link>
        </div>
      </div>
    </div>
  );
}
