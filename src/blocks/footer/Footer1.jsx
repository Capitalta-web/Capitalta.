'use client';

// @mui
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import { Copyright, FollowUS, JoinUS, Sitemap } from '@/components/footer';
import LogoSection from '@/components/logo';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FOOTER - 1  ***************************/

/**
 *
 * Demos:
 * - [Footer1](https://www.Capitalta.io/blocks/footer/footer1)
 */

export default function Footer1() {
  const joinFollowContent = (
    <Stack sx={{ alignItems: { xs: 'center', md: 'flex-start' }, justifyContent: 'space-between', gap: 4, height: 1 }}>
      <JoinUS stackProps={{ sx: { alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } } }} />
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
          duration: 0.3,
          delay: 0.4
        }}
      >
        <GraphicsCard id="footer-1" role="contentinfo" rel="noopener noreferrer" aria-label="Footer 1">
          <Box sx={{ padding: { xs: 2.5, sm: 3, md: 4 } }}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {/* visible on desktop media */}
              <Grid sx={{ display: { xs: 'none', md: 'block' } }} size={{ xs: 12, md: 6 }}>
                {joinFollowContent}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Sitemap />
              </Grid>
              {/* visible on mobile and tablet media */}
              <Grid sx={{ display: { xs: 'block', md: 'none' } }} size={{ xs: 12, md: 6 }}>
                {joinFollowContent}
              </Grid>
              <Grid size={12}>
                <Divider />
              </Grid>
              <Grid size={12}>
                <Stack
                  direction={{ md: 'row' }}
                  sx={{
                    alignItems: 'center',
                    justifyContent: { xs: 'center', md: 'space-between' },
                    gap: { xs: 3.5, sm: 3 },
                    mt: { xs: 1.5, sm: 0 }
                  }}
                >
                  <LogoSection />
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
