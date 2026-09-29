'use client';
import Link from "next/link";
import { IMG } from "@/lib/images";

export default function PromoBand() {
  return (
    <section className="bg-paper px-5 pb-28 sm:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-black/10">
          <img src={IMG.cake} alt="Custom celebration cake" className="h-64 w-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-7">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Cake Atelier</p>
            <h3 className="mt-1 font-display text-3xl text-white">Design a custom cake</h3>
            <Link href="/custom-cake" className="btn-gold mt-4 w-fit px-6 py-2.5 text-sm">Start Designing</Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-black/10">
          <img src={IMG.sweets} alt="Mithai boxes for events" className="h-64 w-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-7">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Weddings &amp; Events</p>
            <h3 className="mt-1 font-display text-3xl text-white">Bulk mithai &amp; custom boxes</h3>
            <Link href="/bulk-order" className="btn-gold mt-4 w-fit px-6 py-2.5 text-sm">Plan an Order</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
