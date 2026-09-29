"use client";

import { motion } from "framer-motion";

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div role="tablist" aria-label="Menu categories" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
      {categories.map((c) => {
        const on = active === c.id;
        return (
          <button
            key={c.id}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(c.id)}
            className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm transition-colors ${on ? "border-gold text-ink" : "border-black/10 text-ink/70 hover:text-ink"}`}
          >
            {on && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            <span className="relative">{c.label}</span>
          </button>
        );
      })}
    </div>
  );
}
