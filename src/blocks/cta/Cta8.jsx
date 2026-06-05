'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  CALL TO ACTION - 8  ***************************/

/**
 *
 * Demos:
 * - [CTA8](https://www.Capitalta.io/blocks/cta/cta8)
 *
 * API:
 * - [CTA8 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/cta/cta8#props-details)
 */

export default function Cta8({ heading, caption, primaryBtn, image }) {
  const theme = useTheme();
  const gc = theme.vars.palette.grey[100];

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.6
        }}
      >
        <GraphicsCard>
          <Box sx={{ px: { md: 2 } }}>
            <GraphicsImage
              image={image}
              sx={{
                width: 1,
                height: { xs: 232, sm: 280, md: 390 },
                backgroundPositionY: 'bottom',
                transform: { sm: 'scale(1.1)', md: 'unset' }
              }}
            >
              <Box
                sx={{
                  height: 1,
                  background: `radial-gradient(54.94% 54.94% at 50% 54.06%, ${withAlpha(gc, 0)} 0%, ${withAlpha(gc, 0.7)} 100%)`
                }}
              />
            </GraphicsImage>
            <Stack sx={{ gap: { xs: 3, sm: 4 }, alignItems: 'center', p: { xs: 3, sm: 4, md: 5 }, textAlign: 'center' }}>
              <Typeset
                {...{
                  heading,
                  caption,
                  captionProps: { sx: { maxWidth: 470, mx: 'auto' }, variant: 'body1' },
                  stackProps: { sx: { gap: 1 } }
                }}
              />
              <ButtonAnimationWrapper>
                <Button size="large" variant="contained" sx={{ minWidth: 263 }} {...primaryBtn} />
              </ButtonAnimationWrapper>
            </Stack>
          </Box>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}

Cta8.propTypes = { heading: PropTypes.string, caption: PropTypes.string, primaryBtn: PropTypes.any, image: PropTypes.any };
