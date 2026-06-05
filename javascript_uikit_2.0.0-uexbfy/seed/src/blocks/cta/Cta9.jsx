'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  CALL TO ACTION - 9  ***************************/

/**
 *
 * Demos:
 * - [CTA9](https://www.saasable.io/blocks/cta/cta9)
 *
 * API:
 * - [CTA9 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/cta/cta9#props-details)
 */

export default function Cta9({ heading, caption, primaryBtn, image }) {
  const theme = useTheme();

  const gc = theme.vars.palette.grey[100];
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(71.16% 20.97% at 25.31% 19.88%, ${withAlpha(gc, 0)} 0%, ${withAlpha(gc, 0.7)} 100%)`
      : `radial-gradient(71.16% 79.03% at 25.31% 19.88%, ${withAlpha(gc, 0)} 0%, ${withAlpha(gc, 0.7)} 100%)`;

  const imageRadius = { borderTopLeftRadius: { xs: 12 }, borderBottomRightRadius: { xs: 24, sm: 32, md: 40 }, borderBottomLeftRadius: 0 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <GraphicsCard>
        <Grid container spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid size={{ xs: 12, sm: 8, md: 6 }}>
            <Stack sx={{ alignItems: 'flex-start', gap: { xs: 3, sm: 4 }, p: { xs: 3, sm: 4, md: 5 } }}>
              <Typeset
                {...{ heading, caption, captionProps: { sx: { maxWidth: 420 }, variant: 'body1' }, stackProps: { sx: { gap: 1 } } }}
              />
              {primaryBtn && <Button color="primary" size="large" variant="contained" sx={{ minWidth: 263 }} {...primaryBtn} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 6 }}>
            <GraphicsCard sx={{ height: 1, borderRadius: 0 }}>
              <Stack sx={{ justifyContent: 'flex-end', height: 1, pt: { sm: 4, md: 5 }, pl: { xs: 3, sm: 0 } }}>
                <GraphicsImage
                  image={image}
                  sx={{
                    width: 1,
                    height: { xs: 295, sm: 1 },
                    backgroundPositionY: 'top',
                    backgroundPositionX: 'left',
                    ...imageRadius
                  }}
                >
                  <Box
                    sx={{ height: 1, background: gradient, ...(theme.direction === ThemeDirection.RTL && { transform: 'scaleX(-1)' }) }}
                  />
                </GraphicsImage>
              </Stack>
            </GraphicsCard>
          </Grid>
        </Grid>
      </GraphicsCard>
    </ContainerWrapper>
  );
}

Cta9.propTypes = { heading: PropTypes.string, caption: PropTypes.string, primaryBtn: PropTypes.any, image: PropTypes.any };
