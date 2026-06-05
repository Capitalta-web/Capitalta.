'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
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

/***************************  PRICING - BUTTON COMPONENT  ***************************/

function BottonComponent({ onClick, children }) {
  return (
    <Button
      variant="outlined"
      rel="noopener noreferrer"
      aria-label="count"
      sx={{
        borderRadius: 3,
        bgcolor: 'grey.200',
        '&:hover': { bgcolor: 'grey.200' },
        borderColor: 'grey.400',
        color: 'text.primary',
        width: 56,
        height: 40
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

/***************************  PRICING - CARD  ***************************/

function PricingCard({ title, description, active, price, quantityTitle, exploreLink, featureTitle, featuresID, count, features }) {
  const theme = useTheme();

  const [counts, setCounts] = useState(count || 1);

  // Handler to increment unit count
  const handleIncrement = () => setCounts(counts + 1);

  // Handler to decrement unit count with a minimum limit of 1
  const handleDecrement = () => setCounts(Math.max(counts - 1, 1));

  return (
    <GraphicsCard
      sx={{
        borderRadius: { xs: 4, sm: 6 },
        height: 1,
        position: 'relative',
        ...(active && { overflow: 'unset', border: '1px solid', borderColor: 'primary.main' })
      }}
    >
      {active && (
        <Chip
          label={active}
          size="small"
          slotProps={{ label: { sx: { px: 1.5, pb: 0, pt: 0.25, typography: 'caption' } } }}
          sx={{
            bgcolor: 'primary.lighter',
            border: '1px solid',
            borderColor: 'primary.main',
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%,-50%)'
          }}
        />
      )}
      <Stack sx={{ gap: { xs: 2, sm: 4 }, height: 1, py: { xs: 3, sm: 5 }, px: 3 }}>
        <Typeset
          {...{
            heading: title,
            caption: description,
            stackProps: { sx: { textAlign: 'center' } },
            headingProps: { variant: 'h3' },
            captionProps: { variant: 'body1' }
          }}
        />

        {price === 0 ? (
          <Typography variant="h2" sx={{ textAlign: 'center', color: 'primary.main' }}>
            Free
          </Typography>
        ) : (
          <Stack direction="row" sx={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <Typography component="div" variant="h3" sx={{ color: 'primary.main', mb: { xs: 0.25, sm: 0.5 } }}>
              $
            </Typography>
            <Typography variant="h2" sx={{ color: 'primary.main' }}>
              {price}
            </Typography>
          </Stack>
        )}

        <Stack sx={{ gap: 2, height: 1, justifyContent: 'space-between' }}>
          <Stack sx={{ gap: 1, alignItems: 'center', textAlign: 'center' }}>
            {quantityTitle}
            {price !== 0 && (
              <Stack
                direction="row"
                sx={{
                  p: 0.25,
                  bgcolor: 'background.default',
                  borderRadius: 3,
                  width: 1,
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <BottonComponent onClick={handleDecrement}>
                  <Box sx={{ maxHeight: 24 }}>
                    <SvgIcon name="tabler-minus" color="text.primary" />
                  </Box>
                </BottonComponent>
                <Typography component="div" variant="h5">
                  {counts}
                </Typography>
                <BottonComponent onClick={handleIncrement}>
                  <Box sx={{ maxHeight: 24 }}>
                    <SvgIcon name="tabler-plus" color="text.primary" />
                  </Box>
                </BottonComponent>
              </Stack>
            )}
          </Stack>
          <ButtonAnimationWrapper>
            <Button variant={active ? 'contained' : 'outlined'} fullWidth {...exploreLink} />
          </ButtonAnimationWrapper>
        </Stack>

        <Stack sx={{ gap: { xs: 1, sm: 2 } }}>
          <Typography sx={{ color: 'text.secondary' }}>{featureTitle}</Typography>
          <Stack sx={{ gap: { xs: 0.5, sm: 1 } }}>
            {features.map((item, index) => (
              <Stack key={index} direction="row" sx={{ gap: 1.25, alignItems: 'center', opacity: !featuresID.includes(item.id) ? 0.5 : 1 }}>
                <Avatar sx={{ bgcolor: 'grey.100', width: 24, height: 24 }}>
                  <SvgIcon
                    name="tabler-check"
                    type={IconType.STROKE}
                    size={16}
                    twoToneColor={theme.vars.palette.grey[100]}
                    color="primary.main"
                    stroke={2}
                  />
                </Avatar>
                <Typography sx={{ color: 'text.secondary' }}>{item.label}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </GraphicsCard>
  );
}

/***************************  PRICING - 8  ***************************/

/**
 *
 * Demos:
 * - [Pricing8](https://www.saasable.io/blocks/pricing/pricing8)
 *
 * API
 * - [Pricing8 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/pricing/pricing8#props-details)
 */

export default function Pricing8({ heading, caption, defaultUnit, features, plans }) {
  const [unit, setUnit] = useState(defaultUnit || 'monthly');

  const buttonSX = { border: '1px solid transparent' };
  const containedButton = { bgcolor: 'grey.200', border: '1px solid', borderColor: 'grey.400' };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4
          }}
        >
          <Stack direction={{ sm: 'row' }} sx={{ gap: 2, alignItems: { xs: 'center', sm: 'flex-end' }, justifyContent: 'space-between' }}>
            <Typeset
              {...{
                heading,
                caption,
                stackProps: { sx: { textAlign: { xs: 'center', sm: 'start' } } },
                captionProps: { sx: { maxWidth: '85%' } }
              }}
            />
            <Stack direction="row" aria-label="price-btn" sx={{ gap: 1, p: 0.5, bgcolor: 'grey.100', borderRadius: 25 }}>
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
            </Stack>
          </Stack>
        </motion.div>
        <Grid container spacing={{ xs: 2, md: 1.5 }} sx={{ height: 1 }}>
          {plans.map((plan, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: plan.animationDelay
                }}
                style={{ height: '100%' }}
              >
                <PricingCard {...plan} features={features} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

BottonComponent.propTypes = { onClick: PropTypes.any, children: PropTypes.any };

PricingCard.propTypes = {
  title: PropTypes.any,
  description: PropTypes.any,
  active: PropTypes.any,
  price: PropTypes.any,
  quantityTitle: PropTypes.any,
  exploreLink: PropTypes.any,
  featureTitle: PropTypes.any,
  featuresID: PropTypes.any,
  count: PropTypes.any,
  features: PropTypes.array
};

Pricing8.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  defaultUnit: PropTypes.string,
  features: PropTypes.array,
  plans: PropTypes.array
};
