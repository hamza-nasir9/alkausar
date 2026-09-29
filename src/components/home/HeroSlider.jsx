"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import SmartImage from "@/components/ui/SmartImage";
import { heroImages } from "@/lib/images";

const SLIDES = [
  {
    key: "sweets",
    eyebrow: "Fresh Sweets",
    title: ["Mithai made fresh,", "every single day."],
    blurb: "Gulab Jamun, Cham Cham, Barfi and Laddu from the counter, plus boxes for gifting.",
    chips: ["Gulab Jamun", "Barfi", "Laddu"],
    cta: { label: "Shop Mithai", href: "/menu?category=regular-mithai" },
    cta2: { label: "Bulk Orders", href: "/bulk-order" },
    glow: "#F6E3A6",
    badge: "Fresh daily",
  },
  {
    key: "cakes",
    eyebrow: "Custom Cakes",
    title: ["Your cake,", "exactly your way."],
    blurb: "Type your flavour, pick a size and toppings, and we'll confirm the details on WhatsApp.",
    chips: ["Chocolate Fudge", "Red Velvet", "Mango"],
    cta: { label: "Design Your Cake", href: "/custom-cake" },
    cta2: { label: "See Cakes", href: "/menu?category=cakes" },
    glow: "#F3D3D6",
    badge: "Made to order",
  },
  {
    key: "halwa",
    eyebrow: "Special Halwa",
    title: ["Slow-cooked halwa,", "the traditional way."],
    blurb: "Sohn Halwa, Multani Halwa and Habshi Halwa, cooked patiently in ghee.",
    chips: ["Sohn", "Multani", "Habshi"],
    cta: { label: "Explore Halwajaat", href: "/menu?category=halwajaat" },
    cta2: { label: "Premium Boxes", href: "/menu?category=special-mithai" },
    glow: "#EFD9B0",
    badge: "Traditional",
  },
  {
    key: "bakery",
    eyebrow: "Bakery Items",
    title: ["Fresh from", "our oven."],
    blurb: "Samosas, rolls, patties, bread, rusk, biscuits and pastries baked through the day.",
    chips: ["Samosa", "Bread", "Pastries"],
    cta: { label: "Shop Bakery", href: "/menu?category=baked-snacks" },
    cta2: { label: "Tea Cakes", href: "/menu?category=tea-cakes" },
    glow: "#F2E0C2",
    badge: "Baked today",
  },
];

function Ornament({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="0.6">
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x="22" y="22" width="56" height="56" transform={`rotate(${i * 22.5} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="6" />
    </svg>
  );
}

export default function HeroSlider() {
  const root = useRef(null);
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);

  const animateSlide = useCallback((swiper) => {
    const el = swiper.slides?.[swiper.activeIndex];
    if (!el) return;
    gsap.fromTo(el.querySelectorAll("[data-anim]"), { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.09, overwrite: "auto" });
    const img = el.querySelector("[data-img]");
    if (img) gsap.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 1.8, ease: "power2.out", overwrite: "auto" });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-orn", { rotation: 360, duration: 60, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.to(".hero-float", { y: -10, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, root);
    return () => ctx.revert();
  }, []);

  const onSwiper = (swiper) => {
    swiperRef.current = swiper;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) swiper.autoplay?.stop();
    animateSlide(swiper);
  };

  return (
    <section ref={root} aria-roledescription="carousel" aria-label="Featured banners" className="relative bg-cream">
      <h1 className="sr-only">Al Kausar Bakers Sweets &amp; Nimco, Saudabad, Karachi</h1>
      <Swiper
        modules={[Autoplay, EffectFade, A11y, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        keyboard={{ enabled: true }}
        autoplay={{ delay: 5800, disableOnInteraction: false, pauseOnMouseEnter: true }}
        onSwiper={onSwiper}
        onSlideChange={(s) => setActive(s.realIndex)}
        onSlideChangeTransitionStart={animateSlide}
        className="h-[760px] w-full sm:h-[800px] lg:h-[100dvh] lg:min-h-[720px]"
      >
        {SLIDES.map((s, i) => {
          const srcs = heroImages(s.key, 1100);
          return (
            <SwiperSlide key={s.key}>
              <div className="relative h-full w-full overflow-hidden" style={{ background: `radial-gradient(circle at 78% 42%, ${s.glow} 0%, #FFFFFF 62%)` }}>
                <Ornament className="hero-orn pointer-events-none absolute -left-32 top-24 h-[520px] w-[520px] text-gold/25" />
                <Ornament className="hero-orn pointer-events-none absolute -right-40 bottom-0 h-[620px] w-[620px] text-maroon/10" />

                <div className="relative mx-auto grid h-full max-w-7xl items-center gap-6 px-5 pb-24 pt-28 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-24">
                  {/* photo */}
                  <div className="relative order-1 mx-auto w-full max-w-[250px] sm:max-w-[320px] lg:order-2 lg:max-w-[440px]">
                    <div className="absolute -inset-3 rounded-t-[999px] rounded-b-[2rem] border border-gold/60" />
                    <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[1.6rem] border-[6px] border-white bg-white shadow-[0_30px_80px_rgba(43,22,10,0.22)]">
                      <SmartImage
                        srcs={srcs}
                        alt={`${s.eyebrow} at Al Kausar Bakers`}
                        data-img
                        loading={i === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover"
                        fallback={<div className="grid h-full w-full place-items-center bg-gradient-to-b from-gold/40 to-maroon/60 px-6 text-center font-display text-2xl text-white">{s.eyebrow}</div>}
                      />
                    </div>
                    <div className="hero-float absolute -bottom-4 -left-3 rounded-2xl border border-gold/40 bg-white px-4 py-2.5 shadow-xl sm:-left-8">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-goldDeep">{s.badge}</p>
                      <p className="font-display text-base text-maroon">{s.eyebrow}</p>
                    </div>
                  </div>

                  {/* copy */}
                  <div className="order-2 text-center lg:order-1 lg:text-left">
                    <p data-anim className="mb-4 text-[11px] uppercase tracking-[0.5em] text-maroon">{s.eyebrow}</p>
                    <h2 data-anim className="font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl xl:text-7xl">
                      {s.title[0]} <span className="gold-text block">{s.title[1]}</span>
                    </h2>
                    <p data-anim className="mx-auto mt-5 max-w-lg text-base text-ink/70 lg:mx-0">{s.blurb}</p>
                    <div data-anim className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                      {s.chips.map((c) => (
                        <span key={c} className="rounded-full border border-gold/50 bg-white/80 px-3.5 py-1 text-xs text-maroon">{c}</span>
                      ))}
                    </div>
                    <div data-anim className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                      <Link href={s.cta.href} className="btn-gold px-8 py-4">{s.cta.label}</Link>
                      <Link href={s.cta2.href} className="btn-outline px-8 py-4">{s.cta2.label}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-10">
        <div className="pointer-events-auto flex items-center gap-2" role="tablist" aria-label="Choose banner">
          {SLIDES.map((s, i) => (
            <button
              key={s.key}
              role="tab"
              aria-selected={active === i}
              aria-label={`Show ${s.eyebrow} banner`}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={`h-2 rounded-full transition-all duration-500 ${active === i ? "w-10 bg-gold" : "w-2 bg-ink/25 hover:bg-ink/50"}`}
            />
          ))}
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <button onClick={() => swiperRef.current?.slidePrev()} aria-label="Previous banner" className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-ink transition hover:border-gold/60 hover:text-maroon">←</button>
          <button onClick={() => swiperRef.current?.slideNext()} aria-label="Next banner" className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-ink transition hover:border-gold/60 hover:text-maroon">→</button>
        </div>
      </div>
    </section>
  );
}
