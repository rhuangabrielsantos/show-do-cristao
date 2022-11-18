const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        paper: "url('/src/assets/background.jpg')",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ...colors,
    },
    fontFamily: {
      roboto: ["Roboto", "ui-sans-serif", "system-ui"],
      acme: ["Acme", "ui-sans-serif", "system-ui"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-dracula")()],
};
