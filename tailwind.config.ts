import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Strict palette: black, white, gold. Grays are opacities of white.
        brand: {
          black: "#0a0a0a",
          deep: "#101010",
          charcoal: "#181818",
          gold: "#D4AF37",
          "gold-light": "#E8C97A",
          "gold-dark": "#A88B2C",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider: "0.08em",
        widest: "0.2em",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #E8C97A 0%, #D4AF37 50%, #A88B2C 100%)",
      },
      boxShadow: {
        gold: "0 0 30px -8px rgba(212, 175, 55, 0.4)",
        "gold-lg": "0 0 60px -12px rgba(212, 175, 55, 0.5)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        shimmer: "shimmer 3s ease-in-out infinite",
        "mesh-shift": "meshShift 20s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        meshShift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(2%, -3%) scale(1.05)" },
          "66%": { transform: "translate(-2%, 2%) scale(0.97)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
