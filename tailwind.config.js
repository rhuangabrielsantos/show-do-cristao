const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: {
        paper: "url('/src/assets/background.jpg')",
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...colors,
    },
    fontFamily: {
      roboto: ['Roboto', 'ui-sans-serif', 'system-ui'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-dracula')()],
};
