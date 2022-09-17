/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2f80ed',
        secondary: '#00aeef',
      },
      height: {
        navbar: '56px',
        player: '90px',
      },
      margin: {
        navbar: '56px',
        player: '90px',
      },
    },
    fontFamily: {
      inter: 'Inter, sans-serif',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
      },
    },
    backgroundImage: {
      main: 'linear-gradient(45deg, #2f80ed 0%, #00aeef 100%)',
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
