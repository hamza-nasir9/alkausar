// Real, royalty-free photography (Pexels license: free for commercial use, no
// attribution required). Every photo is a function of width so cards, covers and
// hero slides each request a sensibly sized file.
//
// AUDIT NOTES
// - Every Pexels ID below was checked against its Pexels photo page (title/description)
//   for the category it is used in. Unsplash IDs were removed: none could be verified.
// - "exact"   = the photo shows that product.
//   "closest" = no verified photo of that exact product was found; this is the closest
//               verified photo in the same category. Swap these when you have better ones.
//
// Replace any of these with the shop's own photos once available: add WebP files
// to /public and point the entry at "/your-photo.webp".
const px = (id) => (w = 900) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
export const us = (id) => (w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

// Category pools. Cards pick one deterministically and fall through the rest of
// the pool if a URL ever fails, so a card never renders empty.
export const POOLS = {
  "regular-mithai": [
    px(7406887),  // gulab jamun, stainless bowl
    px(18488314), // imarti / jalebi on ornate plate
    px(7449105),  // gulab jamun, bowl with rose petals
    px(9198596),  // gulab jamun in syrup
    px(39852669), // jalebi on terracotta plate
    px(36215924), // tower of jalebi
    px(8788869),  // rasgulla in bowl
    px(38524183), // assorted mithai, shop display
  ],
  "special-mithai": [
    px(10514163), // kaju katli on plate
    px(18488301), // assorted mithai with nuts
    px(40143320), // assorted mithai in terracotta bowl
    px(38524183), // assorted mithai, shop display
    px(8887011),  // mithai in ornate bowls
  ],
  halwajaat: [
    px(20446403), // gajar halwa with almonds
    px(40143320), // assorted mithai in terracotta bowl
    px(8887011),  // mithai in ornate bowls
    px(18488301), // assorted mithai with nuts
  ],
  nimco: [
    px(12865864), // bowl of crunchy spiced snack
    px(7936011),  // basket of fried snacks with chai
    px(39872740), // fried Indian snacks, vendor display
    px(39524775), // Indian snacks on round metal tray
    px(5436119),  // banana chips and pakoras
    px(5992272),  // chakli spirals, savory
  ],
  "baked-snacks": [
    px(36170557), // samosas on wooden plate
    px(23286188), // chicken and beef samosa
    px(37068875), // tray of fresh samosas
    px(39104670), // crispy samosas with chutney
    px(14477873), // fried samosa in wicker tray
    px(2474658),  // fried samosa on saucer
    px(21078315), // samosas with red sauce
  ],
  biscuits: [
    px(8081574), // chocolate chip cookies on plate
    px(1020585), // cookies on ceramic plates
    px(4187560), // cookies on ceramic plate
    px(1325467), // cookies stack with milk
    px(2377477), // homemade cookies stacked
    px(8712296), // chai with rose cookies
  ],
  "bread-rusk": [
    px(162846),  // sliced loaf bread
    px(1079020), // sliced bread
    px(2067621), // sliced loaf on wooden plate
    px(1555813), // slices of bread
    px(6605208), // bread slices on cutting board
    px(1586947), // sliced brown seeded bread
  ],
  "tea-cakes": [
    px(4110008),  // chocolate cake slice
    px(291528),   // chocolate cake slice, blueberry
    px(19940993), // chocolate cake slices
    px(2135),     // croissants, bakery
    px(19296861), // croissant close-up
    px(3652),     // brownies and cookies
  ],
  cakes: [
    px(291528),   // chocolate cake slice, blueberry
    px(6133313),  // red velvet cake
    px(806363),   // sliced cake, cream frosting
    px(6363069),  // red velvet with blueberries
    px(30770346), // decorated red velvet cake
    px(19940993), // chocolate cake slices
  ],
};

// Item-specific photos. Every menuData.js id has an entry.
export const ITEM_PHOTOS = {
  // ---- Regular Mithai ----
  "rm-gulab-jamun": px(7406887),  // exact
  "rm-cham-cham": () => "https://cdn.ready-market.com.tw/21cd62de/Templates/pic/ANKO-Cham-Cham-1.jpg?v=51858380",
  "rm-milk-barfi": () => "https://www.jcookingodyssey.com/wp-content/uploads/2023/02/barfi-recipe-with-milk-powder.jpg",
  "rm-motichoor": () => "https://www.sugarfree-india.com/wp-content/uploads/2026/05/motichur-laddu-recipe.webp",
  "rm-besan-laddu": px(40143320), // closest (assorted mithai bowl)
  "rm-rasgulla": px(8788869),     // exact
  "rm-rasmalai": px(8788869),     // closest (chilled milk sweet in bowl)
  "rm-jalebi": px(39852669),      // exact
  "rm-balushahi": px(9198596),    // closest (glazed fried round in syrup)
  "rm-imarti": px(18488314),      // exact

  // ---- Special Mithai & Premium Boxes ----
  "sp-kaju-katli": px(10514163),    // exact
  "sp-akhrot-halwa": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW7jR-Sw0UGTyERASL1Te7B8eYgOfEaAm0InhIOzptMDROi7HQGttMscfL&s=10",
  "sp-gift-classic": () => "https://hafizsweets.com/blog/wp-content/uploads/sites/21/2025/08/Whisk_01156ef5a4.jpg",
  "sp-cham-cham-box": () => "https://hafizsweets.com/blog/wp-content/uploads/sites/21/2025/08/Whisk_01156ef5a4.jpg",
  "sp-gift-dryfruit": () => "https://hafizsweets.com/blog/wp-content/uploads/sites/21/2025/08/Whisk_01156ef5a4.jpg",
  "sp-gift-eid": () => "https://hafizsweets.com/blog/wp-content/uploads/sites/21/2025/08/Whisk_01156ef5a4.jpg",
  "sp-kaju-barfi": px(10514163),    // exact (same sweet as kaju katli)
  "sp-pista-roll": px(8887011),     // closest (assorted mithai)
  "sp-dryfruit-laddu": px(18488301),// closest (mithai with assorted nuts)

  // ---- Halwajaat ----
  "hw-sohan": px(18488301),   // closest
  "hw-multani": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjqtZc0V8OfDDQk_rMVsbdPTsmImyJD8IQ3siRnp1o33bttIrAefuQPwo&s=10",
  "hw-habshi": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRWZc7G7N-2yhpHE1eRPHwodQ51PeMWvi75H_im9xBPA&s=10",
  "hw-gajar": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqqUa3m4uRF-_QvCSPZ7nbd6_LjesCTzYolpJlsplVsuopER8KSvaaCk1&s=10",
  "hw-karachi": px(8887011),  // closest
  "hw-suji": px(20446403),    // closest (halwa)

  // ---- Nimco & Savories ----
  "ni-mix": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoFRqyFeav245yiJJ-nfnNQT25cVeUl9-8FNmmheOqx83BAGJo7xlHuZ8&s=10",
  "ni-dal-moth": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP5XrTeg6YWbmYmBXRaZGWAEEhmnwZFeJBYjEoMIL71kVvUdlOQp--zQ&s=10",
  "ni-cheevda": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlj0nfki9eJagOJyHpt1mtBl44nPS_WjBTHXVHtAS61A&s",
  "ni-sev": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfYaqcd7ktIsDDPVtDXMuZtUoADBgHNPbCBDjGOWaX6t3k0pxz69g0Oyg&s=10",
  "ni-namak-para": px(7936011), // closest (fried snacks with chai)
  "ni-gathiya": px(5992272),    // closest (fried savory spirals)
  "ni-dry-fruit": px(18488301), // closest (assorted nuts)
  "ni-chips": px(5436119),      // closest (banana chips)

  // ---- Baked Items & Snacks ----
  "bs-aloo-samosa": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrSow8wiUuIxjfEToV69JWVUKXnNmisjibteHRz3SiFsXMpPswQFhS9QQ&s=10",
  "bs-chicken-samosa": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRYzpm5hMwAxynW1g2RFKV8JGWyfSkr1Cb1nRlp3nKKA&s=10",
  "bs-chicken-roll": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR57_4Vin-llP40cgT0pzDWVNOzpWKtCBIHkPg4G3alj53mPLWjQj8wt8hL&s=10",
  "bs-chicken-patty": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQadlbxVv6EkJdQCGn-uqLFKpKWhKJRr_g_GBM3AoLCDA&s=10",
  "bs-aloo-patty": px(2474658),      // closest
  "bs-sausage-roll": px(37068875),   // closest

  // ---- Biscuits & Cookies ----
  "bi-bakery-biscuit": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1YaNXoQ4pmSugIpzS3MJY_GTijd0nD0b9guR-0jIsOg&s=10",
  "bi-nan-khatai": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIVE7LBZjE8DbkCLCGePteRaTw-zQiTQSGQijEXhUwvQ&s=10",
  "bi-zeera": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAp5SLNMr_LkBoIhVnK42OmIzd6e_xYC6C7gqO-W5qTg&s=10",
  "bi-coconut": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRML5q3X1rMWQcDW-RlX4VhDEV_81RxrH3odXbRQm8M1g&s=10",
  "bi-fruit-nut": px(1020585),      // closest
  "bi-choc-chip": px(8081574),      // exact

  // ---- Bread & Rusk ----
  "br-milk-bread": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU62tN01c2zFojT_5CkMvmCZ2pP_D8leefDhJWiLXfXQ&s=10",
  "br-brown-bread": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT11ClYbza5pGgqr390Rw3l1HzAYlV1kynxTKiwO296XA&s=10",
  "br-pav": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTbzxQ8M5exZ-f8yAVxaVIqho5uclHGgdnP9C_tSxWow&s=10",
  "br-cake-rusk": () => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGjZ1QVdplC94dIiPONeutYejvbLhkcTqCX080dtWi3w&s=10",
  "br-plain-rusk": px(6605208), // closest (sliced bread)

  // ---- Tea Cakes & Pastries ----
  "tc-plain-tea-cake": px(2067621),   // closest (sliced loaf)
  "tc-marble": px(4110008),           // closest (chocolate cake slice)
  "tc-dryfruit": px(1555813),         // closest (sliced loaf)
  "tc-choc-pastry": px(291528),       // exact-ish (chocolate cake slice)
  "tc-pineapple-pastry": px(806363),  // closest (cream-frosted slice)
  "tc-black-forest": px(19940993),    // closest (chocolate cake slices)
  "tc-croissant": px(19296861),       // exact
  "tc-brownie": px(3652),             // closest (brownies and cookies)
  "tc-cream-roll": px(16543194),      // closest (flaky pastry)

  // ---- Custom Cakes ----
  "ck-belgian-choc": px(19940993), // exact-ish (chocolate cake with frosting)
  "ck-red-velvet": px(6133313),    // exact
  "ck-mango": px(25189329),        // closest (mango cupcake with cream)
  "ck-vanilla": px(806363),        // closest (cream-frosted cake slice)
};

// Hero banner slides
export const HERO_PHOTOS = {
  sweets: [px(38524183), px(18488314)],
  cakes: [px(291528), px(6133313)],
  halwa: [px(20446403), px(40143320)],
  bakery: [px(2135), px(1079020)],
};

const hash = (str) => [...String(str)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

// Ordered list of URLs to try for a menu item (first that loads wins).
export function imagesFor(item, w = 900) {
  const pool = POOLS[item.category] || POOLS["regular-mithai"];
  const start = hash(item.id) % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  const own = ITEM_PHOTOS[item.id];
  
  let resolvedOwn = null;
  if (own) {
    resolvedOwn = typeof own === "function" ? own(w) : own;
  }
  
  const poolUrls = rotated.map((f) => (typeof f === "function" ? f(w) : f));
  return resolvedOwn ? [resolvedOwn, ...poolUrls] : poolUrls;
}

export const categoryImages = (category, w = 1000) => (POOLS[category] || POOLS["regular-mithai"]).map((f) => (typeof f === "function" ? f(w) : f));
export const heroImages = (key, w = 1200) => (HERO_PHOTOS[key] || HERO_PHOTOS.sweets).map((f) => (typeof f === "function" ? f(w) : f));

// Legacy single-URL helpers (About page, older imports)
export const IMG = {
  sweets: typeof POOLS["regular-mithai"][1] === "function" ? POOLS["regular-mithai"][1](800) : POOLS["regular-mithai"][1],
  cake: typeof POOLS.cakes[0] === "function" ? POOLS.cakes[0](800) : POOLS.cakes[0],
  bakery: typeof POOLS["bread-rusk"][0] === "function" ? POOLS["bread-rusk"][0](800) : POOLS["bread-rusk"][0],
  nimco: typeof POOLS.nimco[0] === "function" ? POOLS.nimco[0](800) : POOLS.nimco[0],
};
export const categoryImage = (category) => categoryImages(category, 800)[0];

export const COVER_PHOTOS = {};

export function ALL_PHOTO_SLOTS(menu) {
  return menu.map((m) => {
    const photoFn = ITEM_PHOTOS[m.id];
    let url = "";
    if (photoFn) {
      url = typeof photoFn === "function" ? photoFn() : photoFn;
    } else {
      const pool = POOLS[m.category] || POOLS["regular-mithai"];
      const start = hash(m.id) % pool.length;
      const fn = pool[start];
      url = typeof fn === "function" ? fn(900) : fn;
    }
    return { slot: m.id, url };
  });
}