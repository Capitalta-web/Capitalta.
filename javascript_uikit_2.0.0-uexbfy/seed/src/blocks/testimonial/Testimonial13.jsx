'use client';
import PropTypes from 'prop-types';

import { useRef } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';
import GetImagePath from '@/utils/GetImagePath';

// @assets
import { CloseQuote } from '@/icons';

/***************************  TESTIMONIAL - 13  ***************************/

/**
 *
 * Demos:
 * - [Testimonial13](https://www.saasable.io/blocks/testimonial/testimonial13)
 *
 * API:
 * - [Testimonial13 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/testimonial/testimonial13#props-details)
 */

export default function Testimonial13({ heading, primaryBtn, testimonials }) {
  const theme = useTheme();

  const sliderRef = useRef(null);

  const settings = {
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    swipeToSlide: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm - 1,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const slickStyle = {
    '& .slick-slider': { mb: { xs: 4.5, sm: 6 } },
    '& .slick-track': { display: 'flex' },
    '& .slick-slide': { height: 'auto', ' > div': { height: 1, px: 0.75 } },
    '& .slick-dots': { bottom: { xs: -34, sm: -42 } },
    '& .slick-dots li': { width: 12, height: 12, mx: 0.5 },
    '& .slick-dots li button': { width: 12, height: 12, p: 0 },
    '& .slick-dots li button:before': { fontSize: 14, width: 12, height: 12, color: 'primary.main' },
    '& .slick-dots li.slick-active button:before': { color: 'primary.main', opacity: 1 }
  };

  const boxPadding = { xs: 2, sm: 2.5, md: 3 };

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
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ justifyContent: { xs: 'center', sm: 'space-between' }, gap: { xs: 2.5, sm: 4 }, alignItems: 'center' }}
          >
            <Typeset {...{ heading }} />
            {primaryBtn && <Button variant="contained" size="medium" {...primaryBtn} />}
          </Stack>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.8
          }}
        >
          <Box sx={{ ...slickStyle }}>
            <Slider ref={sliderRef} {...settings}>
              {testimonials.map((testimonial, index) => (
                <GraphicsCard key={index} sx={{ height: 1, borderRadius: { xs: 4, sm: 6 }, border: '1px solid', borderColor: 'grey.300' }}>
                  <Stack sx={{ gap: 3, p: boxPadding, height: 1 }}>
                    <Stack direction="row" sx={{ gap: 1 }}>
                      <Avatar
                        src={GetImagePath(testimonial.profile.avatar)}
                        sx={{ width: 48, height: 48 }}
                        alt="Avatar"
                        slotProps={{ img: { loading: 'lazy' } }}
                      />
                      <Stack sx={{ gap: 0.5 }}>
                        <Typography variant="subtitle1">{testimonial.profile.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {testimonial.profile.role}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      {testimonial.review}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <CloseQuote />
                    </Box>
                  </Stack>
                </GraphicsCard>
              ))}
            </Slider>
          </Box>
        </motion.div>
      </Stack>
    </ContainerWrapper>
  );
}

Testimonial13.propTypes = { heading: PropTypes.any, primaryBtn: PropTypes.any, testimonials: PropTypes.any };
