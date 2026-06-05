// @project
import { BUY_NOW_URL, LANDING_PATH } from '@/path';

/***************************  DEFAULT - NAVBAR  ***************************/

export const navbar = {
  landingBaseUrl: LANDING_PATH.hosting,
  customization: true,
  primaryBtn: { children: 'Buy Now', href: BUY_NOW_URL, target: '_blank', rel: 'noopener noreferrer' },
  animated: true,
  navItems: [
    { id: 'about', title: 'About', link: `${LANDING_PATH.hosting}/about` },
    { id: 'services', title: 'Services', link: `${LANDING_PATH.hosting}/services` },
    { id: 'solutions', title: 'Solutions', link: `${LANDING_PATH.hosting}/solutions` },
    { id: 'pricing', title: 'Pricing', link: `${LANDING_PATH.hosting}/pricing` },
    { id: 'contact', title: 'Contact', link: `${LANDING_PATH.hosting}/contact` }
  ]
};
