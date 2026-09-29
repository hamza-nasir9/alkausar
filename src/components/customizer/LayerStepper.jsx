"use client";

export default function LayerStepper({ steps, current, onStep }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Cake builder steps">
      {steps.map((label, i) => {
        const done = i < current;
        const on = i === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
            <button onClick={() => onStep(i)} aria-current={on ? "step" : undefined} className="flex items-center gap-2">
              <span className={`grid h-9 w-9 place-items-center rounded-full border text-sm transition ${on ? "border-gold bg-gold text-ink" : done ? "border-gold/60 text-maroon" : "border-black/15 text-ink/40"}`}>
                {done ? "✓" : i + 1}
              </span>
              <span className={`hidden text-xs uppercase tracking-widest sm:block ${on ? "text-ink" : "text-ink/40"}`}>{label}</span>
            </button>
            {i < steps.length - 1 && <span className={`h-px flex-1 ${done ? "bg-gold/60" : "bg-black/10"}`} />}
          </li>
        );
      })}
    </ol>
  );
}
