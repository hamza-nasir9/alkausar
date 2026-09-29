/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        cream: "#F9F9F9",       // soft off-white section background
        ink: "#2B160A",       // deep rich brown, primary text
        maroon: "#7A1425",    // burgundy accent
        gold: "#D4AF37",
        goldDeep: "#9A7B1C",  // darker gold for small text on white
        obsidian: "#2B160A",  // kept as alias of ink for any stray reference
        emerald: "#08241C",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gold-sheen": "linear-gradient(135deg,#8a6d1a 0%,#D4AF37 45%,#f3dc8a 60%,#D4AF37 100%)",
      },
    },
  },
  plugins: [],
};
