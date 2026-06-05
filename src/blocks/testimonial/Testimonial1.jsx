'use client';
import PropTypes from 'prop-types';

import { useEffect, useRef, useState } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import { ProfileCard2 } from '@/components/cards/profile-card';
import Rating from '@/components/Rating';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import useFocusWithin from '@/hooks/useFocusWithin';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TESTIMONIAL - REVIEW  ***************************/

function Review({ review }) {
  return (
    <Typography variant="h4" sx={{ color: 'text.secondary', '&:before': { content: 'open-quote' }, '&:after': { content: 'close-quote' } }}>
      {review}
    </Typography>
  );
}

/***************************  TESTIMONIAL - PROFILE  ***************************/

function ReviewCard({ ratings, review, profile }) {
  return (
    <GraphicsCard>
      <Stack sx={{ gap: 3, p: { xs: 2.5, sm: 3, md: 4 } }}>
        <Stack sx={{ gap: 1.5 }}>
          <Rating {...(ratings && { rate: ratings })} />
          <Review {...{ review }} />
        </Stack>
        <ProfileCard2 {...profile} />
      </Stack>
    </GraphicsCard>
  );
}

const options = { root: null, rootMargin: '0px', threshold: 0.6 };

/***************************  TESTIMONIAL - 1  ***************************/

/**
 *
 * Demos:
 * - [Testimonial1](https://www.Capitalta.io/blocks/testimonial/testimonial1)
 *
 * API:
 * - [Testimonial1 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/testimonial/testimonial1#props-details)
 */

export default function Testimonial1({ heading, caption, testimonials, link }) {
  const theme = useTheme();
  const videoRef = useRef(null);
  const isFocusWithin = useFocusWithin();
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle video play/pause based on intersection with the viewport
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (videoRef.current && !isPlaying) {
          videoRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error('Autoplay was prevented:', error);
            });
        }
      } else {
        if (videoRef.current && isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    });
  };

  const observer =
    typeof window !== 'undefined' && 'IntersectionObserver' in window ? new IntersectionObserver(handleIntersection, options) : null;
  const videoElement = videoRef.current;

  useEffect(() => {
    if (videoElement) {
      observer?.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer?.unobserve(videoElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

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
          <Typeset {...{ heading, caption }} />
        </motion.div>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.8
              }}
              style={{ height: '100%' }}
            >
              <GraphicsCard sx={{ height: 1 }}>
                <Stack sx={{ justifyContent: 'space-between', height: 1 }}>
                  <GraphicsCard sx={{ height: 1, '&.MuiPaper-root, & video': { maxHeight: { xs: 'auto', md: 330 } } }}>
                    <video
                      playsInline
                      ref={videoRef}
                      width="100%"
                      height="100%"
                      style={{ display: 'flex', objectFit: 'cover' }}
                      controls
                      preload="metadata"
                      autoPlay={false}
                      loop={false}
                      muted={true}
                    >
                      <source src={testimonials[0].videoSrc} type="video/mp4" />
                    </video>
                  </GraphicsCard>
                  <Stack sx={{ gap: 3, p: { xs: 2.5, sm: 4, md: 5 }, alignItems: 'flex-start' }}>
                    <Review review={testimonials[0].review} />
                    <ProfileCard2 {...testimonials[0].profile} background />
                  </Stack>
                </Stack>
              </GraphicsCard>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 1.5 }}>
              {testimonials[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3
                  }}
                >
                  <ReviewCard {...testimonials[1]} />
                </motion.div>
              )}
              {testimonials[2] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3
                  }}
                >
                  <ReviewCard {...testimonials[2]} />
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: 0.3
                }}
              >
                <GraphicsCard
                  sx={{
                    ...(isFocusWithin && {
                      '&:focus-within': generateFocusVisibleStyles(theme.vars.palette.primary.main)
                    })
                  }}
                >
                  <Link
                    component={NextLink}
                    variant="h5"
                    rel="noopener noreferrer"
                    aria-label="Learn more"
                    {...link}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1.5,
                      borderRadius: { xs: 6, sm: 8, md: 10 },
                      p: { xs: 1.5, md: 3.75 },
                      '&.Mui-focusVisible': { outline: 'none' },
                      '&:hover': { bgcolor: 'grey.200' },
                      ...(link?.sx && { ...link.sx })
                    }}
                  >
                    {link?.children}
                    <SvgIcon name="tabler-arrow-narrow-right" size={40} stroke={1} />
                  </Link>
                </GraphicsCard>
              </motion.div>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Review.propTypes = { review: PropTypes.string };

ReviewCard.propTypes = { ratings: PropTypes.any, review: PropTypes.any, profile: PropTypes.any };

Testimonial1.propTypes = { heading: PropTypes.any, caption: PropTypes.any, testimonials: PropTypes.any, link: PropTypes.any };
