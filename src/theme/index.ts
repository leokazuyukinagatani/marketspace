import { createConfig } from "@gluestack-style/react";

export const THEME = createConfig({
  aliases: {
    bg: 'backgroundColor',
    p: 'padding',
    h: 'height',
    w: 'width',
  },
  tokens: {
    colors: {
      green: {
        700: '#00875F',
        500: '#00B37E',
      },
      gray: {
        700: '#121214',
        600: '#202024',
        500: '#29292E',
        400: '#323238',
        300: '#7C7C8A',
        200: '#C4C4CC',
        100: '#E1E1E6',
      },
      white: {
        100: '#FFFFFF',
      },
      red: {
        500: '#F75A68',
      },
    },
    fonts: {
      body: 'Karla, sans-serif',
      heading: 'Karla, sans-serif',
    },
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '24px',
    },
  },
});