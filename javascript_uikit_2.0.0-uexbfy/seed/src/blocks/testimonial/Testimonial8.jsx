'use client';
import PropTypes from 'prop-types';

import { useRef } from 'react';

// @mui
import Divider from '@mui/material/Divider';
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
import GraphicsImage from '@/components/GraphicsImage';
import SlickArrows from '@/components/SlickArrows';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TESTIMONIAL - 8  ***************************/

/**
 *
 * Demos:
 * - [Testimonial8](https://www.saasable.io/blocks/testimonial/testimonial8)
 *
 * API:
 * - [Testimonial8 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/testimonial/testimonial8#props-details)
 */

export default function Testimonial8({ heading, caption, testimonials }) {
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

  const slickStyle = { '& .slick-track': { display: 'flex' }, '& .slick-slide': { height: 'auto', ' > div': { height: 1, px: 0.75 } } };
  const boxPadding = { xs: 3, sm: 4, md: 5 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 4 }}>
          <Typeset {...{ heading, caption }} />
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <SlickArrows sliderRef={sliderRef} />
          </Box>
        </Stack>
        <Stack sx={{ ...slickStyle, gap: { xs: 3, sm: 2 } }}>
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
              <GraphicsCard key={index} sx={{ height: 1 }}>
                <Stack sx={{ justifyContent: 'space-between', height: 1, gap: { xs: 2, sm: 4, md: 5 }, p: boxPadding }}>
                  <Grid container spacing={{ xs: 2, sm: 3, md: 5 }} sx={{ alignItems: 'flex-end' }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="h3" sx={{ '&:before': { content: 'open-quote' }, '&:after': { content: 'close-quote' } }}>
                        {testimonial.title}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                        {testimonial.review}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
                    <ProfileCard2 {...testimonial.profile} sx={{ gap: { xs: 0.5, sm: 1.5 } }} />
                    {testimonial.image && <GraphicsImage image={testimonial.image} />}
                  </Stack>
                </Stack>
              </GraphicsCard>
            ))}
          </Slider>
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <SlickArrows sliderRef={sliderRef} />
          </Box>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}

Testimonial8.propTypes = { heading: PropTypes.any, caption: PropTypes.any, testimonials: PropTypes.any };
