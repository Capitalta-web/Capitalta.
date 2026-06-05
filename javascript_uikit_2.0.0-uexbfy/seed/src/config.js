// @next
import {
  Archivo,
  Figtree,
  Roboto,
  Urbanist,
  Space_Grotesk,
  DM_Sans,
  Plus_Jakarta_Sans,
  Manrope,
  Inter,
  Syne,
  Heebo
} from 'next/font/google';
import localFont from 'next/font/local';

export let Themes;

(function (Themes) {
  Themes['THEME_DEFAULT'] = 'default';
  Themes['THEME_CRM'] = 'crm';
  Themes['THEME_AI'] = 'ai';
  Themes['THEME_CRYPTO'] = 'crypto';
  Themes['THEME_HOSTING'] = 'hosting';
  Themes['THEME_PMS'] = 'pms';
  Themes['THEME_HRM'] = 'hrm';
  Themes['THEME_PLUGIN'] = 'plugin';
  Themes['THEME_LMS'] = 'lms';
})(Themes || (Themes = {}));

export let ThemeMode;

(function (ThemeMode) {
  ThemeMode['LIGHT'] = 'light';
  ThemeMode['DARK'] = 'dark';
  ThemeMode['SYSTEM'] = 'system';
})(ThemeMode || (ThemeMode = {}));

export let ThemeDirection;

(function (ThemeDirection) {
  ThemeDirection['LTR'] = 'ltr';
  ThemeDirection['RTL'] = 'rtl';
})(ThemeDirection || (ThemeDirection = {}));

export const CSS_VAR_PREFIX = '';
export const DEFAULT_THEME_MODE = ThemeMode.SYSTEM;

/***************************  CONFIG  ***************************/

const config = {
  currentTheme: Themes.THEME_DEFAULT,
  themeDirection: ThemeDirection.LTR
};

export default config;

/***************************  THEME - FONT FAMILY  ***************************/

const fontRobot = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] });

// @default
const fontSyne = Syne({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
const fontHeebo = Heebo({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] });

// @ai
const fontArchivo = Archivo({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const fontFigtree = Figtree({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// @hosting
const fontSpaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const fontDMSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// @pms
const fontPlusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const fontClashDisplay = localFont({
  src: '../public/assets/fonts/clash-display/ClashDisplay-Variable.ttf',
  variable: '--font-clash-display'
});

//HRM
const fontSatoshi = localFont({ src: '../public/assets/fonts/satoshi/Satoshi-Variable.ttf', variable: '--font-satoshi' });
const fontUncutSanaVF = localFont({ src: '../public/assets/fonts/uncut-sans/Uncut-Sans-VF.ttf', variable: '--font-uncut' });

//@plugin
const fontGeneralSans = localFont({ src: '../public/assets/fonts/general-sana/GeneralSans-Variable.ttf', variable: '--font-general-sans' });

//@crypto
const fontUrbanist = Urbanist({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

//@lms
const fontManrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '700'] });
const fontInter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const FONT_SYNE = fontSyne.style.fontFamily;
export const FONT_HEEBO = fontHeebo.style.fontFamily;
export const FONT_ROBOTO = fontRobot.style.fontFamily;
export const FONT_ARCHIVO = fontArchivo.style.fontFamily;
export const FONT_FIGTREE = fontFigtree.style.fontFamily;
export const FONT_SPACE_GROTESK = fontSpaceGrotesk.style.fontFamily;
export const FONT_DMSANS = fontDMSans.style.fontFamily;
export const FONT_PLUS_JAKARTA = fontPlusJakarta.style.fontFamily;
export const FONT_CLASH_DISPLAY = fontClashDisplay.style.fontFamily;
export const FONT_SATOSHI = fontSatoshi.style.fontFamily;
export const FONT_UNCUT_SANS_VF = fontUncutSanaVF.style.fontFamily;
export const FONT_GENERAL_SANS = fontGeneralSans.style.fontFamily;
export const FONT_URBANIST = fontUrbanist.style.fontFamily;
export const FONT_MANROPE = fontManrope.style.fontFamily;
export const FONT_INTER = fontInter.style.fontFamily;
