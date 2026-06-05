'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

// @third-party
import Slider from 'react-slick';

// @project
import { GraphicsCard } from '@/components/cards';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { SECTION_COMMON_PY } from '@/utils/constant';
import GetImagePath from '@/utils/GetImagePath';

/***************************  TEAM - 8  ***************************/

/**
 *
 * Demos:
 * - [Team8](https://www.Capitalta.io/blocks/team/team8)
 *
 * API
 * - [Team8 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/team/team8#props-details)
 */

export default function Team8({ heading, caption, members, isFilter = true }) {
  const theme = useTheme();

  const settings = {
    autoplay: true,
    autoplaySpeed: 6000,
    lazyLoad: 'progressive',
    focusOnSelect: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    swipeToSlide: true,
    initialSlide: 0,
    centerMode: true,
    centerPadding: '95px',
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg - 1,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: theme.breakpoints.values.md - 1,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: theme.breakpoints.values.sm - 1,
        settings: { slidesToShow: 1, centerPadding: '45px' }
      }
    ]
  };

  return (
    <Stack sx={{ gap: { xs: 3, sm: 4 }, py: SECTION_COMMON_PY }}>
      <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
      <Slider {...settings}>
        {members.map((item, index) => (
          <Box key={index} sx={{ px: 0.75 }}>
            <GraphicsCard
              sx={{
                height: index % 2 === 0 ? { xs: 339, md: 403 } : { xs: 269, md: 350 },
                position: 'relative',
                borderRadius: { xs: 4, md: 6 },
                ...(isFilter && { filter: 'grayscale(1)' })
              }}
            >
              {item.badge && (
                <Tooltip title={item.badge}>
                  <Avatar
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      background: 'transparent',
                      position: 'absolute',
                      right: 16,
                      top: 16
                    }}
                  >
                    <SvgIcon name="tabler-award" color="text.primary" />
                  </Avatar>
                </Tooltip>
              )}
              <CardMedia image={GetImagePath(item.avatar)} sx={{ height: 1 }} />
            </GraphicsCard>
            <Typeset
              {...{
                heading: item.name,
                caption: item.role,
                stackProps: { sx: { textAlign: 'center', gap: { xs: 0.25, md: 0.5 }, mt: 1.5 } },
                headingProps: { variant: 'h6' },
                captionProps: { variant: 'body1' }
              }}
            />
          </Box>
        ))}
      </Slider>
    </Stack>
  );
}

Team8.propTypes = { heading: PropTypes.any, caption: PropTypes.any, members: PropTypes.any, isFilter: PropTypes.bool };
