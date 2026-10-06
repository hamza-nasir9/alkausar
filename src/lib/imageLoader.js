// Custom next/image loader for the Pexels / Unsplash photos in lib/images.js.
//
// Both CDNs resize on the fly (?w=), so we ask THEM for the exact width the browser
// needs. You still get a responsive srcset + `sizes` handling, but nothing is routed
// through Vercel's image optimiser, so it never counts toward Vercel's image quota.
export default function remoteLoader({ src, width, quality }) {
  try {
    const url = new URL(src);
    if (url.hostname === "images.pexels.com") {
      url.searchParams.set("auto", "compress");
      url.searchParams.set("cs", "tinysrgb");
      url.searchParams.set("w", String(width));
      return url.toString();
    }
    if (url.hostname === "images.unsplash.com") {
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "crop");
      url.searchParams.set("q", String(quality || 75));
      url.searchParams.set("w", String(width));
      return url.toString();
    }
  } catch (e) {}
  return src;
}
