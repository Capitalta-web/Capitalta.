'use client';
import PropTypes from 'prop-types';

// @mui
import Grid from '@mui/material/Grid';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GradientFab from '@/components/GradientFab';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  METRICS - 8  ***************************/

/**
 *
 * Demos:
 * - [Metrics8](https://www.saasable.io/blocks/metrics/Metrics8)
 *
 * API:
 * - [Metrics8 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/metrics/Metrics8#props-details)
 */

export default function Metrics8({ heading, caption, blockDetail }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 4, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.5
            }}
            style={{ height: '100%' }}
          >
            <GraphicsCard sx={{ height: 1 }}>
              <Stack
                sx={{
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 3,
                  height: 1,
                  p: { xs: 2, md: 5 },
                  '& .gradient-fab': { display: 'contents' },
                  '& svg.tabler-cloud-up': { width: { xs: 26, sm: 36 }, height: { xs: 26, sm: 36 } }
                }}
              >
                <GradientFab type="star" icon={<SvgIcon name="tabler-cloud-up" />} />
                <Typeset {...{ heading, caption }} />
              </Stack>
            </GraphicsCard>
          </motion.div>
        </Grid>
        <Grid size={{ xs: 12, sm: 8, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.6
            }}
            style={{ height: '100%' }}
          >
            <GraphicsCard sx={{ height: 1 }}>
              <Stack sx={{ p: { xs: 2, md: 5 } }}>
                {blockDetail.map((item, index) => (
                  <Stack key={index} direction="row" sx={{ alignItems: 'center', py: { xs: 1.5, sm: 2.5 }, gap: { xs: 1, md: 1.5 } }}>
                    <Stack sx={{ width: 1, gap: 1 }}>
                      <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                        {item.caption}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={item.progress}
                        rel="noopener noreferrer"
                        aria-label="progress"
                        sx={{
                          height: 6,
                          borderRadius: 5,
                          [`&.${linearProgressClasses.colorPrimary}`]: {
                            bgcolor: 'grey.400'
                          },
                          [`& .${linearProgressClasses.bar}`]: {
                            borderRadius: 6,
                            bgcolor: 'primary.main'
                          }
                        }}
                      />
                    </Stack>
                    <Stack direction="row" sx={{ alignItems: 'flex-end' }}>
                      <Typography component="div" variant="h2">
                        {item.counter}
                      </Typography>
                      <Typography component="div" variant="h3" sx={{ color: 'text.secondary', mb: { xs: 0.25, md: 0.625 } }}>
                        {item.defaultUnit}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </GraphicsCard>
          </motion.div>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

Metrics8.propTypes = { heading: PropTypes.any, caption: PropTypes.any, blockDetail: PropTypes.any };
