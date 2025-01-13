/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#f5f5f5",
          dark: "#1a202c",
        },
      },
    },
  },
  plugins: [],
}

