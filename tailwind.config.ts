// tailwind.config.ts

import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        white: colors.white,
        black: colors.black,
        grey: colors.gray,
        green: {
          DEFAULT: colors.emerald[500],
          ...colors.emerald,
        },
        red: {
          DEFAULT: colors.red[500],
          ...colors.red,
        },
        blue: {
          DEFAULT: colors.sky[500],
          ...colors.sky,
        },
        yellow: {
          DEFAULT: colors.yellow[500],
          ...colors.yellow,
        },
        purple: {
          DEFAULT: colors.violet[500],
          ...colors.violet,
        },
        background: 'var(--background-color)',
        text: {
          DEFAULT: 'var(--text-color)', // Default text color
          light: colors.black,           // Light mode text color
          dark: colors.gray[200],        // Dark mode text color
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
