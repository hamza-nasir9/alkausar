"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { MENU } from "@/lib/menuData";
import { OCCASIONS, PACKAGING, MIN_KG, MAX_KG, BULK_GROUPS, MAX_CUSTOM_ROWS, MAX_KG_PER_ITEM } from "@/lib/bulkConfig";
import { formatPKR, formatBulkInquiry, openWhatsApp } from "@/lib/whatsapp";
import { rules, toISODate } from "@/lib/validators";
import Field from "@/components/forms/Field";
import useWhatsAppForm from "@/components/forms/useWhatsAppForm";
import SweetSelector from "@/components/bulk/SweetSelector";

const GROUP_IDS = BULK_GROUPS.map((g) => g.id);
// Every weight-based (kg) item from the mithai, halwa and nimco categories
const SWEET_ITEMS = MENU.filter((m) => m.set === "kg" && GROUP_IDS.includes(m.category));
const REQ_SCHEMA = { name: rules.name, phone: rules.phone, date: rules.futureDate("the date you need the order by", { maxDays: 365 }) };
const newRow = () => ({ id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name: "", kg: "" });
const field = "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 outline-none focus:border-gold/60";

export default function BulkOrderPage() {
  const { addItem, notify } = useCart();
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [selection, setSelection] = useState({});
  const [boxes, setBoxes] = useState(10);
  const [pack, setPack] = useState(PACKAGING[0].id);
  const req = useWhatsAppForm({ name: "", phone: "", date: "" }, REQ_SCHEMA);
  const date = req.values.date;
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);
  const [target, setTarget] = useState("");
  const [rows, setRows] = useState([]); // custom sweets that are not on the list

  // Pre-fill from the home page quick form (/bulk-order?kg=25&occasion=Wedding)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const kg = Number(q.get("kg"));
    const occ = q.get("occasion");
    if (kg > 0) setTarget(String(Math.min(kg, MAX_KG)));
    if (occ && OCCASIONS.includes(occ)) setOccasion(occ);
  }, []);

  const onChangeKg = (id, kg) => setSelection((s) => ({ ...s, [id]: kg }));

  const listedKg = useMemo(() => Object.values(selection).reduce((s, v) => s + v, 0), [selection]);
  const customRows = rows.filter((r) => r.name.trim() && Number(r.kg) > 0);
  const customKg = customRows.reduce((s, r) => s + Number(r.kg), 0);
  const totalKg = listedKg + customKg;
  const sweetsTotal = useMemo(
    () => SWEET_ITEMS.reduce((sum, item) => sum + (selection[item.id] || 0) * item.price * 2, 0),
    [selection]
  );
  const packaging = PACKAGING.find((p) => p.id === pack);
  const packagingTotal = packaging.extra * Math.max(1, Number(boxes) || 0);
  const grandTotal = sweetsTotal + packagingTotal;

  const chosenSweets = SWEET_ITEMS.filter((item) => (selection[item.id] || 0) > 0);
  const targetKg = Number(target) || 0;
  const canSubmit = totalKg >= MIN_KG && totalKg <= MAX_KG && (chosenSweets.length > 0 || customRows.length > 0);

  const updateRow = (id, patch) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const removeRow = (id) => setRows((rs) => rs.filter((r) => r.id !== id));

  // Dedicated WhatsApp inquiry. Needs name, phone and a valid date first.
  const sendInquiry = () => {
    if (!canSubmit) return;
    if (!req.check(document.getElementById("bulk-form"))) return;
    const r = req.values;
    openWhatsApp(
      formatBulkInquiry({
        name: r.name.trim(),
        phone: r.phone.trim(),
        date: r.date,
        occasion,
        targetKg,
        totalKg,
        sweets: chosenSweets.map((i) => `${i.name} - ${selection[i.id]} kg`),
        custom: customRows.map((r2) => `${r2.name.trim()} - ${r2.kg} kg`),
        packaging: packaging.name,
        boxes: Math.max(1, Number(boxes) || 1),
        notes: note,
        total: Math.round(grandTotal),
      })
    );
    notify("Thank you! Opening WhatsApp to send your bulk order inquiry...");
    setSelection({});
    setRows([]);
    setNote("");
    setTarget("");
    setAdded(false);
    req.reset();
  };

  const submit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    addItem({
      id: `custom-bulk-${Date.now()}`,
      name: `Bulk Mithai Order · ${occasion}`,
      price: Math.round(grandTotal),
      weight: `${totalKg} kg total, ${boxes} box(es)`,
      custom: {
        Occasion: occasion,
        "Planned total weight": targetKg ? `${targetKg} kg` : "",
        Sweets: chosenSweets.map((i) => `${i.name} (${selection[i.id]}kg)`),
        "Custom sweets (price on confirmation)": customRows.map((r) => `${r.name.trim()} (${r.kg}kg)`),
        Packaging: packaging.name,
        "Delivery date": date || "Not specified",
        Notes: note,
      },
      qty: 1,
    });
    setAdded(true);
  };

  return (
    <div className="min-h-dvh bg-cream px-5 pb-28 pt-32 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] uppercase tracking-[0.45em] text-maroon">Weddings &amp; Events</p>
        <h1 className="mt-3 font-display text-5xl text-ink sm:text-6xl">Custom Sweets &amp; <span className="gold-text">Bulk Orders.</span></h1>
        <p className="mt-4 max-w-2xl text-ink/60">
          Planning a wedding, Walima or corporate order? Enter the total weight in KG, build a mithai selection, add any custom sweets, choose your packaging and we&apos;ll confirm final pricing and delivery on WhatsApp.
          Looking for a cake instead? Try the{" "}
          <Link href="/custom-cake" className="text-maroon underline underline-offset-4 hover:text-ink">Cake Atelier</Link>.
        </p>

        <form id="bulk-form" onSubmit={submit} noValidate className="mt-10 space-y-8">
          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl text-ink">1. Occasion</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <button key={o} type="button" onClick={() => setOccasion(o)} className={`rounded-full border px-4 py-2 text-sm transition ${occasion === o ? "border-gold bg-gold/10 text-ink" : "border-black/10 text-ink/70 hover:border-gold/50"}`}>
                  {o}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl text-ink">2. Total weight (KG)</h2>
            <p className="mt-1 text-sm text-ink/50">How many kilograms of mithai do you need in total? Then split it across the sweets below.</p>
            <div className="mt-4 flex flex-wrap items-end gap-4">
              <div className="w-full max-w-[200px]">
                <label htmlFor="target" className="mb-2 block text-xs uppercase tracking-widest text-ink/50">Planned weight</label>
                <div className="relative">
                  <input id="target" type="number" inputMode="decimal" min={MIN_KG} max={MAX_KG} step={0.5} value={target} onChange={(e) => setTarget(e.target.value)} placeholder="e.g. 25" className={`${field} pr-12`} />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink/50">kg</span>
                </div>
              </div>
              <p className={`pb-3 text-sm ${targetKg && totalKg > targetKg ? "text-maroon" : "text-ink/60"}`} aria-live="polite">
                {targetKg
                  ? totalKg >= targetKg
                    ? `Selected ${totalKg} kg of ${targetKg} kg. ${totalKg > targetKg ? "That is above your plan." : "Fully allocated."}`
                    : `Selected ${totalKg} kg of ${targetKg} kg. ${Math.round((targetKg - totalKg) * 10) / 10} kg still to allocate.`
                  : `Selected ${totalKg} kg (min ${MIN_KG} kg, max ${MAX_KG} kg per order)`}
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">3. Choose your sweets, by weight</h2>
            <p className="mt-1 text-sm text-ink/50">Use + / − or type any weight in KG (half-kg steps).</p>
            <div className="mt-4">
              <SweetSelector items={SWEET_ITEMS} selection={selection} onChangeKg={onChangeKg} />
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl text-ink">4. Custom sweets (not on the list)</h2>
            <p className="mt-1 text-sm text-ink/50">Want a sweet that isn&apos;t listed? Type its name and the weight in KG. We&apos;ll confirm availability and price on WhatsApp.</p>
            <div className="mt-4 space-y-3">
              {rows.map((r, i) => (
                <div key={r.id} className="grid grid-cols-[1fr_110px_auto] items-center gap-3">
                  <input value={r.name} maxLength={50} onChange={(e) => updateRow(r.id, { name: e.target.value })} placeholder="e.g. Pista Barfi" aria-label={`Custom sweet ${i + 1} name`} className={field} />
                  <div className="relative">
                    <input type="number" inputMode="decimal" min={0} max={MAX_KG_PER_ITEM} step={0.5} value={r.kg} onChange={(e) => updateRow(r.id, { kg: e.target.value })} placeholder="0" aria-label={`Custom sweet ${i + 1} weight in kg`} className={`${field} pr-9`} />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink/50">kg</span>
                  </div>
                  <button type="button" onClick={() => removeRow(r.id)} aria-label={`Remove custom sweet ${i + 1}`} className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-ink/60 transition hover:border-gold/60 hover:text-maroon">✕</button>
                </div>
              ))}
            </div>
            {rows.length < MAX_CUSTOM_ROWS && (
              <button type="button" onClick={() => setRows((rs) => [...rs, newRow()])} className="btn-outline mt-4 px-5 py-2.5 text-sm">+ Add a custom sweet</button>
            )}
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl text-ink">5. Packaging &amp; boxes</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {PACKAGING.map((p) => (
                <button key={p.id} type="button" onClick={() => setPack(p.id)} className={`rounded-2xl border p-4 text-left transition ${pack === p.id ? "border-gold bg-gold/10" : "border-black/10 hover:border-gold/50"}`}>
                  <p className="font-display text-lg text-ink">{p.name}</p>
                  <p className="mt-1 text-xs text-ink/50">{p.note}</p>
                  <p className="mt-2 text-sm text-maroon">{p.extra > 0 ? `+ ${formatPKR(p.extra)} / box` : "Included"}</p>
                </button>
              ))}
            </div>
            <div className="mt-5 max-w-xs">
              <label htmlFor="boxes" className="mb-2 block text-xs uppercase tracking-widest text-ink/50">Number of boxes</label>
              <input id="boxes" type="number" min={1} max={500} value={boxes} onChange={(e) => setBoxes(e.target.value)} className={field} />
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl text-ink">6. Contact, date &amp; notes</h2>
            <p className="mt-1 text-sm text-ink/50">Name, phone and date are required to send an inquiry on WhatsApp.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required error={req.errors.name}>{(p) => <input {...p} {...req.bind("name")} autoComplete="name" placeholder="Your name" />}</Field>
              <Field label="Phone" required error={req.errors.phone}>{(p) => <input {...p} {...req.bind("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="0300 1234567" />}</Field>
              <Field label="Needed by" required error={req.errors.date}>{(p) => <input {...p} {...req.bind("date")} type="date" min={toISODate()} />}</Field>
              <Field label="Special instructions">{(p) => <input {...p} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Names on box, dietary notes, etc." />}</Field>
            </div>
          </section>

          <section className="rounded-3xl border border-gold/40 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm uppercase tracking-widest text-ink/60">Estimated total</p>
                <p className="text-xs text-ink/40">Listed sweets + packaging{customRows.length ? ". Custom sweets are priced on confirmation" : ""}. Confirmed on WhatsApp before we start.</p>
              </div>
              <span className="gold-text font-display text-4xl">{formatPKR(grandTotal)}</span>
            </div>
            <button type="button" onClick={sendInquiry} disabled={!canSubmit} className="btn-gold mt-6 w-full py-4 disabled:cursor-not-allowed disabled:opacity-40">
              Send Bulk Inquiry on WhatsApp
            </button>
            <button type="submit" disabled={!canSubmit} className="btn-outline mt-3 w-full py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-40">
              Or add this order to my tray
            </button>
            {!canSubmit && <p className="mt-2 text-center text-xs text-ink/40">Choose at least {MIN_KG} kg of sweets (listed or custom) to continue.</p>}
            {added && <p className="mt-3 text-center text-sm text-maroon">Added to your tray. Open the tray icon above to send it on WhatsApp.</p>}
          </section>
        </form>
      </div>
    </div>
  );
}
