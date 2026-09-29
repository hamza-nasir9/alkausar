"use client";

import { useLenis } from "@/components/global/SmoothScrollProvider";
import SmartImage from "@/components/ui/SmartImage";
import { categoryImages } from "@/lib/images";
import { HOME_SECTIONS } from "@/lib/homeSections";

// Jump-links to every category section on the home page.
export default function CategoryNav() {
  const lenis = useLenis();

  const go = (e, id) => {
    const el = document.getElementById(`section-${id}`);
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="Browse categories" className="relative z-20 -mt-8 px-3 sm:px-8">
      <div data-lenis-prevent-wheel className="mx-auto flex max-w-7xl gap-3 overflow-x-auto rounded-3xl border border-black/10 bg-white p-3 shadow-[0_18px_50px_rgba(43,22,10,0.10)] [scrollbar-width:none] lg:justify-between">
        {HOME_SECTIONS.map((s) => (
          <a key={s.id} href={`#section-${s.id}`} onClick={(e) => go(e, s.id)} className="group flex w-[92px] shrink-0 flex-col items-center gap-2 rounded-2xl p-2 text-center transition hover:bg-gold/10">
            <span className="block h-14 w-14 overflow-hidden rounded-full border-2 border-gold/50 bg-cream">
              <SmartImage srcs={categoryImages(s.id, 200)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" fallback={<span className="block h-full w-full bg-gold/30" />} />
            </span>
            <span className="text-[11px] leading-tight text-ink/80 group-hover:text-maroon">{s.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
