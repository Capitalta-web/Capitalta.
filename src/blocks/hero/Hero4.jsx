import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import { NextLink } from '@/components/routes';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  HERO 4 - DATA  ***************************/

const pattern = { light: '/assets/images/shared/pattern1-light.svg', dark: '/assets/images/shared/pattern1-dark.svg' };

/***************************  HERO - 4  ***************************/

/**
 *
 * Demos:
 * - [Hero4](https://www.Capitalta.io/blocks/hero/hero4)
 *
 * API:
 * - [Hero4 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/hero/hero4#props-details)
 */

export default function Hero4({ chip, headLine, captionLine, image1, image2, listData }) {
  const block1ImagePadding = { xs: 2, sm: 4, md: 6 };
  const iconBoxSize = { xs: 48, md: 72 };

  return (
    <Stack sx={{ gap: { xs: 4, md: 5 }, py: SECTION_COMMON_PY }}>
      <ContainerWrapper>
        <Stack sx={{ alignItems: 'center', gap: { xs: 1.5, md: 3 } }}>
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
              sx={{ bgcolor: 'grey.100' }}
            />
          )}

          <Typeset
            {...{
              heading: headLine,
              caption: captionLine,
              headingProps: { variant: 'h1', sx: { maxWidth: 800 } },
              captionProps: { sx: { maxWidth: 500 } },
              stackProps: { sx: { alignItems: 'center', textAlign: 'center', gap: { xs: 2, md: 3 } } }
            }}
          />
        </Stack>
      </ContainerWrapper>
      <Grid container spacing={1.5} sx={{ px: 1.5 }}>
        <Grid size={{ xs: 12, sm: 5 }}>
          <GraphicsCard sx={{ height: { xs: 264, sm: 1 } }} bgImage={pattern}>
            <GraphicsImage sx={{ height: 1, backgroundSize: 'contain' }} image={image1} />
          </GraphicsCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 7 }}>
          <GraphicsCard>
            <Box sx={{ mb: { xs: -3, sm: -4 }, pl: block1ImagePadding, pt: block1ImagePadding, height: { xs: 197, sm: 335, md: 460 } }}>
              <GraphicsImage
                sx={{
                  height: '100%',
                  backgroundPositionX: 'left',
                  backgroundPositionY: 'top',
                  borderTopLeftRadius: { xs: 12 }
                }}
                image={image2}
              />
            </Box>
            <GraphicsCard sx={{ bgcolor: 'grey.300', p: { xs: 2, md: 5 } }}>
              <Grid container spacing={{ xs: 1.5, md: 4 }}>
                {listData.map((item, index) => (
                  <Grid key={index} size={6}>
                    <Stack direction="row" sx={{ gap: { xs: 1, sm: 2 } }}>
                      <Avatar
                        sx={{
                          width: iconBoxSize,
                          height: iconBoxSize,
                          bgcolor: 'grey.200',
                          borderRadius: 4,
                          '& svg': { width: { xs: 24, md: 40 }, height: { xs: 24, md: 40 }, strokeWidth: { md: 1.5 } }
                        }}
                      >
                        <SvgIcon
                          color="text.primary"
                          type={IconType.CUSTOM}
                          {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })}
                        />
                      </Avatar>
                      <Typeset
                        {...{
                          heading: item.title,
                          caption: item.description,
                          stackProps: { sx: { gap: 0.625 } },
                          headingProps: { variant: 'h3' },
                          captionProps: { variant: 'body1' }
                        }}
                      />
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </GraphicsCard>
          </GraphicsCard>
        </Grid>
      </Grid>
    </Stack>
  );
}

Hero4.propTypes = {
  chip: PropTypes.object,
  headLine: PropTypes.string,
  captionLine: PropTypes.string,
  image1: PropTypes.any,
  image2: PropTypes.any,
  listData: PropTypes.array
};
