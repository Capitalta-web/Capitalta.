'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GradientFab from '@/components/GradientFab';
import SvgIcon from '@/components/SvgIcon';

import { ThemeDirection } from '@/config';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import Wave from '@/images/graphics/Wave';
import DrawnArrow from '@/images/graphics/DrawnArrow';

/***************************  SMALL HERO - 6  ***************************/

/**
 *
 * Demos:
 * - [SmallHero6](https://www.Capitalta.io/blocks/small-hero/small-hero6)
 *
 * API
 * - [SmallHero6 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/smallhero/smallhero6#props-details)
 */

export default function SmallHero6({ headLine, tagline, list, primaryBtn }) {
  const theme = useTheme();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <GraphicsCard>
        <Stack sx={{ p: { xs: 3, sm: 4 }, alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
            {tagline}
          </Typography>
          <Wave />
          <Box sx={{ mt: { xs: 2, md: 3 } }}>{headLine}</Box>
          <Stack direction="row" sx={{ justifyContent: 'center', mt: 5, position: 'relative' }}>
            <Box
              component="span"
              sx={{
                position: 'absolute',
                top: '-10px',
                left: '-25px',
                ...(theme.direction === ThemeDirection.RTL && { transform: 'scaleX(-1)' })
              }}
            >
              <DrawnArrow />
            </Box>
            <OutlinedInput
              placeholder="Enter your email address"
              endAdornment={<Button color="primary" size="small" variant="contained" sx={{ px: 4 }} {...primaryBtn} />}
              slotProps={{
                input: { 'aria-label': 'Email address', sx: { px: 2.5, py: 0.75 } },
                notchedOutline: { sx: { borderRadius: 25 } }
              }}
              sx={{ typography: 'caption2', color: 'secondary.main', p: 0.5, whiteSpace: 'nowrap' }}
            />
          </Stack>
        </Stack>
      </GraphicsCard>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={{ xs: 1, sm: 3 }} sx={{ justifyContent: 'center' }}>
          {list.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 4, md: 3 }}>
              <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', '& .gradient-fab': { display: 'contents' } }}>
                <GradientFab
                  type="round"
                  icon={<SvgIcon {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} />}
                />
                <Stack sx={{ justifyContent: 'center' }}>
                  <Typography sx={{ color: 'text.secondary' }}>{item.title}</Typography>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ContainerWrapper>
  );
}

SmallHero6.propTypes = { headLine: PropTypes.any, tagline: PropTypes.string, list: PropTypes.array, primaryBtn: PropTypes.any };
