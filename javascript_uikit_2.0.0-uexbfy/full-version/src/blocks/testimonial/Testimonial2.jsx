'use client';
import PropTypes from 'prop-types';

import { useRef, useState } from 'react';

// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// @project
import AnimatedModal from '@/components/AnimatedModal';
import { GraphicsCard, VideoCard, ModalCard } from '@/components/cards';
import { ProfileCard2 } from '@/components/cards/profile-card';
import ContainerWrapper from '@/components/ContainerWrapper';
import Rating from '@/components/Rating';
import SlickArrows from '@/components/SlickArrows';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TESTIMONIAL - 2  ***************************/

/**
 *
 * Demos:
 * - [Testimonial2](https://www.Capitalta.io/blocks/testimonial/testimonial2)
 *
 * API:
 * - [Testimonial2 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/testimonial/testimonial2#props-details)
 */

export default function Testimonial2({ heading, caption, testimonials }) {
  const [open, setOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

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

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: 0.3
            }}
          >
            <Typeset {...{ heading, caption }} />
          </motion.div>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: 0.3
              }}
            >
              <SlickArrows sliderRef={sliderRef} />
            </motion.div>
          </Box>
        </Stack>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4
          }}
        >
          <Stack sx={{ ...slickStyle, gap: 2 }}>
            <Slider ref={sliderRef} {...settings}>
              {testimonials.map((testimonial, index) => (
                <GraphicsCard key={index} sx={{ height: 1 }}>
                  <Grid container sx={{ height: 1 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <VideoCard
                        bgImage={testimonial.bgImage}
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          setVideoSrc(testimonial.videoSrc || '');
                          setOpen(true);
                          sliderRef?.current?.slickPause();
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Stack sx={{ alignItems: 'start', justifyContent: 'space-between', height: 1, gap: 3, p: { xs: 3, sm: 4, md: 5 } }}>
                        <Stack sx={{ gap: 1.5 }}>
                          <Rating rate={testimonial.ratings} />
                          <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                            {testimonial.review}
                          </Typography>
                        </Stack>
                        <ProfileCard2 {...testimonial.profile} background />
                      </Stack>
                    </Grid>
                  </Grid>
                </GraphicsCard>
              ))}
            </Slider>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <SlickArrows sliderRef={sliderRef} />
            </Box>
          </Stack>
        </motion.div>
      </Stack>

      <AnimatedModal
        open={open}
        onClose={() => {
          setOpen(false);
          sliderRef?.current?.slickPlay();
        }}
      >
        <ModalCard sx={{ width: { xs: '95%', sm: '90%', md: '80%', lg: '70%' }, height: 'auto', bgcolor: 'transparent' }}>
          <video playsInline width="100%" height="100%" style={{ display: 'flex', objectFit: 'cover' }} controls autoPlay>
            <source src={videoSrc} type="video/mp4" />
            <track src="captions.vtt" kind="captions" srcLang="en" label="English captions" />
          </video>
        </ModalCard>
      </AnimatedModal>
    </ContainerWrapper>
  );
}

Testimonial2.propTypes = { heading: PropTypes.any, caption: PropTypes.any, testimonials: PropTypes.any };
