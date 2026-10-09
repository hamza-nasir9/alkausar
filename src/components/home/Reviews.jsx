"use client";

import { motion } from "framer-motion";

const PROMISES = [
  { number: "01", title: "Made for sharing", text: "From everyday mithai to gift boxes, choose something for the whole table." },
  { number: "02", title: "A sweet celebration", text: "Cakes and traditional favourites for birthdays, family gatherings and special days." },
  { number: "03", title: "Your feedback matters", text: "Ordered from Al Kausar? We welcome honest feedback to help us serve you better." },
];

export default function Reviews() {
  return (
    <section className="bg-cream px-5 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] uppercase tracking-[0.45em] text-maroon">A little sweetness, shared</p>
        <h2 className="mt-3 text-center font-display text-4xl text-ink sm:text-5xl">Made for your moments</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-ink/60">We won’t put words in our customers’ mouths. We’d rather let genuine experiences speak for themselves.</p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PROMISES.map((item, i) => (
            <motion.article key={item.number} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }} className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
              <span className="font-display text-3xl text-goldDeep">{item.number}</span>
              <h3 className="mt-5 font-display text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/65">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
