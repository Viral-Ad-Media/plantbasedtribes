import type { Metadata } from "next";
import { Poppins, Bad_Script } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const badScript = Bad_Script({ variable: "--font-bad-script", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description:
    "Easy vegan and plant-based recipes, soups, salads, smoothies and beginner guides to eating more plants.",
  openGraph: { siteName: SITE.name, type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${badScript.variable} font-sans antialiased`}>
        <SiteHeader />
        <main className="min-h-[60vh]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
