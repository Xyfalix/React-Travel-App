/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // custom layout for rows for TravelEasy
      'layout': '50px minmax(1fr, 1fr)',
    },
  },
  plugins: [],
}

