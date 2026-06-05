'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import { ThemeDirection } from '@/config';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import Pattern11 from '@/images/graphics/Pattern11';

/***************************  HERO - 19  ***************************/

/**
 *
 * Demos:
 * - [Hero19](https://www.Capitalta.io/blocks/hero/hero19)
 *
 * API:
 * - [Hero19 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/hero/hero19#props-details)
 */

export default function Hero19({ image, tagline, headLine, description, list, primaryBtn, secondaryBtn }) {
  const theme = useTheme();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY, overflow: 'hidden' }}>
      <Grid
        container
        spacing={{ xs: 3, md: 7 }}
        sx={{ alignItems: 'center', justifyContent: 'center', px: { xs: 2, sm: 0 }, mb: { xs: 0, md: 6 } }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 5 }} sx={{ position: 'relative' }}>
          <GraphicsCard>
            <Box sx={{ height: { xs: 297, sm: 328, md: 536 } }}>
              <GraphicsImage
                sx={{
                  height: 1,
                  backgroundSize: 'contain'
                }}
                image={image}
              />
            </Box>
          </GraphicsCard>
          <Box
            component="span"
            sx={{
              position: 'absolute',
              zIndex: -1,
              bottom: { xs: -40, sm: -85, md: -90 },
              left: { xs: -180, sm: -95, md: -150 },
              '& svg': { width: 1, height: 1 },
              ...(theme.direction === ThemeDirection.RTL && { transform: 'scaleX(-1)' })
            }}
          >
            <Pattern11 />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: { xs: 1.5, md: 3 } }}>
            <Stack sx={{ gap: { xs: 1.25, md: 1.5 } }}>
              {tagline && (
                <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
                  {tagline}
                </Typography>
              )}
              <Typography variant="h1">{headLine}</Typography>
              {description && <Typography variant="h6">{description}</Typography>}
            </Stack>
            <List disablePadding>
              {list &&
                list.map((item, index) => (
                  <ListItem
                    disablePadding
                    key={index}
                    sx={{ py: { xs: 0.25, sm: 0.5 }, '&:first-of-type': { pt: 0 }, '&:last-of-type': { pb: 0 } }}
                  >
                    <ListItemAvatar sx={{ minWidth: 24, height: 24, mr: 1 }}>
                      <SvgIcon name="tabler-rosette-discount-check" stroke={1} color="text.secondary" />
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {item.primary}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))}
            </List>
            <Stack direction="row" sx={{ gap: 1.5 }}>
              {primaryBtn && (
                <ButtonAnimationWrapper>
                  <Button color="primary" size="large" variant="contained" {...primaryBtn} />
                </ButtonAnimationWrapper>
              )}
              {secondaryBtn && (
                <ButtonAnimationWrapper>
                  <Button color="primary" size="large" variant="outlined" {...secondaryBtn} />
                </ButtonAnimationWrapper>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

Hero19.propTypes = {
  image: PropTypes.any,
  tagline: PropTypes.string,
  headLine: PropTypes.string,
  description: PropTypes.string,
  list: PropTypes.array,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any
};
