'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FEATURE - 14  ***************************/

/**
 *
 * Demos:
 * - [Feature14](https://www.saasable.io/blocks/feature/feature14)
 *
 * API
 * - [Feature14 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/feature/feature14#props-details)
 */

export default function Feature14({ heading, image1, image2, cards, actionBtn, title, description, title2, description2 }) {
  const theme = useTheme();

  const gc = theme.vars.palette.grey[100];
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(71.13% 71.13% at 50% 50.07%, ${withAlpha(gc, 0)} 0%, ${withAlpha(gc, 0.6)} 100%)`
      : `radial-gradient(71.13% 71.13% at 50% 50.07%, ${withAlpha(gc, 0)} 0%, ${gc} 100%)`;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Stack
          direction={{ sm: 'row' }}
          sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-end' }, gap: 1.5 }}
        >
          <Typeset {...{ heading }} />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SvgIcon name="tabler-sparkles" size={16} stroke={3} color="background.default" />}
            {...actionBtn}
          />
        </Stack>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 7, md: 8 }}>
            <GraphicsCard sx={{ height: 1 }}>
              <Stack sx={{ gap: { xs: 0.5, sm: 1 }, pt: { xs: 3, sm: 4, md: 5 }, px: { xs: 3, sm: 4, md: 5 } }}>
                <Typography variant="h4">{title}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
              </Stack>
              <GraphicsImage
                sx={{
                  height: { xs: 162, sm: 290, md: 270 },
                  backgroundPositionY: 'top',
                  width: 1,
                  transform: 'scale(1.3)',
                  transformOrigin: 'top'
                }}
                image={image1}
              >
                <Box sx={{ height: 1, background: gradient, bottom: 0 }} />
              </GraphicsImage>
            </GraphicsCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 5, md: 4 }}>
            <GraphicsCard sx={{ height: 1 }}>
              <Stack sx={{ gap: { xs: 0.5, sm: 1 }, pt: { xs: 3, sm: 4, md: 5 }, px: { xs: 3, sm: 4, md: 5 } }}>
                <Typography variant="h4">{title2}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{description2}</Typography>
              </Stack>
              <GraphicsImage
                image={image2}
                sx={{
                  height: { xs: 190, sm: 290, md: 270 },
                  backgroundPositionY: { xs: 'top', sm: 'bottom' },
                  backgroundSize: { xs: 'cover', sm: 'contain' },
                  width: 1
                }}
              />
            </GraphicsCard>
          </Grid>
        </Grid>
        <Grid container spacing={2.5}>
          {cards.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 4 }}>
              <Stack direction={{ xs: 'row', sm: 'column', md: 'row' }} sx={{ gap: { xs: 2, md: 2.5 } }}>
                <Avatar
                  sx={{
                    bgcolor: 'grey.100',
                    width: { sm: 60 },
                    height: { sm: 60 },
                    borderRadius: 10,
                    '& svg': { width: { xs: 16, sm: 24 }, height: { xs: 16, sm: 24 } }
                  }}
                >
                  <SvgIcon {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} />
                </Avatar>
                <Stack sx={{ gap: 1 }}>
                  <Typography variant="h4">{item.title}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Feature14.propTypes = {
  heading: PropTypes.string,
  image1: PropTypes.any,
  image2: PropTypes.any,
  cards: PropTypes.array,
  actionBtn: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string,
  title2: PropTypes.string,
  description2: PropTypes.string
};
