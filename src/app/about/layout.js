import { pageMeta } from "@/lib/seo";

// Client-component pages can't export metadata, so it lives in this server layout.
export const metadata = pageMeta({
  title: "About Us – Family Bakery in Saudabad, Karachi",
  description: "Al Kausar Bakers Sweets & Nimco is a family bakery in Saudabad Khokhrapar, Malir, making mithai, cakes and nimco with pure desi ghee, fresh every day.",
  path: "/about",
});

export default function Layout({ children }) {
  return children;
}
