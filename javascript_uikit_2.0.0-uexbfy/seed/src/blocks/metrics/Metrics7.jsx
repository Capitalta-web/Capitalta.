'use client';
import PropTypes from 'prop-types';

// @mui
import { useColorScheme, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GradientFab from '@/components/GradientFab';
import SvgIcon from '@/components/SvgIcon';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';
import { ThemeMode, ThemeDirection } from '@/config';
import Typeset from '@/components/Typeset';

// @assets
import Pattern1 from '@/images/graphics/Pattern1';
import Pattern2 from '@/images/graphics/Pattern2';

/***************************  METRICS - COUNTER TEXT  ***************************/

function CounterText({ count, unit }) {
  return (
    <Stack direction="row" sx={{ alignItems: 'flex-end' }}>
      <Typography component="div" variant="h1">
        {count}
      </Typography>
      {unit && (
        <Typography component="div" variant="h3" sx={{ color: 'text.secondary', mb: { xs: 0.25, md: 0.625 } }}>
          {unit}
        </Typography>
      )}
    </Stack>
  );
}

/***************************  METRICS - COUNTER CARD  ***************************/

function CounterCard({ counter, caption, defaultUnit }) {
  return (
    <GraphicsCard sx={{ p: { xs: 2, sm: 3 }, height: 170 }}>
      <Stack sx={{ gap: 1 }}>
        <CounterText count={counter} unit={defaultUnit} />
        <Typography sx={{ color: 'text.secondary' }}>{caption}</Typography>
      </Stack>
    </GraphicsCard>
  );
}

/***************************  METRICS - CARD TEXT  ***************************/

function CardText({ counter, caption, defaultUnit }) {
  return (
    <Stack sx={{ gap: { xs: 1.5, sm: 1 }, pt: { xs: 1.5, sm: 0 }, pb: { xs: 2, sm: 0 }, position: 'relative' }}>
      <CounterText count={counter} unit={defaultUnit} />
      <Typography sx={{ color: 'text.secondary' }}>{caption}</Typography>
    </Stack>
  );
}

/***************************  METRICS - 7  ***************************/

/**
 *
 * Demos:
 * - [Metrics7](https://www.saasable.io/blocks/metrics/metrics7)
 *
 * API
 * - [Metrics7 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/metrics/metrics7#props-details)
 */

export default function Metrics7({ bgImage1, bgImage2, heading, caption, blockDetail }) {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();

  const sectionSpacing = 1.5;
  const graphicsStyle = { pt: { xs: 2, sm: 3 }, pl: { xs: 2, sm: 3 }, position: 'relative', height: { xs: 216, sm: 267 } };

  const overlay =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(80.81% 80.81% at 50% 39.56%, ${withAlpha(theme.vars.palette.grey[100], 0)} 0%, ${withAlpha(theme.vars.palette.grey[100], 0.35)} 100%)`
      : `radial-gradient(80.81% 80.81% at 50% 39.56%, ${withAlpha(theme.vars.palette.grey[100], 0)} 0%, ${withAlpha(theme.vars.palette.grey[100], 0.7)} 100%)`;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, md: 4 } }}>
        <Typeset {...{ heading, caption }} />
        <Grid container spacing={sectionSpacing}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Stack sx={{ gap: sectionSpacing }}>
              <Grid container spacing={sectionSpacing}>
                <Grid size={8}>
                  <GraphicsCard
                    {...(bgImage1 && { overLay: overlay, bgImage: bgImage1 })}
                    sx={{ height: 186, backgroundPositionY: { xs: 25, sm: 13, md: -20 }, backgroundRepeat: 'no-repeat' }}
                  />
                </Grid>
                <Grid size={4}>
                  <GraphicsCard sx={{ height: 1 }}>
                    <Stack
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 1,
                        '& .gradient-fab': { display: 'contents' },
                        '& svg.tabler-cloud-up': { width: { xs: 26, sm: 36 }, height: { xs: 26, sm: 36 } }
                      }}
                    >
                      <GradientFab type="star" icon={<SvgIcon name="tabler-cloud-up" />} />
                    </Stack>
                  </GraphicsCard>
                </Grid>
              </Grid>
              <Grid container spacing={sectionSpacing}>
                <Grid size={6}>
                  <Stack sx={{ gap: sectionSpacing }}>
                    <CounterCard {...blockDetail[0]} />
                    <CounterCard {...blockDetail[1]} />
                  </Stack>
                </Grid>
                {bgImage2 && (
                  <Grid size={6}>
                    <GraphicsCard bgImage={bgImage2} sx={{ height: { xs: 1, sm: 348 } }} />
                  </Grid>
                )}
              </Grid>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Grid container spacing={sectionSpacing}>
              <Grid size={{ xs: 6, sm: 12 }}>
                <GraphicsCard sx={graphicsStyle}>
                  <Box
                    sx={{
                      height: { xs: 119, sm: 159, md: 265, lg: 226 },
                      position: 'absolute',
                      bottom: { xs: -26, sm: -28, md: -70, lg: -35 },
                      right: { xs: -70, sm: -88, md: -128 },
                      width: 1,
                      '& svg': { width: 1, height: 1 }
                    }}
                  >
                    <Pattern1 fill={withAlpha(theme.vars.palette.grey[colorScheme === ThemeMode.DARK ? 50 : 300], 0.2)} />
                  </Box>
                  <CardText {...blockDetail[2]} />
                </GraphicsCard>
              </Grid>
              <Grid size={{ xs: 6, sm: 12 }}>
                <GraphicsCard sx={graphicsStyle}>
                  <Box
                    sx={{
                      height: { xs: 137, md: 177, lg: 226 },
                      position: 'absolute',
                      bottom: { xs: -35, sm: -27, md: -50, lg: -42 },
                      right: { xs: -50, sm: -76 },
                      width: 1,
                      '& svg': { width: 1, height: 1 }
                    }}
                  >
                    <Pattern2 fill={withAlpha(theme.vars.palette.grey[colorScheme === ThemeMode.DARK ? 50 : 300], 0.2)} />
                  </Box>
                  <CardText {...blockDetail[3]} />
                </GraphicsCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

CounterText.propTypes = { count: PropTypes.number, unit: PropTypes.string };

CounterCard.propTypes = { counter: PropTypes.any, caption: PropTypes.any, defaultUnit: PropTypes.any };

CardText.propTypes = { counter: PropTypes.any, caption: PropTypes.any, defaultUnit: PropTypes.any };

Metrics7.propTypes = {
  bgImage1: PropTypes.any,
  bgImage2: PropTypes.any,
  heading: PropTypes.any,
  caption: PropTypes.any,
  blockDetail: PropTypes.any
};
