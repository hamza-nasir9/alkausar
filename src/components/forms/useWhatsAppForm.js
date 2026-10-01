"use client";

import { useCallback, useRef, useState } from "react";
import { validate } from "@/lib/validators";

// Shared form state + validation for every WhatsApp form.
//   const f = useWhatsAppForm(initial, schema);
//   f.values / f.errors / f.set(name, value) / f.bind(name) / f.submit(onValid)
export default function useWhatsAppForm(initial, schema) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const schemaRef = useRef(schema);
  schemaRef.current = schema;

  const set = useCallback((name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e)); // clear as the user fixes it
  }, []);

  const bind = (name) => ({ value: values[name] ?? "", onChange: (e) => set(name, e.target.value) });

  // Validates; on failure focuses the first invalid field. Returns true if valid.
  const check = useCallback(
    (root) => {
      const errs = validate(values, schemaRef.current);
      setErrors(errs);
      if (Object.keys(errs).length) {
        requestAnimationFrame(() => (root || document).querySelector('[aria-invalid="true"]')?.focus());
        return false;
      }
      return true;
    },
    [values]
  );

  const reset = useCallback(() => {
    setValues(initial);
    setErrors({});
  }, [initial]);

  return { values, errors, set, bind, check, reset, setValues };
}
