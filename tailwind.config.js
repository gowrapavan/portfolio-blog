/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // This plugin is required for the 'prose' class used in Post.tsx
    require('@tailwindcss/typography'), 
  ],
}