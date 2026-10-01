"use client";

import { useId } from "react";

export const inputClass = (error) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 outline-none transition focus:border-gold ${error ? "border-red-400" : "border-black/10"}`;

// Label + control + inline error, wired for screen readers.
// `children` is a render function (so the control gets the right id / aria props)
// or plain JSX for read-only controls.
export default function Field({ label, error, hint, required, className = "", children }) {
  const id = useId();
  const props = { id, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-err` : hint ? `${id}-hint` : undefined, className: inputClass(error) };
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs uppercase tracking-widest text-ink/55">
        {label} {required && <span className="text-maroon" aria-hidden="true">*</span>}
      </label>
      {typeof children === "function" ? children(props) : children}
      {error ? (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink/45">{hint}</p>
      ) : null}
    </div>
  );
}
