// Small, dependency-free form validation shared by every WhatsApp form.

// Local calendar date as YYYY-MM-DD (not UTC, so Karachi evenings don't flip a day).
export const toISODate = (d = new Date()) => {
  const z = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
};
export const addDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
};

// "Fri, 3 Oct 2026" from "2026-10-03"
export const prettyDate = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
};

// Pakistani mobile (03xx / +923xx / 923xx / 00923xx) or Karachi landline (021...)
const MOBILE = /^(?:\+?92|0092|0)?3\d{9}$/;
const KHI_LANDLINE = /^(?:\+?92|0092|0)?21\d{7,8}$/;
export const cleanPhone = (v = "") => String(v).replace(/[\s\-().]/g, "");
export const isValidPhone = (v) => MOBILE.test(cleanPhone(v)) || KHI_LANDLINE.test(cleanPhone(v));

// Returns "" when valid, otherwise the error message.
export const rules = {
  name: (v) => (String(v).trim().length < 2 ? "Please enter your full name." : ""),
  phone: (v) => (!String(v).trim() ? "Please enter your phone number." : isValidPhone(v) ? "" : "Enter a valid number, e.g. 0300 1234567."),
  required: (label, min = 1) => (v) => (String(v).trim().length < min ? `Please enter ${label}.` : ""),
  futureDate: (label, { maxDays = 365 } = {}) => (v) => {
    if (!v) return `Please choose ${label}.`;
    if (v < toISODate()) return "That date has already passed.";
    if (v > toISODate(addDays(maxDays))) return "Please choose a nearer date.";
    return "";
  },
  oneOf: (label, list) => (v) => (list.includes(v) ? "" : `Please select ${label}.`),
};

// validate(values, { field: ruleFn }) -> { field: message } (only invalid fields)
export function validate(values, schema) {
  const errors = {};
  Object.entries(schema).forEach(([key, fn]) => {
    const msg = fn(values[key] ?? "", values);
    if (msg) errors[key] = msg;
  });
  return errors;
}
