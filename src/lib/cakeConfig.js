export const FLAVORS = [
  { id: "choc", name: "Belgian Dark Chocolate", perLb: 2400, sponge: "#3b1f14", frosting: "#2a140d", filling: "#e9d8b8", note: "Rich cocoa sponge, dark ganache" },
  { id: "velvet", name: "Red Velvet", perLb: 2200, sponge: "#8e1b23", frosting: "#f6eddc", filling: "#fbf4e4", note: "Crimson crumb, cream cheese frosting" },
  { id: "vanilla", name: "Vanilla Bean", perLb: 1700, sponge: "#efdcae", frosting: "#fbf4e4", filling: "#e8c98a", note: "Bean-flecked sponge, whipped cream" },
  { id: "mango", name: "Mango Delight", perLb: 2000, sponge: "#f2b13c", frosting: "#f8dc8f", filling: "#fbf4e4", note: "Fresh mango cream, vanilla sponge" },
];

// One-tap ideas for the "type your own cake name / flavour" field.
export const CAKE_SUGGESTIONS = ["Chocolate Fudge", "Red Velvet", "Black Forest", "Pineapple", "Mango Delight", "Butterscotch", "Vanilla Bean", "Custom Design Cake"];

export const SIZES = [1.5, 2, 3, 5]; // lbs

export const LAYERS = [
  { id: 1, label: "Single tier", mult: 1 },
  { id: 2, label: "Double tier", mult: 1.6 },
  { id: 3, label: "Triple tier", mult: 2.2 },
];

export const TOPPINGS = [
  { id: "gold", name: "Edible Gold Leaf", price: 900 },
  { id: "berries", name: "Fresh Berries", price: 700 },
  { id: "sprinkles", name: "Colour Sprinkles", price: 350 },
];

export const PIPING_PRICE = 300;
export const MAX_TEXT = 30;

export const radiusFor = (size) => 0.55 + size * 0.2;

export function calcPrice({ flavorId, size, layers, toppings = [], text = "" }) {
  const flavor = FLAVORS.find((f) => f.id === flavorId);
  const layer = LAYERS.find((l) => l.id === layers);
  if (!flavor || !layer || !SIZES.includes(size)) return null;
  const cake = flavor.perLb * size;
  const withLayers = cake * layer.mult;
  const toppingsTotal = TOPPINGS.filter((t) => toppings.includes(t.id)).reduce((s, t) => s + t.price, 0);
  const piping = String(text).trim() ? PIPING_PRICE : 0;
  const round10 = (n) => Math.round(n / 10) * 10;
  return {
    cake: round10(cake),
    layerExtra: round10(withLayers - cake),
    toppings: toppingsTotal,
    piping,
    total: round10(withLayers) + toppingsTotal + piping,
  };
}
