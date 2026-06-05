'use client';
import PropTypes from 'prop-types';

import { useRef } from 'react';

// @mui
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
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TESTIMONIAL - 4 ***************************/

/**
 *
 * Demos:
 * - [Testimonial4](https://www.Capitalta.io/blocks/testimonial/testimonial4)
 *
 * API:
 * - [Testimonial4 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/testimonial/testimonial4#props-details)
 */

export default function Testimonial4({ heading, caption, testimonials }) {
  const sliderRef = useRef(null);

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
    '& .slick-slider': { mb: { md: 4.5 } },
    '& .slick-track': { display: 'flex' },
    '& .slick-slide': { height: 'auto', ' > div': { height: 1, px: 0.75 } },
    '& .slick-dots': { bottom: -32 },
    '& .slick-dots li': { width: 12, height: 12, mx: 0.5 },
    '& .slick-dots li button': { width: 12, height: 12, p: 0 },
    '& .slick-dots li button:before': { fontSize: 14, width: 12, height: 12, color: 'primary.main' },
    '& .slick-dots li.slick-active button:before': { color: 'primary.main', opacity: 1 }
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
        <Box sx={{ ...slickStyle, pb: 4.5 }}>
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
              <GraphicsCard key={index} sx={{ height: 1 }}>
                <Stack sx={{ justifyContent: 'center', gap: { xs: 3, sm: 4, md: 7 }, height: 1, p: { xs: 3, sm: 4, md: 5 } }}>
                  <Stack sx={{ gap: { xs: 2, sm: 3 } }}>
                    <Rating {...{ rate: testimonial.ratings }} sx={{ justifyContent: 'center' }} />
                    <Typography
                      variant="h3"
                      sx={{
                        color: 'text.secondary',
                        '&:before': { content: 'open-quote' },
                        '&:after': { content: 'close-quote' },
                        textAlign: 'center'
                      }}
                    >
                      {testimonial.review}
                    </Typography>
                  </Stack>
                  <ProfileCard2 {...testimonial.profile} sx={{ justifyContent: 'center' }} />
                </Stack>
              </GraphicsCard>
            ))}
          </Slider>
        </Box>
      </Stack>
    </ContainerWrapper>
  );
}

Testimonial4.propTypes = { heading: PropTypes.any, caption: PropTypes.any, testimonials: PropTypes.any };
