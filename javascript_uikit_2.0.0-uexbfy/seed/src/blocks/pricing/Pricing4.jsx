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

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PRICING - 4  ***************************/

/**
 *
 * Demos:
 * - [Pricing4](https://www.saasable.io/blocks/pricing/pricing4)
 *
 * API
 * - [Pricing4 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/pricing/pricing4#props-details)
 */

export default function Pricing4({ heading, caption, defaultUnit, plans }) {
  const [unit, setUnit] = useState('yearly');

  const plan1 = plans[0];
  const plan2 = plans[1];
  const buttonSX = { border: '1px solid transparent' };
  const containedButton = { bgcolor: 'grey.200', border: '1px solid', borderColor: 'grey.400' };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.5
          }}
        >
          <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.5
          }}
        >
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
        </motion.div>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 7 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.6
              }}
              style={{ height: '100%' }}
            >
              <GraphicsCard sx={{ height: 1 }}>
                <Stack sx={{ p: { xs: 2, sm: 3, md: 5 }, height: 1, justifyContent: 'space-between', gap: { xs: 3, md: 4 } }}>
                  <Box>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: { xs: 4, md: 5 } }}
                    >
                      <Stack sx={{ gap: { xs: 1, md: 1.5 } }}>
                        <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
                          <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', borderRadius: 4, width: 48, height: 48 }}>
                            <SvgIcon name="tabler-chart-histogram" size={16} stroke={2.15} />
                          </Avatar>
                          <Typography variant="h4">{plan1.title}</Typography>
                        </Stack>
                        <Typography sx={{ color: 'text.secondary' }}>{plan1.description}</Typography>
                      </Stack>
                      {plan1.price && (
                        <Stack direction="row" sx={{ alignItems: 'flex-end', '& > *:last-child': { mb: 0.75 } }}>
                          <Typography variant="h1">${unit === 'yearly' ? plan1.price.yearly : plan1.price.monthly}</Typography>
                          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                            {defaultUnit}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                    <Divider sx={{ my: { xs: 2, md: 3 } }} />
                    <Grid container rowSpacing={1} columnSpacing={4}>
                      {plan1.features.map((item, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6 }}>
                          <Stack direction="row" sx={{ gap: 1 }}>
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
                  <ButtonAnimationWrapper style={{ width: '100%' }}>
                    <Button fullWidth variant={plan1.active ? 'contained' : 'outlined'} sx={{ px: 1.25 }} {...plan1.exploreLink} />
                  </ButtonAnimationWrapper>
                </Stack>
              </GraphicsCard>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.7
              }}
              style={{ height: '100%' }}
            >
              <GraphicsCard sx={{ height: 1 }}>
                <Stack sx={{ p: { xs: 2, sm: 3, md: 5 }, height: 1, justifyContent: 'space-between', gap: { xs: 3, md: 4 } }}>
                  <Box>
                    <Stack sx={{ gap: { xs: 1, md: 1.5 } }}>
                      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
                        <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', borderRadius: 4, width: 48, height: 48 }}>
                          <SvgIcon name="tabler-chart-histogram" size={16} stroke={2.15} />
                        </Avatar>
                        <Typography variant="h4">{plan2.title}</Typography>
                      </Stack>
                      <Typography sx={{ color: 'text.secondary' }}>{plan2.description}</Typography>
                    </Stack>
                    <Divider sx={{ my: { xs: 2, md: 3 } }} />
                    <Grid container rowSpacing={1} columnSpacing={4}>
                      {plan2.features.map((item, index) => (
                        <Grid key={index} size={12}>
                          <Stack direction="row" sx={{ gap: 1 }}>
                            <SvgIcon name="custom-check" type={IconType.CUSTOM} color="primary.main" />
                            <Typography>{item.label}</Typography>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <ButtonAnimationWrapper>
                    <Button fullWidth variant={plan2.active ? 'contained' : 'outlined'} sx={{ px: 1.25 }} {...plan2.exploreLink} />
                  </ButtonAnimationWrapper>
                </Stack>
              </GraphicsCard>
            </motion.div>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Pricing4.propTypes = { heading: PropTypes.string, caption: PropTypes.string, defaultUnit: PropTypes.string, plans: PropTypes.array };
