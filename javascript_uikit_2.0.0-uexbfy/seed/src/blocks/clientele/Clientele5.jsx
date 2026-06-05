'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import Slider from 'react-slick';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  CLIENTELE - 5  ***************************/

/**
 *
 * Demos:
 * - [Clientele5](https://www.saasable.io/blocks/clientele/clientele5)
 *
 * API:
 * - [Clientele5 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/clientele/clientele5#props-details)
 */

export default function Clientele5({ title, clienteleList, description }) {
  const theme = useTheme();

  const settings = {
    lazyLoad: 'progressive',
    autoplay: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    swipeToSlide: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 2, centerMode: true }
      }
    ]
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 1.25, sm: 0.5 }} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, sm: 3, md: 2.5 }} sx={{ pb: { sm: 2 }, pt: { xs: 0, sm: 1.5 } }}>
          {title && (
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              {title}
            </Typography>
          )}
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid
          size={{ xs: 12, sm: 8.75, md: 9.25 }}
          sx={{ pb: 2, '.slick-track': { display: 'flex', alignItems: 'center' }, pt: { xs: 0, sm: 1.5 }, pl: 1.5 }}
        >
          <Slider {...settings}>
            {clienteleList.map((item, index) => (
              <Stack
                key={index}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 1,
                  p: 1.5,
                  '& svg': {
                    opacity: 0.4,
                    transition: 'all 0.5s ease-in-out',
                    '&:hover': { opacity: 1, transition: 'all 0.5s ease-in-out' }
                  }
                }}
              >
                <GraphicsImage {...item} />
              </Stack>
            ))}
          </Slider>
        </Grid>
      </Grid>
      <Divider />
      <Stack sx={{ mt: 1 }}>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </Stack>
    </ContainerWrapper>
  );
}

Clientele5.propTypes = { title: PropTypes.string, clienteleList: PropTypes.array, description: PropTypes.string };
