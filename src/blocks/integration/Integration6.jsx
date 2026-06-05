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
import LogoSection from '@/components/logo';
import SvgIcon from '@/components/SvgIcon';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import { Circle } from '@/icons';

function IconBox({ size, sx, icon }) {
  const theme = useTheme();
  const shadowColor = theme.vars.palette.background.default;

  return (
    <Avatar
      variant="rounded"
      sx={{
        bgcolor: 'grey.300',
        position: 'relative',
        zIndex: 1,
        borderRadius: { xs: 9.25, sm: 16.75 },
        boxShadow: {
          xs: `0px 0px 0.4px 0px ${shadowColor}`,
          sm: `0px 0px 0.71px 0px ${shadowColor}`,
          md: `0px 0px 1px 0px ${shadowColor}`
        },
        ...sx
      }}
    >
      <SvgIcon {...(typeof icon === 'string' ? { name: icon } : { ...icon })} size={size} color="text.primary" />
    </Avatar>
  );
}

/***************************  INTEGRATION - 6  ***************************/

/**
 *
 * Demos:
 * - [Integration6](https://www.Capitalta.io/blocks/integration/integration6)
 *
 * API:
 * - [Integration6 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/integration/integration6#props-details)
 */

export default function Integration6({ headLine, captionLine, primaryBtn }) {
  const commonPosition = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <GraphicsCard sx={{ height: 1, py: { xs: 3, sm: 4, md: 5 }, px: 2, position: 'relative' }}>
        <Box
          sx={{
            width: { xs: 270, sm: 515, md: 740 },
            height: { xs: 270, sm: 515, md: 740 },
            '& svg': { width: { xs: 270, sm: 515, md: 740 }, height: { xs: 270, sm: 515, md: 740 } },
            ...commonPosition
          }}
        >
          <Circle color="grey.600" />
        </Box>
        <Box
          sx={{
            width: { xs: 220, sm: 415, md: 600 },
            height: { xs: 220, sm: 415, md: 600 },
            '& svg': { width: { xs: 220, sm: 415, md: 600 }, height: { xs: 220, sm: 415, md: 600 } },
            ...commonPosition
          }}
        >
          <Circle color="grey.600" />
        </Box>
        <Box
          sx={{
            width: { xs: 165, sm: 310, md: 450 },
            height: { xs: 165, sm: 310, md: 450 },
            '& svg': { width: { xs: 165, sm: 310, md: 450 }, height: { xs: 165, sm: 310, md: 450 } },
            ...commonPosition
          }}
        >
          <Circle color="grey.600" />
        </Box>
        <Box
          sx={{
            width: { xs: 105, sm: 195, md: 290 },
            height: { xs: 105, sm: 195, md: 290 },
            '& svg': { width: { xs: 105, sm: 195, md: 290 }, height: { xs: 105, sm: 195, md: 290 } },
            ...commonPosition
          }}
        >
          <Circle color="grey.600" />
        </Box>
        <Grid container spacing={2} sx={{ textAlign: 'center', justifyContent: 'center' }}>
          <Grid size={{ xs: 11, sm: 8, md: 7 }}>{headLine && <Typography variant="h2">{headLine}</Typography>}</Grid>
          <Grid size={12}>
            <Grid
              container
              spacing={{ xs: 1.5, sm: 2.65, md: 3.75 }}
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
                my: { xs: 2.4, sm: 5.18, md: 1.1 },
                pt: { xs: 1.5, sm: 2.65, md: 3.75 }
              }}
            >
              <Grid>
                <IconBox
                  icon="tabler-brand-asana"
                  sx={{
                    width: { xs: 13, sm: 25, md: 36 },
                    height: { xs: 13, sm: 25, md: 36 },
                    '& svg.tabler-brand-asana': { width: { xs: 8, sm: 14, md: 18 }, height: { xs: 8, sm: 14, md: 18 } }
                  }}
                />
              </Grid>
              <Grid>
                <IconBox
                  icon="tabler-brand-messenger"
                  sx={{
                    width: { xs: 15, sm: 30, md: 42 },
                    height: { xs: 15, sm: 30, md: 42 },
                    '& svg.tabler-brand-messenger': { width: { xs: 10, sm: 18, md: 26 }, height: { xs: 10, sm: 18, md: 26 } }
                  }}
                />
              </Grid>
              <Grid>
                <IconBox
                  icon="tabler-brand-skype"
                  sx={{
                    width: { xs: 17, sm: 32, md: 46 },
                    height: { xs: 17, sm: 32, md: 46 },
                    '& svg.tabler-brand-skype': { width: { xs: 12, sm: 21, md: 30 }, height: { xs: 12, sm: 21, md: 30 } }
                  }}
                />
              </Grid>
              <Grid>
                <IconBox
                  icon="tabler-brand-google-drive"
                  sx={{
                    width: { xs: 21, sm: 40, md: 56 },
                    height: { xs: 21, sm: 40, md: 56 },
                    '& svg.tabler-brand-google-drive': { width: { xs: 13, sm: 23, md: 32 }, height: { xs: 13, sm: 23, md: 32 } }
                  }}
                />
              </Grid>
              <Grid>
                <Avatar
                  sx={{
                    width: { xs: 56, sm: 110, md: 170 },
                    height: { xs: 56, sm: 110, md: 170 },
                    bgcolor: 'grey.100',
                    '& .icon-logo': { width: { xs: 20, sm: 36, md: 51 } }
                  }}
                >
                  <LogoSection isIcon={true} />
                </Avatar>
              </Grid>
              <Grid>
                <IconBox
                  icon="tabler-brand-backbone"
                  sx={{
                    width: { xs: 21, sm: 40, md: 56 },
                    height: { xs: 21, sm: 40, md: 56 },
                    '& svg.tabler-brand-backbone': { width: { xs: 13, sm: 23, md: 32 }, height: { xs: 13, sm: 23, md: 32 } }
                  }}
                />
              </Grid>
              <Grid>
                <IconBox
                  icon="tabler-brand-slack"
                  sx={{
                    width: { xs: 17, sm: 32, md: 46 },
                    height: { xs: 17, sm: 32, md: 46 },
                    '& svg.tabler-brand-slack': { width: { xs: 12, sm: 21, md: 30 }, height: { xs: 12, sm: 21, md: 30 } }
                  }}
                />
              </Grid>
              <Grid>
                <IconBox
                  icon="tabler-brand-mastercard"
                  sx={{
                    width: { xs: 15, sm: 30, md: 42 },
                    height: { xs: 15, sm: 30, md: 42 },
                    '& svg.tabler-brand-mastercard': { width: { xs: 10, sm: 18, md: 26 }, height: { xs: 10, sm: 18, md: 26 } }
                  }}
                />
              </Grid>
              <Grid>
                <IconBox
                  icon="tabler-brand-tripadvisor"
                  sx={{
                    width: { xs: 13, sm: 25, md: 36 },
                    height: { xs: 13, sm: 25, md: 36 },
                    '& svg.tabler-brand-tripadvisor': { width: { xs: 8, sm: 14, md: 18 }, height: { xs: 8, sm: 14, md: 18 } }
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 5.5, lg: 5 }}>
            <Stack sx={{ gap: 2, alignItems: 'center' }}>
              {captionLine && (
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  {captionLine}
                </Typography>
              )}
              {primaryBtn && <Button variant="outlined" size="large" sx={{ py: 2.375 }} {...primaryBtn} />}
            </Stack>
          </Grid>
        </Grid>
      </GraphicsCard>
    </ContainerWrapper>
  );
}

IconBox.propTypes = { size: PropTypes.number, sx: PropTypes.any, icon: PropTypes.any };

Integration6.propTypes = { headLine: PropTypes.string, captionLine: PropTypes.string, primaryBtn: PropTypes.any };
