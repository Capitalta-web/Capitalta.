// @project
import { BUY_NOW_URL, FREEBIES_URL, LANDING_PATH } from '@/path';

/***************************  DEFAULT - NAVBAR  ***************************/

export const navbar = {
  landingBaseUrl: LANDING_PATH.ai,
  customization: true,
  secondaryBtn: { children: 'Try Free Version', href: FREEBIES_URL, target: '_blank', rel: 'noopener noreferrer' },
  primaryBtn: { children: 'Buy Now', href: BUY_NOW_URL, target: '_blank', rel: 'noopener noreferrer' },
  animated: true,
  navItems: [
    { id: 'features', title: 'Collaborate', link: `${LANDING_PATH.ai}/collaborate` },
    { id: 'features', title: 'Features', link: `${LANDING_PATH.ai}/feature` },
    { id: 'pricing', title: 'Pricing', link: `${LANDING_PATH.ai}/pricing` },
    { id: 'faq', title: 'Solution', link: `${LANDING_PATH.ai}/solution` },
    { id: 'faq', title: `FAQ's`, link: `${LANDING_PATH.ai}/faq`, icon: 'tabler-help' }
  ]
};
