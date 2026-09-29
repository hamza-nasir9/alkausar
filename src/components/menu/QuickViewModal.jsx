"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useLenis } from "@/components/global/SmoothScrollProvider";
import { WEIGHT_SETS, UNIT_LABEL } from "@/lib/menuData";
import { formatPKR } from "@/lib/whatsapp";
import WeightChips from "./WeightChips";
import ProductImage from "./ProductImage";

export default function QuickViewModal({ item, onClose }) {
  const { addItem } = useCart();
  const lenis = useLenis();
  const options = WEIGHT_SETS[item.set];
  const [weight, setWeight] = useState(options[Math.min(1, options.length - 1)]);
  const [qty, setQty] = useState(1);
  const price = Math.round(item.price * weight.mult);

  useEffect(() => {
    lenis?.stop();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [lenis, onClose]);

  const add = () => {
    addItem({ id: item.id, name: item.name, price, weight: weight.label, qty });
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[65] grid place-items-center bg-ink/40 p-4 backdrop-blur-sm">
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="grid max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-black/10 bg-white shadow-2xl md:grid-cols-2"
      >
        <ProductImage item={item} className="min-h-56" />
        <div className="flex flex-col gap-5 p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              {item.tag && <p className="text-[10px] uppercase tracking-[0.3em] text-maroon">{item.tag}</p>}
              <h3 className="font-display text-3xl text-ink">{item.name}</h3>
            </div>
            <button onClick={onClose} aria-label="Close" className="text-ink/50 hover:text-maroon">✕</button>
          </div>
          <p className="text-ink/70">{item.desc}</p>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-ink/50">Choose size</p>
            <WeightChips options={options} value={weight} onChange={setWeight} />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full border border-black/10">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="h-9 w-9 hover:text-maroon">−</button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="h-9 w-9 hover:text-maroon">+</button>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-ink/40">{formatPKR(item.price)} {UNIT_LABEL[item.set]}</p>
          </div>
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-black/10 pt-5">
            <span className="gold-text font-display text-3xl">{formatPKR(price * qty)}</span>
            <button onClick={add} className="btn-gold px-6 py-3">Add to WhatsApp Tray</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
