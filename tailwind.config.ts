import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,jsx,js,tsx,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
} satisfies Config;
