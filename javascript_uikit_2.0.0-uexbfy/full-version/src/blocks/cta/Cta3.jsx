'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import Marquee from 'react-fast-marquee';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';

import { ThemeDirection } from '@/config';
import { IconType } from '@/enum';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  CTA - TAG  ***************************/

/**
 *
 * Demos:
 * - [CTA3](https://www.Capitalta.io/blocks/cta/cta3)
 *
 * API:
 * - [CTA3 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/cta/cta3#props-details)
 */

function CtaTag({ label, icon }) {
  return (
    <Chip
      label={label}
      {...(icon && { icon: <SvgIcon type={IconType.CUSTOM} {...(typeof icon === 'string' ? { name: icon } : { ...icon })} /> })}
      slotProps={{ label: { sx: { p: 0, pl: 1.25, typography: 'h5' } } }}
      sx={{
        px: { xs: 2.25, md: 3 },
        py: { xs: 1.25, md: 1.75 },
        mx: 0.5,
        bgcolor: 'background.default',
        '& svg': { width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 }, strokeWidth: { xs: 2, md: 1.5 } }
      }}
    />
  );
}

/***************************  CALL TO ACTION - 3  ***************************/

/**
 *
 * Demos:
 * - [CTA3](https://www.Capitalta.io/blocks/cta/cta3)
 *
 * API:
 * - [CTA3 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/cta/cta3#props-details)
 */

export default function Cta3({ bgImage1, bgImage2, heading, primaryBtn, marquees }) {
  const theme = useTheme();
  const gc = theme.vars.palette.grey[100];

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 7, md: 7.5 }}>
          <GraphicsCard
            {...(bgImage1 && { bgImage: bgImage1, overLay: `linear-gradient(180deg, ${withAlpha(gc, 0)} -280%, ${gc} 143.54%)` })}
            sx={{ height: 1 }}
          >
            <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, position: 'relative', width: 1 }}>
              <Stack sx={{ alignItems: 'flex-start', gap: { xs: 3, sm: 4 } }}>
                <Typography variant="h2">{heading}</Typography>
                {primaryBtn && <Button color="primary" size="large" variant="contained" {...primaryBtn} />}
              </Stack>
            </Box>
          </GraphicsCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 5, md: 4.5 }}>
          <GraphicsCard
            {...(bgImage2 && { bgImage: bgImage2, overLay: `linear-gradient(180deg, ${withAlpha(gc, 0)} -280%, ${gc} 143.54%)` })}
            sx={{ height: 1 }}
          >
            <Box sx={{ py: 5.5, height: 1 }}>
              <Stack sx={{ gap: 1, justifyContent: 'center', height: 1 }}>
                {marquees.map((marquee, index) => (
                  <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <Marquee pauseOnHover {...(theme.direction === ThemeDirection.RTL && { direction: 'right' })} {...marquee.marqueeProps}>
                      {marquee.data.map((integration, index) => (
                        <CtaTag key={index} {...integration} />
                      ))}
                    </Marquee>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </GraphicsCard>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

CtaTag.propTypes = { label: PropTypes.any, icon: PropTypes.any };

Cta3.propTypes = {
  bgImage1: PropTypes.any,
  bgImage2: PropTypes.any,
  heading: PropTypes.string,
  primaryBtn: PropTypes.any,
  marquees: PropTypes.array
};
