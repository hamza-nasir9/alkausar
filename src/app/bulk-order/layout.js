import { pageMeta } from "@/lib/seo";

// Client-component pages can't export metadata, so it lives in this server layout.
export const metadata = pageMeta({
  title: "Bulk Mithai Orders for Weddings & Events in Karachi",
  description: "Order mithai, halwa and nimco by the kilo for weddings, Eid and events in Karachi. Choose sweets, weight and packaging, then send your inquiry on WhatsApp.",
  path: "/bulk-order",
});

export default function Layout({ children }) {
  return children;
}
