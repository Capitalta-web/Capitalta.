'use client';
import PropTypes from 'prop-types';

import { useRef } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import Slider from 'react-slick';

// @project
import { GraphicsCard } from '@/components/cards';
import { ProfileCard2 } from '@/components/cards/profile-card';
import ContainerWrapper from '@/components/ContainerWrapper';
import Rating from '@/components/Rating';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import Graphic1 from '@/images/graphics/Graphic1';

/***************************  TESTIMONIAL - 7  ***************************/

/**
 *
 * Demos:
 * - [Testimonial7](https://www.saasable.io/blocks/testimonial/testimonial7)
 *
 * API:
 * - [Testimonial7 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/testimonial/testimonial7#props-details)
 */

export default function Testimonial7({ heading, primaryBtn, testimonials }) {
  const theme = useTheme();

  const sliderRef = useRef(null);

  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '100px',
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: { slidesToShow: 1, centerPadding: '110px' }
      },
      {
        breakpoint: theme.breakpoints.values.md - 1,
        settings: { slidesToShow: 1, centerPadding: '120px' }
      },
      {
        breakpoint: theme.breakpoints.values.md - 1,
        settings: { slidesToShow: 1, centerPadding: '140px' }
      },
      {
        breakpoint: theme.breakpoints.values.sm - 1,
        settings: { slidesToShow: 1, centerPadding: '40px' }
      }
    ]
  };

  const slickStyle = {
    px: { xs: 3, sm: 6 },
    position: 'relative',
    zIndex: 1,
    '& .slick-slider': { height: { xs: 324, sm: 510 } },
    '& .slick-list': {
      height: { xs: '324px !important', sm: '510px !important' },
      my: -0.2,
      width: { xs: 295, sm: 463, md: 'unset' },
      mx: 'auto'
    },
    '& .slick-slide': {
      opacity: 0.6,
      transition: 'all 0.2s ease',
      '&.slick-current, &.slick-center, &.slick-active': { opacity: 1, transition: 'all 0.2s ease ' },
      my: 0.2
    }
  };
  const boxPadding = { xs: 2.5, sm: 3, md: 4 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={1.5} sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
        <Grid size={{ md: 6 }}>
          <GraphicsCard sx={{ position: 'relative' }}>
            <Box sx={{ position: 'absolute', width: 1, height: 1, left: 0, top: 0, opacity: 0.6 }}>
              <Graphic1 />
            </Box>
            <Stack sx={slickStyle}>
              <Slider ref={sliderRef} {...settings}>
                {testimonials.map((testimonial, index) => (
                  <GraphicsCard key={index} sx={{ bgcolor: 'grey.300' }}>
                    <Stack sx={{ gap: { xs: 1, sm: 1.5 }, p: boxPadding }}>
                      <Rating {...{ rate: testimonial.ratings }} />
                      <Typography
                        variant="h3"
                        sx={{
                          color: 'text.secondary',
                          display: '-webkit-box',
                          WebkitLineClamp: { xs: 3, sm: 2 },
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
                      {...testimonial.profile}
                      background
                      sx={{ p: { xs: 1.25, sm: 2 }, borderRadius: { xs: 6, sm: 10 }, bgcolor: 'grey.400', gap: { xs: 0.75, sm: 1.25 } }}
                    />
                  </GraphicsCard>
                ))}
              </Slider>
            </Stack>
          </GraphicsCard>
        </Grid>
        <Grid size={{ md: 6 }}>
          <GraphicsCard sx={{ height: 1 }}>
            <Stack sx={{ alignItems: 'start', justifyContent: 'center', gap: { xs: 5, sm: 6 }, p: { xs: 3, sm: 4, md: 5 }, height: 1 }}>
              <Typography variant="h2">{heading}</Typography>
              {primaryBtn && <Button variant="contained" size="large" {...primaryBtn} />}
            </Stack>
          </GraphicsCard>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

Testimonial7.propTypes = { heading: PropTypes.any, primaryBtn: PropTypes.any, testimonials: PropTypes.any };
