import type { Config } from "tailwindcss";
import { PluginAPI } from 'tailwindcss/types/config';

const colors = require('tailwindcss/colors');

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: colors.black,
      grey: colors.gray,
      red: colors.red,
      green: colors.emerald,
      blue: colors.sky,
      yellow: colors.yellow,
      purple: colors.violet,
    },
  },
  plugins: [
    function (api: PluginAPI) {
        const { addBase, theme } = api;

      // Define CSS variables for each color in :root
      addBase({
        ':root': {
          // Black
          '--color-black': theme('colors.black'),
          
          // Grey
          '--color-grey-50': theme('colors.grey.50'),
          '--color-grey-100': theme('colors.grey.100'),
          '--color-grey-200': theme('colors.grey.200'),
          '--color-grey-300': theme('colors.grey.300'),
          '--color-grey-400': theme('colors.grey.400'),
          '--color-grey-500': theme('colors.grey.500'),
          '--color-grey-600': theme('colors.grey.600'),
          '--color-grey-700': theme('colors.grey.700'),
          '--color-grey-800': theme('colors.grey.800'),
          '--color-grey-900': theme('colors.grey.900'),
          
          // Red
          '--color-red-50': theme('colors.red.50'),
          '--color-red-100': theme('colors.red.100'),
          '--color-red-200': theme('colors.red.200'),
          '--color-red-300': theme('colors.red.300'),
          '--color-red-400': theme('colors.red.400'),
          '--color-red-500': theme('colors.red.500'),
          '--color-red-600': theme('colors.red.600'),
          '--color-red-700': theme('colors.red.700'),
          '--color-red-800': theme('colors.red.800'),
          '--color-red-900': theme('colors.red.900'),

          // Green (Emerald)
          '--color-green-50': theme('colors.green.50'),
          '--color-green-100': theme('colors.green.100'),
          '--color-green-200': theme('colors.green.200'),
          '--color-green-300': theme('colors.green.300'),
          '--color-green-400': theme('colors.green.400'),
          '--color-green-500': theme('colors.green.500'),
          '--color-green-600': theme('colors.green.600'),
          '--color-green-700': theme('colors.green.700'),
          '--color-green-800': theme('colors.green.800'),
          '--color-green-900': theme('colors.green.900'),

          // Blue (Sky)
          '--color-blue-50': theme('colors.blue.50'),
          '--color-blue-100': theme('colors.blue.100'),
          '--color-blue-200': theme('colors.blue.200'),
          '--color-blue-300': theme('colors.blue.300'),
          '--color-blue-400': theme('colors.blue.400'),
          '--color-blue-500': theme('colors.blue.500'),
          '--color-blue-600': theme('colors.blue.600'),
          '--color-blue-700': theme('colors.blue.700'),
          '--color-blue-800': theme('colors.blue.800'),
          '--color-blue-900': theme('colors.blue.900'),

          // Yellow
          '--color-yellow-50': theme('colors.yellow.50'),
          '--color-yellow-100': theme('colors.yellow.100'),
          '--color-yellow-200': theme('colors.yellow.200'),
          '--color-yellow-300': theme('colors.yellow.300'),
          '--color-yellow-400': theme('colors.yellow.400'),
          '--color-yellow-500': theme('colors.yellow.500'),
          '--color-yellow-600': theme('colors.yellow.600'),
          '--color-yellow-700': theme('colors.yellow.700'),
          '--color-yellow-800': theme('colors.yellow.800'),
          '--color-yellow-900': theme('colors.yellow.900'),

          // Purple (Violet)
          '--color-purple-50': theme('colors.purple.50'),
          '--color-purple-100': theme('colors.purple.100'),
          '--color-purple-200': theme('colors.purple.200'),
          '--color-purple-300': theme('colors.purple.300'),
          '--color-purple-400': theme('colors.purple.400'),
          '--color-purple-500': theme('colors.purple.500'),
          '--color-purple-600': theme('colors.purple.600'),
          '--color-purple-700': theme('colors.purple.700'),
          '--color-purple-800': theme('colors.purple.800'),
          '--color-purple-900': theme('colors.purple.900'),
        },
      });
    },
    require("tailwindcss-animate"),
  ],
};

export default config;
