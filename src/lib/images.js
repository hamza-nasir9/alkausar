// Product photography uses distinct, royalty-free Pexels photos wherever possible.
// Pexels' CDN resizes/compresses the images at request time, keeping the project light.
const px = (id) => (w = 900) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const us = (id) => (w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

const CHOC_CAKE = us("1578985545062-69928b1d9587");

// Every MENU product has its own explicit image assignment. Do not replace this
// with category-based hashing: that caused unrelated products to share photos.
// Photo sources are Pexels free-stock photos or Unsplash photos; verify each
// image visually if the product catalogue is updated in the future.
const ITEM_PHOTOS = {
  // Regular Mithai
  "rm-gulab-jamun": px(7406887),
  "rm-cham-cham": px(18488316),
  "rm-milk-barfi": px(18488299),
  "rm-motichoor": px(18488312),
  "rm-besan-laddu": px(18488297),
  "rm-rasgulla": px(8788869),
  "rm-rasmalai": px(39973385),
  "rm-jalebi": px(8887054),
  "rm-balushahi": px(38524183),
  "rm-imarti": px(7449105),

  // Special Mithai & Gift Boxes
  "sp-kaju-katli": px(10514163),
  "sp-akhrot-halwa": px(8819257),
  "sp-gift-classic": px(19151511),
  "sp-cham-cham-box": px(18488305),
  "sp-gift-dryfruit": px(18488310),
  "sp-gift-eid": px(18488319),
  "sp-kaju-barfi": px(7182054),
  "sp-pista-roll": px(18488311),
  "sp-dryfruit-laddu": px(36376517),

  // Halwajaat
  "hw-sohan": px(5878321),
  "hw-multani": px(8819258),
  "hw-habshi": px(20689161),
  "hw-gajar": px(35782620),
  "hw-karachi": px(18488306),
  "hw-suji": px(9951856),

  // Nimco & Savories
  "ni-mix": px(39524792),
  "ni-dal-moth": px(39524786),
  "ni-cheevda": px(39524791),
  "ni-sev": us("1599490659213-e2b9527bd087"),
  "ni-namak-para": px(5031949),
  "ni-gathiya": px(9027521),
  "ni-dry-fruit": px(6928273),
  "ni-chips": px(37068875),

  // Baked Items & Snacks
  "bs-aloo-samosa": px(37153389),
  "bs-chicken-samosa": px(23286188),
  "bs-chicken-roll": px(30731483),
  "bs-chicken-patty": px(36170557),
  "bs-aloo-patty": px(9787524),
  "bs-sausage-roll": px(19498989),

  // Biscuits & Cookies
  "bi-bakery-biscuit": px(10513887),
  "bi-nan-khatai": px(17057406),
  "bi-zeera": px(39353245),
  "bi-coconut": px(31132630),
  "bi-fruit-nut": px(30510114),
  "bi-choc-chip": px(15172563),

  // Bread & Rusk
  "br-milk-bread": px(38959004),
  "br-brown-bread": px(28826563),
  "br-pav": px(14931404),
  "br-cake-rusk": px(3082785),
  "br-plain-rusk": px(27165963),

  // Tea Cakes & Pastries
  "tc-plain-tea-cake": px(35228372),
  "tc-marble": px(37020184),
  "tc-dryfruit": px(19499002),
  "tc-choc-pastry": px(3341067),
  "tc-pineapple-pastry": px(17593891),
  "tc-black-forest": px(29037272),
  "tc-croissant": px(7966005),
  "tc-brownie": px(39074559),
  "tc-cream-roll": px(27969779),

  // Custom Cakes
  "ck-belgian-choc": CHOC_CAKE,
  "ck-red-velvet": us("1607478900766-efe13248b125"),
  "ck-mango": us("1621303837174-89787a7d4729"),
  "ck-vanilla": px(30177790),

  // Regular cakes
  "rc-plain": us("1571115177098-24ec42ed204d"),
  "rc-chocolate": us("1535141192574-5d4897c12636"),
  "rc-pineapple": us("1464349095431-e9a21285b5f3"),
  "rc-black-forest": us("1565958011703-44f9829ba187"),

  // Special cakes
  "sc-lotus": us("1558636508-e0db3814bd1d"),
  "sc-three-milk": px(18488314),
  "sc-oreo": us("1578985545062-69928b1d9587"),
  "sc-red-velvet": us("1588195538326-c5b1e9f80a1b"),
};

// Category and hero photography is kept separate from the product catalogue.
// These are section-cover images, not substitutes for individual product photos.
export const POOLS = {
  "regular-mithai": [px(18488319), px(7406887), px(18488312), px(9198596), px(8887054)],
  "special-mithai": [px(10514163), px(18488305), px(19151511), px(18488310)],
  halwajaat: [px(8819257), px(5878321), px(9951856), px(5864767)],
  nimco: [us("1599490659213-e2b9527bd087"), px(39524792), px(39524786), px(39524791)],
  "baked-snacks": [px(30731483), px(37153389), px(23286188), px(9787524), px(19498989)],
  biscuits: [px(10511210), px(5878306), px(8200656), px(12864004)],
  "bread-rusk": [px(38959004), px(28826563), px(14931404), px(3082785), px(27165963)],
  "tea-cakes": [px(35228372), px(37020184), px(27969779), px(39074559), px(7966005)],
  cakes: [CHOC_CAKE, us("1607478900766-efe13248b125"), us("1621303837174-89787a7d4729"), px(27911705)],
  "regular-cakes": [px(30177790), px(17593891), px(29037272), us("1578985545062-69928b1d9587")],
  "special-cakes": [px(27911705), px(3341067), us("1607478900766-efe13248b125"), us("1621303837174-89787a7d4729")],
};

export const HERO_PHOTOS = {
  sweets: [px(18488319), px(18488305)],
  cakes: [CHOC_CAKE, us("1607478900766-efe13248b125")],
  halwa: [px(8819257), px(9951856)],
  bakery: [px(17593891), px(10511210)],
};

// Each product now resolves to its own explicit image. No category-pool rotation.
export function imagesFor(item, w = 900) {
  const image = ITEM_PHOTOS[item?.id];
  return image ? [image(w)] : [];
}

export const categoryImages = (category, w = 1000) => (POOLS[category] || POOLS["regular-mithai"]).map((f) => f(w));
export const heroImages = (key, w = 1200) => (HERO_PHOTOS[key] || HERO_PHOTOS.sweets).map((f) => f(w));

export const IMG = {
  sweets: POOLS["regular-mithai"][0](800),
  cake: POOLS.cakes[0](800),
  bakery: POOLS["bread-rusk"][0](800),
  nimco: POOLS.nimco[0](800),
};
export const categoryImage = (category) => categoryImages(category, 800)[0];
