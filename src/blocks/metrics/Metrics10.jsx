'use client';
import PropTypes from 'prop-types';

// @mui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  METRICS - COUNTER BLOCK  ***************************/

function CounterBlock({ counter, caption, defaultUnit }) {
  return (
    <Stack sx={{ gap: 0.5, textAlign: 'center', alignItems: 'center', p: { xs: 2, md: 2.25, lg: 3 } }}>
      <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'flex-end' }}>
        <Typography component="div" variant="h1">
          {counter}
        </Typography>
        {defaultUnit && (
          <Typography component="div" variant="h2" sx={{ color: 'text.secondary' }}>
            {defaultUnit}
          </Typography>
        )}
      </Stack>
      <Typography sx={{ width: { xs: 1, md: '80%' }, color: 'text.secondary' }}>{caption}</Typography>
    </Stack>
  );
}

/***************************  METRICS - 10  ***************************/

export default function Metrics10({ blockDetail }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Grid container spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
          {blockDetail.map((item, idx) => {
            const isDivider = idx < blockDetail.length - 1;
            return (
              <Grid key={idx} size={{ xs: 6, md: 3 }} sx={{ position: 'relative' }}>
                <Divider
                  orientation="vertical"
                  sx={{
                    position: 'absolute',
                    top: '20%',
                    right: -4,
                    height: '60%',
                    display: {
                      xs: isDivider && idx % 2 === 0 ? 'block' : 'none',
                      md: isDivider && (idx + 1) / 4 !== 1 ? 'block' : 'none'
                    }
                  }}
                />
                <CounterBlock {...item} />
              </Grid>
            );
          })}
        </Grid>
      </motion.div>
    </ContainerWrapper>
  );
}

CounterBlock.propTypes = { counter: PropTypes.number, caption: PropTypes.string, defaultUnit: PropTypes.string };

Metrics10.propTypes = { blockDetail: PropTypes.any };
