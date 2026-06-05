'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  ABOUT - 3  ***************************/

/**
 *
 * Demos:
 * - [About3](https://www.Capitalta.io/blocks/about/about3)
 *
 * API
 * - [About3 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/about/about-3#props-details)
 */

export default function About3({ heading, image, description, list }) {
  const theme = useTheme();

  const grey100 = theme.vars.palette.grey[100];
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(71.13% 28.87% at 50% 50.07%, ${withAlpha(grey100, 0)} 0%, ${grey100} 100%)`
      : `radial-gradient(71.13% 71.13% at 50% 50.07%, ${withAlpha(grey100, 0)} 0%, ${grey100} 100%)`;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.5
            }}
            style={{ height: '100%' }}
          >
            <Stack sx={{ justifyContent: 'space-between', gap: { xs: 2.5, sm: 3, md: 4 }, height: 1 }}>
              <Typeset {...{ heading }} />
              <Stack sx={{ gap: { xs: 1, md: 1.5 } }}>
                <Typography>{description}</Typography>
                <Grid container>
                  {list.map((item, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6 }}>
                      <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center', py: { xs: 0.5, sm: 0.75 } }}>
                        <SvgIcon name="tabler-rosette-discount-check" stroke={1} color="text.secondary" />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {item.title}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Stack>
          </motion.div>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.7
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
                    transform: 'scale(1.1)',
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
    </ContainerWrapper>
  );
}

About3.propTypes = { heading: PropTypes.string, image: PropTypes.any, description: PropTypes.string, list: PropTypes.array };
