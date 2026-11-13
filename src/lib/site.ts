export const SITE = {
  name: "Plant Based Tribes",
  tagline: "Simple, joyful plant-based recipes",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://plantbasedtribes.com",
};

export const NAV = [
  { href: "/plant-based-recipe", label: "Recipes" },
  { href: "/category/soups", label: "Soups" },
  { href: "/category/salads", label: "Salads" },
  { href: "/category/drinks", label: "Drinks" },
  { href: "/category/desserts-and-snacks", label: "Desserts" },
  { href: "/category/articles", label: "Guides" },
  { href: "/about-author", label: "About" },
];
