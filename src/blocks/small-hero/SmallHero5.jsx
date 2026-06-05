'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import SvgIcon from '@/components/SvgIcon';
import { ThemeDirection } from '@/config';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @third-party
import Marquee from 'react-fast-marquee';

// @assets
import Circles from '@/images/Circles';

/***************************  SMALL HERO - 5  ***************************/

/**
 *
 * Demos:
 * - [SmallHero5](https://www.Capitalta.io/blocks/small-hero/small-hero5)
 *
 * API
 * - [SmallHero5 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/smallhero/smallhero5#props-details)
 */

export default function SmallHero5({ exploreBtn, list = [], heading, caption, circleStopColor }) {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: 1,
        width: 1,
        py: SECTION_COMMON_PY,
        overflow: 'hidden'
      }}
    >
      <Stack
        direction="row"
        sx={{
          position: 'absolute',
          top: '50%',
          bottom: 0,
          left: '50%',
          right: 0,
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '85%', md: '70%', lg: '45%' },
          height: 1,
          zIndex: 0,
          pointerEvents: 'none',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Circles stopColor={circleStopColor || theme.vars.palette.grey[400]} />
      </Stack>

      <Stack sx={{ py: { xs: 2, sm: 5, md: 6 }, width: 1, alignItems: 'center', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Stack sx={{ gap: { xs: 1.5, sm: 2, md: 3 }, alignItems: 'center' }}>
          <Typography variant="h1" sx={{ width: { xs: 343, sm: '72%', md: '65%' } }}>
            {heading}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', width: { xs: 343, sm: 516 } }}>
            {caption}
          </Typography>
        </Stack>

        {exploreBtn && <Button color="primary" variant="contained" sx={{ mt: { xs: 3, sm: 4, md: 5 } }} {...exploreBtn} />}

        {list.length > 0 && (
          <Stack direction="row" sx={{ alignItems: 'center', width: 1, mt: { xs: 4, sm: 5, md: 8 } }}>
            <Marquee pauseOnHover autoFill {...(theme.direction === ThemeDirection.RTL && { direction: 'right' })}>
              {list.map((item, index) => (
                <Box key={index} sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', mx: 0.75 }}>
                  <Chip
                    label={item}
                    icon={<SvgIcon name="tabler-rosette-discount-check" stroke={1} color="text.secondary" />}
                    slotProps={{ label: { sx: { p: 0, pl: 1, typography: 'body2', color: 'text.secondary' } } }}
                    sx={{
                      p: { xs: 1, md: 1.5 },
                      bgcolor: 'grey.100',
                      borderRadius: 4,
                      '& svg.tabler-rosette-discount-check': { width: { xs: 16, sm: 24 }, height: { xs: 16, sm: 24 } }
                    }}
                  />
                  <Stack sx={{ gap: 0.5, position: 'absolute', right: -12, bgcolor: 'grey.100', borderRadius: 6.25 }}>
                    <Box sx={{ width: 12, height: 12, bgcolor: 'background.default', borderRadius: 6.25 }} />
                    <Box sx={{ width: 12, height: 12, bgcolor: 'background.default', borderRadius: 6.25 }} />
                  </Stack>
                </Box>
              ))}
            </Marquee>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

SmallHero5.propTypes = {
  exploreBtn: PropTypes.any,
  list: PropTypes.array,
  heading: PropTypes.string,
  caption: PropTypes.string,
  circleStopColor: PropTypes.string
};
