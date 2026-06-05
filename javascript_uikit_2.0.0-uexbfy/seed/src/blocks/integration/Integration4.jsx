'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @third-party
import Marquee from 'react-fast-marquee';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  INTEGRATION - TAG  ***************************/

function IntegrationAvatar({ src }) {
  const avatarSize = { xs: 106, sm: 110, md: 126 };
  const iconSize = { xs: 40, sm: 45 };

  return (
    <Avatar sx={{ bgcolor: 'background.default', width: avatarSize, height: avatarSize, borderRadius: { xs: 6.3, sm: 6.5, md: 7.5 } }}>
      <GraphicsImage image={src} sx={{ width: iconSize, height: iconSize }} />
    </Avatar>
  );
}

/***************************  INTEGRATION - 4  ***************************/

/**
 *
 * Demos:
 * - [Integration4](https://www.saasable.io/blocks/integration/integration4)
 *
 * API:
 * - [Integration4 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/integration/integration4#props-details)
 */

export default function Integration4({ headLine, captionLine, primaryBtn, marquees }) {
  const theme = useTheme();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 7 }}>
          <GraphicsCard sx={{ height: 1 }}>
            <Stack sx={{ alignItems: 'flex-start', justifyContent: 'space-between', gap: 3, p: { xs: 3, md: 6 }, height: 1 }}>
              <Typeset
                {...{
                  heading: headLine,
                  caption: captionLine,
                  captionProps: { variant: 'body1', sx: { color: 'text.secondary' } },
                  stackProps: { sx: { gap: { xs: 1, sm: 1.5 } } }
                }}
              />
              {primaryBtn && <Button variant="contained" size="large" {...primaryBtn} />}
            </Stack>
          </GraphicsCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 5 }}>
          <GraphicsCard sx={{ height: { xs: 339, sm: 360, md: 420 } }}>
            <Box>
              <Stack
                sx={{
                  gap: { xs: 2.5, sm: 3.5 },
                  transform: 'rotate(45deg)',
                  ml: { xs: -15, sm: -12, lg: -9.38 },
                  mr: { xs: -10, sm: -14.6, md: -9 },
                  mt: { xs: -10, md: -8.2 }
                }}
              >
                {marquees.map((marquee, index) => (
                  <Grid key={index} container spacing={{ xs: 0.5, sm: 1.5 }}>
                    <Marquee pauseOnHover {...(theme.direction === ThemeDirection.RTL && { direction: 'right' })} {...marquee.marqueeProps}>
                      {marquee.data.map((images, imgIndex) => (
                        <Grid key={imgIndex} sx={{ mx: 1 }} size={{ xs: 2, sm: 1.5, md: 1.2 }}>
                          <IntegrationAvatar src={images.image} />
                        </Grid>
                      ))}
                    </Marquee>
                  </Grid>
                ))}
              </Stack>
            </Box>
          </GraphicsCard>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

IntegrationAvatar.propTypes = { src: PropTypes.any };

Integration4.propTypes = {
  headLine: PropTypes.string,
  captionLine: PropTypes.string,
  primaryBtn: PropTypes.any,
  marquees: PropTypes.array
};
