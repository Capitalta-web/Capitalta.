'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
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

/***************************  PRICING - 5  ***************************/

/**
 *
 * Demos:
 * - [Pricing5](https://www.saasable.io/blocks/pricing/pricing5)
 *
 * API
 * - [Pricing5 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/pricing/pricing5#props-details)
 */

export default function Pricing5({ heading, caption, defaultUnit, plans, user }) {
  const theme = useTheme();
  const [unit, setUnit] = useState('yearly');

  const buttonSX = {
    py: 0.25,
    px: 1.5,
    border: '1px solid transparent',
    typography: 'caption',
    '&.MuiButton-outlined': { py: 0.25, px: 1.5 }
  };
  const containedButton = { bgcolor: 'grey.200', borderColor: 'grey.400' };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.4
          }}
        >
          <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
        </motion.div>
        <Grid container spacing={1.5} sx={{ height: 1 }}>
          {plans.map((plan, index) => (
            <Grid key={index} size={{ xs: 12, sm: 4 }}>
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: plan.animationDelay }}
                style={{ height: '100%' }}
              >
                <GraphicsCard
                  sx={{ height: 1, ...(plan.active && { border: '1px solid', borderColor: 'primary.main', bgcolor: 'grey.200' }) }}
                >
                  <Box sx={{ pt: { xs: 4, sm: 5, md: 8 }, px: { xs: 2, md: 5 }, pb: { xs: 2, sm: 3, md: 5.25 }, height: 1 }}>
                    <Stack sx={{ gap: { xs: 3, sm: 6, md: 8 }, height: 1 }}>
                      <Stack sx={{ gap: { xs: 2, md: 3 } }}>
                        <Stack sx={{ gap: { xs: 1, sm: 1.5 }, textAlign: 'center' }}>
                          <Typography variant="subtitle1" component="div">
                            {plan.title}
                          </Typography>
                          <Typography component="div" variant="h3">
                            {plan.price && typeof plan.price === 'object'
                              ? ` $${unit === 'yearly' ? plan.price.yearly : plan.price.monthly} ${defaultUnit} `
                              : typeof plan.price === 'number'
                                ? `$${plan.price} ${defaultUnit}`
                                : plan.description}
                          </Typography>
                        </Stack>
                        {plan.captionContent && (
                          <Stack direction="row" sx={{ gap: 1.25, alignItems: 'center', justifyContent: 'center' }}>
                            {plan.captionContent.icon && (
                              <SvgIcon
                                {...(typeof plan.captionContent.icon === 'string'
                                  ? { name: plan.captionContent.icon }
                                  : { ...plan.captionContent.icon })}
                                size={16}
                                color="text.secondary"
                                stroke={2}
                              />
                            )}
                            <Typography sx={{ color: 'text.secondary' }}>{plan.captionContent.primary}</Typography>
                          </Stack>
                        )}
                      </Stack>
                      <Stack sx={{ height: 1, justifyContent: 'space-between', gap: { xs: 3, sm: 7.25, md: 8 } }}>
                        <Stack sx={{ gap: 5 }}>
                          <Divider>
                            {plan.plan ? (
                              <Chip
                                label={plan.plan}
                                size="small"
                                slotProps={{ label: { sx: { py: 0.5, px: 1.5, typography: 'caption', color: 'text.secondary' } } }}
                                sx={{ bgcolor: 'grey.200' }}
                              />
                            ) : (
                              <Box
                                rel="noopener noreferrer"
                                aria-label="price-btn"
                                sx={{ display: 'flex', gap: 0.5, p: 0.5, bgcolor: 'grey.200', borderRadius: 25 }}
                              >
                                <Button
                                  fullWidth
                                  size="small"
                                  variant={unit === 'monthly' ? 'outlined' : 'text'}
                                  sx={{
                                    ...buttonSX,
                                    ...(unit === 'monthly' && { ...containedButton }),
                                    color: 'text.primary',
                                    '&.MuiButtonGroup-firstButton': {
                                      borderRadius: 25,
                                      ...(unit === 'monthly' && { borderRightColor: 'grey.400' })
                                    }
                                  }}
                                  onClick={() => setUnit('monthly')}
                                >
                                  Monthly
                                </Button>
                                <Button
                                  fullWidth
                                  size="small"
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
                            )}
                          </Divider>
                          <Stack sx={{ gap: { xs: 0.75, md: 1 } }}>
                            {plan.features.map((item, index) => (
                              <Stack key={index} direction="row" sx={{ gap: 1.25, alignItems: 'center' }}>
                                <Avatar sx={{ bgcolor: 'grey.100', width: 16, height: 16 }}>
                                  <SvgIcon
                                    name="tabler-check"
                                    type={IconType.STROKE}
                                    size={16}
                                    twoToneColor={theme.vars.palette.grey[100]}
                                    color="text.secondary"
                                  />
                                </Avatar>
                                <Typography sx={{ color: 'text.secondary' }}>{item.label}</Typography>
                              </Stack>
                            ))}
                          </Stack>
                        </Stack>
                        <Stack sx={{ gap: 0.75 }}>
                          <ButtonAnimationWrapper>
                            <Button
                              variant={plan.active ? 'contained' : 'outlined'}
                              sx={{ ...(!plan.link && { mb: { sm: 3.25, md: 3.75 } }) }}
                              fullWidth
                              {...plan.exploreLink}
                            />
                          </ButtonAnimationWrapper>
                          {plan.link && (
                            <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                              or{' '}
                              <Link
                                role="button"
                                component={NextLink}
                                variant="subtitle1"
                                color="primary.main"
                                {...plan.link}
                                underline="hover"
                              />
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                </GraphicsCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Pricing5.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  defaultUnit: PropTypes.string,
  plans: PropTypes.array,
  user: PropTypes.string
};
