/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2f80ed',
        secondary: '#00aeef',
      },
      width: {
        none: 'none',
        unset: 'unset',
      },
      height: {
        navbar: '56px',
        player: '90px',
      },
      margin: {
        navbar: '56px',
        player: '90px',
      },
      padding: {
        navbar: '56px',
        player: '90px',
      },
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        24: '24px',
        28: '28px',
        32: '32px',
        36: '36px',
        40: '40px',
        42: '42px',
        48: '48px',
      },
    },
    fontFamily: {
      inter: 'Inter, sans-serif',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
    },
    backgroundImage: {
      main: 'linear-gradient(45deg, #2f80ed 0%, #00aeef 100%)',
      overlay: 'linear-gradient(to bottom,transparent 50%,rgba(0,0,0,.4) 100%)',
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
