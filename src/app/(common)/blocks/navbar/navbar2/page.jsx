// @mui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { Other2 } from '@/blocks/other';
import { Navbar2 } from '@/blocks/navbar';
import { NavbarContent2 } from '@/blocks/navbar/navbar-content';
import { MegaMenuType } from '@/enum';

// @types

/***************************  NAVBAR 2 - DATA  ***************************/

function FooterData() {
  return (
    <Stack sx={{ gap: 1 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5 }}>
        <Typography variant="subtitle1">Enterprice</Typography>
        <Chip
          label="New"
          size="small"
          slotProps={{ label: { sx: { px: 1.5, py: 0.5, color: 'primary.main', typography: 'subtitle2' } } }}
          sx={{ bgcolor: 'background.default' }}
        />
      </Stack>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Discover tailored solutions to elevate your business. Stay ahead with our latest updates and insights.
      </Typography>
    </Stack>
  );
}

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
        type: MegaMenuType.MEGAMENU3,
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
          },
          {
            title: 'Blog',
            icon: 'custom-notes',
            content: 'Explore our latest articles and insights'
          },
          {
            title: 'Data security',
            icon: 'custom-data-switch',
            content: 'How we protect your data and privacy'
          }
        ],
        footerData: <FooterData />
      }
    },
    { id: 'help', title: 'Help' }
  ]
};

/***************************  BLOCK - NAVBAR 2  ***************************/

export default function BlockNavbar2() {
  return (
    <>
      <Navbar2>
        <NavbarContent2 {...navbar} />
      </Navbar2>
      <Other2 />
    </>
  );
}
