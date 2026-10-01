"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = IMG.heroBanners;

export default function HeroSection() {
  const root = useRef(null);
  const [slide, setSlide] = useState(0);
  const [broken, setBroken] = useState({});

  // Auto-rotate banner
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line > span", { yPercent: 115, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.15 });
      gsap.from(".hero-fade", { opacity: 0, y: 20, duration: 0.9, stagger: 0.1, delay: 0.75, ease: "power3.out" });
      gsap.from(".hero-card", { opacity: 0, y: 40, scale: 0.94, duration: 1, stagger: 0.12, delay: 0.4, ease: "power3.out" });

      gsap.to(".hero-banner", {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        yPercent: 14, opacity: 0.35, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex min-h-[92dvh] items-center justify-center overflow-hidden bg-cream px-5 pt-24">
      {/* crossfading banner */}
      <div className="hero-banner absolute inset-0">
        {SLIDES.map((src, i) =>
          broken[i] ? null : (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              onError={() => setBroken((b) => ({ ...b, [i]: true }))}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms]"
              style={{ opacity: slide === i ? 1 : 0 }}
            />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/75 to-white" />
      </div>

      <div className="hero-content relative z-20 mx-auto max-w-4xl text-center">
        <p className="hero-fade mb-5 text-[11px] uppercase tracking-[0.5em] text-maroon">Saudabad · Khokhrapar · Karachi</p>
        <h1 className="font-display text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
          <span className="hero-line block overflow-hidden"><span className="block">Karachi&apos;s Finest</span></span>
          <span className="hero-line block overflow-hidden"><span className="block"><em className="gold-text not-italic">Sweets, Bakery</em></span></span>
          <span className="hero-line block overflow-hidden"><span className="block">&amp; Custom Cakes</span></span>
        </h1>
        <div className="hero-fade mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/menu" className="btn-gold px-8 py-4">Explore the Menu</Link>
          <Link href="/custom-cake" className="btn-outline px-8 py-4">Design Your Cake</Link>
        </div>
      </div>

      {/* floating product cards */}
      <div className="hero-card absolute left-[4%] top-[20%] hidden w-40 -rotate-6 overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-xl sm:block">
        <img src={IMG.sweets} alt="Mithai" className="h-28 w-full rounded-xl object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
        <p className="mt-2 text-center font-display text-sm text-ink">Signature Mithai</p>
      </div>
      <div className="hero-card absolute right-[5%] top-[16%] hidden w-40 rotate-6 overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-xl md:block">
        <img src={IMG.cakes} alt="Custom cake" className="h-28 w-full rounded-xl object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
        <p className="mt-2 text-center font-display text-sm text-ink">Custom Cakes</p>
      </div>
      <div className="hero-card absolute bottom-[10%] right-[10%] hidden w-36 -rotate-3 overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-xl lg:block">
        <img src={IMG.nimco} alt="Nimco" className="h-24 w-full rounded-xl object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
        <p className="mt-2 text-center font-display text-sm text-ink">Fresh Nimco</p>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-ink/40">Scroll</div>
    </section>
  );
}
