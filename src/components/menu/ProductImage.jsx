"use client";

import { useMemo } from "react";
import SmartImage from "@/components/ui/SmartImage";
import { imagesFor } from "@/lib/images";

// Every product receives its own explicit photo from the product image manifest.
export default function ProductImage({ item, className = "" }) {
  const srcs = useMemo(() => imagesFor(item, 800), [item]);

  return (
    <div className={`relative overflow-hidden bg-cream ${className}`}>
      <SmartImage srcs={srcs} alt={`${item.name} from Al Kausar Bakers`} width={800} height={600} sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}
