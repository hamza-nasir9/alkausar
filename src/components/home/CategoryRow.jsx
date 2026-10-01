"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import ProductCard from "@/components/menu/ProductCard";
import QuickViewModal from "@/components/menu/QuickViewModal";
import { categoryImage } from "@/lib/images";

// Alternating (zigzag) section: a category banner on one side, a fixed 2x2
// card grid on the other. `reverse` flips which side the banner sits on —
// the two sides are equal-width CSS Grid columns either way, so neither
// column shrinks or grows based on its content; only visual order changes.
export default function CategoryRow({ eyebrow, title, categoryId, items, tone = "paper", reverse = false }) {
  const [quick, setQuick] = useState(null);
  const cards = items.slice(0, 4);
  if (!cards.length) return null;

  return (
    <section className={`px-5 py-16 sm:px-10 ${tone === "cream" ? "bg-cream" : "bg-paper"}`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className={`relative min-h-[320px] overflow-hidden rounded-3xl border border-black/10 shadow-sm ${reverse ? "order-2" : "order-1 lg:order-1"}`}>
            <img
              src={categoryImage(categoryId)}
              alt={title}
              loading="lazy"
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-end p-8">
              <p className="text-[11px] uppercase tracking-[0.4em] text-gold">{eyebrow}</p>
              <h2 className="mt-2 font-display text-3xl text-white sm:text-4xl">{title}</h2>
              <Link href={`/menu?category=${categoryId}`} className="btn-gold mt-5 w-fit px-6 py-2.5 text-sm">
                View all
              </Link>
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-4 sm:gap-5 ${reverse ? "order-1" : "order-2"}`}>
            {cards.map((item) => (
              <ProductCard key={item.id} item={item} onQuickView={setQuick} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {quick && <QuickViewModal key={quick.id} item={quick} onClose={() => setQuick(null)} />}
      </AnimatePresence>
    </section>
  );
}
