import { Playfair_Display, Inter } from "next/font/google";
import "@/styles/globals.css";
import { CartProvider } from "@/context/CartContext";
import SmoothScrollProvider from "@/components/global/SmoothScrollProvider";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import WhatsAppCartDrawer from "@/components/global/WhatsAppCartDrawer";
import CheckoutModal from "@/components/global/CheckoutModal";
import Toast from "@/components/global/Toast";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import { SITE } from "@/lib/seo";
import CustomCursor from "@/components/global/CustomCursor";
import NoiseOverlay from "@/components/global/NoiseOverlay";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.shortName,
  title: { default: SITE.title, template: `%s | ${SITE.shortName}` },
  description: SITE.description,
  keywords: SITE.keywords, // Google ignores meta keywords; harmless, and used by some other engines
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "food",
  alternates: { canonical: "/" }, // every other page sets its own canonical via pageMeta()
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: "/",
    title: SITE.title,
    description: SITE.description,
    images: [{ url: SITE.ogImage.path, width: SITE.ogImage.width, height: SITE.ogImage.height, alt: SITE.ogImage.alt }],
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description, images: [SITE.ogImage.path] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  // Paste your Search Console token into NEXT_PUBLIC_GSC_TOKEN (Vercel env) to verify the site.
  ...(process.env.NEXT_PUBLIC_GSC_TOKEN ? { verification: { google: process.env.NEXT_PUBLIC_GSC_TOKEN } } : {}),
};

export const viewport = { themeColor: "#FFFFFF", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh overflow-x-hidden">
        <LocalBusinessJsonLd />
        <CartProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppCartDrawer />
            <CheckoutModal />
            <Toast />
            <CustomCursor />
            <NoiseOverlay />
          </SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  );
}
