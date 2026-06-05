'use client';

import { useState } from 'react';

import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import AnimatedModal from './AnimatedModal';
import SvgIcon from './SvgIcon';
import { MegaMenu4 } from '@/blocks/mega-menu';
import branding from '@/branding.json';
import { ModalCard } from '@/components/cards';
import { landings } from '@/data/landings';
import { BUY_NOW_URL } from '@/path';

import { IconType } from '@/enum';

/***************************  MEGAMENU 4 - FOOTER  ***************************/

function footerData() {
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
                sx={{ width: 16, height: 16, pl: 0.5 }}
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
      <Button
        variant="contained"
        sx={{ display: { xs: 'none', sm: 'inline-flex' }, minWidth: 100, px: { xs: 2 }, py: 1.25 }}
        href={BUY_NOW_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Buy Now
      </Button>
    </Stack>
  );
}

/***************************  MEGAMENU 4 - DATA  ***************************/

export const data = {
  menuItems: landings,
  footerData: footerData()
};

const modalSize = {
  width: { xs: '100vw', sm: 720, md: 936 },
  maxHeight: { xs: '100dvh', sm: 'calc(100vh - 80px)', md: 'calc(100vh - 96px)' }
};

/***************************  LANDING PRESENTATION  ***************************/

export default function LandingPresentation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        sx={(theme) => ({
          position: 'fixed',
          top: '25%',
          right: 16,
          zoom: 2,
          zIndex: 1299,
          transformOrigin: 'right',
          transform: 'rotate(-90deg) translate3d(0, 0, 0) scale(0.6)',
          willChange: 'transform',
          boxShadow: `2px -6px 10px 0px ${theme.vars.palette.grey[500]}`,
          '&:hover': { boxShadow: `2px -6px 10px 0px ${theme.vars.palette.grey[500]}` },
          padding: '8px 18px',
          bgcolor: 'background.paper',
          [theme.breakpoints.down('md')]: {
            typography: 'caption',
            padding: '6px 14px',
            '& svg': { width: 16, height: 16 },
            right: 12
          }
        })}
        startIcon={<SvgIcon name="tabler-filled-layout-grid" color="inherit" size={20} type={IconType.FILL} />}
        onClick={() => setOpen(true)}
      >
        Demos
      </Button>

      <AnimatedModal open={open} onClose={() => setOpen(false)} modalSize={modalSize}>
        <ModalCard sx={{ ...modalSize, overflow: 'auto', borderRadius: { xs: 0, sm: 4 } }}>
          <MegaMenu4 {...data} />
        </ModalCard>
      </AnimatedModal>
      {open && (
        <Fab
          color="error"
          onClick={() => setOpen(false)}
          sx={{
            width: 30,
            height: 30,
            minHeight: 30,
            position: 'absolute',
            top: 24,
            right: 24,
            zIndex: 1400,
            display: { xs: 'flex', sm: 'none' }
          }}
        >
          <SvgIcon name="tabler-x" color="inherit" size={20} />
        </Fab>
      )}
    </>
  );
}
