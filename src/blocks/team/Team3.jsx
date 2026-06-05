'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import { useColorScheme, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// @project
import { GraphicsCard } from '@/components/cards';
import { ThemeMode } from '@/config';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { IconType } from '@/enum';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TEAM - 3  ***************************/

/**
 *
 * Demos:
 * - [Team3](https://www.Capitalta.io/blocks/team/team3)
 *
 * API
 * - [Team3 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/team/team3#props-details)
 */

export default function Team3({ heading, caption, members }) {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();

  const settings = {
    autoplay: true,
    autoplaySpeed: 6000,
    lazyLoad: 'progressive',
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md - 1,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: theme.breakpoints.values.sm - 1,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: '60px' }
      }
    ]
  };

  const socialBtnSX = { sx: { bgcolor: 'grey.200', p: 0.5 }, component: NextLink };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY, overflowX: 'hidden' }}>
      <Stack sx={{ gap: 4, pb: 5 }}>
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
        <Box
          sx={{
            position: 'relative',
            '.slick-dots': { bottom: -40 },
            '.slick-dots li button:before': { opacity: 1, color: 'grey.200', fontSize: 8 },
            '.slick-dots li.slick-active button:before, .slick-dots li button:hover:before': { color: 'primary.main' }
          }}
        >
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Slider {...settings}>
              {members.map((item, index) => (
                <Box key={index} sx={{ px: 0.75 }}>
                  <GraphicsCard>
                    <Stack>
                      <GraphicsCard
                        bgImage={item.avatar}
                        sx={{
                          bgcolor: withAlpha(theme.vars.palette.grey[600], 0.6),
                          borderRadius: 0,
                          height: { xs: 185, sm: 240, md: 300 }
                        }}
                        overLay={`linear-gradient(360deg, ${withAlpha(theme.vars.palette.grey[colorScheme === ThemeMode.DARK ? 50 : 900], 0.5)} 0%, ${withAlpha(theme.vars.palette.primary.darker, 0)} 100%)`}
                      />
                      <GraphicsCard sx={{ mt: { xs: -3, sm: -5 }, zIndex: 1 }}>
                        <Stack sx={{ alignItems: 'center', gap: { xs: 0.5, sm: 1, md: 1.5 }, p: { xs: 2.5, sm: 3, md: 4 } }}>
                          <Typeset
                            {...{
                              heading: item.name,
                              caption: item.role,
                              stackProps: { sx: { alignItems: 'center', gap: 0.75 } },
                              headingProps: { variant: 'h4', noWrap: true, sx: { textAlign: 'center', textOverflow: 'ellipsis' } },
                              captionProps: { variant: 'body1', noWrap: true, sx: { textAlign: 'center', textOverflow: 'ellipsis' } }
                            }}
                          />
                          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                            <IconButton
                              {...socialBtnSX}
                              href={item.socialLinks?.linkedin || ''}
                              rel="noopener noreferrer"
                              aria-label="linkedin"
                            >
                              <SvgIcon name="tabler-filled-linkedin" type={IconType.FILL} />
                            </IconButton>
                            <IconButton
                              {...socialBtnSX}
                              href={item.socialLinks?.instagram || ''}
                              rel="noopener noreferrer"
                              aria-label="instagram"
                            >
                              <SvgIcon name="tabler-filled-instagram" type={IconType.FILL} />
                            </IconButton>
                            <IconButton
                              {...socialBtnSX}
                              href={item.socialLinks?.facebook || ''}
                              rel="noopener noreferrer"
                              aria-label="facebook"
                            >
                              <SvgIcon name="tabler-filled-facebook" type={IconType.FILL} />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </GraphicsCard>
                    </Stack>
                  </GraphicsCard>
                </Box>
              ))}
            </Slider>
          </motion.div>
        </Box>
      </Stack>
    </ContainerWrapper>
  );
}

Team3.propTypes = { heading: PropTypes.any, caption: PropTypes.any, members: PropTypes.any };
