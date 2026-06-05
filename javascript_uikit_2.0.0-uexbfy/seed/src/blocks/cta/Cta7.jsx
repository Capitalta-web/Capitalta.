'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';
import { getBackgroundDots } from '@/utils/getBackgroundDots';

/***************************  CALL TO ACTION - 7  ***************************/

/**
 *
 * Demos:
 * - [CTA7](https://www.saasable.io/blocks/cta/cta7)
 *
 * API:
 * - [CTA7 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/cta/cta7#props-details)
 */

export default function Cta7({ headLine, caption, primaryBtn }) {
  const theme = useTheme();
  const gc = theme.vars.palette.grey[300];

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: 0.5
        }}
      >
        <GraphicsCard overLay={`radial-gradient(75% 60% at 50% 46.88%, ${withAlpha(gc, 0)} 0%, ${gc} 100%)`}>
          <Box sx={{ p: { xs: 3, sm: 4, md: 8 }, ...getBackgroundDots(theme.vars.palette.grey[300], 3, 40) }}>
            <Grid container spacing={{ xs: 4, sm: 6, md: 12 }} sx={{ alignItems: 'flex-end' }}>
              <Grid size={{ sm: 6.5 }}>{headLine}</Grid>
              <Grid size={{ sm: 5.5 }}>
                <Stack sx={{ gap: { xs: 2, md: 3 }, alignItems: { sm: 'flex-start' } }}>
                  <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    {caption}
                  </Typography>
                  <ButtonAnimationWrapper>
                    <Button color="primary" size="large" variant="contained" {...primaryBtn} />
                  </ButtonAnimationWrapper>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}

Cta7.propTypes = { headLine: PropTypes.node, caption: PropTypes.string, primaryBtn: PropTypes.any };
