import { PAYMENT_METHODS, CITY } from "@/lib/checkoutConfig";
import { prettyDate } from "@/lib/validators";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || "923182736676";
const API = process.env.NEXT_PUBLIC_API_URL;

export const formatPKR = (n) => "Rs. " + Number(n || 0).toLocaleString("en-PK");

const LINE = "-----------------------------------------------";
const has = (v) => v !== undefined && v !== null && String(v).trim() !== "" && !(Array.isArray(v) && v.length === 0);
const val = (v) => (Array.isArray(v) ? v.join(", ") : String(v).trim());

// ---------------------------------------------------------------- helpers
export const waUrl = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// Opens WhatsApp in a new tab. Called straight from a click/submit handler so
// popup blockers allow it; if one blocks it anyway we fall back to same-tab.
export function openWhatsApp(text) {
  const url = waUrl(text);
  const w = window.open(url, "_blank");
  if (w) {
    w.opener = null;
    return true;
  }
  setTimeout(() => window.location.assign(url), 500);
  return false;
}

// ---------------------------------------------------------------- order
export const paymentLabel = (id) => PAYMENT_METHODS.find((p) => p.id === id)?.label || id;

export function formatOrderMessage(items, total, c = {}) {
  const address = [c.house, c.area, c.landmark && `Near ${c.landmark}`, CITY].filter(has).map(val).join(", ");
  const when = [c.date && prettyDate(c.date), c.slot].filter(Boolean).join(", ");

  const lines = [LINE, "🛍️ *NEW ORDER - AL KAUSAR BAKERS*", LINE, "👤 *Customer Details:*"];
  lines.push(`• Name: ${c.name || "-"}`);
  lines.push(`• Phone: ${c.phone || "-"}`);
  lines.push(`• Address: ${address || "-"}`);
  lines.push(`• Preferred Time: ${when || "-"}`);
  lines.push(`• Payment: ${paymentLabel(c.payment) || "-"}`);

  lines.push("", "📦 *Order Items:*");
  items.forEach((it) => {
    const lineTotal = it.price * it.qty;
    lines.push(`• ${it.qty}x ${it.name}${it.weight ? ` (${it.weight})` : ""} - ${formatPKR(lineTotal)}`);
    if (it.custom) {
      Object.entries(it.custom).forEach(([k, v]) => {
        if (has(v)) lines.push(`    ↳ ${k}: ${val(v)}`);
      });
    }
  });

  lines.push("", `📝 *Special Notes:* ${has(c.note) ? val(c.note) : "None"}`);
  lines.push(LINE, `💰 *Total Amount:* ${formatPKR(total)}`, LINE);
  return lines.join("\n");
}

// ---------------------------------------------------------------- contact
export function formatContactMessage({ name, phone, subject, message }) {
  return [
    LINE,
    "💬 *NEW QUERY - AL KAUSAR BAKERS*",
    LINE,
    "👤 *Customer Details:*",
    `• Name: ${name}`,
    `• Phone: ${phone}`,
    "",
    `📌 *Subject:* ${subject}`,
    "",
    "✉️ *Message:*",
    String(message).trim(),
    LINE,
  ].join("\n");
}

// ---------------------------------------------------------------- custom cake
export function formatCakeInquiry(d) {
  const lines = [LINE, "🎂 *CUSTOM CAKE REQUEST - AL KAUSAR BAKERS*", LINE, "👤 *Customer Details:*"];
  lines.push(`• Name: ${d.name}`, `• Phone: ${d.phone}`, `• Event / Needed By: ${prettyDate(d.date)}`);

  lines.push("", "🍰 *Cake Details:*");
  lines.push(`• Cake / Flavour Requested: ${has(d.requested) ? val(d.requested) : "Not specified"}`);
  lines.push(`• Base Flavour: ${d.flavor}`);
  lines.push(`• Weight: ${d.size} lbs`);
  lines.push(`• Tiers: ${d.layer}`);
  lines.push(`• Toppings: ${d.toppings?.length ? d.toppings.join(", ") : "None"}`);
  lines.push(`• Text on Cake: ${has(d.text) ? `"${val(d.text)}"` : "None"}`);

  lines.push("", `🎨 *Custom Design Notes:* ${has(d.notes) ? val(d.notes) : "None"}`);
  lines.push(LINE, `💰 *Estimated Price:* ${formatPKR(d.total)} (final price confirmed on WhatsApp)`, LINE);
  return lines.join("\n");
}

// ---------------------------------------------------------------- bulk mithai
export function formatBulkInquiry(d) {
  const lines = [LINE, "🍬 *BULK MITHAI INQUIRY - AL KAUSAR BAKERS*", LINE, "👤 *Customer Details:*"];
  lines.push(`• Name: ${d.name}`, `• Phone: ${d.phone}`, `• Occasion: ${d.occasion}`, `• Needed By: ${prettyDate(d.date)}`);

  lines.push("", `📦 *Sweets (${d.totalKg} kg total${d.targetKg ? `, planned ${d.targetKg} kg` : ""}):*`);
  d.sweets.forEach((s) => lines.push(`• ${s}`));
  if (d.custom?.length) {
    lines.push("", "✨ *Custom sweets (price on confirmation):*");
    d.custom.forEach((s) => lines.push(`• ${s}`));
  }
  lines.push("", `🎁 *Packaging:* ${d.packaging} x ${d.boxes} box(es)`);
  lines.push(`📝 *Special Notes:* ${has(d.notes) ? val(d.notes) : "None"}`);
  lines.push(LINE, `💰 *Estimated Total:* ${formatPKR(d.total)} (final price confirmed on WhatsApp)`, LINE);
  return lines.join("\n");
}

// Best-effort order log to the backend. Never blocks or breaks checkout.
export function logOrder(items, customer) {
  if (!API) return;
  try {
    fetch(`${API}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, customer }),
      keepalive: true,
    }).catch(() => {});
  } catch (e) {}
}
