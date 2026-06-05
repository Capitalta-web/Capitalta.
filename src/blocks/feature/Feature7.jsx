'use client';
import PropTypes from 'prop-types';

import { useState, useRef } from 'react';

// @mui
import { useTheme, styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PROGRESS BAR  ***************************/

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.vars.palette.grey[300]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.vars.palette.primary.light
  }
}));

/***************************  FEATURE - 7  ***************************/

/**
 *
 * Demos:
 * - [Feature7](https://www.Capitalta.io/blocks/feature/feature7)
 *
 * API
 * - [Feature7 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/feature/feature7#props-details)
 */

export default function Feature7({ heading, caption, breadcrumbs, testimonials }) {
  const theme = useTheme();
  const imageRadius = { borderTopLeftRadius: { xs: 12 }, borderBottomRightRadius: { xs: 24, sm: 32, md: 40 } };

  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  // Calculate the progress value based on the active slide and the total number of testimonials
  const calculateProgressValue = (slideIndex) => {
    if (testimonials.length <= 1) return 100;
    return ((slideIndex + 1) / testimonials.length) * 100;
  };

  const settings = {
    autoplay: true,
    arrows: false,
    speed: 1000,
    fade: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    swipeToSlide: true,
    initialSlide: 0,
    dots: false,
    beforeChange(_, nextSlide) {
      setActiveSlide(nextSlide);
    }
  };

  const gc = theme.vars.palette.grey[100];

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.5
          }}
        >
          <Typeset {...{ heading, caption, stackProps: { sx: { alignItems: 'center' } }, captionProps: { sx: { textAlign: 'center' } } }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.6
          }}
        >
          <GraphicsCard sx={{ position: 'relative' }}>
            <Stack
              direction="row"
              sx={{
                gap: 1,
                pt: { xs: 2, sm: 3, md: 5 },
                pl: { xs: 2, sm: 3, md: 5 },
                pb: { xs: 3, sm: 0 },
                position: { sm: 'absolute' },
                zIndex: 1,
                left: 0
              }}
            >
              {breadcrumbs.map((item, index) => (
                <Box key={index}>
                  <Stack
                    direction={theme.direction === ThemeDirection.RTL ? 'row-reverse' : 'row'}
                    sx={{ alignItems: 'center', gap: 1, mr: 1 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: activeSlide === index ? 'text.primary' : 'grey.700',
                        cursor: 'pointer',
                        ':hover': { color: 'text.secondary' },
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      onClick={() => sliderRef.current?.slickGoTo(index)}
                    >
                      {item.title}
                    </Typography>
                    {index < breadcrumbs.length - 1 && <Box sx={{ width: 5, height: 5, borderRadius: '100%', bgcolor: 'grey.700' }} />}
                  </Stack>
                </Box>
              ))}
            </Stack>
            <Slider ref={sliderRef} {...settings}>
              {testimonials.map((testimonial, index) => (
                <Box key={index}>
                  <Grid container>
                    <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                      <Stack sx={{ justifyContent: 'space-between', gap: 5, height: 1, p: { xs: 2, sm: 3, md: 5 } }}>
                        <Stack sx={{ justifyContent: 'flex-end', gap: { xs: 2, sm: 3, md: 4 }, height: 1 }}>
                          <Avatar sx={{ width: 60, height: 60, borderRadius: 4, bgcolor: 'grey.300' }}>
                            <SvgIcon
                              {...(typeof testimonial.features[0].icon === 'string'
                                ? { name: testimonial.features[0].icon }
                                : { ...testimonial.features[0].icon })}
                            />
                          </Avatar>
                          <Stack sx={{ gap: { xs: 2, sm: 3 } }}>
                            <Stack sx={{ gap: 1 }}>
                              {testimonial.features[0].title && <Typography variant="h4">{testimonial.features[0].title}</Typography>}
                              {testimonial.features[0].content && (
                                <Typography sx={{ color: 'text.secondary' }}>{testimonial.features[0].content}</Typography>
                              )}
                            </Stack>
                            <BorderLinearProgress
                              variant="determinate"
                              value={calculateProgressValue(activeSlide)}
                              rel="noopener noreferrer"
                              aria-label="progress"
                            />
                          </Stack>
                        </Stack>
                      </Stack>
                    </Grid>
                    {testimonial.image && (
                      <Grid size={{ xs: 12, sm: 6, md: 7 }}>
                        <GraphicsCard sx={{ bgcolor: 'grey.300', height: 1 }}>
                          <GraphicsImage
                            sx={{
                              height: { xs: 380, sm: 529 },
                              backgroundPositionX: 'right',
                              backgroundPositionY: 'center',
                              backgroundSize: 'contain',
                              ...imageRadius
                            }}
                            image={testimonial.image}
                          >
                            <Box
                              sx={{
                                width: 1,
                                height: 1,
                                ...imageRadius,
                                background: `radial-gradient(74.06% 74.06% at 28.46% 49.93%, ${withAlpha(gc, 0)} 0%, ${withAlpha(gc, 0.4)} 100%)`
                              }}
                            />
                          </GraphicsImage>
                        </GraphicsCard>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              ))}
            </Slider>
          </GraphicsCard>
        </motion.div>
      </Stack>
    </ContainerWrapper>
  );
}

Feature7.propTypes = { heading: PropTypes.string, caption: PropTypes.string, breadcrumbs: PropTypes.array, testimonials: PropTypes.array };
