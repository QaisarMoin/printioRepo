/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stitch: {
          primary: '#0040df',
          secondary: '#FF7A00',
          tertiary: '#FFD600',
          bg: '#f9f9fc',
          neutral: '#1A1C1E',
        },
        brand: {
          50:  '#fff5f0',
          100: '#ffe1d1',
          200: '#ffc299',
          300: '#ff9f62',
          400: '#ff7a2d',
          500: '#ff5a00',
          600: '#e05000',
          700: '#c04400',
          800: '#963400',
          900: '#6e2500',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        stitch: '0 4px 24px rgba(45, 91, 255, 0.08)',
        'stitch-hover': '0 8px 32px rgba(45, 91, 255, 0.12)',
      },
    },
  },
  plugins: [],
}
