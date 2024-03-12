/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif']
      },
      colors: {
        primaryColor: '#21325E',
        secondaryColor: '#3E497A',
        focusColor: '#F1D00A',
        contrastColor: '#F0F0F0',
      }
    },
    },
    plugins: [],
  }