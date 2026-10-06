import { pageMeta } from "@/lib/seo";

// Client-component pages can't export metadata, so it lives in this server layout.
export const metadata = pageMeta({
  title: "Custom Cakes in Karachi – Design Your Cake",
  description: "Design a custom cake in Karachi: pick flavour, size, tiers and toppings, then send your request on WhatsApp. Chocolate, red velvet, mango and more.",
  path: "/custom-cake",
});

export default function Layout({ children }) {
  return children;
}
