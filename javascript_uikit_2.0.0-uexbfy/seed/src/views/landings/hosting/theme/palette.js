// @project
import { extendPaletteWithChannels } from '@/utils/colorUtils';

/***************************  HOSTING THEME - PALETTE  ***************************/

export function buildPalette() {
  const textPrimary = '#1B1B1F'; // HOSTING/neutral/10 - on surface
  const textSecondary = '#46464F'; // HOSTING/neutral variant/30 - on surface variant
  const divider = '#C7C5D0'; // HOSTING/neutral variant/80 - outline variant
  const background = '#FFF';

  const textPrimaryDark = '#E4E1E6'; // Hosting/neutral/90 - on surface
  const textSecondaryDark = '#C7C5D0'; // Hosting/neutral variant/80 - on surface variant
  const dividerDark = '#46464F'; // Hosting/neutral variant/30 - outline variant
  const backgroundDark = '#0F0D13'; // Hosting/neutral/04 - container lowest

  const lightPalette = {
    primary: {
      lighter: '#E0E0FF', // Hosting/primary/90 - primary container / primary fixed
      light: '#BDC2FF', // Hosting/primary/80 - primary fixed dim
      main: '#606BDF', // Hosting/primary/40 - primary
      dark: '#3944B8', // Hosting/primary/30 - on primary fixed variant
      darker: '#000668' // Hosting/primary/10 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#E0E0FF', // Hosting/secondary/90 - secondary container / secondary fixed
      light: '#C3C4E4', // Hosting/secondary/80 - secondary fixed dim
      main: '#5A5C78', // Hosting/secondary/40 - secondary
      dark: '#43455F', // Hosting/secondary/30 - on secondary fixed variant
      darker: '#171A31' // Hosting/secondary/10 - on secondary container / on secondary fixed
    },
    grey: {
      50: '#FBF8FF', // Hosting/neutral/98 - surface / surface bright
      100: '#F5F2FA', // Hosting/neutral/96 - surface container low
      200: '#EFEDF4', // Hosting/neutral/94 - surface container
      300: '#EAE7EF', // Hosting/neutral/92 - surface container high
      400: '#777680', // Hosting/neutral/90 - surface container highest
      500: '#DBD9E0', // Hosting/neutral/87 - surface dim
      600: divider, // Hosting/neutral variant/80 - outline variant
      700: '#E4E1E6', // Hosting/neutral variant/50 - outline
      800: textSecondary, // Hosting/neutral variant/30 - on surface variant
      900: textPrimary // Hosting/neutral/10 - on surface
    },
    text: {
      primary: textPrimary, // HOSTING/neutral/10 - on surface
      secondary: textSecondary // HOSTING/neutral variant/30 - on surface variant
    },
    divider,
    background: {
      default: background
    }
  };

  const darkPalette = {
    primary: {
      lighter: '#2C37AC', // Hosting/primary/30 - primary container / on primary fixed variant
      light: '#7A86FB', // Hosting/primary/60 - primary fixed dim
      main: '#BDC2FF', // Hosting/primary/80 - primary
      dark: '#E0E0FF', // Hosting/primary/90 - on primary container / primary fixed
      darker: '#F1EFFF' // Hosting/primary/95 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#43455F', // Hosting/secondary/30 - secondary container / on secondary fixed variant
      light: '#8D8EAC', // Hosting/secondary/60 - secondary fixed dim
      main: '#C3C4E4', // Hosting/secondary/80 - secondary
      dark: '#E0E0FF', // Hosting/secondary/90 - on secondary container / secondary fixed
      darker: '#F1EFFF' // Hosting/secondary/95   - on secondary container / on secondary fixed
    },
    grey: {
      50: '#141218', // Hosting/neutral/06 - surface / surface dim
      100: '#1B1B1F', // Hosting/neutral/10 - surface container low
      200: '#211F26', // Hosting/neutral/12 - surface container
      300: '#2B2930', // Hosting/neutral/17 - surface container high
      400: '#36343B', // Hosting/neutral/22 - surface container highest
      500: backgroundDark, // Hosting/neutral/04 - surface container lowest
      600: dividerDark, // Hosting/neutral variant/30 - outline variant
      700: '#91909A', // Hosting/neutral variant/60 - outline
      800: textSecondaryDark, // Hosting/neutral variant/80 - on surface variant
      900: textPrimaryDark // Hosting/neutral/90 - on surface
    },
    text: {
      primary: textPrimaryDark, // HOSTING/neutral/90 - on surface
      secondary: textSecondaryDark // HOSTING/neutral variant/80 - on surface variant
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
