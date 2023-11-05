import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        w: "#f4f4f5",
        db: "#293064",
        b: "#6f87c0",
        dg: "#7d8e9c",
        g: "#bfbec0",
        pr: "#ccb8d6",
        w2: "#fefbff",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
