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
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  ABOUT - 2  ***************************/

/**
 *
 * Demos:
 * - [About2](https://www.Capitalta.io/blocks/about/about2)
 *
 * API
 * - [About2 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/about/about-2#props-details)
 */

export default function About2({ heading, caption, image, description, title, primaryBtn }) {
  const theme = useTheme();
  const cardPadding = { xs: 3, sm: 4, md: 5 };

  const grey100 = theme.vars.palette.grey[100];
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(71.13% 28.87% at 50% 50.07%, ${withAlpha(grey100, 0)} 0%, ${grey100} 100%)`
      : `radial-gradient(71.13% 71.13% at 50% 50.07%, ${withAlpha(grey100, 0)} 0%, ${grey100} 100%)`;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4
          }}
        >
          <Typeset
            {...{
              heading,
              caption,
              stackProps: { sx: { alignItems: 'center' } },
              headingProps: { sx: { textAlign: 'center' } },
              captionProps: { sx: { maxWidth: { xs: 476, md: 614 }, textAlign: 'center' } }
            }}
          />
        </motion.div>
        <Grid container spacing={1.5} direction={{ xs: 'column-reverse', sm: 'row' }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: 0.3
              }}
              style={{ height: '100%' }}
            >
              <GraphicsCard sx={{ height: 1 }}>
                <Stack sx={{ alignItems: 'flex-start', justifyContent: 'space-between', gap: cardPadding, p: cardPadding, height: 1 }}>
                  <Stack sx={{ gap: { xs: 1, sm: 1.5 } }}>
                    {title && <Typography variant="h4">{title}</Typography>}
                    {description && <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>}
                  </Stack>
                  {primaryBtn && (
                    <ButtonAnimationWrapper>
                      <Button variant="contained" size="large" {...primaryBtn} />
                    </ButtonAnimationWrapper>
                  )}
                </Stack>
              </GraphicsCard>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: 0.5
              }}
              style={{ height: '100%' }}
            >
              <GraphicsCard sx={{ height: 1 }}>
                <Stack sx={{ justifyContent: 'flex-end', minHeight: { xs: 207, sm: 368, md: 336 }, height: 1 }}>
                  <GraphicsImage
                    image={image}
                    sx={{
                      height: { xs: 157, sm: 241, md: 372 },
                      backgroundPositionY: 'top',
                      transform: 'scale(1.12)',
                      transformOrigin: { xs: 'top', sm: 'top' },
                      mb: { xs: -1, md: -4 }
                    }}
                  >
                    <Box sx={{ height: 1, background: gradient }} />
                  </GraphicsImage>
                </Stack>
              </GraphicsCard>
            </motion.div>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

About2.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.any,
  description: PropTypes.string,
  title: PropTypes.string,
  primaryBtn: PropTypes.any
};
