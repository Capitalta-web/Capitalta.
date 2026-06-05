'use client';
import PropTypes from 'prop-types';

// @mui
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';
import GetImagePath from '@/utils/GetImagePath';

/***************************  TESTIMONIAL - 11  ***************************/

/**
 *
 * Demos:
 * - [Testimonial11](https://www.Capitalta.io/blocks/testimonial/testimonial11)
 *
 * API:
 * - [Testimonial11 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/testimonial/testimonial11#props-details)
 */

export default function Testimonial11({ heading, testimonials }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset {...{ heading, headingProps: { sx: { textAlign: 'center' } } }} />
        <Grid container spacing={1.5}>
          {testimonials.map((testimonial, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6 }}>
              <GraphicsCard sx={{ borderRadius: { xs: 4, sm: 6 }, height: 1 }}>
                <Stack sx={{ justifyContent: 'space-between', gap: 3, p: { xs: 2, sm: 2.5, md: 3 }, height: 1 }}>
                  <Typography sx={{ color: 'text.secondary' }}>{testimonial.review}</Typography>
                  <Stack direction="row" sx={{ gap: 1 }}>
                    <Avatar
                      src={GetImagePath(testimonial.profile.avatar)}
                      sx={{ width: 48, height: 48 }}
                      alt="Avatar"
                      slotProps={{ img: { loading: 'lazy' } }}
                    />
                    <Stack sx={{ gap: 0.5, justifyContent: 'center' }}>
                      <Typography variant="subtitle1">{testimonial.profile.name}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {testimonial.profile.role}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </GraphicsCard>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Testimonial11.propTypes = { heading: PropTypes.any, testimonials: PropTypes.any };
