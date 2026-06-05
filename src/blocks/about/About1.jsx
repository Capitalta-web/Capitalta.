'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';

import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  ABOUT - 1  ***************************/

/**
 *
 * Demos:
 * - [About1](https://www.Capitalta.io/blocks/about/about1)
 *
 * API
 * - [About1 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/about/about-1#props-details)
 */

export default function About1({ heading, image, description1, description2 }) {
  const theme = useTheme();

  const grey100 = theme.vars.palette.grey[100];
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(71.13% 28.87% at 50% 50.07%, ${withAlpha(grey100, 0)} 0%, ${grey100} 75%)`
      : `radial-gradient(71.13% 71.13% at 50% 50.07%, ${withAlpha(grey100, 0)} 0%, ${grey100} 75%)`;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ alignItems: 'center', gap: { xs: 3, sm: 4 } }}>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          {heading}
        </Typography>
        <GraphicsCard>
          <Box sx={{ px: { xs: 3, sm: 5, md: 8 }, py: { xs: 3, sm: 4, md: 5 }, position: 'relative', zIndex: 1 }}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 19.5 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography sx={{ color: 'text.secondary' }}>{description1}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography sx={{ color: 'text.secondary' }}>{description2}</Typography>
              </Grid>
            </Grid>
          </Box>
          <GraphicsImage
            image={image}
            sx={{
              height: { xs: 157, sm: 241, md: 372 },
              backgroundPositionY: 'top',
              transform: 'scale(1.15)',
              transformOrigin: { xs: 'top', sm: 'bottom' }
            }}
          >
            <Box sx={{ height: 1, background: gradient }} />
          </GraphicsImage>
        </GraphicsCard>
      </Stack>
    </ContainerWrapper>
  );
}

About1.propTypes = { heading: PropTypes.string, image: PropTypes.any, description1: PropTypes.string, description2: PropTypes.string };
