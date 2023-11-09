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
        dpr: "#B19BBD ",
        w2: "#fefbff",
      },
      fontFamily: {
        PPGoshaReg: ["PPGoshaReg", "sans-serif"],
        PPGoshaBold: ["PPGoshaBold", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            secondary: {
              DEFAULT: "#ccb8d6",
            },
            pastelblue: {
              DEFAULT: "#6f87c0",
            },
          },
        },
      },
    }),
  ],
};
