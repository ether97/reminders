/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./node_modules/@my-company/tailwind-components/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "#082f49",
        lightbackground: "#075985",
        darkbackground: "#172554",
        lightestbackground: "#a5f3fc",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        slide: {
          from: { opacity: 1 },
          to: { display: "none", transform: "translateX(-1000px)" },
        },
        enlarge: {
          "0%, 100%": { background: "#082f49" },
          "50%": { background: "#075985" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slide: "slide 1s ease-out",
        enlarge: "enlarge 2s ease-in-out infinite ",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
