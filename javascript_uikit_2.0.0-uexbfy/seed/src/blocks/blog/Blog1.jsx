'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import Typeset from '@/components/Typeset';

import useAriaHidden from '@/hooks/useAriaHidden';
import useFocusWithin from '@/hooks/useFocusWithin';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  BLOG - 1  ***************************/

/**
 *
 * Demos:
 * - [Blog1](https://www.saasable.io/blocks/blog/blog1)
 *
 * API:
 * - [Blog1 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/blog/blog1#props-details)
 */

export default function Blog1({ heading, caption, blogs }) {
  const theme = useTheme();
  const isFocusWithin = useFocusWithin();
  const updateAriaHidden = useAriaHidden();

  const settings = {
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
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 1, centerPadding: '45px' }
      }
    ],
    afterChange: () => {
      // the custom hook to manage aria-hidden and inert attributes for anchor tags
      updateAriaHidden();
    }
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY, overflowX: 'hidden' }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        {heading && (
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
        )}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box sx={{ position: 'relative', '& .slick-slide > div': { pt: 0.5 }, mt: -0.5 }}>
            <Slider {...settings}>
              {blogs.map((item, index) => (
                <Box key={index} sx={{ px: { xs: 0.25, sm: 0.5, md: 0.75 } }}>
                  <GraphicsCard
                    bgImage={item.image}
                    sx={{
                      height: { xs: 250, sm: 300, md: 410 },
                      ...(isFocusWithin && { '&:focus-within': generateFocusVisibleStyles(theme.vars.palette.primary.main) })
                    }}
                    overLay={`linear-gradient(360deg, ${withAlpha(theme.vars.palette.grey[900], 0.5)} 0%, ${withAlpha(theme.vars.palette.primary.darker, 0)} 100%)`}
                  >
                    <Stack sx={{ justifyContent: 'flex-end', height: 1, p: 3 }}>
                      <Link
                        component={NextLink}
                        variant="h5"
                        color="background.default"
                        {...item.link}
                        sx={{ '&.Mui-focusVisible': { outline: 'none' } }}
                        underline="hover"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.caption}
                      </Link>
                    </Stack>
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

Blog1.propTypes = { heading: PropTypes.any, caption: PropTypes.any, blogs: PropTypes.any };
