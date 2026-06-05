// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import { MegaMenu1 } from '@/blocks/mega-menu';
import { MenuPopper } from '@/components/navbar';

/***************************  MEGAMENU 1 - DATA  ***************************/

const data = {
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
    link: { children: 'See all', sx: { textTransform: 'none' } },
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
};

/***************************  BLOCK - MEGAMENU 1  ***************************/

export default function BlockMegamenu1() {
  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Box sx={{ my: 4 }}>
        <MenuPopper toggleProps={{ children: 'Mega Menu 1' }} defaultOpen offset={8}>
          <MegaMenu1 {...data} />
        </MenuPopper>
      </Box>
    </Stack>
  );
}
