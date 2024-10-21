/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cerise': {
        50: '#fdf3f4',
        100: '#fbe8e9',
        200: '#f8d3d8',
        300: '#f1b0b9',
        400: '#e98393',
        500: '#dd566e',
        600: '#c9395a',
        700: '#a82848',
        800: '#8d2442',
        900: '#79223e',
        950: '#430e1e',
    },
      },
    },
  },
  plugins: [],
}


