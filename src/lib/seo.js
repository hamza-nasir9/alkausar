// Single source of truth for SEO. Update the values marked TODO, then every
// meta tag, the JSON-LD and the sitemap/robots files pick them up automatically.

export const SITE = {
  name: "Al Kausar Bakers Sweets & Nimco",
  shortName: "Al Kausar Bakers",
  // Set NEXT_PUBLIC_SITE_URL in Vercel when you attach a custom domain.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://alkausar-bakery.vercel.app").replace(/\/$/, ""),
  title: "Al Kausar Bakery – Fresh Cakes, Pastries & Sweets in Karachi",
  description:
    "Fresh cakes, pastries, mithai, halwa and nimco from Al Kausar Bakers in Saudabad, Malir, Karachi. Custom cakes, bulk wedding orders and easy WhatsApp ordering.",
  keywords: [
    "Al Kausar Bakers",
    "bakery in Karachi",
    "sweets shop Saudabad",
    "mithai Karachi",
    "custom cakes Karachi",
    "halwa Karachi",
    "nimco",
    "wedding mithai bulk order Karachi",
    "bakery Malir",
    "Sohn Halwa",
    "Gulab Jamun",
    "fresh pastries Karachi",
  ],
  locale: "en_PK",
  ogImage: { path: "/og-image.jpg", width: 1200, height: 630, alt: "Al Kausar Bakers Sweets & Nimco, Saudabad, Karachi" },

  // ---- Local business facts (used for JSON-LD) ----
  phone: "+923182736676",
  phoneDisplay: "+92 318 2736676",
  address: {
    streetAddress: "Saudabad Khokhrapar, Malir",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
    // postalCode: "xxxxx",   // TODO: add your postal code
  },
  // TODO: confirm the real opening time. The site says "open daily till 1:00 AM".
  hours: { opens: "08:00", closes: "01:00" },
  // TODO: confirm. Shown in Google as the price range of the business.
  priceRange: "PKR 40 - 3500",
  // TODO: add your Google Maps pin coordinates for stronger local signals, e.g. { latitude: 24.8xxx, longitude: 67.2xxx }
  geo: null,
  // TODO: add real profile links (Facebook, Instagram, Google Maps listing), e.g. ["https://www.instagram.com/..."]
  sameAs: [],
};

export const absUrl = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

// Next.js replaces (not merges) `openGraph` / `twitter` when a page defines its own,
// so every page builds its complete metadata through this helper.
export function pageMeta({ title, description, path = "/", absoluteTitle = false }) {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.shortName}`;
  const image = { url: SITE.ogImage.path, width: SITE.ogImage.width, height: SITE.ogImage.height, alt: SITE.ogImage.alt };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: SITE.name, locale: SITE.locale, url: path, title: fullTitle, description, images: [image] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}
