/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./js/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f5ca9',
        secondary: '#00E5FF',
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
