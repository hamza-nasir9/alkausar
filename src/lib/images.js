// Real, royalty-free photography (Pexels license: free for commercial use, no
// attribution required; a few Unsplash fallbacks under the Unsplash license).
// Every photo is a function of width so cards, covers and hero slides each
// request a sensibly sized file.
//
// Replace any of these with the shop's own photos once available: add WebP files
// to /public and point the entry at "/your-photo.webp".
const px = (id) => (w = 900) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const us = (id) => (w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

const CHOC_CAKE = us("1578985545062-69928b1d9587");

// Category pools. Cards pick one deterministically and fall through the rest of
// the pool if a URL ever fails, so a card never renders empty.
export const POOLS = {
  "regular-mithai": [px(7406887), px(18488312), px(18488316), px(9198596), px(8887054), px(38524183), px(7449105)],
  "special-mithai": [px(18488310), px(18488299), px(18488311), px(18488301), px(8819258)],
  halwajaat: [px(18488301), px(18488306), px(18488316), px(8819257), px(5878321)],
  nimco: [px(39524792), px(39524786), px(39524791), us("1599490659213-e2b9527bd087")],
  "baked-snacks": [px(37153389), px(36170557), px(29037272), px(23286188), px(5031949), px(9027521), px(37068875)],
  biscuits: [px(10513887), px(17057406), px(39353245), px(31132630)],
  "bread-rusk": [px(38959004), px(28826563), px(30510114), px(27165963), px(3082785), px(14774815)],
  "tea-cakes": [px(39353245), px(17057406), px(15172563), px(31132630), px(35228372), px(7966005)],
  cakes: [CHOC_CAKE, px(35228372), us("1607478900766-efe13248b125"), us("1621303837174-89787a7d4729")],
};

// Item-specific photos where a matching picture exists.
const ITEM_PHOTOS = {
  "rm-gulab-jamun": px(7406887),
  "rm-jalebi": px(8887054),
  "rm-milk-barfi": px(18488299),
  "rm-besan-laddu": px(18488312),
  "sp-kaju-katli": px(18488310),
  "bs-aloo-samosa": px(37153389),
  "bs-chicken-samosa": px(23286188),
  "br-milk-bread": px(38959004),
  "br-brown-bread": px(28826563),
  "tc-brownie": px(31132630),
  "tc-croissant": px(7966005),
  "ck-belgian-choc": CHOC_CAKE,
};

// Hero banner slides
export const HERO_PHOTOS = {
  sweets: [px(18488311), px(18488312)],
  cakes: [CHOC_CAKE, px(35228372)],
  halwa: [px(18488301), px(18488310)],
  bakery: [px(3341067), px(10513887)],
};

const hash = (str) => [...String(str)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

// Ordered list of URLs to try for a menu item (first that loads wins).
export function imagesFor(item, w = 900) {
  const pool = POOLS[item.category] || POOLS["regular-mithai"];
  const start = hash(item.id) % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  const own = ITEM_PHOTOS[item.id];
  return (own ? [own, ...rotated] : rotated).map((f) => f(w));
}

export const categoryImages = (category, w = 1000) => (POOLS[category] || POOLS["regular-mithai"]).map((f) => f(w));
export const heroImages = (key, w = 1200) => (HERO_PHOTOS[key] || HERO_PHOTOS.sweets).map((f) => f(w));

// Legacy single-URL helpers (About page, older imports)
export const IMG = {
  sweets: POOLS["regular-mithai"][1](800),
  cake: POOLS.cakes[0](800),
  bakery: POOLS["bread-rusk"][0](800),
  nimco: POOLS.nimco[0](800),
};
export const categoryImage = (category) => categoryImages(category, 800)[0];
