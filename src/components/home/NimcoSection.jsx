"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { MENU, WEIGHT_SETS } from "@/lib/menuData";
import { formatPKR } from "@/lib/whatsapp";
import WeightChips from "@/components/menu/WeightChips";
import ProductImage from "@/components/menu/ProductImage";

const NIMCO = MENU.filter((m) => m.category === "nimco").slice(0, 4);

function NimcoCard({ item, index }) {
  const { addItem } = useCart();
  const options = WEIGHT_SETS.kg;
  const [weight, setWeight] = useState(options[1]);
  const ref = useRef(null);
  const price = Math.round(item.price * weight.mult);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: index * 0.08 }} style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        className="flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-black/10 bg-white p-5 shadow-sm"
      >
        <ProductImage item={item} className="-mx-5 -mt-5 h-36" />
        <div style={{ transform: "translateZ(30px)" }}>
          <h3 className="font-display text-xl text-ink">{item.name}</h3>
          <p className="mt-1 text-sm text-ink/60">{item.desc}</p>
        </div>
        <div className="mt-auto space-y-4" style={{ transform: "translateZ(20px)" }}>
          <WeightChips options={options} value={weight} onChange={setWeight} />
          <div className="flex items-center justify-between">
            <span className="font-display text-xl text-maroon">{formatPKR(price)}</span>
            <button onClick={() => addItem({ id: item.id, name: item.name, price, weight: weight.label })} className="rounded-full border border-gold/50 px-4 py-2 text-sm text-maroon transition hover:bg-gold hover:text-ink">
              Add
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function NimcoSection() {
  return (
    <section className="bg-paper px-5 py-28 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.45em] text-maroon">Savory Nimco</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl text-ink sm:text-6xl">Crunch worth <span className="gold-text">coming back for.</span></h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {NIMCO.map((n, i) => <NimcoCard key={n.id} item={n} index={i} />)}
        </div>
      </div>
    </section>
  );
}
