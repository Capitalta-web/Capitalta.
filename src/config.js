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
  Heebo,
  Poppins // Importing Poppins for modern look
} from 'next/font/google';
import localFont from 'next/font/local';
import { AuthType } from '@/enum';

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

export let ThemeI18n;

(function (ThemeI18n) {
  ThemeI18n['EN'] = 'en';
  ThemeI18n['FR'] = 'fr';
  ThemeI18n['RO'] = 'ro';
  ThemeI18n['ZH'] = 'zh';
})(ThemeI18n || (ThemeI18n = {}));

export const AUTH_CONFIG_KEY = 'auth-config';
export const AUTH_USER_KEY = 'auth-user';
export const AUTH_PROVIDER = AuthType.SUPABASE;
export const SOCIAL_AUTH_PROVIDER = AuthType.SUPABASE;

export const defaultAuthConfig = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

export const CSS_VAR_PREFIX = '';
export const DEFAULT_THEME_MODE = ThemeMode.SYSTEM;
export const APP_DEFAULT_PATH = '/dashboard';
export const DRAWER_WIDTH = 260;
export const MINI_DRAWER_WIDTH = 60;
export const HEADER_HEIGHT = 74;

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

// @hrm
const fontUncutSans = localFont({
  src: '../public/assets/fonts/uncut-sans/Uncut-Sans-VF.ttf',
  variable: '--font-uncut-sans'
});
const fontSatoshi = localFont({
  src: '../public/assets/fonts/satoshi/Satoshi-Variable.ttf',
  variable: '--font-satoshi'
});

// @plugin
const fontGeneralSans = localFont({
  src: '../public/assets/fonts/general-sana/GeneralSans-Variable.ttf',
  variable: '--font-general-sans'
});

// @lms
const fontManrope = Manrope({ subsets: ['latin'] });
const fontInter = Inter({ subsets: ['latin'] });

export const FONT_ROBOTO = fontRobot;
export const FONT_SYNE = fontSyne;
export const FONT_HEEBO = fontHeebo;
export const FONT_ARCHIVO = fontArchivo;
export const FONT_FIGTREE = fontFigtree;
export const FONT_SPACE_GROTESK = fontSpaceGrotesk;
export const FONT_DM_SANS = fontDMSans;
export const FONT_DMSANS = fontDMSans; // Alias for compatibility
export const FONT_URBANIST = Urbanist({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
export const FONT_PLUS_JAKARTA = fontPlusJakarta;
export const FONT_SATOSHI = fontSatoshi;
export const FONT_CLASH_DISPLAY = fontClashDisplay;
export const FONT_UNCUT_SANS_VF = fontUncutSans;
export const FONT_GENERAL_SANS = fontGeneralSans;
export const FONT_MANROPE = fontManrope;
export const FONT_INTER = fontInter;
export const FONT_POPPINS = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

// Definición de fuentes personalizadas para Capitalta
export const FONT_ALTA_CUSTOM = localFont({
  src: '../public/assets/fonts/alta/alta_regular.otf',
  variable: '--font-alta'
});
export const FONT_ALTA = FONT_ALTA_CUSTOM; // Tipografía para la palabra "Capitalta"
export const FONT_GENERAL = FONT_POPPINS; // Tipografía global moderna
