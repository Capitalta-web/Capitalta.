// @next
import Link from 'next/link';

// @project
import { MegaMenuType } from '@/enum';
import { BUY_NOW_URL, LANDING_PATH } from '@/path';

/***************************  DEFAULT - NAVBAR  ***************************/

export const navbar = {
  customization: true,
  landingBaseUrl: LANDING_PATH.crypto,
  primaryBtn: { children: 'Get Started', href: BUY_NOW_URL, target: '_blank', rel: 'noopener noreferrer' },
  animated: true,
  navItems: [
    { id: 'features', title: 'Features', link: `${LANDING_PATH.crypto}/feature` },
    { id: 'pricing', title: 'Pricing', link: `${LANDING_PATH.crypto}/pricing` },
    {
      id: 'pages',
      title: 'Pages',
      megaMenu: {
        type: MegaMenuType.MEGAMENU5,
        toggleBtn: { children: 'Pages' },
        popperWidth: 220,
        hoverToggler: true,
        menuItems: [
          {
            itemsList: [
              { title: 'Blog', link: { component: Link, href: `${LANDING_PATH.crypto}/blog` } },
              { title: 'Contact US', link: { component: Link, href: `${LANDING_PATH.crypto}/contact` } },
              { title: 'Privacy Policy', link: { component: Link, href: `${LANDING_PATH.crypto}/privacy-policy` } }
            ]
          }
        ]
      }
    },
    { id: 'faq', title: `FAQ's`, link: `${LANDING_PATH.crypto}/faq` }
  ]
};
