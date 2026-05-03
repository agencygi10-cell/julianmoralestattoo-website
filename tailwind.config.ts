import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0a0a0a",
          deep: "#141414",
          charcoal: "#1f1f1f",
          ash: "#2a2a2a",
          gold: "#D4AF37",
          "gold-light": "#E8C97A",
          "gold-dark": "#A88B2C",
          cream: "#F5E9C8",
          text: "#E5E5E5",
          muted: "#A0A0A0",
          dim: "#707070",
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
        "gold-radial":
          "radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        gold: "0 0 30px -8px rgba(212, 175, 55, 0.4)",
        "gold-lg": "0 0 60px -12px rgba(212, 175, 55, 0.5)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "shimmer": "shimmer 3s ease-in-out infinite",
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
      },
    },
  },
  plugins: [],
};

export default config;
