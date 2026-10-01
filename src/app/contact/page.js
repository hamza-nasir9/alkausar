"use client";

import { useState } from "react";
import Field from "@/components/forms/Field";
import useWhatsAppForm from "@/components/forms/useWhatsAppForm";
import { useCart } from "@/context/CartContext";
import { rules } from "@/lib/validators";
import { formatContactMessage, openWhatsApp } from "@/lib/whatsapp";

const MAP_SRC = "https://maps.google.com/maps?q=" + encodeURIComponent("W634+H9 Karachi") + "&z=17&output=embed";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("W634+H9 Karachi");

const SUBJECTS = ["General Query", "Order Status", "Custom Cake", "Bulk / Event Order", "Feedback or Complaint", "Other"];
const INITIAL = { name: "", phone: "", subject: SUBJECTS[0], message: "" };
const SCHEMA = {
  name: rules.name,
  phone: rules.phone,
  subject: rules.oneOf("a subject", SUBJECTS),
  message: (v) => (String(v).trim().length < 10 ? "Please write at least a short message (10+ characters)." : ""),
};

export default function ContactPage() {
  const { notify } = useCart();
  const f = useWhatsAppForm(INITIAL, SCHEMA);
  const [sent, setSent] = useState(false);
  const { errors } = f;

  // Validates first; only a valid form opens WhatsApp.
  const submit = (e) => {
    e.preventDefault();
    if (!f.check(e.currentTarget)) return;
    const v = f.values;
    openWhatsApp(formatContactMessage({ name: v.name.trim(), phone: v.phone.trim(), subject: v.subject, message: v.message }));
    notify("Thank you! Opening WhatsApp to send your message...");
    f.reset();
    setSent(true);
  };

  return (
    <div className="min-h-dvh bg-paper px-5 pb-28 pt-32 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.45em] text-maroon">Visit &amp; Contact</p>
        <h1 className="mt-3 font-display text-5xl text-ink sm:text-7xl">Find us in <span className="gold-text">Saudabad.</span></h1>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-5 rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-maroon">Address</p>
                <p className="mt-1 text-ink">Saudabad Khokhrapar, Malir, Karachi, Pakistan</p>
                <p className="text-sm text-ink/50">Plus Code: W634+H9 Karachi</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-maroon">Hours</p>
                <p className="mt-1 text-ink">Open daily till 1:00 AM</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-maroon">Call or WhatsApp</p>
                <a href="tel:+923182736676" className="mt-1 block text-xl text-ink transition hover:text-maroon">+92 318 2736676</a>
              </div>
              <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold w-full">Open in Google Maps</a>
            </div>

            <form onSubmit={submit} noValidate className="space-y-4 rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
              <h2 className="font-display text-2xl text-ink">Send us a query</h2>
              <p className="text-sm text-ink/55">Your message opens in WhatsApp, ready to send to our team.</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required error={errors.name}>{(p) => <input {...p} {...f.bind("name")} autoComplete="name" placeholder="Your name" />}</Field>
                <Field label="Phone" required error={errors.phone}>{(p) => <input {...p} {...f.bind("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="0300 1234567" />}</Field>
              </div>
              <Field label="Subject" required error={errors.subject}>
                {(p) => (
                  <select {...p} {...f.bind("subject")}>
                    {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                )}
              </Field>
              <Field label="Message" required error={errors.message}>
                {(p) => <textarea {...p} {...f.bind("message")} rows={5} maxLength={800} placeholder="Ask about orders, cakes, events..." className={`${p.className} resize-none`} />}
              </Field>

              <button type="submit" className="btn-gold w-full py-4">Send via WhatsApp</button>
              {sent && <p role="status" className="text-center text-xs text-ink/50">Didn&apos;t open? Allow pop-ups for this site, or message us directly on WhatsApp.</p>}
            </form>
          </div>

          <div className="min-h-[420px] overflow-hidden rounded-3xl border border-black/10 shadow-sm lg:sticky lg:top-28 lg:h-[640px] lg:self-start">
            <iframe title="Al Kausar Bakers location, Saudabad Khokhrapar, Karachi" src={MAP_SRC} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[420px] w-full border-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
