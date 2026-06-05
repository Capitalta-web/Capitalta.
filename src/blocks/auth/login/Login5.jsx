'use client';
import PropTypes from 'prop-types';

// @mui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import Slider from 'react-slick';

// @project
import { AuthLogin, AuthSocial, Copyright } from '@/components/auth';
import { ProfileCard3 } from '@/components/cards/profile-card';
import ContainerWrapper from '@/components/ContainerWrapper';
import LogoMain from '@/components/logo/LogoMain';
import Rating from '@/components/Rating';
import { NextLink } from '@/components/routes';
import Typeset from '@/components/Typeset';

import { SocialTypes } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  LOGIN - 5  ***************************/

/**
 *
 * Demos:
 * - [Login5](https://www.Capitalta.io/blocks/auth/login/5)
 *
 * API
 * - [Login5 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/auth/login/login5#props-details)
 */

export default function Login5({ heading, caption, testimonials }) {
  const boxRadius = { sm: 32, md: 40 };
  const boxSpacing = { sm: 4, md: 7 };

  const settings = {
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: true,
    initialSlide: 0
  };

  const slickStyle = {
    bgcolor: 'grey.50',
    px: { sm: 3, md: 4 },
    py: 4,
    borderRadius: 6,
    '& .slick-slider': { mb: { sm: 4.5 } },
    '& .slick-slide': { height: 'auto', ' > div': { height: 1, px: 0.75 } },
    '& .slick-dots li': { width: 12, height: 12, mx: 0.5 },
    '& .slick-dots li button': { width: 12, height: 12, p: 0 },
    '& .slick-dots li button:before': { fontSize: 14, width: 12, height: 12, color: 'primary.main' },
    '& .slick-dots li.slick-active button:before': { color: 'primary.main', opacity: 1 }
  };

  return (
    <Box sx={{ position: 'relative', height: { xs: 1, sm: '100vh' } }}>
      <Grid container sx={{ display: { xs: 'none', sm: 'block' }, position: 'absolute', zIndex: -1, height: 1, width: 1 }}>
        <Grid size={{ sm: 6 }} sx={{ height: 1 }}>
          <Box
            sx={{ bgcolor: 'grey.100', height: 1, borderBottomRightRadius: boxRadius, borderTopRightRadius: boxRadius, minHeight: 700 }}
          />
        </Grid>
      </Grid>
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY, height: 1 }}>
        <Grid container sx={{ height: 1 }}>
          <Grid size={{ sm: 6 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Stack sx={{ height: 1, justifyContent: 'space-between', px: boxSpacing }}>
              <Link
                component={NextLink}
                href={process.env.NEXT_PUBLIC_BASE_NAME || '/'}
                sx={{ width: 'fit-content' }}
                rel="noopener noreferrer"
                aria-label="logo"
              >
                <LogoMain />
              </Link>
              <Box sx={{ ...slickStyle }}>
                <Slider {...settings}>
                  {testimonials.map((item, index) => (
                    <Stack key={index} sx={{ alignItems: 'center' }}>
                      <Rating rate={item.ratings} sx={{ justifyContent: 'center' }} />
                      <Typography variant="h3" align="center" sx={{ mt: 2, mb: 5 }}>
                        {item.review}
                      </Typography>
                      <ProfileCard3 {...item.profile} />
                    </Stack>
                  ))}
                </Slider>
              </Box>
              <Copyright />
            </Stack>
          </Grid>
          <Grid size={{ sm: 6 }} sx={{ width: 1 }}>
            <Stack
              sx={{
                height: { xs: 'calc(100vh - 64px)', sm: 1 },
                justifyContent: { xs: 'space-between', sm: 'center' },
                alignItems: { xs: 'center', sm: 'start' },
                px: boxSpacing
              }}
            >
              <Box sx={{ width: 1 }}>
                <Typeset
                  {...{ heading, caption }}
                  stackProps={{ sx: { gap: 1, alignItems: { xs: 'center', sm: 'start' } } }}
                  captionProps={{ variant: 'body1' }}
                />
                <Box sx={{ width: 1, maxWidth: { sm: 458 }, mt: { xs: 4, sm: 6 } }}>
                  <AuthLogin inputSx={{ bgcolor: 'background.paper' }} />
                  <Typography sx={{ textAlign: 'center', mt: 2.5, color: 'text.secondary' }}>
                    Don’t have an account?{' '}
                    <Link
                      component={NextLink}
                      underline="hover"
                      variant="subtitle1"
                      href=""
                      sx={{ '&:hover': { color: 'primary.dark' } }}
                      rel="noopener noreferrer"
                      aria-label="sign-up"
                    >
                      Sign Up
                    </Link>
                  </Typography>
                  <Divider sx={{ my: { xs: 4, sm: 5 } }}>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', px: 1.25 }}>
                      OR Continue with
                    </Typography>
                  </Divider>
                  <AuthSocial type={SocialTypes.HORIZONTAL} />
                </Box>
              </Box>
              <Box sx={{ mt: 4, display: { sm: 'none' } }}>
                <Copyright />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </ContainerWrapper>
    </Box>
  );
}

Login5.propTypes = { heading: PropTypes.string, caption: PropTypes.string, testimonials: PropTypes.array };
