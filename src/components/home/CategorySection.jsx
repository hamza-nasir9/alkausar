"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MENU } from "@/lib/menuData";
import { categoryImages } from "@/lib/images";
import SmartImage from "@/components/ui/SmartImage";
import ProductCard from "@/components/menu/ProductCard";

gsap.registerPlugin(ScrollTrigger);

// One dedicated home-page section per traditional category, in the style of a
// mithai-shop counter: cover photo + heading on one side, featured items on the other.
export default function CategorySection({ section, index }) {
  const root = useRef(null);
  const flip = index % 2 === 1;
  const items = MENU.filter((m) => m.category === section.id).slice(0, 4);
  const count = MENU.filter((m) => m.category === section.id).length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cs-reveal", {
        y: 44, opacity: 0, duration: 0.85, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });
      gsap.to(".cs-cover-img", {
        yPercent: -7, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id={`section-${section.id}`} ref={root} className={`scroll-mt-24 px-5 py-20 sm:px-10 sm:py-28 ${index % 2 === 0 ? "bg-paper" : "bg-cream"}`}>
      <div className="mx-auto max-w-7xl">
        <div className={`grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-14 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          {/* cover + heading */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="cs-reveal text-[11px] uppercase tracking-[0.45em] text-maroon">
              <span className="mr-3 font-display text-xl text-goldDeep">{String(index + 1).padStart(2, "0")}</span>
              {section.eyebrow}
            </p>
            <h2 className="cs-reveal mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              {section.title} <span className="gold-text">{section.accent}</span>
            </h2>
            <p className="cs-reveal mt-4 max-w-md text-ink/65">{section.blurb}</p>

            <div className="cs-reveal relative mt-8 aspect-[4/3] overflow-hidden rounded-[2rem] border border-black/10 bg-cream shadow-sm">
              <SmartImage
                srcs={categoryImages(section.id, 1000)}
                alt={`${section.label} at Al Kausar Bakers`}
                loading="lazy"
                className="cs-cover-img absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
                fallback={<div className="absolute inset-0 bg-gradient-to-br from-gold/40 to-maroon/50" />}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-5 font-display text-xl text-white">{section.label}</p>
            </div>

            <Link href={`/menu?category=${section.id}`} className="cs-reveal btn-outline mt-6 gap-2 px-6 py-3 text-sm">
              {section.cta} <span aria-hidden="true">→</span>
              <span className="sr-only">({count} items)</span>
            </Link>
          </div>

          {/* featured items */}
          <div className="grid gap-5 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item.id} className="cs-reveal">
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
