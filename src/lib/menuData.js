export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "regular-mithai", label: "Regular Mithai" },
  { id: "special-mithai", label: "Special Mithai & Boxes" },
  { id: "halwajaat", label: "Halwajaat" },
  { id: "nimco", label: "Nimco & Savories" },
  { id: "baked-snacks", label: "Baked Items & Snacks" },
  { id: "biscuits", label: "Biscuits & Cookies" },
  { id: "bread-rusk", label: "Bread & Rusk" },
  { id: "tea-cakes", label: "Tea Cakes & Pastries" },
  { id: "cakes", label: "Custom Cakes" },
  { id: "regular-cakes", label: "Regular Cakes" },
  { id: "special-cakes", label: "Special Cakes" },
];

// Item price is per 1x unit: 500g for "kg", 1 lb for "cake", 1 piece for "piece", 1 box for "box".
export const WEIGHT_SETS = {
  kg: [
    { label: "250g", mult: 0.5 },
    { label: "500g", mult: 1 },
    { label: "1kg", mult: 2 },
  ],
  cake: [
    { label: "1 lb", mult: 1 },
    { label: "2 lb", mult: 2 },
    { label: "3 lb", mult: 3 },
  ],
  piece: [
    { label: "1 pc", mult: 1 },
    { label: "4 pcs", mult: 4 },
    { label: "6 pcs", mult: 6 },
    { label: "12 pcs", mult: 12 },
  ],
  box: [
    { label: "1 box", mult: 1 },
    { label: "2 boxes", mult: 2 },
    { label: "5 boxes", mult: 5 },
  ],
};

export const UNIT_LABEL = { kg: "per 500g", cake: "per lb", piece: "per piece", box: "per box" };

// Placeholder PKR prices. Replace with your real menu, then copy this file to backend/data/menu.js.
export const MENU = [
  // ---- Regular Mithai ----
  { id: "rm-gulab-jamun", name: "Gulab Jamun", category: "regular-mithai", set: "kg", price: 1400, tag: "Bestseller", desc: "Soft khoya rounds soaked in cardamom syrup.", hue: ["#8a3b12", "#2B090A"] },
  { id: "rm-cham-cham", name: "Cham Cham", category: "regular-mithai", set: "kg", price: 1500, desc: "Oval milk sweets in light syrup, finished with coconut.", hue: ["#f1d9c0", "#7a4a1c"] },
  { id: "rm-milk-barfi", name: "Milk Barfi", category: "regular-mithai", set: "kg", price: 1700, desc: "Classic dense milk fudge, lightly sweet and creamy.", hue: ["#efe2c4", "#3a2a08"] },
  { id: "rm-motichoor", name: "Motichoor Laddu", category: "regular-mithai", set: "kg", price: 1500, desc: "Tiny pearls of besan and saffron pressed by hand.", hue: ["#d9822b", "#3d1a05"] },
  { id: "rm-besan-laddu", name: "Besan Laddu", category: "regular-mithai", set: "kg", price: 1400, desc: "Slow-roasted gram flour laddu with a nutty aroma.", hue: ["#d99a2a", "#3a2a08"] },
  { id: "rm-rasgulla", name: "Rasgulla", category: "regular-mithai", set: "kg", price: 1300, desc: "Spongy chilled milk-cheese balls in sugar syrup.", hue: ["#f6efe0", "#9c7a3a"] },
  { id: "rm-rasmalai", name: "Rasmalai", category: "regular-mithai", set: "kg", price: 1800, tag: "Fresh daily", desc: "Chilled milk-cheese discs in thickened pistachio milk.", hue: ["#e8d9b5", "#08241C"] },
  { id: "rm-jalebi", name: "Jalebi", category: "regular-mithai", set: "kg", price: 900, desc: "Crisp golden spirals dipped in saffron syrup.", hue: ["#e59a1f", "#5a2a05"] },
  { id: "rm-balushahi", name: "Balushahi", category: "regular-mithai", set: "kg", price: 1200, desc: "Flaky fried rounds glazed with sugar syrup.", hue: ["#c98a3a", "#3a1f08"] },
  { id: "rm-imarti", name: "Imarti", category: "regular-mithai", set: "kg", price: 1000, desc: "Lentil-batter flowers fried crisp and soaked in syrup.", hue: ["#d9701f", "#3d1a05"] },

  // ---- Special Mithai & Premium Boxes ----
  { id: "sp-kaju-katli", name: "Kaju Katli", category: "special-mithai", set: "kg", price: 2800, tag: "Premium", desc: "Diamond-cut cashew fudge with a silky finish.", hue: ["#c9a24a", "#3a2a08"] },
  { id: "sp-akhrot-halwa", name: "Akhrot Halwa", category: "special-mithai", set: "kg", price: 3000, tag: "Special", desc: "Rich walnut halwa, slow-cooked in ghee.", hue: ["#7a4a1c", "#1a0d04"] },
  { id: "sp-gift-classic", name: "Classic Mithai Gift Box", category: "special-mithai", set: "box", price: 1800, tag: "Gift Pack", desc: "An assortment of our classic mithai in a neat gift box.", hue: ["#d4af37", "#5a3a08"] },
  { id: "sp-cham-cham-box", name: "Special Cham Cham Mithai Box", category: "special-mithai", set: "box", price: 2200, tag: "Special Box", desc: "A gift-ready box of soft, coconut-finished cham cham sweets.", hue: ["#f1d9c0", "#7a4a1c"] },
  { id: "sp-gift-dryfruit", name: "Premium Dry Fruit Gift Box", category: "special-mithai", set: "box", price: 3500, tag: "Gift Pack", desc: "Dry fruit sweets and mixed nuts in a premium box.", hue: ["#a8742a", "#1a0d04"] },
  { id: "sp-gift-eid", name: "Eid Assorted Mithai Box", category: "special-mithai", set: "box", price: 2500, tag: "Festive", desc: "A festive selection made for Eid and family gatherings.", hue: ["#c2571a", "#2B090A"] },
  { id: "sp-kaju-barfi", name: "Kaju Barfi", category: "special-mithai", set: "kg", price: 2600, desc: "Smooth cashew barfi, lightly sweet and melt-in-mouth.", hue: ["#e8d9a5", "#3a2a08"] },
  { id: "sp-pista-roll", name: "Pista Roll", category: "special-mithai", set: "kg", price: 3200, desc: "Pistachio-filled rolls with a fine nutty crunch.", hue: ["#7c9a3a", "#1e2a08"] },
  { id: "sp-dryfruit-laddu", name: "Dry Fruit Laddu", category: "special-mithai", set: "kg", price: 2700, desc: "Almonds, cashews and pistachios bound into a rich laddu.", hue: ["#b07a30", "#2a1505"] },

  // ---- Halwajaat ----
  { id: "hw-sohan", name: "Sohn Halwa", category: "halwajaat", set: "kg", price: 2200, tag: "Signature", desc: "Slow-cooked, dense and nutty, made the traditional way.", hue: ["#7a4a1c", "#1a0d04"] },
  { id: "hw-multani", name: "Multani Halwa", category: "halwajaat", set: "kg", price: 2000, desc: "Soft, ghee-rich halwa with almonds and cardamom.", hue: ["#b5651d", "#2a1505"] },
  { id: "hw-habshi", name: "Habshi Halwa", category: "halwajaat", set: "kg", price: 2100, desc: "Deep, dark and chewy, a wedding-table classic.", hue: ["#3b1f14", "#0d0503"] },
  { id: "hw-gajar", name: "Gajar Ka Halwa", category: "halwajaat", set: "kg", price: 1600, desc: "Grated carrots simmered in milk and ghee with dry fruits.", hue: ["#c2571a", "#2B090A"] },
  { id: "hw-karachi", name: "Karachi Halwa", category: "halwajaat", set: "kg", price: 1500, desc: "Glossy, chewy cornflour halwa studded with nuts.", hue: ["#d9701f", "#5a1a05"] },
  { id: "hw-suji", name: "Suji Halwa", category: "halwajaat", set: "kg", price: 1300, desc: "Warm semolina halwa with ghee, sugar and raisins.", hue: ["#e0b040", "#5a3a08"] },

  // ---- Nimco & Savories ----
  { id: "ni-mix", name: "Mix Nimco", category: "nimco", set: "kg", price: 900, tag: "Bestseller", desc: "Crisp, spiced and endlessly snackable.", hue: ["#c2841c", "#2a1505"] },
  { id: "ni-dal-moth", name: "Dal Moth", category: "nimco", set: "kg", price: 850, desc: "Crunchy fried lentils tossed in salt and spice.", hue: ["#d9a84a", "#3a2a08"] },
  { id: "ni-cheevda", name: "Cheevda", category: "nimco", set: "kg", price: 900, desc: "Flattened-rice mix with peanuts, curry leaves and raisins.", hue: ["#c2841c", "#3a1f08"] },
  { id: "ni-sev", name: "Sev", category: "nimco", set: "kg", price: 800, desc: "Fine, crunchy gram-flour strands with a chilli kick.", hue: ["#d99a2a", "#2a1505"] },
  { id: "ni-namak-para", name: "Namak Para", category: "nimco", set: "kg", price: 800, desc: "Flaky, salty, perfect with chai.", hue: ["#d9a84a", "#3a2a08"] },
  { id: "ni-gathiya", name: "Gathiya", category: "nimco", set: "kg", price: 850, desc: "Gram flour ropes with a peppery finish.", hue: ["#e0b040", "#3a2a08"] },
  { id: "ni-dry-fruit", name: "Dry Fruit Mix", category: "nimco", set: "kg", price: 3200, desc: "Cashews, almonds, pistachios and raisins.", hue: ["#a8742a", "#1a0d04"] },
  { id: "ni-chips", name: "Potato Chips", category: "nimco", set: "kg", price: 700, desc: "Thin, crisp and lightly salted.", hue: ["#e8c060", "#5a3a08"] },

  // ---- Baked Items & Snacks ----
  { id: "bs-aloo-samosa", name: "Aloo Samosa", category: "baked-snacks", set: "piece", price: 40, tag: "Hot & fresh", desc: "Crisp pastry filled with spiced potato.", hue: ["#d99a4a", "#3a1f08"] },
  { id: "bs-chicken-samosa", name: "Chicken Samosa", category: "baked-snacks", set: "piece", price: 70, desc: "Golden samosa with a spiced chicken filling.", hue: ["#c98a3a", "#2a1505"] },
  { id: "bs-chicken-roll", name: "Chicken Roll", category: "baked-snacks", set: "piece", price: 120, desc: "Crumb-coated roll filled with seasoned chicken.", hue: ["#d9a04a", "#3a1f08"] },
  { id: "bs-chicken-patty", name: "Chicken Patty", category: "baked-snacks", set: "piece", price: 180, desc: "Buttery puff pastry with a spiced chicken filling.", hue: ["#c98a3a", "#2a1505"] },
  { id: "bs-aloo-patty", name: "Aloo Patty", category: "baked-snacks", set: "piece", price: 100, desc: "Flaky puff pastry with a spiced potato filling.", hue: ["#d9a84a", "#3a2a08"] },
  { id: "bs-sausage-roll", name: "Sausage Roll", category: "baked-snacks", set: "piece", price: 130, desc: "Puff pastry wrapped around a seasoned sausage.", hue: ["#c98a3a", "#3a1f08"] },

  // ---- Biscuits & Cookies ----
  { id: "bi-bakery-biscuit", name: "Bakery Biscuits", category: "biscuits", set: "kg", price: 700, desc: "Assorted tea-time biscuits baked fresh.", hue: ["#d9a84a", "#5a3a08"] },
  { id: "bi-nan-khatai", name: "Nan Khatai", category: "biscuits", set: "kg", price: 900, tag: "Traditional", desc: "Crumbly cardamom shortbread that melts in the mouth.", hue: ["#e8c98a", "#5a3a08"] },
  { id: "bi-zeera", name: "Zeera Biscuits", category: "biscuits", set: "kg", price: 800, desc: "Savory cumin biscuits with a buttery snap.", hue: ["#c98a3a", "#3a1f08"] },
  { id: "bi-coconut", name: "Coconut Biscuits", category: "biscuits", set: "kg", price: 850, desc: "Golden biscuits with toasted coconut.", hue: ["#efe2c4", "#7a4a1c"] },
  { id: "bi-fruit-nut", name: "Fruit & Nut Biscuits", category: "biscuits", set: "kg", price: 1100, desc: "Buttery biscuits with dry fruit pieces.", hue: ["#c9a24a", "#3a2a08"] },
  { id: "bi-choc-chip", name: "Chocolate Chip Cookies", category: "biscuits", set: "kg", price: 1200, desc: "Chewy centres with generous chocolate chips.", hue: ["#5a2a1a", "#1a0806"] },

  // ---- Bread & Rusk ----
  { id: "br-milk-bread", name: "Fresh Milk Bread", category: "bread-rusk", set: "piece", price: 140, tag: "Fresh daily", desc: "Soft sandwich loaf baked fresh every day.", hue: ["#e8c98a", "#5a3a08"] },
  { id: "br-brown-bread", name: "Brown Bread", category: "bread-rusk", set: "piece", price: 170, desc: "Wholesome brown loaf with a soft crumb.", hue: ["#a8742a", "#2a1505"] },
  { id: "br-pav", name: "Pav Buns", category: "bread-rusk", set: "piece", price: 30, desc: "Soft, pillowy buns, ideal for bun kabab and pav bhaji.", hue: ["#e0b070", "#5a3a08"] },
  { id: "br-cake-rusk", name: "Cake Rusk", category: "bread-rusk", set: "kg", price: 900, tag: "Bestseller", desc: "Twice-baked cake slices, crisp and made for chai.", hue: ["#d9a84a", "#5a3a08"] },
  { id: "br-plain-rusk", name: "Plain Rusk", category: "bread-rusk", set: "kg", price: 700, desc: "Light, crunchy rusk for dunking in tea.", hue: ["#e8c98a", "#7a4a1c"] },

  // ---- Tea Cakes & Pastries ----
  { id: "tc-plain-tea-cake", name: "Plain Tea Cake", category: "tea-cakes", set: "cake", price: 900, desc: "Simple, buttery loaf cake made for tea-time.", hue: ["#f0dfb5", "#7a4a1c"] },
  { id: "tc-marble", name: "Marble Tea Cake", category: "tea-cakes", set: "cake", price: 1000, desc: "Vanilla and cocoa swirled together.", hue: ["#c9a06a", "#3a1f08"] },
  { id: "tc-dryfruit", name: "Dry Fruit Tea Cake", category: "tea-cakes", set: "cake", price: 1300, desc: "Moist loaf loaded with nuts and dried fruit.", hue: ["#c2841c", "#3a1f08"] },
  { id: "tc-choc-pastry", name: "Chocolate Pastry", category: "tea-cakes", set: "piece", price: 220, desc: "Layered chocolate sponge and ganache.", hue: ["#4a2416", "#120805"] },
  { id: "tc-pineapple-pastry", name: "Pineapple Pastry", category: "tea-cakes", set: "piece", price: 200, desc: "Vanilla sponge with pineapple and fresh cream.", hue: ["#f2d36a", "#7a4a1c"] },
  { id: "tc-black-forest", name: "Black Forest Pastry", category: "tea-cakes", set: "piece", price: 240, desc: "Cocoa sponge, cherries and whipped cream.", hue: ["#5a1a1a", "#120805"] },
  { id: "tc-croissant", name: "Butter Croissant", category: "tea-cakes", set: "piece", price: 250, desc: "Flaky, golden and baked fresh every morning.", hue: ["#d99a4a", "#3a1f08"] },
  { id: "tc-brownie", name: "Walnut Brownie", category: "tea-cakes", set: "piece", price: 260, desc: "Fudgy centre, crackly top, toasted walnuts.", hue: ["#3b1f14", "#0d0503"] },
  { id: "tc-cream-roll", name: "Cream Roll", category: "tea-cakes", set: "piece", price: 150, desc: "Crisp puff shell filled with sweet vanilla cream.", hue: ["#e8c98a", "#3a2a08"] },

  // ---- Custom Cakes ----
  { id: "ck-belgian-choc", name: "Belgian Chocolate Cake", category: "cakes", set: "cake", price: 2400, tag: "Signature", desc: "Dark Belgian ganache over moist cocoa sponge.", hue: ["#5a2a1a", "#1a0806"] },
  { id: "ck-red-velvet", name: "Red Velvet Cake", category: "cakes", set: "cake", price: 2200, desc: "Velvety crimson layers with cream cheese frosting.", hue: ["#9b1c2b", "#2B090A"] },
  { id: "ck-mango", name: "Mango Delight Cake", category: "cakes", set: "cake", price: 2000, tag: "Seasonal", desc: "Fresh mango cream over vanilla sponge.", hue: ["#f2b13c", "#3d1a05"] },
  { id: "ck-vanilla", name: "Vanilla Bean Cake", category: "cakes", set: "cake", price: 1700, desc: "Light bean-flecked sponge with whipped vanilla cream.", hue: ["#f0dfb5", "#4a3a1a"] },

  // ---- Regular Cakes ----
  { id: "rc-plain", name: "Classic Vanilla Cake", category: "regular-cakes", set: "cake", price: 1500, desc: "Soft vanilla sponge finished with a light cream topping.", hue: ["#f0dfb5", "#7a4a1c"] },
  { id: "rc-chocolate", name: "Chocolate Cream Cake", category: "regular-cakes", set: "cake", price: 1800, desc: "Chocolate sponge layered with smooth chocolate cream.", hue: ["#5a2a1a", "#1a0806"] },
  { id: "rc-pineapple", name: "Pineapple Cake", category: "regular-cakes", set: "cake", price: 1700, desc: "Vanilla sponge, pineapple filling and fresh cream.", hue: ["#f2d36a", "#7a4a1c"] },
  { id: "rc-black-forest", name: "Black Forest Cake", category: "regular-cakes", set: "cake", price: 1900, desc: "Chocolate sponge with cream and cherry accents.", hue: ["#5a1a1a", "#120805"] },

  // ---- Special Cakes ----
  { id: "sc-lotus", name: "Lotus Biscoff Cake", category: "special-cakes", set: "cake", price: 2800, tag: "Special", desc: "Creamy cake finished with caramelised biscuit spread and crumb.", hue: ["#c9a06a", "#3a1f08"] },
  { id: "sc-three-milk", name: "Three Milk Cake", category: "special-cakes", set: "cake", price: 2600, tag: "Signature", desc: "Soft sponge soaked in a rich three-milk mixture.", hue: ["#f0dfb5", "#7a4a1c"] },
  { id: "sc-oreo", name: "Oreo Crunch Cake", category: "special-cakes", set: "cake", price: 2700, desc: "Chocolate sponge with cookies-and-cream filling and Oreo crumb.", hue: ["#5a2a1a", "#1a0806"] },
  { id: "sc-red-velvet", name: "Red Velvet Celebration Cake", category: "special-cakes", set: "cake", price: 2800, desc: "Red velvet layers with a smooth cream-cheese-style frosting.", hue: ["#9b1c2b", "#2B090A"] },
];
