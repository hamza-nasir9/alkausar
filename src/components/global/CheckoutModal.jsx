"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Field from "@/components/forms/Field";
import useWhatsAppForm from "@/components/forms/useWhatsAppForm";
import { PAYMENT_METHODS, TIME_SLOTS, CITY, MAX_DAYS_AHEAD } from "@/lib/checkoutConfig";
import { rules, toISODate, addDays } from "@/lib/validators";
import { formatOrderMessage, formatPKR, logOrder, openWhatsApp } from "@/lib/whatsapp";

const NOTE_IDEAS = ["Add custom note on cake", "Less sugar in mithai", "Gift packing please", "Call before delivery"];
const INITIAL = { name: "", phone: "", area: "", house: "", landmark: "", date: "", slot: "", payment: "cod", note: "" };

const SCHEMA = {
  name: rules.name,
  phone: rules.phone,
  area: rules.required("your area (e.g. Saudabad, Malir)", 2),
  house: rules.required("your house / street address", 3),
  date: rules.futureDate("a delivery date", { maxDays: MAX_DAYS_AHEAD }),
  slot: rules.oneOf("a time slot", TIME_SLOTS),
  payment: rules.oneOf("a payment method", PAYMENT_METHODS.map((p) => p.id)),
};

function Section({ n, title, children }) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-1 flex items-center gap-3 font-display text-xl text-ink">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-sm font-bold text-ink">{n}</span>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function CheckoutForm() {
  const { items, total, closeCheckout, clearCart, notify } = useCart();
  const f = useWhatsAppForm(INITIAL, SCHEMA);
  const formRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const { values, errors } = f;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeCheckout();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCheckout]);

  const addIdea = (idea) => {
    const cur = values.note.trim();
    if (cur.toLowerCase().includes(idea.toLowerCase())) return;
    f.set("note", cur ? `${cur}. ${idea}` : idea);
  };

  const submit = (e) => {
    e.preventDefault();
    if (busy || !items.length) return;
    if (!f.check(formRef.current)) return;

    setBusy(true);
    const customer = { ...values, name: values.name.trim(), phone: values.phone.trim(), area: values.area.trim(), house: values.house.trim(), landmark: values.landmark.trim(), note: values.note.trim() };
    const text = formatOrderMessage(items, total, customer);

    // Everything below runs synchronously inside the submit event so the
    // browser treats the new WhatsApp tab as user-initiated (no popup block).
    openWhatsApp(text);
    logOrder(items, { ...customer, address: [customer.house, customer.area, customer.landmark, CITY].filter(Boolean).join(", ") });
    clearCart();
    closeCheckout();
    notify("Thank you! Opening WhatsApp to confirm your order...");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCheckout} className="fixed inset-0 z-[75] grid place-items-end bg-ink/45 p-0 backdrop-blur-sm sm:place-items-center sm:p-4">
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[96dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] border border-gold/30 bg-white shadow-2xl sm:max-h-[92dvh] sm:rounded-[2rem]"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-black/10 bg-gradient-to-r from-white to-[#FBF6E6] px-6 py-5 sm:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-maroon">Secure your order</p>
            <h2 id="checkout-title" className="font-display text-2xl text-ink sm:text-3xl">Checkout</h2>
          </div>
          <button onClick={closeCheckout} aria-label="Close checkout" className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-ink transition hover:border-gold/60 hover:text-maroon">✕</button>
        </div>

        <form ref={formRef} onSubmit={submit} noValidate data-lenis-prevent className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1.3fr_1fr] lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden">
          {/* ---------------- fields */}
          <div className="space-y-8 p-6 sm:p-8 lg:overflow-y-auto" data-lenis-prevent>
            <Section n="1" title="Your details">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required error={errors.name}>{(p) => <input {...p} {...f.bind("name")} autoComplete="name" placeholder="e.g. Ayesha Khan" />}</Field>
                <Field label="Contact phone" required error={errors.phone} hint="We confirm your order on this number.">{(p) => <input {...p} {...f.bind("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="0300 1234567" />}</Field>
              </div>
            </Section>

            <Section n="2" title="Delivery address">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Area" required error={errors.area}>{(p) => <input {...p} {...f.bind("area")} autoComplete="address-level3" placeholder="e.g. Saudabad, Malir" />}</Field>
                <Field label="City"><input readOnly value={CITY} aria-readonly="true" className="w-full cursor-not-allowed rounded-xl border border-black/10 bg-cream px-4 py-3 text-sm text-ink/70" /></Field>
              </div>
              <Field label="House / street" required error={errors.house}>{(p) => <input {...p} {...f.bind("house")} autoComplete="street-address" placeholder="House #, street / gali, block" />}</Field>
              <Field label="Landmark (optional)">{(p) => <input {...p} {...f.bind("landmark")} placeholder="e.g. Near Al Madina Masjid" />}</Field>
            </Section>

            <Section n="3" title="Delivery date & time">
              <Field label="Preferred date" required error={errors.date}>
                {(p) => <input {...p} {...f.bind("date")} type="date" min={toISODate()} max={toISODate(addDays(MAX_DAYS_AHEAD))} />}
              </Field>
              <div>
                <p className="mb-1.5 text-xs uppercase tracking-widest text-ink/55">Time slot <span className="text-maroon" aria-hidden="true">*</span></p>
                <div role="radiogroup" aria-label="Delivery time slot" className="flex flex-wrap gap-2">
                  {TIME_SLOTS.map((s) => {
                    const on = values.slot === s;
                    return (
                      <button key={s} type="button" role="radio" aria-checked={on} onClick={() => f.set("slot", s)} className={`rounded-full border px-4 py-2 text-sm transition ${on ? "border-gold bg-gold text-ink" : "border-black/15 text-ink/75 hover:border-gold/60"}`}>{s}</button>
                    );
                  })}
                </div>
                {errors.slot && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.slot}</p>}
              </div>
            </Section>

            <Section n="4" title="Payment method">
              <div role="radiogroup" aria-label="Payment method" className="grid gap-3 sm:grid-cols-2">
                {PAYMENT_METHODS.map((m) => {
                  const on = values.payment === m.id;
                  return (
                    <button key={m.id} type="button" role="radio" aria-checked={on} onClick={() => f.set("payment", m.id)} className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${on ? "border-gold bg-gold/10" : "border-black/10 hover:border-gold/50"}`}>
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${on ? "border-gold" : "border-black/25"}`}>{on && <span className="h-2.5 w-2.5 rounded-full bg-gold" />}</span>
                      <span>
                        <span className="block font-display text-base text-ink">{m.label}</span>
                        <span className="block text-xs text-ink/50">{m.hint}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Section>

            <Section n="5" title="Special instructions">
              <Field label="Notes (optional)">
                {(p) => <textarea {...p} {...f.bind("note")} rows={3} maxLength={300} placeholder='e.g. "Write Happy Birthday Sara on the cake"' className={`${p.className} resize-none`} />}
              </Field>
              <div className="flex flex-wrap gap-2">
                {NOTE_IDEAS.map((idea) => (
                  <button key={idea} type="button" onClick={() => addIdea(idea)} className="rounded-full border border-black/10 px-3 py-1 text-xs text-ink/70 transition hover:border-gold/60 hover:text-maroon">+ {idea}</button>
                ))}
              </div>
            </Section>
          </div>

          {/* ---------------- summary */}
          <aside className="flex flex-col border-t border-black/10 bg-cream p-6 sm:p-8 lg:border-l lg:border-t-0 lg:overflow-y-auto" data-lenis-prevent>
            <h3 className="font-display text-xl text-ink">Order summary</h3>
            <ul className="mt-4 flex-1 space-y-3">
              {items.map((it) => (
                <li key={it.lineId} className="flex items-start justify-between gap-3 rounded-2xl border border-black/10 bg-white p-4">
                  <div className="min-w-0">
                    <p className="text-sm text-ink"><span className="font-semibold text-maroon">{it.qty}x</span> {it.name}</p>
                    {it.weight && <p className="text-xs text-ink/50">{it.weight}</p>}
                    {it.custom && Object.entries(it.custom).map(([k, v]) => v !== "" && v != null && !(Array.isArray(v) && !v.length) && (
                      <p key={k} className="truncate text-xs text-ink/50">{k}: {Array.isArray(v) ? v.join(", ") : String(v)}</p>
                    ))}
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-ink">{formatPKR(it.price * it.qty)}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-gold/40 pt-5">
              <div className="flex items-end justify-between">
                <span className="text-sm uppercase tracking-widest text-ink/60">Total</span>
                <span className="gold-text font-display text-4xl">{formatPKR(total)}</span>
              </div>
              <p className="mt-2 text-xs text-ink/45">Delivery charges (if any) and final price for custom items are confirmed with you on WhatsApp.</p>
              <button type="submit" disabled={busy} className="btn-gold mt-5 w-full gap-2 py-4 text-base disabled:opacity-60">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.4A9.9 9.9 0 1 0 12.04 2Zm5.8 14c-.25.7-1.45 1.35-2 1.4-.5.05-1.15.25-3.7-.8-3.1-1.3-5.05-4.5-5.2-4.7-.15-.2-1.25-1.65-1.25-3.15s.8-2.25 1.05-2.55c.25-.3.55-.35.75-.35h.55c.2 0 .4 0 .6.45.25.55.8 1.95.85 2.1.1.15.1.3 0 .5l-.3.45c-.15.15-.3.35-.15.6.15.3.65 1.1 1.4 1.75.95.85 1.75 1.1 2.05 1.25.3.15.45.1.65-.1.2-.25.75-.9.95-1.2.2-.3.4-.25.65-.15.25.1 1.65.8 1.95.95.3.15.5.2.55.3.1.1.1.65-.15 1.35Z" /></svg>
                Confirm Order on WhatsApp
              </button>
              {Object.values(errors).some(Boolean) && <p role="alert" className="mt-3 text-center text-xs text-red-600">Please fix the highlighted fields above.</p>}
            </div>
          </aside>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function CheckoutModal() {
  const { checkoutOpen, items } = useCart();
  return <AnimatePresence>{checkoutOpen && items.length > 0 && <CheckoutForm key="checkout" />}</AnimatePresence>;
}
