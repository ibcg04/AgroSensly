/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 18px 50px rgba(12, 90, 48, 0.18)',
      },
    },
  },
  plugins: [],
};
