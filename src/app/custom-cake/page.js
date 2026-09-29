"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { FLAVORS, SIZES, LAYERS, TOPPINGS, MAX_TEXT, PIPING_PRICE, CAKE_SUGGESTIONS, calcPrice } from "@/lib/cakeConfig";
import { formatPKR } from "@/lib/whatsapp";
import FlavorSelector from "@/components/customizer/FlavorSelector";
import LayerStepper from "@/components/customizer/LayerStepper";
import PriceSummary from "@/components/customizer/PriceSummary";

const CakeCanvas3D = dynamic(() => import("@/components/customizer/CakeCanvas3D"), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center text-sm text-ink/50">Loading 3D preview…</div>,
});

const STEPS = ["Style", "Flavor", "Size", "Toppings", "Message"];
const MAX_NAME = 60;

function Chip({ active, onClick, children }) {
  return (
    <button role="radio" aria-checked={active} onClick={onClick} className={`rounded-2xl border px-5 py-3 text-left text-sm transition ${active ? "border-gold bg-gold/10 text-ink" : "border-black/10 bg-white text-ink/70 hover:border-gold/50"}`}>
      {children}
    </button>
  );
}

export default function CustomCakePage() {
  const { addItem } = useCart();
  const [step, setStep] = useState(0);
  const [cfg, setCfg] = useState({ customName: "", flavorId: "choc", size: 2, layers: 1, toppings: [], text: "" });

  // Pre-fill the cake name when arriving from the home page (?name=Red%20Velvet)
  useEffect(() => {
    const n = new URLSearchParams(window.location.search).get("name");
    if (n) setCfg((c) => ({ ...c, customName: n.slice(0, MAX_NAME) }));
  }, []);

  const flavor = FLAVORS.find((f) => f.id === cfg.flavorId);
  const layer = LAYERS.find((l) => l.id === cfg.layers);
  const pricing = useMemo(() => calcPrice(cfg), [cfg]);
  const toppingNames = TOPPINGS.filter((t) => cfg.toppings.includes(t.id)).map((t) => t.name);

  const set = (patch) => setCfg((c) => ({ ...c, ...patch }));
  const toggleTopping = (id) => set({ toppings: cfg.toppings.includes(id) ? cfg.toppings.filter((t) => t !== id) : [...cfg.toppings, id] });

  const displayName = cfg.customName.trim() || `${flavor.name} Cake`;

  const addToTray = () =>
    addItem({
      id: `custom-${flavor.id}-${cfg.customName.trim().toLowerCase().replace(/\s+/g, "-").slice(0, 30) || "cake"}`,
      name: `Custom ${displayName}`,
      price: pricing.total,
      weight: `${cfg.size} lbs, ${layer.label}`,
      custom: {
        "Requested cake name / flavour": cfg.customName.trim(),
        "Base flavor": flavor.name,
        Toppings: toppingNames.length ? toppingNames : "None",
        "Piping text": cfg.text.trim(),
      },
    });

  return (
    <div className="min-h-dvh bg-cream px-5 pb-28 pt-32 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.45em] text-maroon">Cake Atelier</p>
        <h1 className="mt-3 font-display text-5xl text-ink sm:text-7xl">Design your <span className="gold-text">celebration.</span></h1>
        <p className="mt-4 max-w-xl text-ink/60">
          Want a wedding mithai box instead of a cake? Visit{" "}
          <Link href="/bulk-order" className="text-maroon underline underline-offset-4 hover:text-ink">Bulk &amp; Custom Sweets Orders</Link>.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative h-[400px] overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm sm:h-[540px]">
              <CakeCanvas3D flavor={flavor} size={cfg.size} layers={cfg.layers} toppings={cfg.toppings} />
              <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-gold/40 bg-white/90 px-4 py-2 shadow-sm backdrop-blur">
                <p className="text-[9px] uppercase tracking-widest text-ink/50">Live total</p>
                <motion.p key={pricing.total} initial={{ scale: 1.15 }} animate={{ scale: 1 }} className="font-display text-xl text-maroon">{formatPKR(pricing.total)}</motion.p>
              </div>
              {cfg.text.trim() && (
                <p className="pointer-events-none absolute inset-x-6 bottom-5 truncate text-center font-display text-2xl italic text-maroon drop-shadow-sm">{cfg.text.trim()}</p>
              )}
            </div>
            <p className="mt-3 text-center text-xs text-ink/40">Preview is illustrative. Drag to rotate on desktop.</p>
          </div>

          <div className="space-y-8">
            <LayerStepper steps={STEPS} current={step} onStep={setStep} />

            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="space-y-6">
                  {step === 0 && (
                    <>
                      <h2 className="font-display text-3xl text-ink">Name your cake</h2>
                      <p className="text-sm text-ink/60">
                        Type the exact cake or flavour you want &mdash; a flavour combo, a theme or a design idea &mdash; and we&apos;ll confirm the details on WhatsApp.
                      </p>
                      <div>
                        <label htmlFor="customName" className="mb-2 block text-xs uppercase tracking-widest text-ink/50">Your cake name / flavour</label>
                        <input
                          id="customName"
                          value={cfg.customName}
                          maxLength={MAX_NAME}
                          onChange={(e) => set({ customName: e.target.value })}
                          placeholder="e.g. Chocolate Fudge, Red Velvet, Pineapple Delight"
                          autoComplete="off"
                          className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 font-display text-xl text-ink placeholder:text-ink/30 outline-none focus:border-gold/60"
                        />
                        <p className="mt-2 text-right text-xs text-ink/40">{cfg.customName.length}/{MAX_NAME}</p>
                      </div>
                      <div>
                        <p className="mb-2 text-xs uppercase tracking-widest text-ink/50">Or tap an idea</p>
                        <div className="flex flex-wrap gap-2">
                          {CAKE_SUGGESTIONS.map((sug) => (
                            <button key={sug} type="button" onClick={() => set({ customName: sug })} className={`rounded-full border px-4 py-1.5 text-sm transition ${cfg.customName === sug ? "border-gold bg-gold/10 text-ink" : "border-black/10 text-ink/70 hover:border-gold/50 hover:text-maroon"}`}>{sug}</button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <h2 className="font-display text-3xl text-ink">Choose a base flavor</h2>
                      <FlavorSelector value={cfg.flavorId} onChange={(flavorId) => set({ flavorId })} />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h2 className="font-display text-3xl text-ink">Size &amp; tiers</h2>
                      <div>
                        <p className="mb-3 text-xs uppercase tracking-widest text-ink/50">Weight</p>
                        <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Cake weight">
                          {SIZES.map((s) => <Chip key={s} active={cfg.size === s} onClick={() => set({ size: s })}>{s} lbs</Chip>)}
                        </div>
                      </div>
                      <div>
                        <p className="mb-3 text-xs uppercase tracking-widest text-ink/50">Layers</p>
                        <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Cake tiers">
                          {LAYERS.map((l) => <Chip key={l.id} active={cfg.layers === l.id} onClick={() => set({ layers: l.id })}>{l.label}</Chip>)}
                        </div>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h2 className="font-display text-3xl text-ink">Finishing touches</h2>
                      <div className="grid gap-3">
                        {TOPPINGS.map((t) => {
                          const on = cfg.toppings.includes(t.id);
                          return (
                            <button key={t.id} role="checkbox" aria-checked={on} onClick={() => toggleTopping(t.id)} className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${on ? "border-gold bg-gold/10" : "border-black/10 bg-white hover:border-gold/50"}`}>
                              <span className="flex items-center gap-3">
                                <span className={`grid h-5 w-5 place-items-center rounded border text-xs ${on ? "border-gold bg-gold text-ink" : "border-black/25"}`}>{on && "✓"}</span>
                                <span className="text-ink">{t.name}</span>
                              </span>
                              <span className="text-sm text-maroon">+ {formatPKR(t.price)}</span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <h2 className="font-display text-3xl text-ink">Your message</h2>
                      <div>
                        <label htmlFor="piping" className="mb-2 block text-xs uppercase tracking-widest text-ink/50">Piped on the cake (+ {formatPKR(PIPING_PRICE)})</label>
                        <input id="piping" value={cfg.text} maxLength={MAX_TEXT} onChange={(e) => set({ text: e.target.value })} placeholder="Happy Birthday Ayan" className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 font-display text-xl text-ink placeholder:text-ink/30 outline-none focus:border-gold/60" />
                        <p className="mt-2 text-right text-xs text-ink/40">{cfg.text.length}/{MAX_TEXT}</p>
                      </div>
                      <PriceSummary pricing={pricing} flavor={flavor} size={cfg.size} layer={layer} toppingNames={toppingNames} text={cfg.text} customName={cfg.customName} onAdd={addToTray} />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="rounded-full border border-black/15 px-6 py-3 text-sm text-ink transition hover:border-gold/50 disabled:opacity-30">← Back</button>
              {step < STEPS.length - 1 && <button onClick={() => setStep((s) => s + 1)} className="btn-gold px-8 py-3 text-sm">Next →</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
