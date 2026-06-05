// @next
import Link from 'next/link';

// @project
import { MegaMenuType } from '@/enum';
import { BUY_NOW_URL, LANDING_PATH } from '@/path';

/***************************  DEFAULT - NAVBAR  ***************************/

export const navbar = {
  landingBaseUrl: LANDING_PATH.crm,
  customization: true,
  primaryBtn: { children: 'Buy Now', href: BUY_NOW_URL, target: '_blank', rel: 'noopener noreferrer' },
  animated: true,
  navItems: [
    { id: 'about', title: 'About', link: `${LANDING_PATH.crm}/about` },
    { id: 'career', title: 'Career', link: `${LANDING_PATH.crm}/career` },
    { id: 'pricing', title: 'Pricing', link: `${LANDING_PATH.crm}/pricing` },
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
              { title: 'Contact US', link: { component: Link, href: `${LANDING_PATH.crm}/contact` } },
              { title: 'Privacy Policy', link: { component: Link, href: `${LANDING_PATH.crm}/privacy-policy` } }
            ]
          }
        ]
      }
    },
    { id: 'faq', title: `FAQ's`, link: `${LANDING_PATH.crm}/faq` }
  ]
};
