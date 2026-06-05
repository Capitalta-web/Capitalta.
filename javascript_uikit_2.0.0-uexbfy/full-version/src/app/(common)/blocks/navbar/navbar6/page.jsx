// @project
import { Other2 } from '@/blocks/other';
import { Navbar6 } from '@/blocks/navbar';
import { NavbarContent6 } from '@/blocks/navbar/navbar-content';
import { MegaMenuType } from '@/enum';

/***************************  NAVBAR 6 - DATA  ***************************/

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
    { id: 'help', title: 'Help', icon: 'tabler-help' }
  ]
};

/***************************  BLOCK - NAVBAR 6  ***************************/

export default function BlockNavbar6() {
  return (
    <>
      <Navbar6>
        <NavbarContent6 {...navbar} />
      </Navbar6>
      <Other2 />
    </>
  );
}
