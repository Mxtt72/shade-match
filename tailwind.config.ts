import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F5F0EA",
        sand: "#E7D9CC",
        stone: "#B9A6A0",
        espresso: "#352B2A",
        mocha: "#2A221F",
        blush: "#D9A8A0",
        olive: "#A39A7A",
        gold: "#CDB48A",
      },
      boxShadow: {
        luxe: "0 20px 40px rgba(31, 22, 18, 0.12)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config;
