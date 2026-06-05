'use client';
import PropTypes from 'prop-types';

import { useRef } from 'react';

// @next
import NextLink from 'next/link';

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
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SlickArrows from '@/components/SlickArrows';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import { Quote } from '@/icons';

/***************************  TESTIMONIAL - 12  ***************************/

/**
 *
 * Demos:
 * - [Testimonial12](https://www.saasable.io/blocks/testimonial/testimonial12)
 *
 * API:
 * - [Testimonial12 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/testimonial/testimonial12#props-details)
 */

export default function Testimonial12({ testimonials }) {
  const sliderRef = useRef(null);

  const settings = {
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: true,
    initialSlide: 0
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Box sx={{ position: 'relative' }}>
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((testimonial, index) => (
            <Box key={index}>
              <Grid
                container
                spacing={{ xs: 2.5, md: 7 }}
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ width: 1, alignItems: 'flex-start' }}
              >
                <Grid size={{ xs: 12, sm: 5, md: 4 }}>
                  <GraphicsCard bgImage={testimonial.avatar} sx={{ height: { xs: 250, sm: 284, md: 288 } }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 7, md: 8 }}>
                  <Stack sx={{ gap: { xs: 2, md: 3 } }}>
                    <Quote />
                    <Typography
                      variant="h3"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 3, md: 2 },
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {testimonial.review}
                    </Typography>
                    {testimonial.link && (
                      <Link
                        component={NextLink}
                        variant="subtitle1"
                        {...testimonial.link}
                        sx={{
                          '&:hover': { textDecoration: 'underline' },
                          ...(testimonial.link?.sx && { ...testimonial.link.sx })
                        }}
                      />
                    )}
                  </Stack>
                  <Divider sx={{ my: { xs: 2, md: 2.5 }, borderColor: 'grey.400' }} />
                  <Stack sx={{ gap: 0.5 }}>
                    <Typography variant="h4">{testimonial.profile.name}</Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      {testimonial.profile.role}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Slider>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            bottom: { xs: 0, sm: 16, md: 8 },
            '& .MuiIconButton-root': { height: { xs: 48, md: 64 }, width: { xs: 48, md: 64 } }
          }}
        >
          <SlickArrows sliderRef={sliderRef} />
        </Box>
      </Box>
    </ContainerWrapper>
  );
}

Testimonial12.propTypes = { testimonials: PropTypes.array };
