"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { CATEGORIES, MENU } from "@/lib/menuData";
import { formatPKR } from "@/lib/whatsapp";
import CategoryFilter from "@/components/menu/CategoryFilter";
import SearchBar from "@/components/menu/SearchBar";
import ProductCard from "@/components/menu/ProductCard";
import ProductSkeleton from "@/components/menu/ProductSkeleton";
import QuickViewModal from "@/components/menu/QuickViewModal";

const API = process.env.NEXT_PUBLIC_API_URL;
const PRICE_MAX = 4000;

export default function MenuPage() {
  const [products, setProducts] = useState(MENU);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [quick, setQuick] = useState(null);
  const grid = useRef(null);

  // Deep-link support: /menu?category=halwajaat
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("category");
    if (c && CATEGORIES.some((x) => x.id === c)) setCategory(c);
  }, []);

  // Try the API first, silently fall back to local data
  useEffect(() => {
    let alive = true;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 2500);
    const load = API
      ? fetch(`${API}/menu`, { signal: ctrl.signal })
          .then((r) => (r.ok ? r.json() : Promise.reject()))
          .then((json) => alive && Array.isArray(json.data) && json.data.length && setProducts(json.data))
          .catch(() => {})
      : Promise.resolve();
    load.finally(() => {
      clearTimeout(timer);
      setTimeout(() => alive && setLoading(false), 450);
    });
    return () => {
      alive = false;
      clearTimeout(timer);
      ctrl.abort();
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        p.price <= maxPrice &&
        (!q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
    );
  }, [products, category, query, maxPrice]);

  // Keep results grouped under their category heading, in menu order
  const groups = useMemo(
    () => CATEGORIES.filter((c) => c.id !== "all").map((c) => ({ ...c, items: filtered.filter((p) => p.category === c.id) })).filter((g) => g.items.length),
    [filtered]
  );

  const listKey = filtered.map((p) => p.id).join(",");
  useEffect(() => {
    if (loading || !grid.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".product-card", { opacity: 0, y: 36, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out", stagger: 0.05, clearProps: "transform,opacity" });
    }, grid);
    return () => ctx.revert();
  }, [loading, listKey]);

  const reset = () => {
    setCategory("all");
    setQuery("");
    setMaxPrice(PRICE_MAX);
  };

  return (
    <div className="min-h-dvh bg-paper px-5 pb-28 pt-32 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.45em] text-maroon">The Menu</p>
        <h1 className="mt-3 font-display text-5xl text-ink sm:text-7xl">
          Everything, <span className="gold-text">baked &amp; made fresh.</span>
        </h1>

        <div className="mt-10 space-y-5">
          <CategoryFilter categories={CATEGORIES} active={category} onChange={setCategory} />
          <div className="grid items-center gap-4 md:grid-cols-[1fr_320px]">
            <SearchBar value={query} onChange={setQuery} />
            <label className="glass flex flex-col gap-1 rounded-2xl px-5 py-3">
              <span className="flex justify-between text-xs text-ink/60">
                <span>Starting price up to</span>
                <span className="text-goldDeep">{maxPrice >= PRICE_MAX ? "Any" : formatPKR(maxPrice)}</span>
              </span>
              <input type="range" min={100} max={PRICE_MAX} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} aria-label="Maximum price" className="w-full accent-[#D4AF37]" />
            </label>
          </div>
        </div>

        <div ref={grid} className="mt-10">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="grid place-items-center rounded-3xl border border-dashed border-black/15 py-24 text-center">
              <p className="font-display text-3xl text-ink">Nothing matches that</p>
              <p className="mt-2 text-sm text-ink/60">Try another word or widen the price range.</p>
              <button onClick={reset} className="btn-gold mt-6 px-6 py-3 text-sm">Reset filters</button>
            </div>
          ) : (
            <>
              <p className="mb-5 text-sm text-ink/50" aria-live="polite">{filtered.length} {filtered.length === 1 ? "item" : "items"}</p>
              <div className="space-y-16">
                {groups.map((g) => (
                  <section key={g.id} id={`menu-${g.id}`} aria-labelledby={`h-${g.id}`} className="scroll-mt-28">
                    <div className="mb-6 flex items-end justify-between gap-4 border-b border-gold/40 pb-3">
                      <h2 id={`h-${g.id}`} className="font-display text-3xl text-ink sm:text-4xl">{g.label}</h2>
                      <span className="text-xs uppercase tracking-widest text-ink/40">{g.items.length} {g.items.length === 1 ? "item" : "items"}</span>
                    </div>
                    <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {g.items.map((item) => <ProductCard key={item.id} item={item} onQuickView={setQuick} />)}
                    </div>
                  </section>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <AnimatePresence>{quick && <QuickViewModal key={quick.id} item={quick} onClose={() => setQuick(null)} />}</AnimatePresence>
    </div>
  );
}
