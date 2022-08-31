module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light': '#f5f5f5',
      },
    },
  },
  screens: {},
  variants: {
    extend: {}
  },
  plugins: []
};
