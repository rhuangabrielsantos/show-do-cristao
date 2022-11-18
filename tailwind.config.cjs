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
        'ballon-green': "url('/src/assets/ballon-green.png')",
        'ballon-purple-dark': "url('/src/assets/ballon-purple-dark.png')",
        'ballon-purple-light': "url('/src/assets/ballon-purple-light.png')",
        'ballon-rose': "url('/src/assets/ballon-rose.png')",
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
