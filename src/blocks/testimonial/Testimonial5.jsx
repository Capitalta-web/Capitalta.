'use client';
import PropTypes from 'prop-types';

import { useRef } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// @project
import { GraphicsCard } from '@/components/cards';
import { ProfileCard3 } from '@/components/cards/profile-card';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SlickArrows from '@/components/SlickArrows';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TESTIMONIAL - 5  ***************************/

/**
 *
 * Demos:
 * - [Testimonial5](https://www.Capitalta.io/blocks/testimonial/testimonial5)
 *
 * API:
 * - [Testimonial5 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/testimonial/testimonial5#props-details)
 */

export default function Testimonial5({ heading, caption, testimonials }) {
  const theme = useTheme();

  const sliderRef = useRef(null);

  const settings = {
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    swipeToSlide: true,
    initialSlide: 0,
    centerMode: true,
    centerPadding: '300px',
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl - 1,
        settings: { slidesToShow: 2, centerPadding: '200px' }
      },
      {
        breakpoint: theme.breakpoints.values.lg - 1,
        settings: { slidesToShow: 2, centerPadding: '100px' }
      },
      {
        breakpoint: theme.breakpoints.values.md - 1,
        settings: { slidesToShow: 1, centerPadding: '200px' }
      },
      {
        breakpoint: theme.breakpoints.values.sm - 1,
        settings: { slidesToShow: 1, centerPadding: '32px' }
      }
    ]
  };

  const slickStyle = {
    '& .slick-track': { display: 'flex' },
    '& .slick-slide': {
      opacity: 0.6,
      height: 'auto',
      ' > div': { height: 1, px: 0.75 },
      '&.slick-current, &.slick-center, &.slick-active': { opacity: 1 }
    }
  };

  const boxPadding = { xs: 3, md: 5 };

  return (
    <Stack sx={{ gap: { xs: 3, sm: 4 }, py: SECTION_COMMON_PY, overflowX: 'hidden' }}>
      <ContainerWrapper>
        <motion.div
          initial={{ opacity: 0, y: 5, x: 0 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4
          }}
        >
          <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
        </motion.div>
      </ContainerWrapper>
      <Stack sx={{ ...slickStyle, gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
              <GraphicsCard key={index} sx={{ height: 1 }}>
                <Stack sx={{ height: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                  <Stack sx={{ gap: 2.5, p: boxPadding, alignItems: 'center', '& .MuiBox-root svg': { opacity: 0.3 } }}>
                    {testimonial.image && <GraphicsImage image={testimonial.image} />}
                    <Typography
                      variant="h3"
                      sx={{ '&:before': { content: 'open-quote' }, '&:after': { content: 'close-quote' }, textAlign: 'center' }}
                    >
                      {testimonial.review}
                    </Typography>
                  </Stack>
                  <ProfileCard3 {...testimonial.profile} background sx={{ borderRadius: { xs: 6, sm: 8, md: 10 }, width: 1 }} />
                </Stack>
              </GraphicsCard>
            ))}
          </Slider>
        </motion.div>
        <SlickArrows sliderRef={sliderRef} />
      </Stack>
    </Stack>
  );
}

Testimonial5.propTypes = { heading: PropTypes.any, caption: PropTypes.any, testimonials: PropTypes.any };
