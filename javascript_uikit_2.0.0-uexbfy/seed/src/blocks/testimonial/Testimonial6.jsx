'use client';
import PropTypes from 'prop-types';

import { useRef } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// @project
import { GraphicsCard } from '@/components/cards';
import { ProfileCard4 } from '@/components/cards/profile-card';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SlickArrows from '@/components/SlickArrows';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';
import GetImagePath from '@/utils/GetImagePath';

/***************************  TESTIMONIAL - 6  ***************************/

/**
 *
 * Demos:
 * - [Testimonial6](https://www.saasable.io/blocks/testimonial/testimonial6)
 *
 * API:
 * - [Testimonial6 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/testimonial/testimonial6#props-details)
 */

export default function Testimonial6({ heading, caption, testimonials }) {
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
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm + 1,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const slickStyle = { '& .slick-track': { display: 'flex' }, '& .slick-slide': { height: 'auto', ' > div': { height: 1, px: 0.75 } } };
  const boxPadding = { xs: 2, sm: 3, md: 5 };

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
          <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 4 }}>
            <Typeset {...{ heading, caption }} />
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <SlickArrows sliderRef={sliderRef} />
            </Box>
          </Stack>
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
          <Stack sx={{ ...slickStyle, gap: { xs: 3, sm: 2 } }}>
            <Slider ref={sliderRef} {...settings}>
              {testimonials.map((testimonial, index) => (
                <GraphicsCard key={index} sx={{ height: 1 }}>
                  <Stack sx={{ justifyContent: 'space-between', height: 1, gap: { xs: 4, sm: 5, md: 7 }, p: boxPadding }}>
                    <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
                      {testimonial.profile.avatar && (
                        <Avatar
                          src={GetImagePath(testimonial.profile.avatar)}
                          sx={{ width: { xs: 52, md: 55 }, height: { xs: 52, md: 55 } }}
                          alt="Avatar"
                          slotProps={{ img: { loading: 'lazy' } }}
                        />
                      )}
                      {testimonial.image && <GraphicsImage image={testimonial.image} />}
                    </Stack>
                    <Stack sx={{ gap: { xs: 1.5, md: 2 } }}>
                      <Typography variant="h3">{testimonial.title}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{testimonial.review}</Typography>
                    </Stack>
                    <ProfileCard4 {...testimonial.profile} />
                  </Stack>
                </GraphicsCard>
              ))}
            </Slider>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <SlickArrows sliderRef={sliderRef} />
            </Box>
          </Stack>
        </motion.div>
      </Stack>
    </ContainerWrapper>
  );
}

Testimonial6.propTypes = { heading: PropTypes.any, caption: PropTypes.any, testimonials: PropTypes.any };
