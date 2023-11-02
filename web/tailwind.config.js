/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "16px",
        },
      },
      colors: {
        ruby: "#00676C",
        grey: "#9B9BAB",
      },
      screens: {
        sm: "640px",

        md: "768px",

        lg: "1024px",

        xl: "1280px",

        "2xl": "1300px",

        "3xl": "1536px",
      },
    },
    colors: {
      transparent: 'transparent',
      black: '#0E0817',
      dark: '#26212D',
      gray: '#9B9BAB',
      ruby: '#00676C',
      light: '#EBECFE',
      silver: '#FAFAFB',
      lilac: '#D9C6F4',
      white: '#ffffff',
    },
  },
  plugins: [],
};
