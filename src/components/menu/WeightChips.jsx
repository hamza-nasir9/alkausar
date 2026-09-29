"use client";

export default function WeightChips({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Select size">
      {options.map((w) => (
        <button
          key={w.label}
          role="radio"
          aria-checked={value.label === w.label}
          onClick={() => onChange(w)}
          className={`rounded-full border px-3 py-1 text-xs transition ${
            value.label === w.label ? "border-gold bg-gold text-ink" : "border-black/15 text-ink/70 hover:border-gold/60"
          }`}
        >
          {w.label}
        </button>
      ))}
    </div>
  );
}
