/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#120E18',
        night: { DEFAULT: '#120E18', 2: '#1B1623', 3: '#221A30' },
        butter: { DEFAULT: '#F5F2C9', dim: '#D9D5B0' },
        grape: { DEFAULT: '#5E3F97', hover: '#6E4DAB' },
        lilac: '#B7A2E6',
        muted: '#ADA8A0',
        accent: '#5E3F97',
        'accent-hover': '#6E4DAB',
      },
      fontFamily: {
        display: ['var(--font-bricolage)', 'sans-serif'],
        serif: ['var(--font-instrument)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
