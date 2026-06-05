'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import Slider from 'react-slick';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { IconType } from '@/enum';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  HERO - 5  ***************************/

/**
 *
 * Demos:
 * - [Hero5](https://www.saasable.io/blocks/hero/hero5)
 *
 * API:
 * - [Hero5 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/hero/hero5#props-details)
 */

export default function Hero5({ chip, headLine, captionLine, image, listData, primaryBtn }) {
  const theme = useTheme();
  const iconBoxSize = { xs: 46, md: 60 };

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

  const settings = {
    autoplay: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 1000,
    swipeToSlide: true,
    initialSlide: 0,
    variableWidth: true
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <GraphicsCard sx={{ p: { xs: 2.5, sm: 3, md: 5 }, position: 'relative' }}>
        <Box sx={{ position: { xs: 'relative', sm: 'absolute' }, top: { sm: 24, md: 40 }, zIndex: 1 }}>
          {chip && (
            <Chip
              label={
                typeof chip.label === 'string' ? (
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {chip.label}
                    {chip.link && (
                      <Link
                        component={NextLink}
                        variant="caption"
                        color="primary.main"
                        {...chip.link}
                        underline="hover"
                        sx={{ '&:hover': { color: 'primary.dark' } }}
                      />
                    )}
                  </Typography>
                ) : (
                  chip.label
                )
              }
              sx={{ bgcolor: 'background.default', mb: { xs: 1.5, sm: 3 } }}
            />
          )}

          <Typography variant="h1" sx={{ maxWidth: 608 }}>
            {headLine}
          </Typography>
          {primaryBtn && <Button color="primary" size="large" variant="contained" {...primaryBtn} sx={{ mt: { xs: 3, sm: 5 } }} />}
        </Box>

        <Box sx={{ position: 'relative' }}>
          <GraphicsImage
            sx={{
              height: { xs: 300, sm: 500, md: 605 },
              backgroundSize: 'contain',
              backgroundPositionX: 'right',
              backgroundPositionY: 'top',
              display: { xs: 'none', sm: 'block' }
            }}
            image={image}
          >
            <Box
              sx={{
                width: 1,
                height: 1,
                bgcolor: { xs: withAlpha(theme.vars.palette.grey[100], 0.6), md: withAlpha(theme.vars.palette.grey[100], 0.2) }
              }}
            />
          </GraphicsImage>

          <Stack sx={{ gap: { xs: 2, sm: 3 }, mt: { xs: 6.25, sm: -6.25 } }}>
            <Typography sx={{ color: 'text.secondary', maxWidth: 400 }}>{captionLine}</Typography>

            <Box sx={{ position: 'relative', '&:before': { ...shade, left: 0 }, '&:after': { ...shade, right: 0, rotate: '180deg' } }}>
              <Slider {...settings}>
                {listData.map((item, index) => (
                  <Box key={index} sx={{ px: 0.75 }}>
                    <Stack direction="row" sx={{ gap: 1, borderRadius: { xs: 4, sm: 6 }, bgcolor: 'grey.200', p: { xs: 1, sm: 1.5 } }}>
                      <Avatar sx={{ width: iconBoxSize, height: iconBoxSize, bgcolor: 'grey.100', borderRadius: 4 }}>
                        <SvgIcon type={IconType.CUSTOM} {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} />
                      </Avatar>
                      <Typeset
                        {...{
                          heading: item.title,
                          caption: item.description,
                          stackProps: { sx: { gap: 0.625 } },
                          headingProps: { variant: 'h4' },
                          captionProps: { variant: 'body2' }
                        }}
                      />
                    </Stack>
                  </Box>
                ))}
              </Slider>
            </Box>
          </Stack>
        </Box>
      </GraphicsCard>
    </ContainerWrapper>
  );
}

Hero5.propTypes = {
  chip: PropTypes.object,
  headLine: PropTypes.string,
  captionLine: PropTypes.string,
  image: PropTypes.any,
  listData: PropTypes.array,
  primaryBtn: PropTypes.any
};
