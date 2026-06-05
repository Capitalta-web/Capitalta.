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

/***************************  FOOTER - 2  ***************************/

/**
 *
 * Demos:
 * - [Footer2](https://www.Capitalta.io/blocks/footer/footer2)
 */

export default function Footer2() {
  const logoJoinContent = (
    <Stack
      sx={{ alignItems: { xs: 'center', sm: 'flex-start' }, justifyContent: 'space-between', gap: 3, height: 1, pb: { xs: 2.5, md: 0 } }}
    >
      <LogoSection />
      <JoinUS stackProps={{ sx: { alignItems: { xs: 'center', sm: 'flex-start' }, textAlign: { xs: 'center', sm: 'left' } } }} />
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
        <GraphicsCard id="footer-2" role="contentinfo" rel="noopener noreferrer" aria-label="Footer 2">
          <Box sx={{ padding: { xs: 2.5, sm: 3, md: 4 } }}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>{logoJoinContent}</Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Sitemap />
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
                  <FollowUS heading={false} />
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
