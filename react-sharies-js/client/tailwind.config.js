/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import preline from 'preline/plugin';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [daisyui, preline],
  daisyui: {
    themes: ['dark', 'garden'],
  },
};
