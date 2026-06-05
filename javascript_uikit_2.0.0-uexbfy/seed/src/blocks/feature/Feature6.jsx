'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard, IconCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';
import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FEATURE - 6  ***************************/

/**
 *
 * Demos:
 * - [Feature6](https://www.saasable.io/blocks/feature/feature6)
 *
 * API
 * - [Feature6 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/feature/feature6#props-details)
 */

export default function Feature6({ heading, caption, image, features }) {
  const theme = useTheme();

  const gc = theme.vars.palette.grey[100];
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(100% 100% at 14.27% 46.41%, ${withAlpha(gc, 0)} 0%, ${withAlpha(gc, 0.3)} 100%)`
      : `radial-gradient(100% 100% at 14.27% 46.41%, ${withAlpha(gc, 0)} 0%, ${withAlpha(gc, 0.6)} 100%)`;

  const imageBoxRadius = { xs: 3, sm: 5 };
  const imageRadius = { borderTopLeftRadius: { xs: 12 }, borderBottomRightRadius: { xs: 24, sm: 32, md: 40 } };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4
          }}
        >
          <Typeset {...{ heading, caption }} />
        </motion.div>
        <Grid container spacing={1.5}>
          {image && (
            <Grid size={{ xs: 12, md: 4.5 }}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.4
                }}
                style={{ height: '100%' }}
              >
                <GraphicsCard sx={{ pl: imageBoxRadius, pt: imageBoxRadius, height: { xs: 332, md: '100%' } }}>
                  <GraphicsImage image={image} sx={{ height: 1, backgroundPositionX: 'left', backgroundPositionY: 'top', ...imageRadius }}>
                    <Box sx={{ width: 1, height: 1, ...imageRadius, background: gradient }} />
                  </GraphicsImage>
                </GraphicsCard>
              </motion.div>
            </Grid>
          )}
          <Grid size={{ xs: 12, md: 7.5 }}>
            <Grid container spacing={1.5}>
              {features.map((item, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: item.animationDelay
                    }}
                  >
                    <IconCard icon={item.icon} title={item.title} content={item.content} iconAvatar cardPadding={{ xs: 2, sm: 3, md: 3 }} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Feature6.propTypes = { heading: PropTypes.string, caption: PropTypes.string, image: PropTypes.any, features: PropTypes.array };
