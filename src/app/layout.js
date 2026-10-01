import { Playfair_Display, Inter } from "next/font/google";
import "@/styles/globals.css";
import { CartProvider } from "@/context/CartContext";
import SmoothScrollProvider from "@/components/global/SmoothScrollProvider";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import WhatsAppCartDrawer from "@/components/global/WhatsAppCartDrawer";
import CheckoutModal from "@/components/global/CheckoutModal";
import Toast from "@/components/global/Toast";
import CustomCursor from "@/components/global/CustomCursor";
import NoiseOverlay from "@/components/global/NoiseOverlay";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  title: { default: "Al Kausar Bakers Sweets & Nimco | Saudabad, Karachi", template: "%s | Al Kausar Bakers" },
  description: "Luxury mithai, custom cakes, fresh bakery and savory nimco made with pure desi ghee in Saudabad Khokhrapar, Malir, Karachi. Order on WhatsApp.",
  openGraph: { title: "Al Kausar Bakers Sweets & Nimco", description: "Crafting tradition into luxury sweets & bakers.", locale: "en_PK", type: "website" },
};

export const viewport = { themeColor: "#FFFFFF", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh overflow-x-hidden">
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
