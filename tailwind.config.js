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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
