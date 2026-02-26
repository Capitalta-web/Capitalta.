'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
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
 * - [Hero7](https://www.Capitalta.io/blocks/hero/hero7)
 *
 * API:
 * - [Hero7 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/hero/hero7#props-details)
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
                    left: { xs: 20, sm: -40, md: -60 }, // Moved to Left as requested
                    height: { xs: 280, sm: 320, md: 480 },
                    borderRadius: { xs: 4, md: 6 }, // Rounded corners
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
              {image1 && (
                <Card
                  sx={{
                    position: 'absolute',
                    top: { xs: 40, sm: 80, md: 80 },
                    right: { xs: -20, sm: -100, md: -140 }, // Moved to Right side
                    width: { xs: 200, sm: 240, md: 280 },
                    p: 2.5,
                    borderRadius: 3,
                    boxShadow: theme.shadows[8],
                    zIndex: 2,
                    left: 'auto' // Clear left
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar
                        src="/assets/images/capitalta/isotipo.png"
                        variant="rounded"
                        sx={{ width: 40, height: 40, bgcolor: 'primary.main', p: 0.5 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
                          Capitalta
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          capitalta.mx
                        </Typography>
                      </Box>
                    </Stack>
                    <Chip label="Aliado" color="success" size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                  </Stack>

                  <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
                    Impulsamos el crecimiento de tu empresa con soluciones financieras ágiles.
                  </Typography>

                  <Stack spacing={1.5}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 12 } }}>
                        <Avatar src="/assets/images/crm/profile/profile-1.png" />
                        <Avatar src="/assets/images/crm/profile/profile-2.png" />
                        <Avatar src="/assets/images/crm/profile/profile-3.png" />
                        <Avatar src="/assets/images/crm/profile/profile-4.png" />
                      </AvatarGroup>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        +500 Clientes
                      </Typography>
                    </Stack>
                    <Box>
                      <Stack direction="row" justifyContent="space-between" mb={0.5}>
                        <Typography variant="caption" fontWeight={600}>
                          Aprobación
                        </Typography>
                        <Typography variant="caption" fontWeight={700} color="primary.main">
                          Rápida
                        </Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={85} sx={{ height: 6, borderRadius: 3 }} />
                    </Box>
                  </Stack>
                </Card>
              )}

              <Card
                sx={{
                  position: 'absolute',
                  bottom: { xs: 80, md: 100 },
                  right: { xs: 0, sm: -60, md: -80 }, // Adjusted position below/right
                  width: { xs: 140, md: 180 },
                  p: 2,
                  borderRadius: 3,
                  boxShadow: theme.shadows[8],
                  zIndex: 2,
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.lighter', color: 'primary.main' }}>
                      <SvgIcon name="tabler-chart-bar" size={18} />
                    </Avatar>
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary">
                        Crecimiento
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={700}>
                        +15.6%
                      </Typography>
                    </Box>
                  </Stack>
                  <Box sx={{ height: 40, width: '100%', opacity: 0.5 }}>
                    {/* Simple SVG Graph simulation */}
                    <svg width="100%" height="100%" viewBox="0 0 100 40">
                      <path
                        d="M0 35 C 20 35, 20 15, 40 15 C 60 15, 60 5, 100 0"
                        fill="none"
                        stroke={theme.palette.success.main}
                        strokeWidth="3"
                      />
                      <path
                        d="M0 40 L 0 35 C 20 35, 20 15, 40 15 C 60 15, 60 5, 100 0 L 100 40 Z"
                        fill={theme.palette.success.light}
                        opacity="0.5"
                      />
                    </svg>
                  </Box>
                </Stack>
              </Card>
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
                  left: { sm: -140, md: -180 }, // Moved further left to clear image
                  borderRadius: { xs: 1.5, md: 2 },
                  p: { xs: 1, sm: 1.25, md: 1.5 },
                  bgcolor: 'primary.lighter',
                  width: 'fit-content',
                  zIndex: 2 // Ensure it's above background patterns
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
