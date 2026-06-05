'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';

import { ThemeDirection } from '@/config';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  INTEGRATION - TAG  ***************************/

function IntegrationTag({ label, icon }) {
  const iconSize = { xs: 32, md: 40 };

  return (
    <Chip
      label={label}
      {...(icon && { icon: <SvgIcon color="text.primary" {...(typeof icon === 'string' ? { name: icon } : { ...icon })} stroke={1} /> })}
      slotProps={{ label: { sx: { p: 0, paddingInlineStart: 1.25, typography: 'h5' } } }}
      sx={{
        px: { xs: 2.25, md: 3 },
        py: { xs: 1.25, md: 1.75 },
        mx: 0.5,
        bgcolor: 'background.default',
        '& svg': { width: iconSize, height: iconSize }
      }}
    />
  );
}

/***************************  INTEGRATION - 1  ***************************/

/**
 *
 * Demos:
 * - [Integration1](https://www.saasable.io/blocks/integration/integration1)
 *
 * API:
 * - [Integration1 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/integration/integration1#props-details)
 */

export default function Integration1({ headLine, captionLine, primaryBtn, marquees }) {
  const theme = useTheme();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: 0.6
        }}
      >
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <GraphicsCard sx={{ height: 1 }}>
              <Stack sx={{ alignItems: 'flex-start', justifyContent: 'center', p: { xs: 3, sm: 4, md: 5 }, height: 1 }}>
                <Stack sx={{ gap: { xs: 1, sm: 1.5 } }}>
                  {headLine && <Typography variant="h2">{headLine}</Typography>}
                  {captionLine && (
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                      {captionLine}
                    </Typography>
                  )}
                </Stack>
                {primaryBtn && (
                  <ButtonAnimationWrapper>
                    <Button variant="contained" size="large" {...primaryBtn} sx={{ mt: { xs: 4, sm: 6 }, ...primaryBtn.sx }} />
                  </ButtonAnimationWrapper>
                )}
              </Stack>
            </GraphicsCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <GraphicsCard>
              <Box sx={{ py: { xs: 4, sm: 7, md: 12.5 } }}>
                <Stack sx={{ gap: 1 }}>
                  {marquees.map((marquee, index) => (
                    <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                      <Marquee
                        pauseOnHover
                        {...(theme.direction === ThemeDirection.RTL && { direction: 'right' })}
                        {...marquee.marqueeProps}
                      >
                        {marquee.data.map((integration, index) => (
                          <IntegrationTag key={index} {...integration} />
                        ))}
                      </Marquee>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </GraphicsCard>
          </Grid>
        </Grid>
      </motion.div>
    </ContainerWrapper>
  );
}

IntegrationTag.propTypes = { label: PropTypes.any, icon: PropTypes.any };

Integration1.propTypes = {
  headLine: PropTypes.string,
  captionLine: PropTypes.string,
  primaryBtn: PropTypes.any,
  marquees: PropTypes.array
};
