// @project
import { extendPaletteWithChannels } from '@/utils/colorUtils';

/***************************  CRM THEME - PALETTE  ***************************/

export function buildPalette() {
  const textPrimary = '#1D1B20'; // CRM/neutral/10 - on surface
  const textSecondary = '#49454F'; // CRM/neutral variant/30 - on surface variant
  const divider = '#CAC4D0'; // CRM/neutral variant/80 - outline variant
  const background = '#FFF';

  const textPrimaryDark = '#E6E0E9'; // CRM/neutral/90 - on surface
  const textSecondaryDark = '#CAC4D0'; // CRM/neutral variant/80 - on surface variant
  const dividerDark = '#49454F'; // CRM/neutral variant/30 - outline variant
  const backgroundDark = '#0F0D13'; // CRM/neutral/04 - container lowest

  const lightPalette = {
    primary: {
      lighter: '#EADDFF', // CRM/primary/90 - primary container / primary fixed
      light: '#D0BCFF', // CRM/primary/80 - primary fixed dim
      main: '#6750A4', // CRM/primary/40 - primary
      dark: '#4F378B', // CRM/primary/30 - on primary fixed variant
      darker: '#21005D' // CRM/primary/10 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#E8DEF8', // CRM/secondary/90 - secondary container / secondary fixed
      light: '#CCC2DC', // CRM/secondary/80 - secondary fixed dim
      main: '#625B71', // CRM/secondary/40 - secondary
      dark: '#4A4458', // CRM/secondary/30 - on secondary fixed variant
      darker: '#1D192B' // CRM/secondary/10 - on secondary container / on secondary fixed
    },
    grey: {
      50: '#FEF7FF', // CRM/neutral/98 - surface / surface bright
      100: '#F7F2FA', // CRM/neutral/96 - surface container low
      200: '#F3EDF7', // CRM/neutral/94 - surface container
      300: '#ECE6F0', // CRM/neutral/92 - surface container high
      400: '#E6E0E9', // CRM/neutral/90 - surface container highest
      500: '#DED8E1', // CRM/neutral/87 - surface dim
      600: divider, // CRM/neutral variant/80 - outline variant
      700: '#79747E', // CRM/neutral variant/50 - outline
      800: textSecondary, // CRM/neutral variant/30 - on surface variant
      900: textPrimary // CRM/neutral/10 - on surface
    },
    text: {
      primary: textPrimary, // CRM/neutral/10 - on surface
      secondary: textSecondary // CRM/neutral variant/30 - on surface variant
    },
    divider,
    background: {
      default: background
    }
  };

  const darkPalette = {
    primary: {
      lighter: '#4F378B', // CRM/primary/30 - primary container / on primary fixed variant
      light: '#9A82DB', // CRM/primary/60 - primary fixed dim
      main: '#D0BCFF', // CRM/primary/80 - primary
      dark: '#EADDFF', // CRM/primary/90 - on primary container / primary fixed
      darker: '#F6EDFF' // CRM/primary/95 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#4A4458', // CRM/secondary/30 - secondary container / on secondary fixed variant
      light: '#958DA5', // CRM/secondary/60 - secondary fixed dim
      main: '#CCC2DC', // CRM/secondary/80 - secondary
      dark: '#E8DEF8', // CRM/secondary/90 - on secondary container / secondary fixed
      darker: '#F6EDFF' // CRM/secondary/95   - on secondary container / on secondary fixed
    },
    grey: {
      50: '#141218', // CRM/neutral/06 - surface / surface dim
      100: '#1D1B20', // CRM/neutral/10 - surface container low
      200: '#211F24', // CRM/neutral/12 - surface container
      300: '#2B292F', // CRM/neutral/17 - surface container high
      400: '#36343A', // CRM/neutral/22 - surface container highest
      500: backgroundDark, // CRM/neutral/04 - surface container lowest
      600: dividerDark, // CRM/neutral variant/30 - outline variant
      700: '#938F96', // CRM/neutral variant/60 - outline
      800: textSecondaryDark, // CRM/neutral variant/80 - on surface variant
      900: textPrimaryDark // CRM/neutral/90 - on surface
    },
    text: {
      primary: textPrimaryDark, // CRM/neutral/90 - on surface
      secondary: textSecondaryDark // CRM/neutral variant/80 - on surface variant
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
