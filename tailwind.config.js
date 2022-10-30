/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2f80ed',
        secondary: '#00aeef',
        blur: 'rgb(0,174,239,0.1)',
        // primary: '#0F1A2E',
        // secondary: '#1B2639',
        // thirdty: '#111F3B',
      },
      width: {
        none: 'none',
        unset: 'unset',
      },
      height: {
        navbar: '56px',
        player: '90px',
        footer: '90px',
      },
      margin: {
        navbar: '56px',
        player: '90px',
        footer: '90px',
      },
      padding: {
        navbar: '56px',
        player: '90px',
        footer: '90px',
      },
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
        28: '28px',
        32: '32px',
        36: '36px',
        40: '40px',
        42: '42px',
        48: '48px',
      },
      boxShadow: {
        musicplayer: '0 25px 50px -12px #2f80ed',
      },
      backgroundColor: {
        chartbg: 'rgba(47, 128, 237, 0.8)',
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
      // main: 'linear-gradient(45deg, #111F3B 0%, #1B2639 100%)',
      // overlay: 'linear-gradient(to bottom,transparent 50%,rgba(0,0,0,.4) 100%)',
    },
    animation: {
      'spin-slow': 'spin 8s linear infinite',
      'spin-medium': 'spin 3s linear infinite',
      spin: 'spin 1s linear infinite',
      pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
