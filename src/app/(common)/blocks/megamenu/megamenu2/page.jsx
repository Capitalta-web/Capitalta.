// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import { MegaMenu2 } from '@/blocks/mega-menu';
import { MenuPopper } from '@/components/navbar';

/***************************  MEGAMENU 2 - DATA  ***************************/

const data = {
  menuItems: [
    {
      title: 'Blog',
      content: 'Explore our latest articles and insights.'
    },
    {
      title: 'Help center',
      content: 'Find answers to common questions and support topics.',
      selected: true
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
    },
    {
      title: 'Payments',
      content: 'Get help with billing and payment options.'
    }
  ]
};

/***************************  BLOCK - MEGAMENU 2  ***************************/

export default function BlockMegamenu2() {
  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Box sx={{ my: 4 }}>
        <MenuPopper toggleProps={{ children: 'Mega Menu 2' }} defaultOpen offset={8}>
          <MegaMenu2 {...data} />
        </MenuPopper>
      </Box>
    </Stack>
  );
}
