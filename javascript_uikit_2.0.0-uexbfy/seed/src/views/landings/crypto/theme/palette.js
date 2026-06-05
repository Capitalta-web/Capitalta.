// @project
import { extendPaletteWithChannels } from '@/utils/colorUtils';

/***************************  CRYPTO THEME - PALETTE  ***************************/

export function buildPalette() {
  const textPrimary = '#191C19'; // CRYPTO/neutral/10 - on surface
  const textSecondary = '#414941'; // CRYPTO/neutral variant/30 - on surface variant
  const divider = '#C1C9BF'; // CRYPTO/neutral variant/80 - outline variant
  const background = '#FFF';

  const textPrimaryDark = '#E2E3DE'; // CRYPTO/neutral/90 - on surface
  const textSecondaryDark = '#C1C9BF'; // CRYPTO/neutral variant/80 - on surface variant
  const dividerDark = '#414941'; // CRYPTO/neutral variant/30 - outline variant
  const backgroundDark = '#0B0F0B'; // CRYPTO/neutral/04 - container lowest

  const lightPalette = {
    primary: {
      lighter: '#ACF3BA', // CRYPTO/primary/90 - primary container / primary fixed
      light: '#4AE183', // CRYPTO/primary/80 - primary fixed dim
      main: '#006D37', // CRYPTO/primary/40 - primary
      dark: '#005228', // CRYPTO/primary/30 - on primary fixed variant
      darker: '#00210C' // CRYPTO/primary/10 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#C9EBCD', // CRYPTO/secondary/90 - secondary container / secondary fixed
      light: '#AECFB1', // CRYPTO/secondary/80 - secondary fixed dim
      main: '#48654D', // CRYPTO/secondary/40 - secondary
      dark: '#304D37', // CRYPTO/secondary/30 - on secondary fixed variant
      darker: '#04210E' // CRYPTO/secondary/10 - on secondary container / on secondary fixed
    },
    grey: {
      50: '#F9FAF4', // CRYPTO/neutral/98 - surface / surface bright
      100: '#F0F5ED', // CRYPTO/neutral/96 - surface container low
      200: '#EBEFE7', // CRYPTO/neutral/94 - surface container
      300: '#E5EAE2', // CRYPTO/neutral/92 - surface container high
      400: '#E2E3DE', // CRYPTO/neutral/90 - surface container highest
      500: '#D7DBD4', // CRYPTO/neutral/87 - surface dim
      600: divider, // CRYPTO/neutral variant/80 - outline variant
      700: '#717971', // CRYPTO/neutral variant/50 - outline
      800: textSecondary, // CRYPTO/neutral variant/30 - on surface variant
      900: textPrimary // CRYPTO/neutral/10 - on surface
    },
    text: {
      primary: textPrimary, // CRYPTO/neutral/10 - on surface
      secondary: textSecondary // CRYPTO/neutral variant/30 - on surface variant
    },
    divider,
    background: {
      default: background
    }
  };

  const darkPalette = {
    primary: {
      lighter: '#005228', // CRYPTO/primary/30 - primary container / on primary fixed variant
      light: '#00A657', // CRYPTO/primary/60 - primary fixed dim
      main: '#4AE183', // CRYPTO/primary/80 - primary
      dark: '#ACF3BA', // CRYPTO/primary/90 - on primary container / primary fixed
      darker: '#C3FFCD' // CRYPTO/primary/95 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#304D37', // CRYPTO/secondary/30 - secondary container / on secondary fixed variant
      light: '#79987E', // CRYPTO/secondary/60 - secondary fixed dim
      main: '#AECFB1', // CRYPTO/secondary/80 - secondary
      dark: '#C9EBCD', // CRYPTO/secondary/90 - on secondary container / secondary fixed
      darker: '#D8F9DA' // CRYPTO/secondary/95   - on secondary container / on secondary fixed
    },
    grey: {
      50: '#101510', // CRYPTO/neutral/06 - surface / surface dim
      100: '#191C19', // CRYPTO/neutral/10 - surface container low
      200: '#1C211C', // CRYPTO/neutral/12 - surface container
      300: '#262B26', // CRYPTO/neutral/17 - surface container high
      400: '#313631', // CRYPTO/neutral/22 - surface container highest
      500: backgroundDark, // CRYPTO/neutral/04 - surface container lowest
      600: dividerDark, // CRYPTO/neutral variant/30 - outline variant
      700: '#8B938A', // CRYPTO/neutral variant/60 - outline
      800: textSecondaryDark, // CRYPTO/neutral variant/80 - on surface variant
      900: textPrimaryDark // CRYPTO/neutral/90 - on surface
    },
    text: {
      primary: textPrimaryDark, // CRYPTO/neutral/90 - on surface
      secondary: textSecondaryDark // CRYPTO/neutral variant/80 - on surface variant
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
