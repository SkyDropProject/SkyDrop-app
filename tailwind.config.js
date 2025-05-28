/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#60D7FF",
        neutral: {
          0: "#FFFFFF",
          50: "#FBFBFB",
          100: "#D4D4D4",
          200: "#B6B6B6",
          300: "#878787",
          400: "#484848",
          450: "#292929",
          500: "#1B1B1B",
        }
      }
    },
  },
  plugins: [],
}

