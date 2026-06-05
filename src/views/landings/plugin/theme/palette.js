// @project
import { extendPaletteWithChannels } from '@/utils/colorUtils';

/***************************  PLUGIN - PALETTE  ***************************/

export function buildPalette() {
  const textPrimary = '#1B1B1E'; // PLUGIN/neutral/10 - on surface
  const textSecondary = '#46464C'; // PLUGIN/neutral variant/30 - on surface variant
  const divider = '#C6C6CD'; // PLUGIN/neutral variant/80 - outline variant
  const background = '#FFF';

  const textPrimaryDark = '#E3E2E9'; // PLUGIN/neutral/90 - on surface
  const textSecondaryDark = '#C6C6CD'; // PLUGIN/neutral variant/80 - on surface variant
  const dividerDark = '#46464C'; // PLUGIN/neutral variant/30 - outline variant
  const backgroundDark = '#0D0E13'; // PLUGIN/neutral/04 - container lowest

  const lightPalette = {
    primary: {
      lighter: '#DBE1FF', // PLUGIN/primary/90 - primary container / primary fixed
      light: '#B4C5FF', // PLUGIN/primary/80 - primary fixed dim
      main: '#6375AD', // PLUGIN/primary/40 - primary
      dark: '#324479', // PLUGIN/primary/30 - on primary fixed variant
      darker: '#00174B' // PLUGIN/primary/10 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#DFE1F3', // PLUGIN/secondary/90 - secondary container / secondary fixed
      light: '#C3C6D6', // PLUGIN/secondary/80 - secondary fixed dim
      main: '#5B5E6C', // PLUGIN/secondary/40 - secondary
      dark: '#434654', // PLUGIN/secondary/30 - on secondary fixed variant
      darker: '#181B27' // PLUGIN/secondary/10 - on secondary container / on secondary fixed
    },
    grey: {
      50: '#FBF8FB', // PLUGIN/neutral/98 - surface / surface bright
      100: '#F4F3FA', // PLUGIN/neutral/96 - surface container low
      200: '#EEEDF4', // PLUGIN/neutral/94 - surface container
      300: '#E8E7EF', // PLUGIN/neutral/92 - surface container high
      400: '#E3E2E9', // PLUGIN/neutral/90 - surface container highest
      500: '#DAD9E0', // PLUGIN/neutral/87 - surface dim
      600: divider, // PLUGIN/neutral variant/80 - outline variant
      700: '#76767D', // PLUGIN/neutral variant/50 - outline
      800: textSecondary, // PLUGIN/neutral variant/30 - on surface variant
      900: textPrimary // PLUGIN/neutral/10 - on surface
    },
    text: {
      primary: textPrimary, // PLUGIN/neutral/10 - on surface
      secondary: textSecondary // PLUGIN/neutral variant/30 - on surface variant
    },
    divider,
    background: {
      default: background
    }
  };

  const darkPalette = {
    primary: {
      lighter: '#324479', // PLUGIN/primary/30 - primary container / on primary fixed variant
      light: '#7D8FC8', // PLUGIN/primary/60 - primary fixed dim
      main: '#B4C5FF', // PLUGIN/primary/80 - primary
      dark: '#DBE1FF', // PLUGIN/primary/90 - on primary container / primary fixed
      darker: '#EEF0FF' // PLUGIN/primary/95 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#434654', // PLUGIN/secondary/30 - secondary container / on secondary fixed variant
      light: '#8D909F', // PLUGIN/secondary/60 - secondary fixed dim
      main: '#C3C6D6', // PLUGIN/secondary/80 - secondary
      dark: '#DFE1F3', // PLUGIN/secondary/90 - on secondary container / secondary fixed
      darker: '#EEF0FF' // PLUGIN/secondary/95   - on secondary container / on secondary fixed
    },
    grey: {
      50: '#121318', // PLUGIN/neutral/06 - surface / surface dim
      100: '#1B1B1E', // PLUGIN/neutral/10 - surface container low
      200: '#1E1F25', // PLUGIN/neutral/12 - surface container
      300: '#292A2F', // PLUGIN/neutral/17 - surface container high
      400: '#33343A', // PLUGIN/neutral/22 - surface container highest
      500: backgroundDark, // PLUGIN/neutral/04 - surface container lowest
      600: dividerDark, // PLUGIN/neutral variant/30 - outline variant
      700: '#909097', // PLUGIN/neutral variant/60 - outline
      800: textSecondaryDark, // PLUGIN/neutral variant/80 - on surface variant
      900: textPrimaryDark // PLUGIN/neutral/90 - on surface
    },
    text: {
      primary: textPrimaryDark, // PLUGIN/neutral/90 - on surface
      secondary: textSecondaryDark // PLUGIN/neutral variant/80 - on surface variant
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
