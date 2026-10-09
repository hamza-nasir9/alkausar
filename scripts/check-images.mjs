// Usage: npm run check:images
// 1) fails if any photo URL is used by more than one slot (offline check)
// 2) fails if a menu item points at a photo id that doesn't exist (typo in id)
// 3) sends a HEAD request to every photo and reports dead links (needs internet)
import { ALL_PHOTO_SLOTS, ITEM_PHOTOS } from "../src/lib/images.js";
import { MENU } from "../src/lib/menuData.js";

const slots = ALL_PHOTO_SLOTS(MENU);
let failed = false;

const seen = new Map();
for (const s of slots) {
  const key = s.url.split("?")[0];
  if (seen.has(key)) {
    failed = true;
    console.error(`DUPLICATE: ${s.slot} and ${seen.get(key)} use ${key}`);
  } else seen.set(key, s.slot);
}

const ids = new Set(MENU.map((m) => m.id));
for (const id of Object.keys(ITEM_PHOTOS)) {
  if (!ids.has(id)) {
    failed = true;
    console.error(`UNKNOWN ITEM: "${id}" is in ITEM_PHOTOS but not in the menu`);
  }
}

const missing = MENU.filter((m) => !ITEM_PHOTOS[m.id]);
if (missing.length) console.warn(`NO PHOTO (${missing.length}): ${missing.map((m) => m.id).join(", ")}`);

if (!process.argv.includes("--offline")) {
  const results = await Promise.all(
    slots.map(async (s) => {
      try {
        const r = await fetch(s.url, { method: "HEAD", redirect: "follow" });
        return { ...s, ok: r.ok, status: r.status };
      } catch (e) {
        return { ...s, ok: false, status: "network error" };
      }
    })
  );
  for (const r of results.filter((x) => !x.ok)) {
    failed = true;
    console.error(`DEAD LINK (${r.status}): ${r.slot} -> ${r.url}`);
  }
  console.log(`${results.filter((r) => r.ok).length}/${results.length} photo links reachable`);
}

console.log(failed ? "\nImage check FAILED" : "\nImage check passed: no duplicates, no unknown items");
process.exit(failed ? 1 : 0);
