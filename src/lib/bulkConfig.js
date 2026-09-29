export const OCCASIONS = ["Wedding", "Walima / Reception", "Eid", "Corporate Event", "Birthday", "Other"];

export const PACKAGING = [
  { id: "standard", name: "Standard Box", extra: 0, note: "Our regular mithai box" },
  { id: "premium", name: "Premium Gift Box", extra: 150, note: "Gold-foil box, ribbon-tied" },
  { id: "branded", name: "Custom Branding", extra: 300, note: "Names / logo printed on the box, min. 10 boxes" },
];

export const MIN_KG = 1;
export const MAX_KG = 200;

// Mithai categories that can be ordered by weight for events (only "kg" items).
export const BULK_GROUPS = [
  { id: "regular-mithai", label: "Regular Mithai" },
  { id: "special-mithai", label: "Special Mithai" },
  { id: "halwajaat", label: "Halwajaat" },
  { id: "nimco", label: "Nimco & Savories" },
];
export const MAX_CUSTOM_ROWS = 6;
export const MAX_KG_PER_ITEM = 200;
