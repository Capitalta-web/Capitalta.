'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import LogoFab from '@/components/logo/LogoFab';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import { Curve, Curve2, Line } from '@/icons';

/***************************  INTEGRATION - TAG  ***************************/

function IconBox({ icon }) {
  const theme = useTheme();
  const avatarSize = { xs: 36, sm: 64 };
  const shadowColor = theme.vars.palette.grey[900];

  return (
    <Avatar
      variant="rounded"
      sx={{
        bgcolor: 'grey.200',
        width: avatarSize,
        height: avatarSize,
        position: 'relative',
        zIndex: 1,
        borderRadius: { xs: 9.25, sm: 16.75 },
        boxShadow: {
          xs: `0px 1.13px 2.25px 0px  ${withAlpha(shadowColor, 0.08)}, 0px 0px 0.56px 0px ${withAlpha(shadowColor, 0.1)}`,
          sm: `0px 2px 4px 0px  ${withAlpha(shadowColor, 0.08)}, 0px 0px 1px 0px ${withAlpha(shadowColor, 0.1)}`
        },
        '& svg': { width: { xs: 18, sm: 32 }, height: { xs: 18, sm: 32 } }
      }}
    >
      <SvgIcon {...(typeof icon === 'string' ? { name: icon } : { ...icon })} color="text.primary" />
    </Avatar>
  );
}

/***************************  INTEGRATION - 5  ***************************/

/**
 *
 * Demos:
 * - [Integration5](https://www.saasable.io/blocks/integration/integration5)
 *
 * API:
 * - [Integration5 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/integration/integration5#props-details)
 */

export default function Integration5({ headLine, captionLine, primaryBtn }) {
  const theme = useTheme();

  const stackStyle = { height: 1, width: 1, position: 'relative', alignItems: 'center', gap: { xs: 2.25, sm: 4 } };

  const largeBoxSize = { xs: 58, sm: 100 };
  const largeCurveSize = { '& svg': { width: largeBoxSize, height: largeBoxSize } };

  const smallBoxSize = { xs: 32, sm: 64 };
  const smallCurveSize = { '& svg': { width: smallBoxSize, height: smallBoxSize } };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: 0.5
        }}
      >
        <GraphicsCard sx={{ height: 1, p: { xs: 3, sm: 4, md: 7 } }}>
          <Grid container spacing={2} sx={{ textAlign: { xs: 'center', md: 'left' }, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack
                sx={{ gap: { xs: 3, sm: 4 }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' }, height: 1 }}
              >
                <Typeset
                  {...{
                    heading: headLine,
                    caption: captionLine,
                    captionProps: { variant: 'body1', sx: { color: 'text.secondary' } },
                    stackProps: { sx: { gap: { xs: 1, sm: 1.5 } } }
                  }}
                />
                {primaryBtn && (
                  <ButtonAnimationWrapper>
                    <Button variant="contained" {...primaryBtn} />
                  </ButtonAnimationWrapper>
                )}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid
                container
                spacing={{ xs: 2.8, sm: 6 }}
                sx={{ alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-end' }, position: 'relative', zIndex: 1 }}
              >
                <Box
                  sx={{
                    width: { xs: 256, sm: 495 },
                    position: 'absolute',
                    top: '50%',
                    left: { xs: '50%', md: 'unset' },
                    right: { md: 0 },
                    transform: { xs: 'translate(-50%,-50%)', md: 'translateY(-50%)' },
                    marginTop: { xs: -0.25, sm: -0.5 },
                    zIndex: -1,
                    '& svg': { width: { xs: 256, sm: 495 }, height: 2 }
                  }}
                >
                  <Line />
                </Box>
                <Grid>
                  <Box>
                    <Stack sx={{ ...stackStyle, justifyContent: 'center' }}>
                      <Box
                        sx={{
                          height: largeBoxSize,
                          width: largeBoxSize,
                          position: 'absolute',
                          top: { xs: 17, sm: 31 },
                          left: { xs: 22, sm: 42 },
                          ...largeCurveSize,
                          ...(theme.direction === ThemeDirection.RTL && { transform: 'scaleX(-1)' })
                        }}
                      >
                        <Curve />
                      </Box>
                      <IconBox icon="tabler-brand-asana" />
                      <IconBox icon="tabler-brand-abstract" />
                      <IconBox icon="tabler-brand-slack" />
                      <Box
                        sx={{
                          height: largeBoxSize,
                          width: largeBoxSize,
                          position: 'absolute',
                          bottom: { xs: 14, sm: 29 },
                          left: { xs: 22, sm: 42 },
                          transform: theme.direction === ThemeDirection.RTL ? 'scale(-1)' : 'scaleY(-1)',
                          ...largeCurveSize
                        }}
                      >
                        <Curve />
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
                <Grid>
                  <Stack sx={{ ...stackStyle, justifyContent: 'center' }}>
                    <Box
                      sx={{
                        height: smallBoxSize,
                        width: smallBoxSize,
                        position: 'absolute',
                        top: { xs: 13, sm: 20 },
                        left: { xs: 30, sm: 56 },
                        ...smallCurveSize,
                        ...(theme.direction === ThemeDirection.RTL && { transform: 'scaleX(-1)' })
                      }}
                    >
                      <Curve2 />
                    </Box>
                    <IconBox icon="tabler-brand-skype" />
                    <IconBox icon="tabler-brand-google-drive" />
                    <Box
                      sx={{
                        height: smallBoxSize,
                        width: smallBoxSize,
                        position: 'absolute',
                        bottom: { xs: 10, sm: 19 },
                        left: { xs: 30, sm: 56 },
                        transform: theme.direction === ThemeDirection.RTL ? 'scale(-1)' : 'scaleY(-1)',
                        ...smallCurveSize
                      }}
                    >
                      <Curve2 />
                    </Box>
                  </Stack>
                </Grid>
                <Grid>
                  <Box
                    sx={{
                      bgcolor: 'background.default',
                      borderRadius: '100%',
                      height: { xs: 45, sm: 89 },
                      position: 'relative',
                      zIndex: 1,
                      '& svg, & img': { width: { xs: 45, sm: 89 }, height: { xs: 45, sm: 89 } }
                    }}
                  >
                    <LogoFab />
                  </Box>
                </Grid>
                <Grid>
                  <Stack sx={{ ...stackStyle, justifyContent: 'center' }}>
                    <Box
                      sx={{
                        height: smallBoxSize,
                        width: smallBoxSize,
                        position: 'absolute',
                        top: { xs: 13, sm: 20 },
                        left: { xs: -30, sm: -52 },
                        transform: theme.direction === ThemeDirection.RTL ? 'scaleX(1)' : 'scaleX(-1)',
                        ...smallCurveSize
                      }}
                    >
                      <Curve2 />
                    </Box>
                    <IconBox icon="tabler-brand-tripadvisor" />
                    <IconBox icon="tabler-brand-messenger" />
                    <Box
                      sx={{
                        height: smallBoxSize,
                        width: smallBoxSize,
                        position: 'absolute',
                        bottom: { xs: 10, sm: 19 },
                        left: { xs: -30, sm: -56 },
                        transform: theme.direction === ThemeDirection.RTL ? 'scaleY(-1)' : 'scaleX(-1) scaleY(-1)',
                        ...smallCurveSize
                      }}
                    >
                      <Curve2 />
                    </Box>
                  </Stack>
                </Grid>
                <Grid>
                  <Stack sx={{ ...stackStyle, justifyContent: 'center' }}>
                    <Box
                      sx={{
                        height: largeBoxSize,
                        width: largeBoxSize,
                        position: 'absolute',
                        top: { xs: 17, sm: 31 },
                        left: { xs: -40, sm: -78 },
                        transform: theme.direction === ThemeDirection.RTL ? 'scaleX(1)' : 'scaleX(-1)',
                        ...largeCurveSize
                      }}
                    >
                      <Curve />
                    </Box>
                    <IconBox icon="tabler-brand-backbone" />
                    <IconBox icon="tabler-brand-intercom" />
                    <IconBox icon="tabler-brand-mastercard" />
                    <Box
                      sx={{
                        height: largeBoxSize,
                        width: largeBoxSize,
                        position: 'absolute',
                        bottom: { xs: 14, sm: 28 },
                        left: { xs: -40, sm: -78 },
                        transform: theme.direction === ThemeDirection.RTL ? 'scaleY(-1)' : 'scaleX(-1) scaleY(-1)',
                        ...largeCurveSize
                      }}
                    >
                      <Curve />
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}

IconBox.propTypes = { icon: PropTypes.any };

Integration5.propTypes = { headLine: PropTypes.string, captionLine: PropTypes.string, primaryBtn: PropTypes.any };
