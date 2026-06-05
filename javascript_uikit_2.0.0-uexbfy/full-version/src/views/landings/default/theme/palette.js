// @project
import { extendPaletteWithChannels } from '@/utils/colorUtils';

/***************************  DEFAULT / AI THEME - PALETTE  ***************************/

export function buildPalette() {
  const textPrimary = '#1A1C1E';
  const textSecondary = '#42474E';
  const divider = '#C2C7CE';
  const background = '#FFF';

  const textPrimaryDark = '#E2E2E5';
  const textSecondaryDark = '#C2C7CE';
  const dividerDark = '#42474E';
  const backgroundDark = '#020404';

  const lightPalette = {
    primary: {
      lighter: '#E0F0EE',
      light: '#43A09A',
      main: '#1C7C77',
      dark: '#11524E',
      darker: '#073634'
    },
    secondary: {
      lighter: '#D6D6D6',
      light: '#A3A3A3',
      main: '#000000',
      dark: '#000000',
      darker: '#000000'
    },
    grey: {
      50: '#F9F9FC', // AI/neutral/98 - surface / surface bright
      100: '#F1F4F9', // AI/neutral/96 - surface container low
      200: '#EBEEF3', // AI/neutral/94 - surface container
      300: '#E6E8EE', // AI/neutral/92 - surface container high
      400: '#E2E2E5', // AI/neutral/90 - surface container highest
      500: '#D7DADF', // AI/neutral/87 - surface dim
      600: divider, // AI/neutral variant/80 - outline variant
      700: '#72787E', // AI/neutral variant/50 - outline
      800: textSecondary, // AI/neutral variant/30 - on surface variant
      900: textPrimary // AI/neutral/10 - on surface
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary
    },
    divider,
    background: {
      default: background
    }
  };

  const darkPalette = {
    primary: {
      lighter: '#11524E',
      light: '#1C7C77',
      main: '#43A09A',
      dark: '#77BFB9',
      darker: '#C5E4E0'
    },
    secondary: {
      lighter: '#4D4D4D',
      light: '#333333',
      main: '#FFFFFF',
      dark: '#FFFFFF',
      darker: '#FFFFFF'
    },
    grey: {
      50: '#101418', // AI/neutral/06 - surface / surface dim
      100: '#1A1C1E', // AI/neutral/10 - surface container low
      200: '#1C2024', // AI/neutral/12 - surface container
      300: '#272A2E', // AI/neutral/17 - surface container high
      400: '#313539', // AI/neutral/22 - surface container highest
      500: backgroundDark, // AI/neutral/04 - surface container lowest
      600: dividerDark, // AI/neutral variant/30 - outline variant
      700: '#8C9198', // AI/neutral variant/60 - outline
      800: textSecondaryDark, // AI/neutral variant/80 - on surface variant
      900: textPrimaryDark // AI/neutral/90 - on surface
    },
    text: {
      primary: textPrimaryDark, // AI/neutral/90 - on surface
      secondary: textSecondaryDark // AI/neutral variant/80 - on surface variant
    },
    divider: dividerDark,
    background: {
      default: backgroundDark,
      paper: backgroundDark
    }
  };

  const commonColor = { common: { black: '#000', white: '#fff' } };

  const extendedLight = extendPaletteWithChannels(lightPalette);
  const extendedDark = extendPaletteWithChannels(darkPalette);
  const extendedCommon = extendPaletteWithChannels(commonColor);

  return {
    light: {
      mode: 'light',
      ...extendedCommon,
      ...extendedLight
    },
    dark: {
      mode: 'dark',
      ...extendedCommon,
      ...extendedDark
    }
  };
}
