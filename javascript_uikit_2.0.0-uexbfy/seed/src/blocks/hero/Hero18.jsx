'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import GradientFab from '@/components/GradientFab';
import SvgIcon from '@/components/SvgIcon';

import { ThemeDirection } from '@/config';
import { SECTION_COMMON_PY } from '@/utils/constant';
import GetImagePath from '@/utils/GetImagePath';

// @assets
import Circles from '@/images/Circles';
import Pattern10 from '@/images/graphics/Pattern10';

/***************************  HERO - 18  ***************************/

/**
 *
 * Demos:
 * - [Hero18](https://www.saasable.io/blocks/hero/hero18)
 *
 * API:
 * - [Hero18 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/hero/hero18#props-details)
 */

export default function Hero18({ exploreBtn, imageList, headLine, captionLine }) {
  const theme = useTheme();

  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', py: SECTION_COMMON_PY }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'center',
          height: 1,
          width: 1,
          maxHeight: { xs: 507, sm: 744, md: 781 },
          position: 'absolute',
          zIndex: -1,
          transform: { xs: 'scale(1.3)', sm: 'unset' },
          top: { xs: '-19%', sm: '-21%' },
          px: { xs: 1, sm: 2.5 }
        }}
      >
        <Circles />
      </Stack>
      <Stack sx={{ py: { md: 6 }, gap: 5, width: 1, alignItems: 'center' }}>
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
        <Stack direction="row" sx={{ alignItems: 'center', gap: { xs: 2.5, sm: 4, md: 5 } }}>
          <Box
            sx={{
              '& svg': {
                height: { xs: 50, sm: 81, md: 92 },
                width: 'auto',
                ...(theme.direction === ThemeDirection.RTL && { transform: 'scaleX(-1)' })
              }
            }}
          >
            <Pattern10 />
          </Box>
          {imageList.map((item, index) => (
            <Box key={index}>
              <CardMedia component="img" image={GetImagePath(item.image)} sx={{ height: { xs: 40, sm: 70, md: 80 } }} />
            </Box>
          ))}
          <Box
            sx={{
              '& svg': { height: { xs: 50, sm: 81, md: 92 }, width: 'auto' },
              ...(theme.direction === ThemeDirection.LTR && { transform: 'scaleX(-1)' })
            }}
          >
            <Pattern10 />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

Hero18.propTypes = {
  exploreBtn: PropTypes.any,
  imageList: PropTypes.array,
  headLine: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  captionLine: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};
