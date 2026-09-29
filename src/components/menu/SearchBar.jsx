"use client";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search barfi, chocolate cake, chevdo..."
        aria-label="Search menu"
        className="w-full rounded-full border border-black/10 bg-white py-3 pl-11 pr-10 text-sm text-ink placeholder:text-ink/40 outline-none transition focus:border-gold/60"
      />
      {value && (
        <button onClick={() => onChange("")} aria-label="Clear search" className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-maroon">✕</button>
      )}
    </div>
  );
}
