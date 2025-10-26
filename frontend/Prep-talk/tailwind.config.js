/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // make sure this points to all your JSX files
  theme: {
    extend: {
      colors: {
        primary: "#ff9324",
      },
      backgroundImage: {
        'linear-to-r': 'linear-gradient(to right, #ff9324, #de994a)',
      },
    },
  },
  plugins: [],
};
