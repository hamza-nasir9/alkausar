"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/custom-cake", label: "Custom Cake" },
  { href: "/bulk-order", label: "Bulk Order" },
  { href: "/about", label: "Heritage" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? "border border-black/10 bg-white/85 shadow-[0_8px_30px_rgba(43,22,10,0.08)] backdrop-blur-xl" : "border border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2" aria-label="Al Kausar Bakers home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-sheen font-display text-lg font-bold text-ink">K</span>
          <span className="hidden font-display text-lg leading-none text-ink sm:block">
            Al Kausar
            <span className="block text-[10px] uppercase tracking-[0.3em] text-maroon">Bakers &amp; Sweets</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link href={l.href} className={`relative rounded-full px-4 py-2 text-sm tracking-wide transition-colors ${active ? "text-maroon" : "text-ink/70 hover:text-ink"}`}>
                  {active && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full border border-gold/40 bg-gold/10" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                  )}
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={openCart} aria-label={`Open WhatsApp tray, ${count} items`} className="relative grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-ink transition hover:border-gold/60 hover:text-maroon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 7h12l-1 12H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold text-ink">
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={menuOpen} className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white lg:hidden">
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 h-px w-5 bg-ink transition-all ${menuOpen ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-px w-5 bg-ink transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 h-px w-5 bg-ink transition-all ${menuOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="glass mx-auto mt-2 max-w-7xl rounded-3xl p-3 lg:hidden">
            <ul className="flex flex-col">
              {LINKS.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link href={l.href} className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl ${pathname === l.href ? "text-maroon" : "text-ink"}`}>
                    {l.label}
                    <span className="text-gold">→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
