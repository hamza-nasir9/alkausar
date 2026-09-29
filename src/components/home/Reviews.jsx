"use client";

import { motion } from "framer-motion";

// Placeholder testimonials. Replace with real customer reviews before launch.
const REVIEWS = [
  { name: "Customer Name", area: "Malir, Karachi", stars: 5, text: "Replace with a real review about the mithai quality." },
  { name: "Customer Name", area: "Saudabad, Karachi", stars: 5, text: "Replace with a real review about the celebration cake." },
  { name: "Customer Name", area: "Korangi, Karachi", stars: 5, text: "Replace with a real review about the nimco." },
];

export default function Reviews() {
  return (
    <section className="bg-cream px-5 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] uppercase tracking-[0.45em] text-maroon">Loved by Karachi</p>
        <h2 className="mt-3 text-center font-display text-4xl text-ink sm:text-5xl">What our guests say</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.figure key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
              <div className="text-gold" aria-label={`${r.stars} out of 5 stars`}>{"★".repeat(r.stars)}</div>
              <blockquote className="mt-4 text-ink/80">“{r.text}”</blockquote>
              <figcaption className="mt-6 text-sm text-ink/50"><span className="text-ink">{r.name}</span> · {r.area}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
