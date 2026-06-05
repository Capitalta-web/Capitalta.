'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard, IconCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';
import GetImagePath from '@/utils/GetImagePath';

// @assets
import Wave from '@/images/graphics/Wave';

/*************************  Image Card  ********************************* */

function GetImageCard({ image1, isCoverImage1 }) {
  if (!image1) return null;

  return (
    <GraphicsCard sx={{ height: 1 }}>
      <Box sx={{ p: isCoverImage1 ? 0 : { xs: 3, sm: 4, md: 5 }, minHeight: { xs: 343, sm: 445, md: 530 }, height: 1 }}>
        <GraphicsImage
          sx={{
            height: '100%',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            ...(isCoverImage1 && { backgroundSize: 'cover' }),
            borderTopLeftRadius: { xs: 12 },
            borderBottomLeftRadius: { xs: 12 }
          }}
          image={image1}
        />
      </Box>
    </GraphicsCard>
  );
}

/***************************  FEATURE - 5  ***************************/

/**
 *
 * Demos:
 * - [Feature5](https://www.Capitalta.io/blocks/feature/feature5)
 *
 * API
 * - [Feature5 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/feature/feature5#props-details)
 */

export default function Feature5({
  heading,
  caption,
  features,
  features2,
  image1,
  isCoverImage1 = false,
  image2,
  isCoverImage2 = false,
  profileGroups,
  content,
  actionBtn,
  actionBtn2
}) {
  const theme = useTheme();

  const gc = theme.vars.palette.grey[100];
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(71.13% 71.13% at 50% 50.07%, ${withAlpha(gc, 0)} 0%, ${withAlpha(gc, 0.6)} 100%)`
      : `radial-gradient(71.13% 71.13% at 50% 50.07%, ${withAlpha(gc, 0)} 0%, ${gc} 100%)`;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={1.5}>
        <Grid size={12}>
          <Grid container spacing={1.5} sx={{ height: 1 }} direction={{ xs: 'row-reverse', sm: 'row' }}>
            <Grid size={{ xs: 12, sm: 7, md: 6 }}>
              <Stack sx={{ gap: 2.5, justifyContent: 'space-between', height: 1 }}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5
                  }}
                >
                  <Stack sx={{ gap: 4, alignItems: 'flex-start' }}>
                    <Typeset {...{ heading, caption }} />
                    {actionBtn2 && (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SvgIcon name="tabler-sparkles" size={16} stroke={3} />}
                        {...actionBtn2}
                      />
                    )}
                  </Stack>
                </motion.div>
                <Grid container spacing={1.5}>
                  {image1 && (
                    <Grid sx={{ display: { xs: 'block', sm: 'none' } }} size={{ xs: 12, sm: 5, md: 6 }}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: 0.5
                        }}
                        style={{ height: '100%' }}
                      >
                        <GetImageCard image1={image1} isCoverImage1={isCoverImage1} />
                      </motion.div>
                    </Grid>
                  )}
                  {features.map((item, index) => (
                    <Grid key={index} size={{ xs: 6, sm: 6 }}>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: item.animationDelay
                        }}
                      >
                        <IconCard
                          icon={{
                            ...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon }),
                            color: 'primary.main',
                            size: 24
                          }}
                          title={item.title}
                          content={item.content}
                          iconAvatar
                          cardPadding={{ xs: 1.5, sm: 2, md: 3 }}
                          stackProps={{ sx: { gap: { xs: 2.5, sm: 2, md: 1 } } }}
                        />
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Grid>

            {image1 && (
              <Grid sx={{ display: { xs: 'none', sm: 'block' } }} size={{ xs: 12, sm: 5, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.8
                  }}
                  style={{ height: '100%' }}
                >
                  <GetImageCard image1={image1} isCoverImage1={isCoverImage1} />
                </motion.div>
              </Grid>
            )}
          </Grid>
        </Grid>
        {features2 && image2 && profileGroups && (
          <Grid size={12}>
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12, sm: 5, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.8
                  }}
                  style={{ height: '100%' }}
                >
                  <GraphicsCard sx={{ height: 1 }}>
                    <Stack sx={{ alignItems: 'center', gap: 3, pt: 7 }}>
                      <Stack sx={{ alignItems: 'center', gap: 1, position: 'relative', zIndex: 1 }}>
                        <Stack sx={{ alignItems: 'center', gap: 0.5 }}>
                          <AvatarGroup max={5} sx={{ justifyContent: 'flex-end', '& .MuiAvatar-root': { borderWidth: 1, ml: -1.75 } }}>
                            {profileGroups.avatarGroups.map((item, index) => (
                              <Avatar
                                key={index}
                                src={GetImagePath(item.avatar)}
                                sx={{ width: 40, height: 40 }}
                                alt="Avatar"
                                slotProps={{ img: { loading: 'lazy' } }}
                              />
                            ))}
                          </AvatarGroup>
                          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            {profileGroups.review}
                          </Typography>
                        </Stack>
                        <Wave />
                      </Stack>
                      <GraphicsImage
                        sx={{
                          height: { xs: 157, sm: 241, md: 352 },
                          backgroundPositionY: 'top',
                          ...(isCoverImage2 && { backgroundSize: 'cover' }),
                          width: 1,
                          transform: 'scale(1.3)',
                          transformOrigin: 'top'
                        }}
                        image={image2}
                      >
                        <Box sx={{ height: 1, background: gradient, bottom: 0 }} />
                      </GraphicsImage>
                    </Stack>
                  </GraphicsCard>
                </motion.div>
              </Grid>

              <Grid size={{ xs: 12, sm: 7, md: 6 }}>
                <Grid container spacing={1.5}>
                  {features2.map((item, index) => (
                    <Grid key={index} size={6}>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: item.animationDelay
                        }}
                      >
                        <IconCard
                          title={item.title}
                          icon={{
                            ...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon }),
                            color: 'primary.main',
                            size: 24
                          }}
                          content={item.content}
                          iconAvatar
                          cardPadding={{ xs: 1.5, sm: 2, md: 3 }}
                          stackProps={{ sx: { gap: { xs: 2.5, sm: 2, md: 1 } } }}
                        />
                      </motion.div>
                    </Grid>
                  ))}
                  {(content || actionBtn) && (
                    <Grid size={12}>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.4
                        }}
                      >
                        <GraphicsCard>
                          <Stack sx={{ alignItems: 'flex-start', gap: { xs: 4, md: 7 }, p: { xs: 2, sm: 4 } }}>
                            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: { sm: 530 } }}>
                              {content}
                            </Typography>
                            {actionBtn && (
                              <ButtonAnimationWrapper>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  startIcon={<SvgIcon name="tabler-sparkles" size={16} stroke={3} color="background.default" />}
                                  {...actionBtn}
                                />
                              </ButtonAnimationWrapper>
                            )}
                          </Stack>
                        </GraphicsCard>
                      </motion.div>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </ContainerWrapper>
  );
}

GetImageCard.propTypes = { image1: PropTypes.any, isCoverImage1: PropTypes.bool };

Feature5.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  features: PropTypes.array,
  features2: PropTypes.array,
  image1: PropTypes.any,
  isCoverImage1: PropTypes.bool,
  image2: PropTypes.any,
  isCoverImage2: PropTypes.bool,
  profileGroups: PropTypes.object,
  content: PropTypes.string,
  actionBtn: PropTypes.any,
  actionBtn2: PropTypes.any
};
