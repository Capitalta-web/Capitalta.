'use client';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import Marquee from 'react-fast-marquee';

// @project
import { GraphicsCard } from '@/components/cards';
import { ProfileCard2 } from '@/components/cards/profile-card';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TESTIMONIAL - 9  ***************************/

/**
 *
 * Demos:
 * - [Testimonial9](https://www.saasable.io/blocks/testimonial/testimonial9)
 *
 * API:
 * - [Testimonial9 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/testimonial/testimonial9#props-details)
 */

export default function Testimonial9({ heading, caption, testimonials }) {
  const theme = useTheme();
  const [marqueeData1, setMarqueeData1] = useState([]);
  const [marqueeData2, setMarqueeData2] = useState([]);

  useEffect(() => {
    // Split testimonials into two sets if there are more than 5 testimonials
    if (testimonials.length > 5) {
      const mid = Math.ceil(testimonials.length / 2);
      setMarqueeData1(testimonials.slice(0, mid));
      setMarqueeData2(testimonials.slice(mid));
    } else {
      setMarqueeData1(testimonials);
    }
  }, [testimonials]);

  const gc = theme.vars.palette.background.default;
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `linear-gradient(90deg, ${withAlpha(gc, 0)} 0%, ${withAlpha(gc, 0.9)} 100%)`
      : `linear-gradient(90deg, ${gc} 0%, ${withAlpha(gc, 0)} 100%)`;

  const sharedGradient = {
    position: 'absolute',
    content: `' '`,
    top: 0,
    width: { xs: 24, sm: 97, md: 139 },
    height: 1,
    background: gradient,
    zIndex: 2
  };

  return (
    <Stack sx={{ py: SECTION_COMMON_PY, gap: { xs: 3, sm: 4 } }}>
      <ContainerWrapper>
        <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
      </ContainerWrapper>
      <Stack
        sx={{
          gap: { xs: 1, md: 1.5 },
          alignItems: 'center',
          position: 'relative',
          '& .rfm-initial-child-container': { height: 1 },
          '& .rfm-child': { height: 1, display: 'flex', justifyContent: 'space-between' },
          '&:before': { ...sharedGradient, left: 0 },
          '&:after': { ...sharedGradient, right: 0, transform: 'rotate(180deg)' }
        }}
      >
        <Marquee pauseOnHover direction={theme.direction === ThemeDirection.RTL ? 'right' : 'left'}>
          {marqueeData1.map((testimonial, index) => (
            <GraphicsCard
              key={index}
              sx={{ width: { xs: 375, sm: 395, md: 506 }, borderRadius: { xs: 4, sm: 6 }, mx: { xs: 0.5, md: 0.75 } }}
            >
              <Stack sx={{ justifyContent: 'space-between', gap: { xs: 2, md: 3 }, p: { xs: 1.5, sm: 2, md: 3 }, height: 1 }}>
                <ProfileCard2
                  {...{ ...testimonial.profile, avatarProps: { sx: { width: 48, height: 48 } }, nameProps: { variant: 'subtitle1' } }}
                />
                <Typography>{testimonial.review}</Typography>
              </Stack>
            </GraphicsCard>
          ))}
        </Marquee>
        {testimonials.length > 5 && (
          <Marquee pauseOnHover direction={theme.direction === ThemeDirection.RTL ? 'left' : 'right'}>
            {marqueeData2.map((testimonial, index) => (
              <GraphicsCard
                key={index}
                sx={{ width: { xs: 375, sm: 395, md: 506 }, borderRadius: { xs: 4, sm: 6 }, mx: { xs: 0.5, md: 0.75 } }}
              >
                <Stack sx={{ justifyContent: 'space-between', gap: { xs: 2, md: 3 }, p: { xs: 1.5, sm: 2, md: 3 }, height: 1 }}>
                  <ProfileCard2
                    {...{ ...testimonial.profile, avatarProps: { sx: { width: 48, height: 48 } }, nameProps: { variant: 'subtitle1' } }}
                  />
                  <Typography>{testimonial.review}</Typography>
                </Stack>
              </GraphicsCard>
            ))}
          </Marquee>
        )}
      </Stack>
    </Stack>
  );
}

Testimonial9.propTypes = { heading: PropTypes.any, caption: PropTypes.any, testimonials: PropTypes.any };
