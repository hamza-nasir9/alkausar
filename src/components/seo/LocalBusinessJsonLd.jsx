import { SITE, absUrl } from "@/lib/seo";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Server component: renders <script type="application/ld+json"> into the page HTML.
export default function LocalBusinessJsonLd() {
  const bakery = {
    "@type": "Bakery",
    "@id": absUrl("/#bakery"),
    name: SITE.name,
    alternateName: ["Al Kausar Bakery", SITE.shortName],
    url: absUrl("/"),
    description: SITE.description,
    image: [absUrl(SITE.ogImage.path)],
    logo: absUrl("/icon.svg"),
    telephone: SITE.phone,
    priceRange: SITE.priceRange,
    address: { "@type": "PostalAddress", ...SITE.address },
    areaServed: { "@type": "City", name: "Karachi" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: DAYS, opens: SITE.hours.opens, closes: SITE.hours.closes },
    ],
    servesCuisine: ["Pakistani sweets", "Mithai", "Bakery", "Nimco"],
    hasMenu: absUrl("/menu"),
    currenciesAccepted: "PKR",
    paymentAccepted: "Cash, Bank Transfer, JazzCash, NayaPay",
    ...(SITE.geo ? { geo: { "@type": "GeoCoordinates", ...SITE.geo } } : {}),
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };

  const website = { "@type": "WebSite", "@id": absUrl("/#website"), url: absUrl("/"), name: SITE.name, inLanguage: "en", publisher: { "@id": absUrl("/#bakery") } };

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": [bakery, website] }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
