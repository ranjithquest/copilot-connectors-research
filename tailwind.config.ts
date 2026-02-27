import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official Microsoft 365 Copilot brand palette
        "copilot-blue":   "#199FD7",
        "copilot-purple": "#8A50D8",
        "copilot-pink":   "#EE5091",
        "copilot-orange": "#FC7942",
        "copilot-green":  "#99BD3C",
        // Backgrounds
        "dark-bg":  "#080B12",
        "dark-bg2": "#0C1020",
        // Semantic
        "priority-high":   "#EE5091",
        "priority-medium": "#FC7942",
        "priority-low":    "#94A3B8",
      },
      fontFamily: {
        sans: ['"Segoe UI"', "system-ui", "-apple-system", "Arial", "sans-serif"],
      },
      boxShadow: {
        "glow-blue":   "0 0 40px rgba(25,159,215,0.2)",
        "glow-purple": "0 0 40px rgba(138,80,216,0.2)",
        "glow-pink":   "0 0 40px rgba(238,80,145,0.18)",
        card:          "0 2px 24px rgba(0,0,0,0.06)",
        "card-hover":  "0 10px 40px rgba(0,0,0,0.12)",
        "dark-card":   "0 4px 32px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
