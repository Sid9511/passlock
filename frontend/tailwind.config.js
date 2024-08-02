const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require('tailwindcss/plugin')
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(56, 189, 248, 0.3), 0px 1px 0px 0px rgba(56, 189, 248, 0.1), 0px 0px 0px 1px rgba(56, 189, 248, 0.5`,
      },
      colors: {
        'met-grey': '#1e293b',
      },
    },
  },
  plugins: [addVariablesForColors,  plugin(function ({ addUtilities }) {
    addUtilities({
      '.scrollbar-none': {
        '&::-webkit-scrollbar': {
          'display': 'none'
        }
      }
    })
  }),], 
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}
