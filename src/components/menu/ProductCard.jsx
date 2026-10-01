"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { WEIGHT_SETS, UNIT_LABEL } from "@/lib/menuData";
import { formatPKR } from "@/lib/whatsapp";
import WeightChips from "./WeightChips";
import ProductImage from "./ProductImage";

export default function ProductCard({ item, onQuickView }) {
  const { addItem } = useCart();
  const options = WEIGHT_SETS[item.set];
  const [weight, setWeight] = useState(options[Math.min(1, options.length - 1)]);
  const price = Math.round(item.price * weight.mult);

  return (
    <article className="product-card group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      {onQuickView ? (
        <button onClick={() => onQuickView(item)} aria-label={`Quick view ${item.name}`} className="relative block w-full text-left">
          <ProductImage item={item} className="aspect-[4/3] w-full" />
          {item.tag && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest text-maroon shadow-sm">{item.tag}</span>}
          <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest text-ink/80 opacity-0 shadow-sm transition group-hover:opacity-100">Quick view</span>
        </button>
      ) : (
        <div className="relative">
          <ProductImage item={item} className="aspect-[4/3] w-full" />
          {item.tag && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest text-maroon shadow-sm">{item.tag}</span>}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="line-clamp-1 font-display text-xl text-ink">{item.name}</h3>
          <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm text-ink/60">{item.desc}</p>
        </div>
        <WeightChips options={options} value={weight} onChange={setWeight} />
        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-xl text-maroon">{formatPKR(price)}</p>
            <p className="text-[10px] uppercase tracking-widest text-ink/40">{formatPKR(item.price)} {UNIT_LABEL[item.set]}</p>
          </div>
          <button onClick={() => addItem({ id: item.id, name: item.name, price, weight: weight.label })} className="btn-gold px-4 py-2.5 text-sm">
            Add to Tray
          </button>
        </div>
      </div>
    </article>
  );
}
