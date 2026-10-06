"use client";

import { useState } from "react";
import Image from "next/image";
import remoteLoader from "@/lib/imageLoader";

// next/image wrapper:
//  - `alt` is mandatory (use alt="" ONLY for purely decorative images)
//  - width + height are mandatory so the browser reserves space (no layout shift)
//  - `sizes` tells the browser which srcset width to download on each screen
//  - `priority` is for the single above-the-fold (LCP) image only; everything else lazy-loads
//  - walks through a list of fallback URLs if one fails, then renders `fallback`
export default function SmartImage({ srcs, alt, width, height, sizes, priority = false, className = "", fallback = null, ...rest }) {
  const list = (Array.isArray(srcs) ? srcs : [srcs]).filter(Boolean);
  const [i, setI] = useState(0);

  if (process.env.NODE_ENV !== "production" && (alt === undefined || !width || !height)) {
    console.error("SmartImage needs `alt`, `width` and `height`.", list[0]);
  }
  if (i >= list.length) return fallback;

  const src = list[i];
  const remote = /^https?:\/\//.test(src);
  return (
    <Image
      key={src}
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loader={remote ? remoteLoader : undefined}
      className={className}
      onError={() => setI((n) => n + 1)}
      {...rest}
    />
  );
}
