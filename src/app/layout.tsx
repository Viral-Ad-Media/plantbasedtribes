import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE } from "@/lib/site";
import "./globals.css";

// Warm, friendly consumer pairing: Bricolage Grotesque for headings, Figtree for text.
const display = Bricolage_Grotesque({ variable: "--font-display-face", subsets: ["latin"], weight: ["600"] });
const text = Figtree({ variable: "--font-text", subsets: ["latin"], weight: ["400", "500", "600"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#faf8f3",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description:
    "Easy vegan and plant-based recipes, soups, salads, smoothies and beginner guides to eating more plants.",
  openGraph: { siteName: SITE.name, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${text.variable} font-sans antialiased`}>
        <SiteHeader />
        <main className="min-h-[60vh]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
