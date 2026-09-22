import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e6fff4",
          100: "#b3ffdd",
          200: "#80ffc6",
          300: "#4dffaf",
          400: "#00f090", // High-voltage vibrant mint
          500: "#00d67d",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#043829",
          950: "#021c14",
        },
        gold: {
          300: "#fde047",
          400: "#facc15",
          500: "#f59e0b",
          600: "#d97706",
        },
        dark: {
          950: "#05070a",
          900: "#07090e",
          850: "#0b0f17",
          800: "#101623",
          750: "#161e30",
          700: "#1d273e",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        heading: ["var(--font-heading)", "Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
