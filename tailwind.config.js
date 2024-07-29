import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#E5E5E5',
          text: '#000000',
          primary: '#1DA1F2',
          // Add other light theme colors here
        },
        dark: {
          background: '#212121',
          text: '#ffffff',
          primary: '#1DA1F2',
          // Add other dark theme colors here
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#212121",
            primary: {
              DEFAULT: "#589265",
              foreground: "#000000",
            },
            focus: "#589265",
          },
        },
        light: {
          background: "#E5E5E5",
          colors: {
            primary: {
              DEFAULT: "#589265",
              foreground: "#000000",
            },
            focus: "#589265",
          },
        }
      },
    }),
  ],
};
