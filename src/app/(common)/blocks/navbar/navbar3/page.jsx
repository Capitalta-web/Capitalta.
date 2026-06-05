// @project
import { Other2 } from '@/blocks/other';
import { Navbar3 } from '@/blocks/navbar';
import { NavbarContent3 } from '@/blocks/navbar/navbar-content';
import { MegaMenuType } from '@/enum';

/***************************  NAVBAR 3 - DATA  ***************************/

const navbar = {
  primaryBtn: { children: 'Get Started' },
  navItems: [
    { id: 'overview', title: 'Overview' },
    { id: 'products', title: 'Products' },
    { id: 'pricing', title: 'Pricing' },
    {
      id: 'resource',
      title: 'Resource',
      megaMenu: {
        type: MegaMenuType.MEGAMENU2,
        toggleBtn: { children: 'Resource', size: 'small', sx: { color: 'text.primary', py: 1.5 } },
        menuItems: [
          {
            title: 'Blog',
            content: 'Explore our latest articles and insights.'
          },
          {
            title: 'Help center',
            content: 'Find answers to common questions and support topics.'
          },
          {
            title: 'Guides',
            content: 'Follow our comprehensive guides to get started.'
          },
          {
            title: 'Events',
            content: 'Stay informed about upcoming events and webinars.'
          },
          {
            title: 'Security',
            content: 'Learn about our security measures to protect your data.'
          }
        ]
      }
    },
    { id: 'help', title: 'Help' }
  ]
};

/***************************  BLOCK - NAVBAR 3  ***************************/

export default function BlockNavbar3() {
  return (
    <>
      <Navbar3>
        <NavbarContent3 {...navbar} />
      </Navbar3>
      <Other2 />
    </>
  );
}
