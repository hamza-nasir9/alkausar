import { MENU, CATEGORIES } from "@/lib/menuData";
import { ITEM_PHOTOS, COVER_PHOTOS, HERO_PHOTOS, ALL_PHOTO_SLOTS, imagesFor } from "@/lib/images";

// Internal review page: every product next to the photo it uses, with duplicates and
// missing photos flagged. Not indexed. Delete this folder before launch if you prefer.
export const metadata = { title: "Image audit", robots: { index: false, follow: false } };

export default function ImageAudit() {
  const slots = ALL_PHOTO_SLOTS(MENU);
  const count = new Map();
  slots.forEach((s) => count.set(s.url.split("?")[0], (count.get(s.url.split("?")[0]) || 0) + 1));
  const dupes = [...count.entries()].filter(([, n]) => n > 1);
  const missing = MENU.filter((m) => !ITEM_PHOTOS[m.id]);
  const label = (id) => CATEGORIES.find((c) => c.id === id)?.label || id;

  return (
    <div className="min-h-dvh bg-paper px-5 pb-24 pt-32 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-4xl text-ink">Image audit</h1>
        <p className="mt-2 text-sm text-ink/60">
          {MENU.length} products, {Object.keys(ITEM_PHOTOS).length} with a photo, {Object.keys(COVER_PHOTOS).length} cover and {Object.keys(HERO_PHOTOS).length} hero photos.
          Duplicate photos: <strong className={dupes.length ? "text-red-600" : "text-green-700"}>{dupes.length}</strong>.
        </p>

        <h2 className="mt-10 font-display text-2xl text-ink">Products</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MENU.map((m) => {
            const src = imagesFor(m, 500)[0];
            return (
              <figure key={m.id} className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={m.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                ) : (
                  <div className="grid aspect-[4/3] place-items-center bg-cream text-xs uppercase tracking-widest text-red-600">No photo yet</div>
                )}
                <figcaption className="p-3 text-sm">
                  <p className="font-display text-lg text-ink">{m.name}</p>
                  <p className="text-xs text-ink/50">{label(m.category)} · {m.id}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <h2 className="mt-12 font-display text-2xl text-ink">No photo yet ({missing.length})</h2>
        <p className="mt-2 text-sm text-ink/60">These show a branded gradient on the site. Add one unique line each in <code>src/lib/images.js</code>.</p>
        <ul className="mt-3 columns-2 text-sm text-ink/80 sm:columns-3">
          {missing.map((m) => (
            <li key={m.id}><code>{m.id}</code> · {m.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
