'use client';
import PropTypes from 'prop-types';

// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import Rating from '@/components/Rating';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';
import GetImagePath from '@/utils/GetImagePath';

/***************************  CALL TO ACTION - 14  ***************************/

/**
 *
 * Demos:
 * - [CTA14](https://www.Capitalta.io/blocks/cta/cta14)
 *
 * API:
 * - [CTA14 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/cta/cta14#props-details)
 */

export default function Cta14({ image, avatar, name, ratings, heading, caption, price, primaryBtn }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <GraphicsCard sx={{ height: { xs: 296, sm: 462, md: 512 } }}>
            <GraphicsImage sx={{ height: 1 }} image={image} />
          </GraphicsCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: { xs: 2.25, sm: 3 } }}>
            <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
              <Avatar src={GetImagePath(avatar)} alt="Avatar" />
              <Typography variant="subtitle1">{name}</Typography>
            </Stack>
            <Rating {...{ rate: ratings }} />
            <Typeset {...{ heading, caption }} headingProps={{ variant: 'h3' }} />
            <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 }, alignItems: 'flex-start' }}>
              <Typography variant="h3">${price}</Typography>
              {primaryBtn && (
                <ButtonAnimationWrapper>
                  <Button variant="contained" size="large" {...primaryBtn} />
                </ButtonAnimationWrapper>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

Cta14.propTypes = {
  image: PropTypes.any,
  avatar: PropTypes.string,
  name: PropTypes.string,
  ratings: PropTypes.number,
  heading: PropTypes.string,
  caption: PropTypes.string,
  price: PropTypes.number,
  primaryBtn: PropTypes.any
};
