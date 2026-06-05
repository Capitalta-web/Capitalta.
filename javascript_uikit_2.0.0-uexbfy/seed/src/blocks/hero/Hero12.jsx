'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import GradientFab from '@/components/GradientFab';
import SvgIcon from '@/components/SvgIcon';
import { ThemeDirection } from '@/config';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @third-party
import Marquee from 'react-fast-marquee';

// @assets
import Circles from '@/images/Circles';

/***************************  HERO - 12  ***************************/

/**
 *
 * Demos:
 * - [Hero12](https://www.saasable.io/blocks/hero/hero12)
 *
 * API:
 * - [Hero12 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/hero/hero12#props-details)
 */

export default function Hero12({ exploreBtn, list, headLine, captionLine }) {
  const theme = useTheme();
  const iconSize = { xs: 16, sm: 24 };
  const arcSX = { width: 12, height: 12, bgcolor: 'background.default', borderRadius: 6.25 };

  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', position: 'relative', py: SECTION_COMMON_PY }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'center',
          height: 1,
          width: 1,
          maxHeight: { xs: 507, sm: 744, md: 781 },
          position: 'absolute',
          zIndex: -1,
          px: { xs: 1, sm: 2.5 }
        }}
      >
        <Circles />
      </Stack>
      <Stack sx={{ py: { xs: 2, sm: 5, md: 6 }, gap: { xs: 4, sm: 5, md: 8 }, width: 1, alignItems: 'center' }}>
        <Stack sx={{ px: 2, alignItems: 'center', '& .gradient-fab': { display: 'contents' } }}>
          <GradientFab type="star" size={55} icon={<SvgIcon name="tabler-cloud-up" />} />
          <Stack sx={{ gap: 2, textAlign: 'center', alignItems: 'center', mt: 3 }}>
            {headLine}
            {captionLine}
          </Stack>
          <Button
            color="primary"
            variant="contained"
            startIcon={<SvgIcon name="tabler-sparkles" size={16} stroke={3} color="background.default" />}
            {...exploreBtn}
            sx={{ mt: { xs: 4, sm: 7 }, ...exploreBtn.sx }}
          />
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center', width: 1 }}>
          <Marquee pauseOnHover autoFill {...(theme.direction === ThemeDirection.RTL && { direction: 'right' })}>
            {list.map((item, index) => (
              <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', mx: 0.75 }} key={index}>
                <Chip
                  label={item}
                  icon={<SvgIcon name="tabler-rosette-discount-check" stroke={1} color="grey.800" />}
                  slotProps={{ label: { sx: { p: 0, pl: 1, typography: 'body2', color: 'text.secondary' } } }}
                  sx={{
                    p: { xs: 1, md: 1.5 },
                    bgcolor: 'grey.100',
                    borderRadius: 4,
                    '& svg.tabler-rosette-discount-check': { width: iconSize, height: iconSize }
                  }}
                />
                <Stack sx={{ gap: 0.5, position: 'absolute', right: -12, bgcolor: 'grey.100', borderRadius: 6.25 }}>
                  <Box sx={arcSX} />
                  <Box sx={arcSX} />
                </Stack>
              </Box>
            ))}
          </Marquee>
        </Stack>
      </Stack>
    </Stack>
  );
}

Hero12.propTypes = {
  exploreBtn: PropTypes.any,
  list: PropTypes.array,
  headLine: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  captionLine: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};
