"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG } from "@/lib/images";
import SmartImage from "@/components/ui/SmartImage";

gsap.registerPlugin(ScrollTrigger);

// Edit this copy with your family's real story, dates and standards.
const PILLARS = [
  { title: "Pure Desi Ghee", text: "Our mithai is cooked in pure desi ghee, the way it has always been done, for a flavour no shortcut can match." },
  { title: "Hygiene First", text: "Clean kitchens, fresh batches every day and careful handling from the karahi to the box." },
  { title: "Traditional Recipes", text: "Family recipes, patiently made by hand: slow-cooked halwa, hand-pressed laddu, syrup-soaked jamun." },
  { title: "Baked Fresh Daily", text: "Cakes, pastries and nimco are made fresh, so what reaches your table is what left our oven." },
];

export default function AboutPage() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-hero > *", { y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out" });
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, { y: 50, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-paper">
      <section className="about-hero relative flex min-h-[70dvh] flex-col justify-end overflow-hidden bg-cream px-5 pb-20 pt-40 sm:px-10">
        <SmartImage srcs={[IMG.bakery]} alt="" aria-hidden="true" width={1600} height={900} sizes="100vw" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-cream/40" />
        <p className="relative text-[11px] uppercase tracking-[0.5em] text-maroon">Our Heritage</p>
        <h1 className="relative mt-4 max-w-4xl font-display text-5xl leading-[1.05] text-ink sm:text-7xl lg:text-8xl">
          A family kitchen in <span className="gold-text">Saudabad.</span>
        </h1>
        <p className="relative mt-8 max-w-2xl text-lg text-ink/70">
          Al Kausar Bakers Sweets And Nimco grew out of Saudabad Khokhrapar, Malir, into a neighbourhood gathering place for mithai, cakes and nimco.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-28 sm:px-10 md:grid-cols-2">
        <div className="reveal">
          <p className="text-[11px] uppercase tracking-[0.45em] text-maroon">Our Story</p>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Rooted in Karachi, made for every celebration.</h2>
        </div>
        <div className="reveal space-y-5 text-ink/70">
          <p>From Eid and weddings to birthdays and quiet evenings with chai, our sweets have been part of the moments that matter to families around Malir.</p>
          <p>We keep things simple: honest ingredients, recipes handed down and improved, and a counter that stays open late so there is always something fresh when you need it.</p>
        </div>
      </section>

      <section className="bg-cream px-5 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="reveal text-center font-display text-4xl text-ink sm:text-5xl">What we stand for</h2>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <div key={p.title} className="reveal rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
                <span className="font-display text-5xl text-gold/50">0{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl text-ink">{p.title}</h3>
                <p className="mt-3 text-ink/70">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-28 text-center sm:px-10">
        <h2 className="reveal mx-auto max-w-2xl font-display text-4xl text-ink sm:text-5xl">Come taste the <span className="gold-text">tradition.</span></h2>
        <div className="reveal mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/menu" className="btn-gold px-8 py-4">See the Menu</Link>
          <Link href="/contact" className="btn-outline px-8 py-4">Visit Us</Link>
        </div>
      </section>
    </div>
  );
}
