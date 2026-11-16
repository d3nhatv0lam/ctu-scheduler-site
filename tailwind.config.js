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
        'ink-black': '#202020',
        onyx: '#090c1d',
        carbon: '#2a2a2a',
        slate: '#646464',
        ash: '#838383',
        fog: '#b3b3b3',
        cloud: '#d4d4d4',
        bone: '#e8e8e8',
        mist: '#f8f9fa',
        plaster: '#e9ebf0',
        mercury: '#eeeeee',
        'brand-violet': '#6647f0',
        'signal-blue': '#0091ff',
        mint: '#6ee7b7',
        emerald: '#00c07a',
        'teal-tag': '#16c0a4',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Sometype Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        pill: '9999px',
        card: '12px',
        largecard: '20px',
      },
      maxWidth: {
        clickup: '1200px',
      }
    },
  },
  plugins: [],
}
