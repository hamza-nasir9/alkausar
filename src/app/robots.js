import { SITE } from "@/lib/seo";

// Auto-served at /robots.txt
export default function robots() {
  // Vercel preview deployments must never be indexed; only production is.
  const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";
  if (isPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
