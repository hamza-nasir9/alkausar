"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

// Site-wide notification, e.g. "Thank you! Opening WhatsApp to confirm your order..."
export default function Toast() {
  const { toast, dismissToast } = useCart();

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(dismissToast, 6000);
    return () => clearTimeout(id);
  }, [toast, dismissToast]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[120] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24 }}
            className="pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl border border-gold/50 bg-white px-5 py-4 shadow-[0_18px_50px_rgba(43,22,10,0.18)]"
          >
            <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-sm font-bold ${toast.tone === "error" ? "bg-red-100 text-red-600" : "bg-gold text-ink"}`}>{toast.tone === "error" ? "!" : "✓"}</span>
            <p className="text-sm text-ink">{toast.message}</p>
            <button onClick={dismissToast} aria-label="Dismiss" className="ml-1 text-ink/40 transition hover:text-maroon">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
