// @project
import { extendPaletteWithChannels } from '@/utils/colorUtils';

/***************************  HRM THEME - MAIN  ***************************/

export function buildPalette() {
  const textPrimary = '#1A1C1B'; // HRM/neutral/10 - on surface
  const textSecondary = '#424847'; // HRM/neutral variant/30 - on surface variant
  const divider = '#C1C8C6'; // HRM/neutral variant/80 - outline variant
  const background = '#FFF';

  const textPrimaryDark = '#DDE4E1'; // HRM/neutral/90 - on surface
  const textSecondaryDark = '#C1C8C6'; // HRM/neutral variant/80 - on surface variant
  const dividerDark = '#424847'; // HRM/neutral variant/30 - outline variant
  const backgroundDark = '#090F0E'; // HRM/neutral/04 - container lowest

  const lightPalette = {
    primary: {
      lighter: '#A0F1E6', // HRM/primary/90 - primary container / primary fixed
      light: '#84D5CA', // HRM/primary/80 - primary fixed dim
      main: '#2E847A', // HRM/primary/40 - primary
      dark: '#005049', // HRM/primary/30 - on primary fixed variant
      darker: '#00201D' // HRM/primary/10 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#D4E6E2', // HRM/secondary/90 - secondary container / secondary fixed
      light: '#B8CAC6', // HRM/secondary/80 - secondary fixed dim
      main: '#51625F', // HRM/secondary/40 - secondary
      dark: '#3A4A47', // HRM/secondary/30 - on secondary fixed variant
      darker: '#0E1E1C' // HRM/secondary/10 - on secondary container / on secondary fixed
    },
    grey: {
      50: '#F4FBF8', // HRM/neutral/98 - surface / surface bright
      100: '#EFF5F3', // HRM/neutral/96 - surface container low
      200: '#E9EFED', // HRM/neutral/94 - surface container
      300: '#E3EAE7', // HRM/neutral/92 - surface container high
      400: '#DDE4E1', // HRM/neutral/90 - surface container highest
      500: '#D5DBD9', // HRM/neutral/87 - surface dim
      600: divider, // HRM/neutral variant/80 - outline variant
      700: '#727877', // HRM/neutral variant/50 - outline
      800: textSecondary, // HRM/neutral variant/30 - on surface variant
      900: textPrimary // HRM/neutral/10 - on surface
    },
    text: {
      primary: textPrimary, // HRM/neutral/10 - on surface
      secondary: textSecondary // HRM/neutral variant/30 - on surface variant
    },
    divider,
    background: {
      default: background
    }
  };

  const darkPalette = {
    primary: {
      lighter: '#005049', // HRM/primary/30 - primary container / on primary fixed variant
      light: '#4C9E94', // HRM/primary/60 - primary fixed dim
      main: '#84D5CA', // HRM/primary/80 - primary
      dark: '#A0F1E6', // HRM/primary/90 - on primary container / primary fixed
      darker: '#B3FFF3' // HRM/primary/95 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#3A4A47', // HRM/secondary/30 - secondary container / on secondary fixed variant
      light: '#839491', // HRM/secondary/60 - secondary fixed dim
      main: '#B8CAC6', // HRM/secondary/80 - secondary
      dark: '#D4E6E2', // HRM/secondary/90 - on secondary container / secondary fixed
      darker: '#E2F5F0' // HRM/secondary/95 - on secondary container / on secondary fixed
    },
    grey: {
      50: '#0E1513', // HRM/neutral/06 - surface / surface dim
      100: '#1A1C1B', // HRM/neutral/10 - surface container low
      200: '#1A2120', // HRM/neutral/12 - surface container
      300: '#252B2A', // HRM/neutral/17 - surface container high
      400: '#303635', // HRM/neutral/22 - surface container highest
      500: backgroundDark, // HRM/neutral/04 - surface container lowest
      600: dividerDark, // HRM/neutral variant/30 - outline variant
      700: '#8C9290', // HRM/neutral variant/60 - outline
      800: textSecondaryDark, // HRM/neutral variant/80 - on surface variant
      900: textPrimaryDark // HRM/neutral/90 - on surface
    },
    text: {
      primary: textPrimaryDark, // HRM/neutral/90 - on surface
      secondary: textSecondaryDark // HRM/neutral variant/80 - on surface variant
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
