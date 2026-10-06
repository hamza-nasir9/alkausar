"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import SmartImage from "@/components/ui/SmartImage";
import { categoryImages } from "@/lib/images";
import { OCCASIONS } from "@/lib/bulkConfig";
import { CAKE_SUGGESTIONS } from "@/lib/cakeConfig";

const field = "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 outline-none focus:border-gold/60";

function Card({ id, cover, eyebrow, title, children, delay = 0 }) {
  return (
    <motion.article id={id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay }} className="scroll-mt-24 overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm">
      <div className="relative h-52">
        <SmartImage srcs={categoryImages(cover, 1000)} alt="" width={1000} height={420} sizes="(min-width: 1024px) 45vw, 92vw" className="h-full w-full object-cover" fallback={<div className="h-full w-full bg-gradient-to-br from-gold/40 to-maroon/50" />} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
        <div className="absolute bottom-5 left-6 right-6">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
          <h3 className="mt-1 font-display text-3xl text-white">{title}</h3>
        </div>
      </div>
      <div className="p-6 sm:p-7">{children}</div>
    </motion.article>
  );
}

// Two quick-start cards: type a cake name/flavour, or enter a bulk mithai weight in KG.
// Both hand off to the full builders with the values pre-filled.
export default function CustomOrders() {
  const router = useRouter();
  const [cake, setCake] = useState("");
  const [kg, setKg] = useState("10");
  const [occasion, setOccasion] = useState(OCCASIONS[0]);

  const goCake = (e) => {
    e.preventDefault();
    router.push(cake.trim() ? `/custom-cake?name=${encodeURIComponent(cake.trim())}` : "/custom-cake");
  };
  const goBulk = (e) => {
    e.preventDefault();
    const n = Number(kg);
    const q = new URLSearchParams({ occasion });
    if (n > 0) q.set("kg", String(n));
    router.push(`/bulk-order?${q.toString()}`);
  };

  return (
    <section className="bg-paper px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.45em] text-maroon">Made To Order</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl text-ink sm:text-5xl">Custom cakes &amp; <span className="gold-text">bulk mithai.</span></h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Card id="custom-cake-quick" cover="cakes" eyebrow="Cake Atelier" title="Design a custom cake">
            <form onSubmit={goCake} className="space-y-4">
              <div>
                <label htmlFor="quick-cake" className="mb-2 block text-xs uppercase tracking-widest text-ink/50">Type your cake name or flavour</label>
                <input id="quick-cake" value={cake} maxLength={60} onChange={(e) => setCake(e.target.value)} placeholder="e.g. Chocolate Fudge, Red Velvet" className={field} />
              </div>
              <div className="flex flex-wrap gap-2">
                {CAKE_SUGGESTIONS.slice(0, 5).map((s) => (
                  <button key={s} type="button" onClick={() => setCake(s)} className="rounded-full border border-black/10 px-3 py-1 text-xs text-ink/70 transition hover:border-gold/60 hover:text-maroon">{s}</button>
                ))}
              </div>
              <button type="submit" className="btn-gold w-full py-3.5">Continue to Cake Designer</button>
            </form>
          </Card>

          <Card id="bulk-mithai-quick" cover="special-mithai" eyebrow="Weddings & Events" title="Bulk & custom mithai" delay={0.1}>
            <form onSubmit={goBulk} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="quick-kg" className="mb-2 block text-xs uppercase tracking-widest text-ink/50">Total weight (KG)</label>
                  <input id="quick-kg" type="number" inputMode="decimal" min={1} max={500} step={0.5} value={kg} onChange={(e) => setKg(e.target.value)} className={field} />
                </div>
                <div>
                  <label htmlFor="quick-occasion" className="mb-2 block text-xs uppercase tracking-widest text-ink/50">Occasion</label>
                  <select id="quick-occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)} className={field}>
                    {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <p className="text-xs text-ink/50">Next, choose your sweets and how many KG of each. We confirm final pricing on WhatsApp.</p>
              <button type="submit" className="btn-gold w-full py-3.5">Plan My Bulk Order</button>
            </form>
            <Link href="/bulk-order" className="mt-3 block text-center text-xs text-ink/50 underline underline-offset-4 hover:text-maroon">Skip to the full order form</Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
