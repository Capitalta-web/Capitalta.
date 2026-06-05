'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GradientFab from '@/components/GradientFab';
import GraphicsImage from '@/components/GraphicsImage';
import LogoSection from '@/components/logo';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  EARLY ACCESS  ***************************/

/**
 *
 * Demos:
 * - [EarlyAccess](https://www.saasable.io/blocks/early-access)
 *
 *  * API
 * - [EarlyAccess API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/earlyaccess#props-details)
 */

export default function EarlyAccess({ heading, caption, primaryBtn, image }) {
  const theme = useTheme();

  const gc = theme.vars.palette.grey[100];
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(71.13% 28.87% at 50% 50.07%, ${withAlpha(gc, 0)} 0%, ${gc} 100%)`
      : `radial-gradient(71.13% 71.13% at 50% 50.07%, ${withAlpha(gc, 0)} 0%, ${gc} 100%)`;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <GraphicsCard
        sx={{
          width: 1,
          position: 'relative',
          height: { sm: 'calc(100vh - 80px)', md: 'calc(100vh - 96px)' },
          minHeight: { xs: 'calc(100vh - 64px)', sm: 500, md: 600 }
        }}
      >
        <Grid container sx={{ height: 1 }}>
          <Grid size={{ xs: 12, sm: 7 }}>
            <Box sx={{ p: { xs: 3, sm: 7 }, height: 1 }}>
              <Stack sx={{ gap: { sm: 10 }, alignItems: 'flex-start', justifyContent: 'center', height: 1 }}>
                <Box
                  sx={{
                    position: { xs: 'absolute', sm: 'relative' },
                    top: { xs: 24, sm: 'unset' },
                    left: { xs: 24, sm: 'unset' },
                    '& .gradient-fab': { display: 'contents', '& svg': { width: { xs: 89, sm: 100 }, height: { xs: 89, sm: 100 } } }
                  }}
                >
                  <GradientFab type="star" icon={<LogoSection isIcon={true} />} />
                </Box>
                <Stack sx={{ position: 'relative', gap: 4 }}>
                  <Typeset {...{ heading, caption, stackProps: { sx: { gap: { xs: 1.5, sm: 2 } } } }} />
                  <OutlinedInput
                    placeholder="Enter your email address"
                    endAdornment={<Button color="primary" variant="contained" sx={{ minWidth: 210 }} {...primaryBtn} />}
                    slotProps={{
                      input: { 'aria-label': 'Email address', sx: { px: 2.5, py: 0.75 } },
                      notchedOutline: { sx: { borderRadius: 25 } }
                    }}
                    sx={{
                      typography: 'caption2',
                      bgcolor: 'grey.100',
                      maxWidth: { xs: 343, sm: 364 },
                      width: 1,
                      p: 0.5,
                      whiteSpace: 'nowrap'
                    }}
                  />
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid sx={{ order: { xs: -1, sm: 0 } }} size={{ xs: 12, sm: 5 }}>
            <Box sx={{ pl: { xs: 10, sm: 0 }, height: 1 }}>
              <GraphicsImage sx={{ height: { xs: 420, sm: 1 }, backgroundPositionX: 'left', backgroundPositionY: 'bottom' }} image={image}>
                <Box sx={{ height: 1, background: gradient }} />
              </GraphicsImage>
            </Box>
          </Grid>
        </Grid>
      </GraphicsCard>
    </ContainerWrapper>
  );
}

EarlyAccess.propTypes = { heading: PropTypes.string, caption: PropTypes.string, primaryBtn: PropTypes.any, image: PropTypes.any };
