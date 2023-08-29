/** @type {import('tailwindcss').Config} */

const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    white: "#ffffff",
      "main-white": "#f3e6e6",
      "dark-blue": "#171634",
      "dark-bluel": "#1f1e44",

      // blue: "#1E88E5",
      red: "#F44336",
      green: "#4CAF50",
      yellow: "#FFEB3B",
      black: "#000000",
      grey: "#2A2929FF",
      "dark-grey": "#1e293b",
      "cool-red": "#de8a83",
      "cool-green": "#8adec2",
      "slate-800": "#1e293b",
      "slate-700": "#334155",
      "purple-one": "#f4f0fa",
      "purple-two": "#e5d9f2",
      "purple-three": "#cdc1ff",
      "purple-four": "#8b7bde",
      "purple-five": "#7371fc"
  }
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      li: "350px",
      sm: "480px",
      md: "768px",
      tables: "960px",
      desktop: "1248px",
    },
    boxShadow: {
      sm: "0, 2px 4px 0px rgba(11.10.55.15)",
      lg: "0, 8px 20px 0px rgba(18, 16, 99, 0.06)",
    },
    fontSize: {
      xs: ["14px", { lineHeight: "24px", letterSpacing: "-0.03em" }],
      sm: ["16px", { lineHeight: "28px", letterSpacing: "-0.03em" }],
      lg: ["18px", { lineHeight: "28px", letterSpacing: "-0.03em" }],
      "2lg": ["24px", { lineHeight: "28px", letterSpacing: "-0.03em" }],
      "2xl": ["36px", { lineHeight: "48px", letterSpacing: "-0.032em" }],
      "3xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.032em" }],
      "4xl": ["56px", { lineHeight: "64px", letterSpacing: "-0.032em" }],
      "5xl": ["80px", { lineHeight: "80px", letterSpacing: "-0.032em" }],
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      KulimPark: ["Kulim Park", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}

