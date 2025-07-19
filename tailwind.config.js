// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: '1.125rem', // 18px بدلاً من 16px الافتراضي
      },
    },
  },
  plugins: [],
}