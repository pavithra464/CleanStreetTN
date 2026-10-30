/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        leaf: {
          50: '#f4fbf7',
          100: '#e6f7ef',
          200: '#c5ebd8',
          300: '#94d9b8',
          400: '#5abf91',
          500: '#2e9e6f',
          600: '#217e57',
          700: '#1c6547',
          800: '#1a513b',
          900: '#174332',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
