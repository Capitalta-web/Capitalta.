'use client';
import PropTypes from 'prop-types';

// @mui
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard } from '@/components/cards';
import Counter from '@/components/Counter';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  METRICS - COUNTER BLOCK  ***************************/

function CounterBlock({ counter, caption, defaultUnit }) {
  return (
    <Stack sx={{ gap: 1, maxWidth: { xs: 160, sm: 246 }, justifyContent: 'center' }}>
      <Stack direction="row" sx={{ justifyContent: 'center' }}>
        <Counter value={counter} />
        {defaultUnit && (
          <Typography component="div" variant="h1">
            {defaultUnit}
          </Typography>
        )}
      </Stack>
      <Typography sx={{ color: 'text.secondary' }}>{caption}</Typography>
    </Stack>
  );
}

/***************************  METRICS - 1  ***************************/

/**
 *
 * Demos:
 * - [Metrics1](https://www.saasable.io/blocks/metrics/metrics1)
 *
 * API:
 * - [Metrics1 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/metrics/metrics1#props-details)
 */

export default function Metrics1({ heading, caption, bgImage, blockDetail }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.5
        }}
      >
        <GraphicsCard {...(bgImage && { overLay: true, bgImage })} sx={{ p: { xs: 2.5, sm: 6, md: 8 }, backgroundPositionY: '67%' }}>
          <Stack sx={{ gap: { xs: 2, sm: 3 }, textAlign: 'center' }}>
            <Typeset
              {...{ heading, caption, stackProps: { sx: { alignItems: 'center', gap: 0.5 } }, captionProps: { sx: { maxWidth: 750 } } }}
            />
            <Stack direction="row" sx={{ justifyContent: 'center', py: { xs: 3, sm: 2, md: 4 } }}>
              <CounterBlock
                {...{ counter: blockDetail[0].counter, caption: blockDetail[0].caption, defaultUnit: blockDetail[0].defaultUnit }}
              />
              <Divider orientation="vertical" flexItem sx={{ mx: { xs: 1.5, sm: 3 }, my: 0 }} />
              <CounterBlock
                {...{ counter: blockDetail[1].counter, caption: blockDetail[1].caption, defaultUnit: blockDetail[1].defaultUnit }}
              />
            </Stack>
          </Stack>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}

CounterBlock.propTypes = { counter: PropTypes.number, caption: PropTypes.string, defaultUnit: PropTypes.string };

Metrics1.propTypes = { heading: PropTypes.any, caption: PropTypes.any, bgImage: PropTypes.any, blockDetail: PropTypes.any };
