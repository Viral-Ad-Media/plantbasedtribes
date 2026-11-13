import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plant-based kitchen tips",
  description: "Practical tips for cooking plant-based food that tastes great.",
};

const TIPS = [
  ["Build flavour in layers", "Start with onion and garlic, add spices to the hot oil, and finish with something sharp like lemon juice or vinegar right before serving."],
  ["Keep a stocked pantry", "Tinned beans, lentils, coconut milk, chopped tomatoes, pasta, rice and good stock cubes mean dinner is never far away."],
  ["Learn to love umami", "Soy sauce, miso, nutritional yeast, mushrooms and tomato paste add the savoury depth people sometimes miss when they stop eating meat."],
  ["Press your tofu", "Wrap firm tofu in a clean towel under something heavy for 15 minutes. It soaks up marinade better and crisps up beautifully."],
  ["Batch-cook soups and grains", "Most soups freeze well for up to three months. Cooked grains keep for four days in the fridge and turn into fast lunches."],
  ["Get your protein from variety", "Beans, lentils, tofu, tempeh, edamame, nuts, seeds and whole grains all count. Mix them across the day."],
  ["Remember vitamin B12", "B12 isn't reliably found in plant foods, so most people on a fully plant-based diet use a supplement or fortified foods. Check with your doctor."],
  ["Roast your vegetables hot", "A 220°C (425°F) oven and a single layer on the tray gives caramelised edges instead of soggy veg."],
];

export default function Tips() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-4xl font-bold text-leaf-900">Plant-based kitchen tips</h1>
      <p className="mt-3 text-lg text-muted">Small habits that make plant-based cooking easier and tastier.</p>
      <ol className="mt-10 grid gap-5 md:grid-cols-2">
        {TIPS.map(([t, d], i) => (
          <li key={t} className="rounded-2xl bg-leaf-50 p-6">
            <span className="text-sm font-bold text-leaf-500">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="mt-1 text-lg font-semibold text-leaf-900">{t}</h2>
            <p className="mt-2 text-muted">{d}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10">
        New to all this? Read the <Link href="/plant-based-diet-guide-for-beginners" className="font-semibold text-leaf-700 underline">beginner&apos;s guide</Link>.
      </p>
    </div>
  );
}
