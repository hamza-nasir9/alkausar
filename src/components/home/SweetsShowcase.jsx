"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/context/CartContext";
import { MENU, WEIGHT_SETS } from "@/lib/menuData";
import { formatPKR } from "@/lib/whatsapp";
import WeightChips from "@/components/menu/WeightChips";
import ProductImage from "@/components/menu/ProductImage";

gsap.registerPlugin(ScrollTrigger);

const SWEETS = MENU.filter((m) => m.category === "sweets").slice(0, 5);

function SweetCard({ item }) {
  const { addItem } = useCart();
  const options = WEIGHT_SETS.kg;
  const [weight, setWeight] = useState(options[1]);
  const price = Math.round(item.price * weight.mult);

  return (
    <article className="group flex w-[82vw] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm sm:w-[380px]">
      <ProductImage item={item} className="h-56" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="text-sm text-ink/70">{item.desc}</p>
        <WeightChips options={options} value={weight} onChange={setWeight} />
        <div className="mt-auto flex items-center justify-between">
          <span className="gold-text font-display text-2xl">{formatPKR(price)}</span>
          <button onClick={() => addItem({ id: item.id, name: item.name, price, weight: weight.label })} className="btn-gold px-5 py-2.5 text-sm">Add to Tray</button>
        </div>
      </div>
    </article>
  );
}

export default function SweetsShowcase() {
  const section = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const dist = () => track.current.scrollWidth - window.innerWidth + 96;
      gsap.to(track.current, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden bg-cream py-24 md:flex md:h-dvh md:items-center md:py-0">
      <div className="relative w-full">
        <div className="mb-10 px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.45em] text-maroon">Signature Mithai</p>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-6xl">Made slow. <span className="gold-text">Served golden.</span></h2>
        </div>
        <div ref={track} className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:overflow-visible md:px-12 md:pb-0 [scrollbar-width:none]">
          {SWEETS.map((s) => <SweetCard key={s.id} item={s} />)}
        </div>
      </div>
    </section>
  );
}
