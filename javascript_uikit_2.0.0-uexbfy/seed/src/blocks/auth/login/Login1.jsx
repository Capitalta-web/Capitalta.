'use client';
import PropTypes from 'prop-types';

import { useRef } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import Slider from 'react-slick';

// @project
import { AuthLogin, AuthSocial, Copyright } from '@/components/auth';
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import GraphicsImage from '@/components/GraphicsImage';
import { ProfileCard2 } from '@/components/cards/profile-card';
import Rating from '@/components/Rating';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

const settings = {
  autoplay: true,
  arrows: false,
  dots: false,
  infinite: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  swipeToSlide: true,
  initialSlide: 0
};

const buttonStyle = { borderRadius: '50%' };

/***************************  LOGIN - 1  ***************************/

/**
 *
 * Demos:
 * - [Login1](https://www.saasable.io/blocks/auth/login/1)
 *
 * API
 * - [Login1 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/auth/login/login1#props-details)
 */

export default function Login1({ heading, caption, testimonials, image }) {
  const sliderRef = useRef(null);

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY, height: '100vh', minHeight: { md: 930 } }}>
      <Grid container spacing={5} sx={{ height: 'calc(100vh - 70px)' }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: 1 }}>
          <Stack sx={{ width: { xs: 1, sm: 432, md: 457 }, mx: { xs: 'auto', md: 0 }, height: 1, justifyContent: 'space-between' }}>
            <Box>
              <Stack sx={{ gap: { xs: 4, sm: 6 } }}>
                <Typeset {...{ heading, caption }} captionProps={{ variant: 'body1' }} />
                <AuthSocial />
              </Stack>

              <Divider sx={{ mt: { xs: 4, sm: 5 }, mb: 3 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', px: 1.25 }}>
                  Continue with email
                </Typography>
              </Divider>
              <AuthLogin />
              <Typography sx={{ textAlign: 'center', mt: 2.5, color: 'text.secondary' }}>
                Don’t have an account?{' '}
                <Link
                  component={NextLink}
                  variant="subtitle1"
                  underline="hover"
                  href=""
                  sx={{ '&:hover': { color: 'primary.dark' } }}
                  rel="noopener noreferrer"
                  aria-label="sign up"
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>

            <Box sx={{ mt: { xs: 4.5, sm: 6.5, md: 13.75 } }}>
              <Copyright />
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: 1, display: { xs: 'none', md: 'block' } }}>
          <GraphicsCard sx={{ height: 1 }}>
            <Box sx={{ p: 7, position: 'relative' }}>
              <Slider ref={sliderRef} {...settings}>
                {testimonials.map((testimonial, index) => (
                  <Box key={index}>
                    <Stack sx={{ alignItems: 'flex-start', gap: 2.5 }}>
                      <Stack sx={{ gap: 1 }}>
                        <Rating {...{ rate: testimonial.ratings }} />
                        <Typography
                          variant="h4"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            '&:before': { content: 'open-quote' },
                            '&:after': { content: 'close-quote' }
                          }}
                        >
                          {testimonial.review}
                        </Typography>
                      </Stack>
                      <ProfileCard2
                        {...{ ...testimonial.profile, avatarProps: { sx: { width: 48, height: 48 } }, nameProps: { variant: 'subtitle1' } }}
                        background
                      />
                    </Stack>
                  </Box>
                ))}
              </Slider>
              <Stack direction="row" sx={{ gap: 0.5, position: 'absolute', bottom: 75, right: 56 }}>
                <IconButton sx={buttonStyle} onClick={() => sliderRef?.current?.slickPrev()} rel="noopener noreferrer" aria-label="prev">
                  <SvgIcon name="tabler-arrow-left" size={18} />
                </IconButton>
                <IconButton sx={buttonStyle} onClick={() => sliderRef?.current?.slickNext()} rel="noopener noreferrer" aria-label="next">
                  <SvgIcon name="tabler-arrow-right" size={18} />
                </IconButton>
              </Stack>
            </Box>

            <Box sx={{ pl: 7, height: 1 }}>
              <GraphicsImage
                image={image}
                sx={{
                  height: 1,
                  backgroundPositionX: 'left',
                  backgroundPositionY: 'top',
                  borderTopLeftRadius: 12,
                  borderBottomRightRadius: 40
                }}
              />
            </Box>
          </GraphicsCard>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

Login1.propTypes = { heading: PropTypes.string, caption: PropTypes.string, testimonials: PropTypes.array, image: PropTypes.any };
