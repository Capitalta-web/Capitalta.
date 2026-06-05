'use client';
import PropTypes from 'prop-types';

import { useRef } from 'react';

// @mui
import { useColorScheme, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// @project
import { ThemeMode } from '@/config';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TEAM - 2  ***************************/

/**
 *
 * Demos:
 * - [Team2](https://www.saasable.io/blocks/team/team2)
 *
 * API
 * - [Team2 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/team/team2#props-details)
 */

export default function Team2({ heading, caption, members }) {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();

  const sliderRef = useRef(null);

  const settings = {
    autoplay: true,
    autoplaySpeed: 6000,
    lazyLoad: 'progressive',
    focusOnSelect: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    swipeToSlide: true,
    initialSlide: 0,
    centerMode: true,
    centerPadding: '95px',
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md - 1,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: theme.breakpoints.values.sm - 1,
        settings: { slidesToShow: 1, centerPadding: '45px' }
      }
    ]
  };

  const gc1 = theme.vars.palette.grey[colorScheme === ThemeMode.DARK ? 50 : 900];
  const gc2 = theme.vars.palette.primary.darker;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY, overflowX: 'hidden' }}>
      <Stack sx={{ gap: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 5, x: 0 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4
          }}
        >
          <Typeset {...{ heading, caption }} />
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Box sx={{ position: 'relative' }}>
            <Slider ref={sliderRef} {...settings}>
              {members.map((item, index) => (
                <Box key={index} sx={{ px: { xs: 0.25, sm: 0.5, md: 0.75 } }}>
                  <GraphicsCard
                    bgImage={item.avatar}
                    sx={{ bgcolor: withAlpha(theme.vars.palette.grey[600], 0.6), height: { xs: 250, sm: 300, md: 410 } }}
                    overLay={`linear-gradient(360deg, ${withAlpha(gc1, 0.5)} 0%, ${withAlpha(gc2, 0)} 100%)`}
                  >
                    <Typeset
                      {...{
                        heading: item.name,
                        caption: item.role,
                        stackProps: { sx: { justifyContent: 'flex-end', gap: 0.75, height: 1, p: 3 } },
                        headingProps: {
                          variant: 'h5',
                          sx: { ...theme.applyStyles('light', { color: 'background.default' }) }
                        },
                        captionProps: {
                          variant: 'body1',
                          sx: { ...theme.applyStyles('light', { color: 'background.default' }) }
                        }
                      }}
                    />
                  </GraphicsCard>
                </Box>
              ))}
            </Slider>
          </Box>
        </motion.div>
      </Stack>
    </ContainerWrapper>
  );
}

Team2.propTypes = { heading: PropTypes.any, caption: PropTypes.any, members: PropTypes.any };
