/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ice: {
          50: '#F4F9F9',
          100: '#E8F4F5',
          200: '#D1E8EA',
          300: '#BBDCDC',
          400: '#A6CFD5', // User requested highlight color
          500: '#7CB8C1',
          600: '#4F9AA5',
          700: '#2E7782',
          800: '#145C66',
          900: '#0A434B',
          950: '#052A30'
        },
        gov: {
          dark: '#0A1428',
          card: '#FFFFFF',
          border: '#A6CFD5',
          primary: '#145C66',
          accent: '#EA580C', // subtle saffron
          green: '#059669', // subtle green
          gold: '#D97706',
          red: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
