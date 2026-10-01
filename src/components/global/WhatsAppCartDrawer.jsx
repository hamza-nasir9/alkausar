"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useLenis } from "@/components/global/SmoothScrollProvider";
import { formatPKR } from "@/lib/whatsapp";

export default function WhatsAppCartDrawer() {
  const { items, total, count, isOpen, closeCart, setQty, removeItem, clearCart, checkoutOpen, openCheckout } = useCart();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    isOpen || checkoutOpen ? lenis.stop() : lenis.start();
  }, [isOpen, checkoutOpen, lenis]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm" />
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="WhatsApp order tray"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-md flex-col border-l border-black/10 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-maroon">Your Tray</p>
                <h2 className="font-display text-2xl text-ink">{count} {count === 1 ? "item" : "items"}</h2>
              </div>
              <button onClick={closeCart} aria-label="Close tray" className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-ink transition hover:border-gold/60 hover:text-maroon">✕</button>
            </div>

            <div data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <p className="font-display text-2xl text-ink">Your tray is empty</p>
                    <p className="mt-2 text-sm text-ink/60">Add sweets, cakes or nimco and send the order straight to WhatsApp.</p>
                  </div>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((it) => (
                    <motion.div key={it.lineId} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 40 }} className="glass rounded-2xl p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-display text-lg text-ink">{it.name}</p>
                          {it.weight && <p className="text-xs text-maroon">{it.weight}</p>}
                          {it.custom && Object.entries(it.custom).map(([k, v]) => v !== "" && v != null && (
                            <p key={k} className="text-xs text-ink/60">{k}: {Array.isArray(v) ? v.join(", ") : String(v)}</p>
                          ))}
                        </div>
                        <button onClick={() => removeItem(it.lineId)} aria-label={`Remove ${it.name}`} className="text-xs text-ink/40 transition hover:text-red-600">Remove</button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-black/10">
                          <button onClick={() => setQty(it.lineId, it.qty - 1)} aria-label="Decrease quantity" className="h-8 w-8 text-ink hover:text-maroon">−</button>
                          <span className="w-8 text-center text-sm">{it.qty}</span>
                          <button onClick={() => setQty(it.lineId, it.qty + 1)} aria-label="Increase quantity" className="h-8 w-8 text-ink hover:text-maroon">+</button>
                        </div>
                        <p className="font-semibold text-maroon">{formatPKR(it.price * it.qty)}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}

            </div>

            <div className="border-t border-black/10 px-6 py-5">
              <div className="mb-4 flex items-end justify-between">
                <span className="text-sm uppercase tracking-widest text-ink/60">Total</span>
                <span className="gold-text font-display text-3xl">{formatPKR(total)}</span>
              </div>
              <button onClick={openCheckout} disabled={!items.length} className="btn-gold w-full gap-2 py-4 disabled:cursor-not-allowed disabled:opacity-40">
                Checkout
              </button>
              {items.length > 0 && (
                <button onClick={clearCart} className="mt-3 w-full text-center text-xs text-ink/40 transition hover:text-ink">Clear tray</button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
