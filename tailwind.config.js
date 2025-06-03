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
          DEFAULT: '#006400',
          light: '#2E8B57',
          dark: '#004d00',
        },
        secondary: {
          DEFAULT: '#DAA520',
          light: '#FFD700',
          dark: '#B8860B',
        },
        accent: {
          DEFAULT: '#1a365d',
          light: '#2d4a7c',
          dark: '#0f2744',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      height: {
        'hero': 'calc(100vh - 4rem)',
      },
    },
  },
  plugins: [],
} 