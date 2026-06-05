'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  SMALL HERO - 7  ***************************/

/**
 *
 * Demos:
 * - [SmallHero7](https://www.Capitalta.io/blocks/small-hero/small-hero7)
 */

export default function SmallHero7({ heading, caption, primaryBtn, image }) {
  const theme = useTheme();

  const grey100 = theme.vars.palette.grey[100];
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(94.19% 5.81% at 50% 26.18%, ${withAlpha(grey100, 0)} 0%, ${withAlpha(grey100, 0.7)} 100%)`
      : `radial-gradient(94.19% 94.19% at 50% 26.18%, ${withAlpha(grey100, 0)} 0%, ${withAlpha(grey100, 0.7)} 100%)`;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 8 }}>
          <GraphicsCard sx={{ height: 1 }}>
            <Stack sx={{ alignItems: 'flex-start', justifyContent: 'space-between', gap: 3, p: { xs: 3, sm: 4, md: 5 }, height: 1 }}>
              <Typeset {...{ heading, caption, stackProps: { sx: { gap: { xs: 1.5, sm: 2 } } }, headingProps: { variant: 'h1' } }} />
              {primaryBtn && <Button variant="contained" size="small" {...primaryBtn} />}
            </Stack>
          </GraphicsCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <GraphicsCard sx={{ height: 1 }}>
            <Stack sx={{ justifyContent: 'end', minHeight: { xs: 241, sm: 385, md: 432 } }}>
              <GraphicsImage
                image={image}
                sx={{ height: { xs: 241, sm: 320, md: 380 }, backgroundPositionY: 'top', backgroundPosition: 'left' }}
              >
                <Box sx={{ height: 1, background: gradient }} />
              </GraphicsImage>
            </Stack>
          </GraphicsCard>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

SmallHero7.propTypes = { heading: PropTypes.string, caption: PropTypes.string, primaryBtn: PropTypes.any, image: PropTypes.any };
