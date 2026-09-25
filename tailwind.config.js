/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#071527", 900: "#0A1F33", 800: "#0F2C48", 700: "#163C5E" },
        blue: { 700: "#154A85", 600: "#1B5FA6", 500: "#2472C4" },
        ice: { 500: "#2FA4C4", 400: "#4FC3D9", 300: "#8FDCEA" },
        silver: { 400: "#9AA7B4", 300: "#C7CFD6", 200: "#E3E8EC", 100: "#F1F4F6" },
      },
      fontFamily: {
        display: ["Archivo", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      maxWidth: { content: "1200px" },
    },
  },
  plugins: [],
};
