import { pageMeta } from "@/lib/seo";

// Client-component pages can't export metadata, so it lives in this server layout.
export const metadata = pageMeta({
  title: "Menu – Mithai, Halwa, Nimco, Cakes & Bakery Items",
  description: "Browse Gulab Jamun, Sohn Halwa, Kaju Katli, nimco, samosas, biscuits, bread, rusk, tea cakes and pastries from Al Kausar Bakers, Saudabad, Karachi.",
  path: "/menu",
});

export default function Layout({ children }) {
  return children;
}
