'use client';
import PropTypes from 'prop-types';

// @mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard, IconCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  Image Card  ***************************/

function GetImageCard({ image }) {
  return (
    <GraphicsCard sx={{ height: 1 }}>
      <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, minHeight: { xs: 343, sm: 420, md: 530 }, height: 1 }}>
        <GraphicsImage
          sx={{
            height: '100%',
            backgroundSize: 'contain',
            backgroundPositionX: 'center',
            backgroundPositionY: 'center',
            borderTopLeftRadius: { xs: 12 },
            borderBottomLeftRadius: { xs: 12 }
          }}
          image={image}
        />
      </Box>
    </GraphicsCard>
  );
}

/***************************  FEATURE - 17  ***************************/

/**
 *
 * Demos:
 * - [Feature17](https://www.Capitalta.io/blocks/feature/feature17)
 *
 * API
 * - [Feature17 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/feature/feature17#props-details)
 */

export default function Feature17({ heading, caption, features, image, actionBtn }) {
  const iconProps = { size: 24 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 }, justifyContent: 'space-between', height: 1 }}>
            <Stack sx={{ gap: { xs: 3, sm: 4 }, alignItems: 'flex-start' }}>
              <Typeset {...{ heading, caption }} />
              {actionBtn && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SvgIcon name="tabler-sparkles" size={16} stroke={3} color="background.default" />}
                  {...actionBtn}
                />
              )}
            </Stack>
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                <Grid container spacing={1.5}>
                  {features.map((item, index) => (
                    <Grid key={index} size={{ xs: 12, md: 6 }}>
                      <IconCard
                        icon={{ ...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon }), ...iconProps }}
                        title={item.title}
                        content={item.content}
                        iconAvatar
                        cardPadding={{ xs: 1.5, sm: 2, md: 3 }}
                        stackProps={{ sx: { gap: { xs: 2.5, sm: 2, md: 1 } } }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }} sx={{ order: { xs: -1, sm: 0 }, display: { xs: 'block', md: 'none' } }}>
                <GetImageCard image={image} />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid sx={{ display: { xs: 'none', md: 'block' } }} size={{ md: 6 }}>
          <GetImageCard image={image} />
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

GetImageCard.propTypes = { image: PropTypes.any };

Feature17.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  features: PropTypes.array,
  image: PropTypes.any,
  actionBtn: PropTypes.any
};
