/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"], // used for any local files you add to /public
    // Remote photos use the custom loader in src/lib/imageLoader.js; these entries only matter
    // if you ever use <Image> with a remote URL WITHOUT that loader.
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};
export default nextConfig;
