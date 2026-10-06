import { pageMeta } from "@/lib/seo";

// Client-component pages can't export metadata, so it lives in this server layout.
export const metadata = pageMeta({
  title: "Contact & Location – Saudabad Khokhrapar, Malir",
  description: "Visit Al Kausar Bakers in Saudabad Khokhrapar, Malir, Karachi. Open daily till 1 AM. Call, message on WhatsApp or get directions on Google Maps.",
  path: "/contact",
});

export default function Layout({ children }) {
  return children;
}
