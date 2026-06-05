'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

import { IconType } from '@/enum';

function PlanIcon({ icon, isActive }) {
  return (
    <Avatar sx={{ width: 48, height: 48, borderRadius: 4, bgcolor: isActive ? 'primary.main' : 'grey.300' }}>
      <SvgIcon name={icon} color={isActive ? 'background.default' : 'primary.main'} />
    </Avatar>
  );
}

/***************************  PRICING - 10  ***************************/

export default function Pricing10({ heading, caption, plans }) {
  const [unit, setUnit] = useState('month');

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Stack direction="row" sx={{ justifyContent: 'center' }}>
            <ButtonGroup
              disableElevation
              disableFocusRipple
              variant="outlined"
              rel="noopener noreferrer"
              aria-label="Button group"
              sx={{ gap: 1, p: 0.5, border: '1px solid', borderColor: 'primary.main', borderRadius: 25, width: { xs: 1, sm: 485 } }}
            >
              <Button
                fullWidth
                variant={unit === 'month' ? 'contained' : 'text'}
                sx={{ '&.MuiButtonGroup-firstButton': { borderRadius: 25 } }}
                onClick={() => setUnit('month')}
              >
                Monthly
              </Button>
              <Button
                fullWidth
                variant={unit === 'year' ? 'contained' : 'text'}
                sx={{ '&.MuiButtonGroup-lastButton': { borderRadius: 25 } }}
                onClick={() => setUnit('year')}
              >
                Yearly
              </Button>
            </ButtonGroup>
          </Stack>
        </motion.div>

        <Grid container spacing={1.5}>
          {plans.map((plan, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <GraphicsCard sx={{ height: 1, bgcolor: plan.active ? 'grey.300' : 'grey.100' }}>
                  <Stack sx={{ p: 4, height: 1, gap: 9, justifyContent: 'space-between' }}>
                    <Stack sx={{ gap: 4 }}>
                      <Stack sx={{ gap: { xs: 1, md: 1.5 } }}>
                        <PlanIcon icon={plan.icon} isActive={plan.active} />
                        <Typeset
                          heading={plan.title}
                          caption={plan.description}
                          headingProps={{ variant: 'h4' }}
                          captionProps={{ variant: 'body1' }}
                        />
                      </Stack>
                      <Stack sx={{ gap: 3 }}>
                        {plan.price && (
                          <Stack direction="row" sx={{ alignItems: 'flex-end' }}>
                            <Typography component="div" variant="h1">
                              {`$${unit === 'year' ? plan.price.year : plan.price.month}`}
                            </Typography>
                            <Typography component="div" variant="h6" sx={{ color: 'text.secondary', mb: { xs: 0.25, md: 0.625 } }}>
                              {`/per ${unit}`}
                            </Typography>
                          </Stack>
                        )}
                        <Stack sx={{ gap: 1 }}>
                          {plan.features.map((item, index) => (
                            <ListItem key={index} disablePadding>
                              <ListItemAvatar sx={{ minWidth: 34, height: 24 }}>
                                <SvgIcon name="custom-check" type={IconType.CUSTOM} color="primary.main" />
                              </ListItemAvatar>
                              <ListItemText primary={item.label} />
                            </ListItem>
                          ))}
                        </Stack>
                      </Stack>
                    </Stack>
                    <ButtonAnimationWrapper>
                      <Button fullWidth variant={plan.active ? 'contained' : 'outlined'} {...plan.exploreLink} size="large" />
                    </ButtonAnimationWrapper>
                  </Stack>
                </GraphicsCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

PlanIcon.propTypes = { icon: PropTypes.string, isActive: PropTypes.bool };

Pricing10.propTypes = { heading: PropTypes.any, caption: PropTypes.any, plans: PropTypes.any };
