import Link from "next/link";

const NAV = [
  { href: "/menu", label: "Menu" },
  { href: "/custom-cake", label: "Custom Cake" },
  { href: "/bulk-order", label: "Bulk / Mithai Orders" },
  { href: "/about", label: "Our Heritage" },
  { href: "/contact", label: "Contact" },
];

const CATS = [
  { id: "regular-mithai", label: "Regular Mithai" },
  { id: "special-mithai", label: "Special Mithai & Boxes" },
  { id: "halwajaat", label: "Halwajaat" },
  { id: "nimco", label: "Nimco & Savories" },
  { id: "baked-snacks", label: "Baked Items & Snacks" },
  { id: "biscuits", label: "Biscuits & Cookies" },
  { id: "bread-rusk", label: "Bread & Rusk" },
  { id: "tea-cakes", label: "Tea Cakes & Pastries" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-cream px-5 pb-10 pt-20 sm:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div>
          <p className="gold-text font-display text-3xl">Al Kausar</p>
          <p className="text-[10px] uppercase tracking-[0.35em] text-maroon">
            Bakers · Sweets · Nimco
          </p>
          <p className="mt-5 max-w-xs text-sm text-ink/60">
            A family bakery in Saudabad, crafting mithai, cakes and nimco with
            pure desi ghee.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-maroon">
            Explore
          </p>
          <ul className="space-y-2">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-ink/70 transition hover:text-maroon"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Categories">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-maroon">
            Our Range
          </p>
          <ul className="space-y-2">
            {CATS.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/menu?category=${c.id}`}
                  className="text-ink/70 transition hover:text-maroon"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-maroon">
            Visit &amp; Order
          </p>
          <address className="space-y-2 text-sm not-italic text-ink/70">
            <p>Saudabad Khokhrapar, Malir, Karachi</p>
            <p>Open daily till 1:00 AM</p>
            <a
              href="tel:+923182736676"
              className="block text-ink transition hover:text-maroon"
            >
              +92 318 2736676
            </a>
            <a
              href="https://wa.me/923182736676"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-ink transition hover:text-maroon"
            >
              Order on WhatsApp
            </a>
          </address>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-2 border-t border-black/10 pt-6 text-xs text-ink/40 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Al Kausar Bakers Sweets And Nimco. All
          rights reserved.
        </p>

        <p>
          Produced by{" "}
          <span className="font-semibold text-maroon">HADFORGE</span> |
          Lead: <span className="font-semibold text-maroon">Hamza Nasir</span> &amp;
          Co-Dev:{" "}
          <span className="font-semibold text-maroon">Ayesha Urooj</span>
        </p>
      </div>
    </footer>
  );
}
