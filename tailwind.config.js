/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts}",
    "./js/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#08080a',
        onyx: '#040406',
        carbon: '#121317',
        graphite: '#1c1d22',
        slate: '#2e3038',
        smoke: '#464853',
        ash: '#5e616e',
        steel: '#777a88',
        fog: '#9194a1',
        mist: '#acafb9',
        silver: '#c7c9d1',
        bone: '#e2e3e9',
        'paper-white': '#ffffff',
        copper: '#cc9166',
        gilded: '#ae9357',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        card: '10px',
        pill: '9999px',
      },
      maxWidth: {
        slash: '1216px',
      }
    },
  },
  plugins: [],
}
