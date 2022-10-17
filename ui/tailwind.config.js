const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light': '#f5f5f5',
      }
    },
    screens: {
      'xs': '320px',
      ...defaultTheme.screens,
    },
  },
  screens: {},
  variants: {
    extend: {}
  },
  plugins: []
};
