import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Order Cake in Karachi – Regular & Custom Cakes",
  description: "Order cakes from Al Kausar Bakers, Karachi: fresh regular cakes (chocolate fudge, red velvet, pineapple, black forest, vanilla) and special customized cakes (wedding tiers, fondant, birthday themes, lava).",
  path: "/order-cake",
});

export default function Layout({ children }) {
  return children;
}
