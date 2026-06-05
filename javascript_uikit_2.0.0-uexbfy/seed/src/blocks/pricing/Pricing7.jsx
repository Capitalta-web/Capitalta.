'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PRICING - 7  ***************************/

/**
 *
 * Demos:
 * - [Pricing7](https://www.saasable.io/blocks/pricing/pricing7)
 *
 * API
 * - [Pricing7 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/pricing/pricing7#props-details)
 */

export default function Pricing7({ heading, caption, defaultUnit, plans, benefitList }) {
  const [unit, setUnit] = useState('yearly');

  const buttonSX = { border: '1px solid transparent' };
  const containedButton = { bgcolor: 'grey.200', border: '1px solid', borderColor: 'grey.400' };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: 4 }}>
        {heading && <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />}
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <Box
            rel="noopener noreferrer"
            aria-label="price-btn"
            sx={{ display: 'flex', gap: 1, p: 0.5, bgcolor: 'grey.100', borderRadius: 25 }}
          >
            <Button
              fullWidth
              variant={unit === 'monthly' ? 'outlined' : 'text'}
              sx={{
                ...buttonSX,
                ...(unit === 'monthly' && { ...containedButton }),
                color: 'text.primary',
                '&.MuiButtonGroup-firstButton': { borderRadius: 25, borderRightColor: 'grey.400' }
              }}
              onClick={() => setUnit('monthly')}
            >
              Monthly
            </Button>
            <Button
              fullWidth
              variant={unit === 'yearly' ? 'outlined' : 'text'}
              sx={{
                ...buttonSX,
                ...(unit === 'yearly' && { ...containedButton }),
                color: 'text.primary',
                '&.MuiButtonGroup-lastButton': { borderRadius: 25 }
              }}
              onClick={() => setUnit('yearly')}
            >
              Yearly
            </Button>
          </Box>
        </Stack>
        <Grid container spacing={{ xs: 1.5, md: 3 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <GraphicsCard sx={{ height: 1 }}>
              <Stack sx={{ justifyContent: 'space-between', gap: { xs: 3, md: 4 }, p: { xs: 2, sm: 3, md: 5 }, height: 1 }}>
                <Box>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: { xs: 4, md: 5 } }}
                  >
                    <Stack sx={{ gap: { xs: 1, md: 1.5 } }}>
                      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
                        <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', borderRadius: 4, width: 48, height: 48 }}>
                          <SvgIcon name="tabler-chart-histogram" size={16} stroke={2} />
                        </Avatar>
                        <Typography variant="h4">{plans.title}</Typography>
                      </Stack>
                      <Typography sx={{ color: 'text.secondary' }}>{plans.description}</Typography>
                    </Stack>
                    {plans.price && (
                      <Stack direction="row" sx={{ alignItems: 'flex-end', '& > *:last-child': { mb: 0.75 } }}>
                        <Typography variant="h1" component="div">
                          ${unit === 'yearly' ? plans.price.yearly : plans.price.monthly}
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                          {defaultUnit}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                  <Divider sx={{ my: { xs: 2, md: 3 } }} />
                  <Grid container rowSpacing={1} columnSpacing={4}>
                    {plans.features.map((item, index) => (
                      <Grid key={index} size={{ xs: 12, sm: 6 }}>
                        <Stack direction="row" sx={{ gap: 1.5 }}>
                          <Box sx={{ minWidth: 24 }}>
                            <SvgIcon name="custom-check" type={IconType.CUSTOM} color="primary.main" />
                          </Box>
                          <Stack direction="row" sx={{ gap: { xs: 0.5, md: 1 }, flexWrap: 'wrap' }}>
                            <Typography>{item.label}</Typography>
                            {item.badge && (
                              <Chip
                                label={item.badge}
                                size="small"
                                slotProps={{
                                  label: { sx: { py: 0.25, px: 1, typography: 'caption', fontWeight: 400, color: 'secondary.main' } }
                                }}
                                sx={{ bgcolor: 'grey.300' }}
                              />
                            )}
                          </Stack>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Button variant={plans.active ? 'contained' : 'outlined'} sx={{ px: 1.25 }} {...plans.exploreLink} />
              </Stack>
            </GraphicsCard>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack sx={{ gap: { md: 2 } }}>
              {benefitList.map((item, index) => (
                <Stack key={index} direction="row" sx={{ py: { xs: 1.5, sm: 2, md: 3 }, gap: { xs: 1.5, sm: 2 } }}>
                  {item.icon && (
                    <Avatar variant="rounded" sx={{ borderRadius: 4, width: 60, height: 60, bgcolor: 'grey.100' }}>
                      <SvgIcon {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} />
                    </Avatar>
                  )}
                  <Typeset
                    {...{
                      heading: item.title,
                      caption: item.description,
                      headingProps: { variant: 'h3', component: 'div' },
                      captionProps: { variant: 'body1' },
                      stackProps: { sx: { gap: 1 } }
                    }}
                  />
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Pricing7.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  defaultUnit: PropTypes.string,
  plans: PropTypes.any,
  benefitList: PropTypes.array
};
