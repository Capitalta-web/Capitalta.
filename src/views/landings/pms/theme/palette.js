// @project
import { extendPaletteWithChannels } from '@/utils/colorUtils';

/***************************  PMS THEME - PALETTE  ***************************/

export function buildPalette() {
  const textPrimary = '#1D1B16'; // PMS/neutral/10 - on surface
  const textSecondary = '#4A4739'; // PMS/neutral variant/30 - on surface variant
  const divider = '#CDC6B4'; // PMS/neutral variant/80 - outline variant
  const background = '#FFF';

  const textPrimaryDark = '#E8E2D4'; // PMS/neutral/90 - on surface
  const textSecondaryDark = '#CDC6B4'; // PMS/neutral variant/80 - on surface variant
  const dividerDark = '#4A4739'; // PMS/neutral variant/30 - outline variant
  const backgroundDark = '#100E07'; // PMS/neutral/04 - container lowest

  const lightPalette = {
    primary: {
      lighter: '#F9E37D', // PMS/primary/90 - primary container / primary fixed
      light: '#E2C62D', // PMS/primary/80 - primary fixed dim
      main: '#897700', // PMS/primary/40 - primary
      dark: '#524600', // PMS/primary/30 - on primary fixed variant
      darker: '#211B00' // PMS/primary/10 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#EFE3B5', // PMS/secondary/90 - secondary container / secondary fixed
      light: '#D2C79B', // PMS/secondary/80 - secondary fixed dim
      main: '#675E3B', // PMS/secondary/40 - secondary
      dark: '#4E4725', // PMS/secondary/30 - on secondary fixed variant
      darker: '#211B01' // PMS/secondary/10 - on secondary container / on secondary fixed
    },
    grey: {
      50: '#FFF9ED', // PMS/neutral/98 - surface / surface bright
      100: '#FAF3E5', // PMS/neutral/96 - surface container low
      200: '#F4EDDF', // PMS/neutral/94 - surface container
      300: '#EEE8DA', // PMS/neutral/92 - surface container high
      400: '#E8E2D4', // PMS/neutral/90 - surface container highest
      500: '#E0D9CC', // PMS/neutral/87 - surface dim
      600: divider, // PMS/neutral variant/80 - outline variant
      700: '#7C7768', // PMS/neutral variant/50 - outline
      800: textSecondary, // PMS/neutral variant/30 - on surface variant
      900: textPrimary // PMS/neutral/10 - on surface
    },
    text: {
      primary: textPrimary, // PMS/neutral/10 - on surface
      secondary: textSecondary // PMS/neutral variant/30 - on surface variant
    },
    divider,
    background: {
      default: background
    }
  };

  const darkPalette = {
    primary: {
      lighter: '#524600', // PMS/primary/30 - primary container / on primary fixed variant
      light: '#A69000', // PMS/primary/60 - primary fixed dim
      main: '#E2C62D', // PMS/primary/80 - primary
      dark: '#F9E37D', // PMS/primary/90 - on primary container / primary fixed
      darker: '#FFF1B9' // PMS/primary/95 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#4E4725', // PMS/secondary/30 - secondary container / on secondary fixed variant
      light: '#9A9169', // PMS/secondary/60 - secondary fixed dim
      main: '#D2C79B', // PMS/secondary/80 - secondary
      dark: '#EFE3B5', // PMS/secondary/90 - on secondary container / secondary fixed
      darker: '#FDF1C3' // PMS/secondary/95   - on secondary container / on secondary fixed
    },
    grey: {
      50: '#15130B', // PMS/neutral/06 - surface / surface dim
      100: '#1D1B16', // PMS/neutral/10 - surface container low
      200: '#222017', // PMS/neutral/12 - surface container
      300: '#2C2A21', // PMS/neutral/17 - surface container high
      400: '#37352B', // PMS/neutral/22 - surface container highest
      500: backgroundDark, // PMS/neutral/04 - surface container lowest
      600: dividerDark, // PMS/neutral variant/30 - outline variant
      700: '#969080', // PMS/neutral variant/60 - outline
      800: textSecondaryDark, // PMS/neutral variant/80 - on surface variant
      900: textPrimaryDark // PMS/neutral/90 - on surface
    },
    text: {
      primary: textPrimaryDark, // PMS/neutral/90 - on surface
      secondary: textSecondaryDark // PMS/neutral variant/80 - on surface variant
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
