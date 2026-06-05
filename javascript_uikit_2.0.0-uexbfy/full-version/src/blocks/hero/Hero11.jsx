'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// @project
import { GraphicsCard } from '@/components/cards';
import { ProfileGroup2 } from '@/components/cards/profile-card';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import Wave from '@/images/graphics/Wave';

/***************************  HERO - COUNTER BLOCK  ***************************/

function CounterBlock({ counter, defaultUnit, caption }) {
  return (
    <Stack sx={{ gap: { xs: 0.5, sm: 1 }, py: { xs: 1, sm: 1.5, md: 3 }, alignItems: 'center' }}>
      <Stack direction="row" sx={{ alignItems: 'flex-end' }}>
        <Typography component="div" variant="h3">
          {counter}
        </Typography>
        {defaultUnit && (
          <Typography component="div" variant="h4" sx={{ color: 'text.secondary' }}>
            {defaultUnit}
          </Typography>
        )}
      </Stack>
      <Typography align="center" sx={{ color: 'text.secondary' }}>
        {caption}
      </Typography>
    </Stack>
  );
}

/***************************  HERO - 11  ***************************/

/**
 *
 * Demos:
 * - [Hero11](https://www.Capitalta.io/blocks/hero/hero11)
 *
 * API:
 * - [Hero11 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/hero/hero11#props-details)
 */

export default function Hero11({ reviewData, headLine, captionLine, primaryBtn, helperText, image, benefitData, sliderTitle, listData }) {
  const theme = useTheme();

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    swipeToSlide: true,
    initialSlide: 0,
    centerMode: true,
    responsive: [
      { breakpoint: theme.breakpoints.values.md - 1, settings: { slidesToShow: 3, centerPadding: '95px' } },
      { breakpoint: theme.breakpoints.values.sm - 1, settings: { slidesToShow: 2, centerMode: false } }
    ]
  };

  const shade = {
    content: `' '`,
    zIndex: 1,
    position: 'absolute',
    width: { sm: 60, xs: 40 },
    height: 1,
    top: 0,
    background: `linear-gradient(90deg, ${theme.vars.palette.grey[100]} -8.54%, ${withAlpha(theme.vars.palette.grey[100], 0)} 100%)`,
    ...(theme.direction === ThemeDirection.RTL && { transform: 'scaleX(-1)' })
  };

  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(78.31% 78.31% at 50% 38.68%, ${withAlpha(theme.vars.palette.grey[100], 0)} 0%, ${withAlpha(theme.vars.palette.grey[100], 0.45)} 100%)`
      : `radial-gradient(94.19% 94.19% at 50% 26.18%, ${withAlpha(theme.vars.palette.grey[100], 0)} 0%, ${withAlpha(theme.vars.palette.grey[100], 0.7)} 100%)`;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 8.5 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.4
            }}
            style={{ height: '100%' }}
          >
            <GraphicsCard>
              <Stack
                sx={{ gap: 4, height: 1, p: { xs: 2, sm: 5, md: 7 }, minHeight: { sm: 514, md: 624 }, justifyContent: 'space-between' }}
              >
                <Stack sx={{ gap: { xs: 4, md: 6 } }}>
                  <ProfileGroup2 {...reviewData} starColor="warning.main" />
                  <Typeset
                    {...{
                      heading: headLine,
                      caption: captionLine,
                      stackProps: { sx: { gap: { xs: 1, sm: 2, md: 3 } } },
                      headingProps: { variant: 'h1' },
                      captionProps: { variant: 'h6' }
                    }}
                  />
                </Stack>
                <Stack sx={{ gap: 0.75, alignItems: 'start' }}>
                  <OutlinedInput
                    placeholder="Enter your email address"
                    endAdornment={<Button color="primary" variant="contained" sx={{ px: 4, minWidth: 100 }} {...primaryBtn} />}
                    slotProps={{
                      input: { 'aria-label': 'Email address', sx: { px: 2.5, py: 0.75 } },
                      notchedOutline: { sx: { borderRadius: 25 } }
                    }}
                    sx={{ typography: 'caption2', color: 'secondary.main', p: 0.5, whiteSpace: 'nowrap' }}
                  />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {helperText}
                  </Typography>
                </Stack>
              </Stack>
            </GraphicsCard>
          </motion.div>
        </Grid>
        <Grid size={{ xs: 12, sm: 3.5 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.4
            }}
            style={{ height: '100%' }}
          >
            <GraphicsCard sx={{ height: 1 }}>
              <Stack sx={{ height: 1, justifyContent: 'end' }}>
                <Stack
                  direction={{ xs: 'row', sm: 'column' }}
                  sx={{ alignItems: 'center', px: { xs: 3, sm: 2, md: 5 }, pt: { xs: 3, sm: 0 } }}
                >
                  <CounterBlock {...benefitData.data1} />
                  <Box component="span" sx={{ rotate: { xs: '90deg', sm: '180deg' }, py: 0.75 }}>
                    <Wave />
                  </Box>
                  <CounterBlock {...benefitData.data2} />
                </Stack>
                <Box sx={{ height: { xs: 157, sm: 226 }, position: 'relative' }}>
                  <GraphicsImage sx={{ height: 1, backgroundPositionY: 'top' }} image={image} />
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: gradient }} />
                </Box>
              </Stack>
            </GraphicsCard>
          </motion.div>
        </Grid>
        <Grid size={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.4
            }}
          >
            <GraphicsCard>
              <Stack sx={{ py: 3, gap: { xs: 2, md: 4 } }}>
                <Typography variant="subtitle2" align="center" sx={{ color: 'secondary.main' }}>
                  {sliderTitle}
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    '&:before': { ...shade, left: 0 },
                    '&:after': { ...shade, right: 0, rotate: '180deg' },
                    '.slick-track': { display: 'flex' },
                    '.slick-slide': { height: 'inherit' },
                    '.slick-slide > div': { height: '100%' }
                  }}
                >
                  <Slider {...settings}>
                    {listData.map((item, index) => (
                      <Box key={index} sx={{ position: 'relative', height: 1 }}>
                        <Stack sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'center', px: 2 }}>
                          <Avatar sx={{ width: 56, height: 56, bgcolor: 'grey.200', borderRadius: 4 }}>
                            <SvgIcon {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} />
                          </Avatar>
                          <Typography align="center" sx={{ color: 'text.secondary' }}>
                            {item.title}
                          </Typography>
                        </Stack>
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            height: 'calc(100% - 24px)',
                            transform: 'translateY(-50%)',
                            borderColor: 'grey.300'
                          }}
                        />
                      </Box>
                    ))}
                  </Slider>
                </Box>
              </Stack>
            </GraphicsCard>
          </motion.div>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

CounterBlock.propTypes = { counter: PropTypes.string, defaultUnit: PropTypes.string, caption: PropTypes.string };

Hero11.propTypes = {
  reviewData: PropTypes.object,
  headLine: PropTypes.string,
  captionLine: PropTypes.string,
  primaryBtn: PropTypes.any,
  helperText: PropTypes.string,
  image: PropTypes.any,
  benefitData: PropTypes.object,
  sliderTitle: PropTypes.string,
  listData: PropTypes.array
};
