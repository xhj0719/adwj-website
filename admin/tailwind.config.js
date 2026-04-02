/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C46B4D', // terracotta
        charcoal: '#2D2D2D',
        oak: '#E8DCC8',
        mist: '#F5F5F5',
        warmWhite: '#FAF9F7',
      },
    },
  },
  plugins: [],
}