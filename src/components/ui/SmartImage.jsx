"use client";

import { useState } from "react";

// <img> that walks through a list of candidate URLs when one fails to load and
// finally renders `fallback` (e.g. a brand-colour block) instead of a broken icon.
export default function SmartImage({ srcs, alt = "", className = "", fallback = null, ...rest }) {
  const list = (Array.isArray(srcs) ? srcs : [srcs]).filter(Boolean);
  const [i, setI] = useState(0);
  if (i >= list.length) return fallback;
  return <img key={list[i]} src={list[i]} alt={alt} className={className} onError={() => setI((n) => n + 1)} {...rest} />;
}
