import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      // Old WordPress endpoints that should never resolve on the new site.
      { source: "/wp-admin/:path*", destination: "/admin", permanent: true },
      { source: "/wp-login.php", destination: "/sign-in", permanent: true },
      { source: "/feed", destination: "/blog", permanent: true },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/post-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/category-sitemap.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default nextConfig;
