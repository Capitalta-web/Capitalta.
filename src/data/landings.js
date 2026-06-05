import { Themes } from '@/config';
import { LANDING_PATH } from '@/path';

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

/***************************  LANDING - DATA  ***************************/

export const landings = [
  {
    title: 'CRM',
    theme: Themes.THEME_CRM,
    image: { light: '/assets/images/mega-menu/crm-light.svg', dark: '/assets/images/mega-menu/crm-dark.svg' },
    link: { href: LANDING_PATH.crm, ...linkProps }
  },
  {
    title: 'AI',
    theme: Themes.THEME_AI,
    image: { light: '/assets/images/mega-menu/ai-light.svg', dark: '/assets/images/mega-menu/ai-dark.svg' },
    link: { href: LANDING_PATH.ai, ...linkProps }
  },
  {
    title: 'Crypto',
    theme: Themes.THEME_CRYPTO,
    image: { light: '/assets/images/mega-menu/crypto-light.svg', dark: '/assets/images/mega-menu/crypto-dark.svg' },
    link: { href: LANDING_PATH.crypto, ...linkProps }
  },
  {
    title: 'Hosting',
    theme: Themes.THEME_HOSTING,
    image: { light: '/assets/images/mega-menu/hosting-light.svg', dark: '/assets/images/mega-menu/hosting-dark.svg' },
    link: { href: LANDING_PATH.hosting, ...linkProps }
  },
  {
    title: 'PMS',
    theme: Themes.THEME_PMS,
    image: { light: '/assets/images/mega-menu/pms-light.svg', dark: '/assets/images/mega-menu/pms-dark.svg' },
    link: { href: LANDING_PATH.pms, ...linkProps }
  },
  {
    title: 'HRM',
    theme: Themes.THEME_HRM,
    image: { light: '/assets/images/mega-menu/hrm-light.svg', dark: '/assets/images/mega-menu/hrm-dark.svg' },
    link: { href: LANDING_PATH.hrm, ...linkProps }
  },
  {
    title: 'Plugin',
    theme: Themes.THEME_PLUGIN,
    image: { light: '/assets/images/mega-menu/plugin-light.svg', dark: '/assets/images/mega-menu/plugin-dark.svg' },
    link: { href: LANDING_PATH.plugin, ...linkProps }
  },
  {
    title: 'LMS',
    theme: Themes.THEME_LMS,
    image: { light: '/assets/images/mega-menu/lms-light.svg', dark: '/assets/images/mega-menu/lms-dark.svg' },
    link: { href: LANDING_PATH.lms, ...linkProps }
  }
];
