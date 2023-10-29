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
      },
    },
  },
  plugins: [],
};
