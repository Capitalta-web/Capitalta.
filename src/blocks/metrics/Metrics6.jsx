'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  METRICS - COUNTER TEXT  ***************************/

function CounterCard({ counter, caption, defaultUnit }) {
  return (
    <Stack
      direction={{ xs: 'row', sm: 'column' }}
      sx={{ gap: { xs: 1.5, sm: 1 }, alignItems: 'center', px: { sm: 1, md: 4 }, pt: { xs: 1.5, sm: 0 }, pb: { xs: 2, sm: 0 } }}
    >
      <Stack direction="row" sx={{ alignItems: 'flex-end' }}>
        <Typography component="div" variant="h1">
          {counter}
        </Typography>
        <Typography component="div" variant="h3" sx={{ color: 'text.secondary', mb: { xs: 0.25, md: 0.625 } }}>
          {defaultUnit}
        </Typography>
      </Stack>
      <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>{caption}</Typography>
    </Stack>
  );
}

/***************************  METRICS - 6  ***************************/

/**
 *
 * Demos:
 * - [Metrics6](https://www.Capitalta.io/blocks/metrics/metrics6)
 *
 * API:
 * - [Metrics6 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/metrics/metrics6#props-details)
 */

export default function Metrics6({ bgImage, heading, caption, blockDetail }) {
  const theme = useTheme();

  const overlay =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(80.81% 80.81% at 50% 39.56%, ${withAlpha(theme.vars.palette.grey[100], 0)} 0%, ${withAlpha(theme.vars.palette.grey[100], 0.35)} 100%)`
      : `radial-gradient(80.81% 80.81% at 50% 39.56%, ${withAlpha(theme.vars.palette.grey[100], 0)} 0%, ${withAlpha(theme.vars.palette.grey[100], 0.7)} 100%)`;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid size={{ xs: 12, sm: 4, md: 5 }}>
          <GraphicsCard {...(bgImage && { overLay: overlay, bgImage })} sx={{ height: { xs: 240, sm: 1 } }} />
        </Grid>
        <Grid size={{ xs: 12, sm: 8, md: 7 }}>
          <Typeset {...{ heading, caption }} />
          <Grid container sx={{ pt: { xs: 1.5, sm: 5, md: 6 } }}>
            {blockDetail.map((detail, index) => (
              <Grid key={index} size={{ xs: 12, sm: 4 }}>
                <Stack direction={{ sm: 'row' }} sx={{ height: 1 }}>
                  {index > 0 && (
                    <Divider
                      flexItem
                      sx={{
                        height: 'auto',
                        width: 'auto',
                        /**
                         * Sets the border orientation of the divider based on the screen size.
                         * - If the screen size is small, the orientation is 'horizontal'.
                         * - If the screen size is medium or large, the orientation 'vertical'.
                         * orientation={!downSM ? 'vertical' : 'horizontal'}
                         */
                        borderRightWidth: { xs: 'unset', sm: 'thin' },
                        borderBottomWidth: { xs: 'thin', sm: 0 }
                      }}
                    />
                  )}
                  <CounterCard {...detail} />
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

CounterCard.propTypes = { counter: PropTypes.any, caption: PropTypes.any, defaultUnit: PropTypes.any };

Metrics6.propTypes = { bgImage: PropTypes.any, heading: PropTypes.any, caption: PropTypes.any, blockDetail: PropTypes.any };
