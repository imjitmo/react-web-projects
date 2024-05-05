/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      notosans: ['Noto Sans', 'sans-serif'],
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['winter'],
  },
};
