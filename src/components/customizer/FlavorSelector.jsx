"use client";

import { FLAVORS } from "@/lib/cakeConfig";
import { formatPKR } from "@/lib/whatsapp";

export default function FlavorSelector({ value, onChange }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Cake flavor">
      {FLAVORS.map((f) => {
        const on = value === f.id;
        return (
          <button
            key={f.id}
            role="radio"
            aria-checked={on}
            onClick={() => onChange(f.id)}
            className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${on ? "border-gold bg-gold/10" : "border-black/10 bg-white hover:border-gold/50"}`}
          >
            <span className="h-12 w-12 shrink-0 rounded-full border border-black/10" style={{ background: `linear-gradient(135deg, ${f.sponge} 55%, ${f.frosting} 55%)` }} />
            <span className="min-w-0">
              <span className="block font-display text-lg text-ink">{f.name}</span>
              <span className="block text-xs text-ink/50">{f.note}</span>
              <span className="mt-1 block text-xs text-maroon">{formatPKR(f.perLb)} / lb</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
