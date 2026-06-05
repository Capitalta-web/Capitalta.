'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { IconType } from '@/enum';
import { ThemeDirection } from '@/config';

// @assets
import Pattern3 from '@/images/graphics/Pattern3';
import Pattern4 from '@/images/graphics/Pattern4';
import Pattern5 from '@/images/graphics/Pattern5';
import Pattern6 from '@/images/graphics/Pattern6';
import Pattern7 from '@/images/graphics/Pattern7';
import Pattern8 from '@/images/graphics/Pattern8';
import Pattern9 from '@/images/graphics/Pattern9';

/***************************  HERO - 7  ***************************/

/**
 *
 * Demos:
 * - [Hero7](https://www.saasable.io/blocks/hero/hero7)
 *
 * API:
 * - [Hero7 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/hero/hero7#props-details)
 */

export default function Hero7({ headLine, captionLine, primaryBtn, image1, image2, reviewData }) {
  const theme = useTheme();
  const boxRadius = { xs: 12, sm: 16, md: 20 };
  const boxHeight = { xs: 400, sm: 450, md: 650 };
  const AvatarSize = { xs: 38, sm: 42, md: 56 };

  const isRTL = theme.direction === ThemeDirection.RTL;

  return (
    <Stack
      direction={{ sm: 'row' }}
      sx={{ py: { xs: 4, sm: 8, md: 12 }, justifyContent: { sm: 'end' }, overflow: 'hidden', position: 'relative' }}
    >
      <Box
        sx={{
          bgcolor: 'grey.100',
          height: boxHeight,
          width: '20%',
          position: 'absolute',
          bottom: { xs: 32, sm: 'unset' },
          right: { xs: 0, sm: 'auto' },
          top: { xs: 'unset', md: '50%' },
          transform: { xs: 'unset', md: 'translateY(-50%)' }
        }}
      />
      <ContainerWrapper>
        <Stack direction={{ sm: 'row' }} sx={{ justifyContent: 'space-between', gap: { xs: 3, sm: 4 } }}>
          <Stack sx={{ gap: { xs: 5, sm: 10 }, justifyContent: 'center' }}>
            <Stack sx={{ gap: { xs: 1.5, sm: 2.5 } }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
              >
                {headLine}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
              >
                <Typography sx={{ color: 'text.secondary', maxWidth: { sm: 350, md: 400 } }}>{captionLine}</Typography>
              </motion.div>
            </Stack>
            <Stack sx={{ position: 'relative' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
              >
                <Button color="primary" variant="contained" size="large" {...primaryBtn} sx={{ width: { sm: 'fit-content' } }} />
              </motion.div>
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: 20, md: 60 },
                  left: 107,
                  width: { sm: 150, md: 278 },
                  display: { xs: 'none', sm: 'block' },
                  ...(isRTL && { transform: 'scaleX(-1)' })
                }}
              >
                <Pattern5 />
              </Box>
            </Stack>
          </Stack>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.215, 0.61, 0.355, 1]
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  bgcolor: 'grey.100',
                  ml: { xs: 7, sm: 0 },
                  height: boxHeight,
                  width: { sm: 280, md: 450 },
                  borderTopLeftRadius: boxRadius,
                  borderBottomLeftRadius: boxRadius
                }}
              >
                <GraphicsImage
                  image={image2}
                  cardMediaProps={{ component: 'img' }}
                  sx={{
                    position: 'absolute',
                    top: { xs: 38, md: 46 },
                    left: { xs: 130, sm: 60, md: isRTL ? 150 : 120 },
                    height: { xs: 280, sm: 320, md: 480 },
                    zIndex: 1
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 15, sm: 10, md: 28 },
                    left: { xs: -70, sm: -150 },
                    width: { xs: 150, sm: 175, md: 198 },
                    ...(isRTL && { transform: 'scaleX(-1)' })
                  }}
                >
                  <Pattern8 />
                </Box>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: 40, sm: 70, md: 50 },
                  left: { xs: 26, sm: -26, md: -46 },
                  height: { xs: 168, md: 300 },
                  width: { xs: 112, md: 214 },
                  pt: { xs: 2, md: 4 },
                  borderRadius: { xs: 1.5, md: 5 },
                  bgcolor: 'primary.lighter'
                }}
              >
                <GraphicsImage image={image1} sx={{ height: 1 }} />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: 10, sm: 0 },
                  left: { xs: isRTL ? 230 : 245, sm: isRTL ? 175 : 190, md: isRTL ? 324 : 316 },
                  width: { xs: 200, sm: 255, md: 300 },
                  ...(isRTL && { transform: 'scaleX(-1)' })
                }}
              >
                <Pattern9 />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: 20, md: 52 },
                  left: { sm: -80, md: -60 },
                  borderRadius: { xs: 1.5, md: 2 },
                  p: { xs: 1, sm: 1.25, md: 1.5 },
                  bgcolor: 'primary.lighter',
                  width: 'fit-content'
                }}
              >
                <Avatar
                  sx={{
                    width: AvatarSize,
                    height: AvatarSize,
                    bgcolor: 'grey.100',
                    mb: { xs: 2, md: 2.5 },
                    '& svg.tabler-filled-star': { width: { xs: 16, sm: 18, md: 24 }, height: { xs: 16, sm: 18, md: 24 } }
                  }}
                >
                  <SvgIcon name="tabler-filled-star" type={IconType.FILL} />
                </Avatar>
                <Typeset
                  {...{
                    heading: reviewData.rating,
                    caption: reviewData.reviews,
                    stackProps: { sx: { gap: 0 } },
                    headingProps: { variant: 'body1' },
                    captionProps: { variant: 'body2' }
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: { sm: -70, md: -100 },
                  left: { sm: -170, md: -190 },
                  width: { sm: 300, md: 438 },
                  display: { xs: 'none', sm: 'block' },
                  zIndex: -1,
                  transform: isRTL ? 'scaleX(-1)' : null
                }}
              >
                <Pattern6 />
              </Box>
            </Box>
          </motion.div>
        </Stack>
      </ContainerWrapper>
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 15, sm: '10%' },
          left: 0,
          width: { xs: 110, sm: 206, md: 408 },
          ...(isRTL && { transform: 'scaleX(-1)' })
        }}
      >
        <Pattern3 />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: 0,
          width: { sm: 50, md: 156 },
          display: { xs: 'none', sm: 'block' },
          ...(isRTL && { transform: 'scaleX(-1)' })
        }}
      >
        <Pattern4 />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 50, sm: 80, md: 120 },
          right: 0,
          width: { xs: 248, sm: 350, md: 470 },
          zIndex: 1,
          ...(isRTL && { transform: 'scaleX(-1)' })
        }}
      >
        <Pattern7 />
      </Box>
    </Stack>
  );
}

Hero7.propTypes = {
  headLine: PropTypes.node,
  captionLine: PropTypes.string,
  primaryBtn: PropTypes.any,
  image1: PropTypes.any,
  image2: PropTypes.any,
  reviewData: PropTypes.object
};
