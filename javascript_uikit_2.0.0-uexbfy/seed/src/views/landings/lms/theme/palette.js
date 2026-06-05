// @project
import { extendPaletteWithChannels } from '@/utils/colorUtils';

/***************************  LMS THEME - MAIN  ***************************/

export function buildPalette() {
  const textPrimary = '#1B1B1F'; // LMS/neutral/10 - on surface
  const textSecondary = '#44474F'; // LMS/neutral variant/30 - on surface variant
  const divider = '#C4C6D0'; // LMS/neutral variant/80 - outline variant
  const background = '#FFF';

  const textPrimaryDark = '#E3E2E6'; // LMS/neutral/90 - on surface
  const textSecondaryDark = '#C4C6D0'; // LMS/neutral variant/80 - on surface variant
  const dividerDark = '#44474F'; // LMS/neutral variant/30 - outline variant
  const backgroundDark = '#0B0C0D'; // LMS/neutral/04 - container lowest

  const lightPalette = {
    primary: {
      lighter: '#D8E2FF', // LMS/primary/90 - primary container / primary fixed
      light: '#ADC7FF', // LMS/primary/80 - primary fixed dim
      main: '#005BC0', // LMS/primary/40 - primary
      dark: '#004493', // LMS/primary/30 - on primary fixed variant
      darker: '#001A41' // LMS/primary/10 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#D8E2FF', // LMS/secondary/90 - secondary container / secondary fixed
      light: '#BAC6E6', // LMS/secondary/80 - secondary fixed dim
      main: '#525E7A', // LMS/secondary/40 - secondary
      dark: '#3A4761', // LMS/secondary/30 - on secondary fixed variant
      darker: '#0E1B33' // LMS/secondary/10 - on secondary container / on secondary fixed
    },
    grey: {
      50: '#F9FAFD', // LMS/neutral/98 - surface / surface bright
      100: '#F4F5F9', // LMS/neutral/96 - surface container low
      200: '#ECEDF0', // LMS/neutral/94 - surface container
      300: '#E9E8EC', // LMS/neutral/92 - surface container high
      400: '#E3E2E6', // LMS/neutral/90 - surface container highest
      500: '#DBD9DE', // LMS/neutral/87 - surface dim
      600: divider, // LMS/neutral variant/80 - outline variant
      700: '#74777F', // LMS/neutral variant/50 - outline
      800: textSecondary, // LMS/neutral variant/30 - on surface variant
      900: textPrimary // LMS/neutral/10 - on surface
    },
    text: {
      primary: textPrimary, // LMS/neutral/10 - on surface
      secondary: textSecondary // LMS/neutral variant/30 - on surface variant
    },
    divider,
    background: {
      default: background
    }
  };

  const darkPalette = {
    primary: {
      lighter: '#004493', // LMS/primary/30 - primary container / on primary fixed variant
      light: '#4A8EFF', // LMS/primary/60 - primary fixed dim
      main: '#ADC7FF', // LMS/primary/80 - primary
      dark: '#D8E2FF', // LMS/primary/90 - on primary container / primary fixed
      darker: '#EDF0FF' // LMS/primary/95 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#3A4761', // LMS/secondary/30 - secondary container / on secondary fixed variant
      light: '#8491AE', // LMS/secondary/60 - secondary fixed dim
      main: '#BAC6E6', // LMS/secondary/80 - secondary
      dark: '#D8E2FF', // LMS/secondary/90 - on secondary container / secondary fixed
      darker: '#EDF0FF' // LMS/secondary/95 - on secondary container / on secondary fixed
    },
    grey: {
      50: '#16161A', // LMS/neutral/06 - surface / surface dim
      100: '#1B1B1F', // LMS/neutral/10 - surface container low
      200: '#1F2124', // LMS/neutral/12 - surface container
      300: '#2A2A2E', // LMS/neutral/17 - surface container high
      400: '#333335', // LMS/neutral/22 - surface container highest
      500: backgroundDark, // LMS/neutral/04 - surface container lowest
      600: dividerDark, // LMS/neutral variant/30 - outline variant
      700: '#8E9099', // LMS/neutral variant/60 - outline
      800: textSecondaryDark, // LMS/neutral variant/80 - on surface variant
      900: textPrimaryDark // LMS/neutral/90 - on surface
    },
    text: {
      primary: textPrimaryDark, // LMS/neutral/90 - on surface
      secondary: textSecondaryDark // LMS/neutral variant/80 - on surface variant
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
