// @project
import { pagesMegamenu } from '../../common-data';
import SvgIcon from '@/components/SvgIcon';
import { ADMIN_PATH, BUY_NOW_URL, DOCS_URL, FREEBIES_URL } from '@/path';

/***************************  DEFAULT - NAVBAR  ***************************/

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };
export const navbar = {
  customization: true,
  secondaryBtn: {
    children: <SvgIcon name="tabler-brand-github" color="primary.main" size={18} />,
    href: FREEBIES_URL,
    ...linkProps,
    sx: { minWidth: 40, width: 40, height: 40, p: 0 }
  },
  primaryBtn: { children: 'Buy Now', href: BUY_NOW_URL, ...linkProps },
  animated: true,
  navItems: [
    { id: 'home', title: 'Home', link: '/' },
    { id: 'dashboard', title: 'Dashboard', link: ADMIN_PATH, ...linkProps },
    pagesMegamenu,
    { id: 'docs', title: 'Docs', link: DOCS_URL, ...linkProps, icon: 'tabler-pin-invoke' }
  ]
};
