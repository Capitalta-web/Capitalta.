// @project
import { Other2 } from '@/blocks/other';
import { Navbar9 } from '@/blocks/navbar';
import { NavbarContent9 } from '@/blocks/navbar/navbar-content';
import { MegaMenuType } from '@/enum';

/***************************  NAVBAR 9 - DATA  ***************************/

const navbar = {
  primaryBtn: { children: 'Get Started' },
  secondaryBtn: { children: 'Sign in' },
  navItems: [
    { id: 'overview', title: 'Overview' },
    { id: 'products', title: 'Products' },
    { id: 'pricing', title: 'Pricing' },
    {
      id: 'resource',
      title: 'Resource',
      megaMenu: {
        type: MegaMenuType.MEGAMENU1,
        toggleBtn: { children: 'Resource', size: 'small', sx: { color: 'text.primary', py: 1.5 } },
        menuItems: [
          {
            title: 'Help center',
            icon: 'custom-help',
            content: 'Get of your question answered'
          },
          {
            title: 'Guides',
            icon: 'custom-book',
            content: 'Detailed step-by-step guides'
          },
          {
            title: 'Events',
            icon: 'custom-calander',
            content: 'Stay updated on upcoming events'
          },
          {
            title: 'Payments',
            icon: 'custom-wrap-card',
            content: 'Learn about payment options'
          }
        ],
        footerData: {
          title: 'Recent posts',
          link: { children: 'See all' },
          list: [
            {
              title: 'Mar 5, 2024',
              content: 'Boost your conversion rate'
            },
            {
              title: 'Mar 18, 2024',
              content: 'Understanding the basics of web development'
            },
            {
              title: 'Mar 26, 2024',
              content: 'Exploring new trends in technology'
            }
          ]
        }
      }
    },
    { id: 'help', title: 'Help', icon: 'tabler-help' }
  ]
};

/***************************  BLOCK - NAVBAR 9  ***************************/

export default function BlockNavbar9() {
  return (
    <>
      <Navbar9>
        <NavbarContent9 {...navbar} />
      </Navbar9>
      <Other2 />
    </>
  );
}
