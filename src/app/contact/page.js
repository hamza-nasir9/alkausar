"use client";

import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const MAP_SRC = "https://maps.google.com/maps?q=" + encodeURIComponent("W634+H9 Karachi") + "&z=17&output=embed";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("W634+H9 Karachi");
const field = "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink placeholder:text-ink/40 outline-none focus:border-gold/60";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [error, setError] = useState("");
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // No email server needed: the query is sent to the shop's WhatsApp.
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return setError("Please add your name and a message.");
    setError("");
    const text = `*Query - Al Kausar Bakers*\nName: ${form.name}\n${form.phone ? `Phone: ${form.phone}\n` : ""}\n${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
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

            <form onSubmit={submit} className="space-y-4 rounded-3xl border border-black/10 bg-white p-7 shadow-sm" noValidate>
              <h2 className="font-display text-2xl text-ink">Send us a query</h2>
              <input name="name" value={form.name} onChange={onChange} placeholder="Your name" aria-label="Your name" className={field} />
              <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone (optional)" aria-label="Phone" inputMode="tel" className={field} />
              <textarea name="message" value={form.message} onChange={onChange} rows={4} placeholder="Ask about orders, cakes, events..." aria-label="Message" className={`${field} resize-none`} />
              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
              <button type="submit" className="btn-gold w-full py-4">Send via WhatsApp</button>
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
