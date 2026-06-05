'use client';

// @mui
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import { Copyright, FollowUS, JoinUS, Sitemap } from '@/components/footer';
import LogoSection from '@/components/logo';
import { Localization } from '@/components/navbar';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FOOTER - 3  ***************************/

/**
 *
 * Demos:
 * - [Footer3](https://www.Capitalta.io/blocks/footer/footer3)
 */

export default function Footer3() {
  const logoFollowContent = (
    <Stack
      sx={{ alignItems: { xs: 'center', md: 'flex-start' }, justifyContent: 'space-between', gap: 4, height: 1, pb: { xs: 2.5, md: 0 } }}
    >
      <Stack sx={{ alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' }, gap: 1.75 }}>
        <LogoSection />
        <Typography variant="body2" sx={{ maxWidth: 280 }}>
          Empower your HR team with our comprehensive platform for seamless HR management
        </Typography>
      </Stack>
      <Localization />
      <FollowUS />
    </Stack>
  );

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: 0.4
        }}
      >
        <GraphicsCard id="footer-7" role="contentinfo" rel="noopener noreferrer" aria-label="Footer 7">
          <GraphicsCard sx={{ bgcolor: 'grey.200' }}>
            <Box sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
              <JoinUS
                stackProps={{ direction: { md: 'row' }, sx: { alignItems: { md: 'center' }, justifyContent: 'space-between' } }}
                headingProps={{ variant: 'h3' }}
              />
            </Box>
          </GraphicsCard>
          <Box sx={{ padding: { xs: 2.5, sm: 3, md: 4 } }}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>{logoFollowContent}</Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Sitemap />
              </Grid>
              <Grid size={12}>
                <Divider />
              </Grid>
              <Grid size={12}>
                <Stack sx={{ alignItems: 'center' }}>
                  <Copyright />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}
