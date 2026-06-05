'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import useAriaHidden from '@/hooks/useAriaHidden';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  BLOG - 4  ***************************/

/**
 *
 * Demos:
 * - [Blog4](https://www.saasable.io/blocks/blog/blog4)
 *
 * API:
 * - [Blog4 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/blog/blog4#props-details)
 */

export default function Blog4({ heading, caption, blogs, exploreMore }) {
  const theme = useTheme();
  const updateAriaHidden = useAriaHidden();

  const settings = {
    focusOnSelect: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    swipeToSlide: true,
    initialSlide: 0,
    centerMode: true,
    centerPadding: '280px',
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: { centerPadding: '100px' }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { centerPadding: '100px', slidesToShow: 1 }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { centerPadding: '20px', slidesToShow: 1 }
      }
    ],
    afterChange: () => {
      // the custom hook to manage aria-hidden and inert attributes for anchor tags
      updateAriaHidden();
    }
  };

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
          <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h2">{heading}</Typography>
          </Stack>
        </motion.div>
      </ContainerWrapper>
      <Box sx={{ position: 'relative' }}>
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Slider {...settings}>
            {blogs.map((item, index) => (
              <Box key={index} sx={{ px: 0.75 }}>
                <GraphicsCard bgImage={item.image} sx={{ height: 464, position: 'relative', overflow: 'unset' }}>
                  <GraphicsCard sx={{ width: '100%', position: 'absolute', bottom: '-2%', left: 0, mb: 0.5 }}>
                    <Stack sx={{ p: { xs: 2, sm: 2.5, md: 3 }, gap: 1.5 }}>
                      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
                          {item.chips &&
                            item.chips.length > 0 &&
                            item.chips.map((tag, index) => (
                              <Chip
                                key={index}
                                label={`${tag}`}
                                slotProps={{ label: { sx: { px: 2, py: 1.125, color: 'text.secondary', typography: 'caption' } } }}
                                sx={{ bgcolor: 'grey.300' }}
                              />
                            ))}
                        </Stack>
                        <Typography variant="caption" sx={{ color: 'text.secondary', textWrap: 'nowrap' }}>
                          {item.date}
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          '&:hover .MuiLink-root, &:hover svg': { color: 'primary.dark' }
                        }}
                      >
                        <Link
                          component={NextLink}
                          variant="h4"
                          color="text.primary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical'
                          }}
                          {...item.link}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item.caption}
                        </Link>
                        <Link
                          component={NextLink}
                          {...item.link}
                          sx={{
                            ...item.link?.sx,
                            '& svg.tabler-arrow-up-right': { width: { xs: 24, sm: 40 }, height: { xs: 24, sm: 40 } }
                          }}
                          onClick={(e) => e.stopPropagation()}
                          rel="noopener noreferrer"
                          aria-label="blog-link"
                        >
                          <SvgIcon name="tabler-arrow-up-right" color="text.primary" stroke={1} />
                        </Link>
                      </Stack>
                    </Stack>
                  </GraphicsCard>
                </GraphicsCard>
              </Box>
            ))}
          </Slider>
        </motion.div>
      </Box>
      <ContainerWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20, x: 0 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.5
          }}
        >
          <Stack sx={{ justifyContent: 'center', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', textAlign: 'center', width: { sm: 400, md: 532 } }}>
              {caption}
            </Typography>
            {exploreMore && (
              <ButtonAnimationWrapper>
                <Button variant="outlined" size="large" {...exploreMore} {...(exploreMore.href && { component: NextLink })} />
              </ButtonAnimationWrapper>
            )}
          </Stack>
        </motion.div>
      </ContainerWrapper>
    </Stack>
  );
}

Blog4.propTypes = { heading: PropTypes.any, caption: PropTypes.any, blogs: PropTypes.any, exploreMore: PropTypes.any };
