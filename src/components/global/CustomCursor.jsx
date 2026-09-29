"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.1 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.1 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });

    const move = (e) => {
      dot.current.style.opacity = 1;
      ring.current.style.opacity = 1;
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    };
    const over = (e) => {
      const hot = e.target.closest("a, button, input, textarea, [role='radio']");
      gsap.to(ring.current, { scale: hot ? 1.7 : 1, borderColor: hot ? "#D4AF37" : "rgba(122,20,37,0.35)", duration: 0.25 });
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div aria-hidden="true" className="hidden [@media(pointer:fine)]:block">
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[90] -ml-5 -mt-5 h-10 w-10 rounded-full border border-maroon/35 opacity-0" />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[90] -ml-1 -mt-1 h-2 w-2 rounded-full bg-maroon opacity-0" />
    </div>
  );
}
