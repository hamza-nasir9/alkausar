export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || "923182736676";
const API = process.env.NEXT_PUBLIC_API_URL;

export const formatPKR = (n) => "Rs. " + Number(n || 0).toLocaleString("en-PK");

export function formatWhatsAppMessage(items, total, customer = {}) {
  const lines = ["*New Order - Al Kausar Bakers Sweets & Nimco*", "------------------------------"];
  items.forEach((it, i) => {
    lines.push(`${i + 1}. *${it.name}*`);
    if (it.weight) lines.push(`   Size/Weight: ${it.weight}`);
    lines.push(`   Qty: ${it.qty} x ${formatPKR(it.price)} = ${formatPKR(it.price * it.qty)}`);
    if (it.custom) {
      Object.entries(it.custom).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") lines.push(`   ${k}: ${Array.isArray(v) ? v.join(", ") : v}`);
      });
    }
  });
  lines.push("------------------------------", `*Total: ${formatPKR(total)}*`);
  if (customer.name) lines.push(`Name: ${customer.name}`);
  if (customer.address) lines.push(`Address: ${customer.address}`);
  if (customer.note) lines.push(`Note: ${customer.note}`);
  lines.push("", "Please confirm availability and delivery time. Thank you!");
  return lines.join("\n");
}

export const buildWhatsAppUrl = (items, total, customer) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formatWhatsAppMessage(items, total, customer))}`;

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
