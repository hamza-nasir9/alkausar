export default function NoiseOverlay() {
  const svg =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.17  0 0 0 0 0.09  0 0 0 0 0.04  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
    );
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80] opacity-[0.02] mix-blend-multiply" style={{ backgroundImage: `url("${svg}")` }} />
  );
}
