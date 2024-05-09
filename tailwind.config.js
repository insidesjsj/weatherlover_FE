/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'max': '639px'},
      'ml': {'max': '767px'},
      'lg': {'max': '1023px'},
      'xl': {'max': '1279px'},
      '2xl': {'max': '1535px'},
    },
    extend: {},
  },
  plugins: [],
}

