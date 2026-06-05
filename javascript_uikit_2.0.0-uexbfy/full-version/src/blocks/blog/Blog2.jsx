'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import { useColorScheme, useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { ThemeMode } from '@/config';
import useAriaHidden from '@/hooks/useAriaHidden';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  BLOG - 2  ***************************/

/**
 *
 * Demos:
 * - [Blog2](https://www.Capitalta.io/blocks/blog/blog2)
 *
 * API:
 * - [Blog2 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/blog/blog2#props-details)
 */

export default function Blog2({ heading, caption, blogs }) {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();
  const updateAriaHidden = useAriaHidden();

  const settings = {
    focusOnSelect: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: true,
    initialSlide: 0,
    centerMode: true,
    centerPadding: '140px',
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { centerPadding: '100px' }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { centerPadding: '50px' }
      }
    ],
    afterChange: () => {
      // the custom hook to manage aria-hidden and inert attributes for anchor tags
      updateAriaHidden();
    }
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        {heading && <Typeset {...{ heading, caption }} />}
        <Box sx={{ position: 'relative' }}>
          <Slider {...settings}>
            {blogs.map((item, index) => (
              <Box key={index} sx={{ px: 0.75 }}>
                <GraphicsCard
                  bgImage={item.image}
                  sx={{ height: { xs: 250, sm: 300, md: 410 } }}
                  overLay={`linear-gradient(360deg, ${withAlpha(theme.vars.palette.grey[900], 0.5)} 0%, ${withAlpha(
                    colorScheme === ThemeMode.DARK ? theme.vars.palette.grey[200] : theme.vars.palette.primary.darker,
                    colorScheme === ThemeMode.DARK ? 0.5 : 0
                  )} 100%)`}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    sx={{
                      alignItems: { xs: 'flex-start', sm: 'flex-end' },
                      justifyContent: { xs: 'flex-end', sm: 'space-between' },
                      gap: 0.5,
                      height: 1,
                      p: 3
                    }}
                  >
                    <Link
                      component={NextLink}
                      variant="h5"
                      color="background.default"
                      {...item.link}
                      onClick={(e) => e.stopPropagation()}
                      underline="hover"
                    >
                      {item.caption}
                    </Link>
                    <Link
                      component={NextLink}
                      {...item.link}
                      rel="noopener noreferrer"
                      aria-label="blog-link"
                      onClick={(e) => e.stopPropagation()}
                      sx={{ height: 24, '&:hover svg': { color: 'background.default' } }}
                    >
                      <motion.div whileHover={{ y: -4, x: 4 }} transition={{ duration: 0.5 }}>
                        <SvgIcon name="tabler-arrow-up-right" color="grey.600" />
                      </motion.div>
                    </Link>
                  </Stack>
                </GraphicsCard>
              </Box>
            ))}
          </Slider>
        </Box>
      </Stack>
    </ContainerWrapper>
  );
}

Blog2.propTypes = { heading: PropTypes.any, caption: PropTypes.any, blogs: PropTypes.any };
