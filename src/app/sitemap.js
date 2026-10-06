import { SITE, absUrl } from "@/lib/seo";

// Auto-served at /sitemap.xml. Add a route here when you add a page.
// (Category links like /menu?category=halwajaat are deliberately left out: their
// canonical URL is /menu, so listing them would create duplicates.)
const ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/menu", changeFrequency: "weekly", priority: 0.9 },
  { path: "/custom-cake", changeFrequency: "monthly", priority: 0.8 },
  { path: "/bulk-order", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
];

export default function sitemap() {
  const lastModified = new Date();
  return ROUTES.map((r) => ({ url: absUrl(r.path), lastModified, changeFrequency: r.changeFrequency, priority: r.priority }));
}
