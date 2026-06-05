// @mui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { MegaMenu3 } from '@/blocks/mega-menu';
import { MenuPopper } from '@/components/navbar';

/***************************  MEGAMENU 3 - FOOTER  ***************************/

function footerData() {
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

/***************************  MEGAMENU 3 - DATA  ***************************/

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
    },
    {
      title: 'Blog',
      icon: 'custom-notes',
      content: 'Explore our latest articles and insights'
    },
    {
      title: 'Data security',
      icon: 'custom-lock',
      content: 'How we protect your data and privacy'
    }
  ],
  footerData: footerData()
};

/***************************  BLOCK - MEGAMENU 3  ***************************/

export default function BlockMegamenu3() {
  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Box sx={{ my: 4 }}>
        <MenuPopper toggleProps={{ children: 'Mega Menu 3' }} defaultOpen popperWidth={725} offset={8}>
          <MegaMenu3 {...data} />
        </MenuPopper>
      </Box>
    </Stack>
  );
}
