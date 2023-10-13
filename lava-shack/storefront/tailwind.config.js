// See https://tailwindcss.com/docs/configuration for details
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
        lg: "992px",
      },
      fontFamily: {
        primary_font: "Assistant",
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
      },
      colors: {
        checkout: "#F8F9FA",
        primary: "#EE9D18",
        "primary-dark": "#FD7C37",
        secondary: "#E32519",
        "secondary-dark": "#FF4158",
        "secondary-light": "#ff2948",
        selected: "#f0f7ff",
        border: "#eeeeee",
      },
      boxShadow: {
        floating: "0px -6px 15px -3px rgba(0,0,0,0.1)",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(0deg)" },
          "5%": { transform: "rotate(-5deg)" },
          "10%": { transform: "rotate(5deg)" },
          "15%": { transform: "rotate(5deg)" },
          "20%": { transform: "rotate(-5deg)" },
          "25%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        shake: "wiggle 3s infinite",
      },
    },
  },
  plugins: [],
}
