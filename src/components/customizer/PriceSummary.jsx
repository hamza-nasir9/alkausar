"use client";

import { formatPKR } from "@/lib/whatsapp";

function Row({ label, value, sub }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 text-sm">
      <div>
        <p className="text-ink/80">{label}</p>
        {sub && <p className="text-xs text-ink/40">{sub}</p>}
      </div>
      <p className="text-ink">{value}</p>
    </div>
  );
}

export default function PriceSummary({ pricing, flavor, size, layer, toppingNames, text, customName, onAdd }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <p className="text-[10px] uppercase tracking-[0.35em] text-maroon">Your Creation</p>
      <div className="mt-3 divide-y divide-black/10">
        {customName?.trim() && <Row label="Your cake name" value={customName.trim()} />}
        <Row label={`${flavor.name} · ${size} lbs`} sub={formatPKR(flavor.perLb) + " / lb"} value={formatPKR(pricing.cake)} />
        {pricing.layerExtra > 0 && <Row label={layer.label} value={"+ " + formatPKR(pricing.layerExtra)} />}
        {pricing.toppings > 0 && <Row label="Toppings" sub={toppingNames.join(", ")} value={"+ " + formatPKR(pricing.toppings)} />}
        {pricing.piping > 0 && <Row label="Custom piping" sub={`"${text.trim()}"`} value={"+ " + formatPKR(pricing.piping)} />}
      </div>
      <div className="mt-4 flex items-end justify-between border-t border-black/10 pt-4">
        <span className="text-sm uppercase tracking-widest text-ink/60">Total</span>
        <span className="gold-text font-display text-4xl">{formatPKR(pricing.total)}</span>
      </div>
      <button onClick={onAdd} className="btn-gold mt-5 w-full py-4">Add Cake to WhatsApp Tray</button>
      <p className="mt-3 text-center text-xs text-ink/40">Final price is confirmed with you on WhatsApp before baking.</p>
    </div>
  );
}
