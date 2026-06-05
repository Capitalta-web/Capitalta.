'use client';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import branding from '@/branding.json';
import { MegaMenu4 } from '@/blocks/mega-menu';
import { MenuPopper } from '@/components/navbar';
import { landings } from '@/data/landings';
import { BUY_NOW_URL } from '@/path';
import { withAlpha } from '@/utils/colorUtils';

// @third-party
import { motion } from 'motion/react';

/***************************  MEGAMENU 4 - FOOTER  ***************************/

function FooterData() {
  const theme = useTheme();

  return (
    <Stack direction={{ sm: 'row' }} sx={{ gap: 1.5, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}>
      <Stack sx={{ gap: 1 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
          <Typography variant="h5">Explore our range of landing demos tailored to suit your needs</Typography>
          <Chip
            label="Featured"
            size="small"
            slotProps={{ label: { sx: { px: 1.5, py: 0.5, typography: 'caption', my: 0.2 } } }}
            sx={{ bgcolor: 'background.default', display: { xs: 'none', sm: 'inline-flex' } }}
            icon={
              <CardMedia
                component="img"
                image="/assets/images/shared/celebration.svg"
                sx={{ width: 16, height: 16 }}
                alt="celebration"
                loading="lazy"
              />
            }
          />
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {branding.brandName} offers 200+ customizable blocks, empowering you to effortlessly design and build landing pages tailored to
          your product or service needs.
        </Typography>
      </Stack>
      <motion.div
        initial={{ borderRadius: '50px' }}
        animate={{
          boxShadow: [
            `0px 0px 0px 0px ${withAlpha(theme.vars.palette.primary.main, 0.7)}`,
            `0px 0px 0px 8px ${withAlpha(theme.vars.palette.primary.main, 0)}`,
            `0px 0px 0px 0px ${withAlpha(theme.vars.palette.primary.main, 0)}`
          ],
          borderRadius: '50px'
        }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      >
        <Button
          variant="contained"
          sx={{ display: { xs: 'none', sm: 'inline-flex' }, minWidth: 100, px: { xs: 2 }, py: 1.25 }}
          href={BUY_NOW_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy Now
        </Button>
      </motion.div>
    </Stack>
  );
}

/***************************  MEGAMENU 4 - DATA  ***************************/

const data = {
  menuItems: landings,
  footerData: <FooterData />
};

/***************************  BLOCK - MEGAMENU 4  ***************************/

export default function BlockMegamenu4() {
  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Box sx={{ my: 4 }}>
        <MenuPopper toggleProps={{ children: 'Mega Menu 4' }} defaultOpen popperWidth={936} offset={8}>
          <MegaMenu4 {...data} />
        </MenuPopper>
      </Box>
    </Stack>
  );
}
