"use client";

import { useMemo } from "react";
import SmartImage from "@/components/ui/SmartImage";
import { imagesFor } from "@/lib/images";

// Real photo for the item; walks through the category pool if a link fails and
// finally falls back to the item's brand-colour gradient, never a broken icon.
export default function ProductImage({ item, className = "" }) {
  const srcs = useMemo(() => imagesFor(item, 800), [item]);

  const fallback = (
    <div
      className={`grid place-items-center ${className}`}
      style={{ background: `radial-gradient(circle at 30% 25%, ${item.hue?.[0] || "#D4AF37"}, ${item.hue?.[1] || "#F9F9F9"} 78%)` }}
    >
      <span className="px-4 text-center font-display text-xl text-white/90">{item.name}</span>
    </div>
  );

  return (
    <div className={`relative overflow-hidden bg-cream ${className}`}>
      <SmartImage srcs={srcs} alt={`${item.name} from Al Kausar Bakers`} width={800} height={600} sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" fallback={fallback} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}
