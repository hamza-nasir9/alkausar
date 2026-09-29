"use client";

import { formatPKR } from "@/lib/whatsapp";
import { BULK_GROUPS, MAX_KG_PER_ITEM } from "@/lib/bulkConfig";

const clamp = (n) => Math.min(MAX_KG_PER_ITEM, Math.max(0, Math.round(n * 2) / 2)); // half-kg steps

// Pick sweets by weight. Each row has +/- half-kg buttons AND a box where the
// customer can type any custom weight in KG (e.g. 25).
export default function SweetSelector({ items, selection, onChangeKg }) {
  return (
    <div className="space-y-6">
      {BULK_GROUPS.map((group) => {
        const rows = items.filter((i) => i.category === group.id);
        if (!rows.length) return null;
        return (
          <div key={group.id}>
            <h3 className="mb-2 font-display text-xl text-maroon">{group.label}</h3>
            <div className="divide-y divide-black/10 rounded-3xl border border-black/10 bg-white">
              {rows.map((item) => {
                const kg = selection[item.id] || 0;
                const pricePerKg = item.price * 2; // item.price is per 500g
                return (
                  <div key={item.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="min-w-0">
                      <p className="font-display text-lg text-ink">{item.name}</p>
                      <p className="text-xs text-ink/50">{formatPKR(pricePerKg)} / kg</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-black/10">
                        <button type="button" onClick={() => onChangeKg(item.id, clamp(kg - 0.5))} aria-label={`Decrease ${item.name} weight`} className="h-9 w-9 text-ink hover:text-maroon">−</button>
                        <input
                          type="number"
                          inputMode="decimal"
                          min={0}
                          max={MAX_KG_PER_ITEM}
                          step={0.5}
                          value={kg > 0 ? kg : ""}
                          placeholder="0"
                          onChange={(e) => onChangeKg(item.id, clamp(Number(e.target.value) || 0))}
                          aria-label={`${item.name} weight in kilograms`}
                          className="w-14 bg-transparent text-center text-sm outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <span className="pr-1 text-xs text-ink/50">kg</span>
                        <button type="button" onClick={() => onChangeKg(item.id, clamp(kg + 0.5))} aria-label={`Increase ${item.name} weight`} className="h-9 w-9 text-ink hover:text-maroon">+</button>
                      </div>
                      <span className="w-24 text-right text-sm font-semibold text-maroon">{kg > 0 ? formatPKR(pricePerKg * kg) : ""}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
