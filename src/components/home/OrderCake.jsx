"use client";

import Link from "next/link";
import { CAKE_GROUPS, MENU } from "@/lib/menuData";
import ProductCard from "@/components/menu/ProductCard";

// Dedicated "Order Cake" section with two clearly separated sub-categories:
// Regular Cakes (daily freshness) and Special / Customized Cakes (made to order).
// Used on the home page and as the body of /order-cake.
export default function OrderCake({ asPage = false }) {
  const Heading = asPage ? "h1" : "h2";
  return (
    <section id="section-order-cake" className={`scroll-mt-24 bg-cream px-5 sm:px-10 ${asPage ? "pb-28 pt-32" : "py-20 sm:py-28"}`}>
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.45em] text-maroon">Order Cake</p>
        <Heading className="mt-3 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-6xl">
          Fresh cakes for every day, <span className="gold-text">custom cakes for every occasion.</span>
        </Heading>
        <p className="mt-4 max-w-2xl text-ink/65">
          Pick a ready classic from the counter, or order a premium celebration cake made to your design. Add to your tray and confirm on WhatsApp.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {CAKE_GROUPS.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="btn-outline px-6 py-3 text-sm">{g.label}</a>
          ))}
          <Link href="/custom-cake" className="btn-gold px-6 py-3 text-sm">Design your own cake →</Link>
        </div>

        <div className="mt-14 space-y-16">
          {CAKE_GROUPS.map((g) => {
            const items = MENU.filter((m) => m.category === g.id);
            return (
              <div key={g.id} id={g.id} className="scroll-mt-28">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-gold/40 pb-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-goldDeep">{g.eyebrow}</p>
                    <h3 className="mt-1 font-display text-3xl text-ink sm:text-4xl">{g.label}</h3>
                  </div>
                  <p className="max-w-md text-sm text-ink/60">{g.blurb}</p>
                </div>
                <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
