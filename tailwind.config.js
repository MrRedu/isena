/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT')

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fcf3f7',
          100: '#fae9f1',
          200: '#f6d4e4',
          300: '#f1b0cd',
          400: '#e77fab',
          500: '#db598d',
          600: '#c93b6d',
          700: '#ad2954',
          800: '#8f2546',
          900: '#78233d',
          950: '#490e21',
        },
      },
    },
  },
  plugins: [],
}

module.exports = withMT(config)
