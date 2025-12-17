/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FBBF24', // Amber-400
          DEFAULT: '#D97706', // Amber-600
          dark: '#B45309',    // Amber-700
        },
        secondary: {
          light: '#3B82F6', // Blue-500
          DEFAULT: '#1E3A8A', // Blue-900 (Navy)
          dark: '#172554',    // Blue-950
        }
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // Move exactly half width (one set of logos)
        }
      }
    },
  },
  plugins: [],
}
