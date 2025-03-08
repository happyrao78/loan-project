/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Onest', 'serif'],
        body: ['Onest', 'sans-serif'],
      },
      fontSize: {
        'heading-80': '80px',
        'heading-77': '77px',
        'heading-64': '64px',
        'heading-45': '45px',
        'heading-30': '30px',
        'heading-20': '20px',
        body: '16px',
        'body-lg': '18px',
      },
      fontWeight: {
        normal: '400',
        semibold: '600',
        bold: '700',
      },
      colors: {
        primary: '#05c8e8',
        lightSeaGreen: '#c6f7ff',
        darkGray: '#1a4048',
        white: '#FFFFFF',
        lightGray: '#F4F4F4',
        gray: '#DFDFDF',
      },
    },
  },
  plugins: [],
};

// gilroy semibold
// gilroy regular