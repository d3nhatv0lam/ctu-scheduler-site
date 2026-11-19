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
        'signal-white': '#ffffff',
        'ink-black': '#18181b',
        onyx: '#090c1d',
        carbon: '#27272a',
        slate: '#52525b',
        ash: '#71717a',
        fog: '#a1a1aa',
        cloud: '#d4d4d8',
        bone: '#e4e4e7',
        mist: '#f8f9fa',
        plaster: '#f1f5f9',
        mercury: '#eeeeee',
        'ctu-blue': '#00529c',
        'ctu-navy': '#003b7a',
        'brand-blue': '#00529c',
        'signal-blue': '#0091ff',
        mint: '#6ee7b7',
        emerald: '#00c07a',
        'teal-tag': '#16c0a4',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
        card: '16px',
        largecard: '24px',
      },
      maxWidth: {
        clickup: '1200px',
      }
    },
  },
  plugins: [],
}
