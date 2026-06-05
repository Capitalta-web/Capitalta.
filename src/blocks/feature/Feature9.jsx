'use client';
import PropTypes from 'prop-types';

// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// @third-party
import { motion } from 'framer-motion';

// @project
import { IconCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';

import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FEATURE - 9  ***************************/

/**
 *
 * Demos:
 * - [Feature9](https://www.Capitalta.io/blocks/feature/feature9)
 *
 * API
 * - [Feature9 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/feature/feature9#props-details)
 */

export default function Feature9({ heading, caption, features }) {
  const iconProps = { type: IconType.CUSTOM };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.5
          }}
        >
          <Typeset {...{ heading, caption }} />
        </motion.div>
        <Grid container spacing={1.5}>
          {features.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: item.animationDelay
                }}
                style={{ height: '100%' }}
              >
                <IconCard
                  icon={{ ...(typeof item.icon === 'string' ? { name: item.icon, ...iconProps } : { ...iconProps, ...item.icon }) }}
                  title={item.title}
                  content={item.content}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Feature9.propTypes = { heading: PropTypes.string, caption: PropTypes.string, features: PropTypes.array };
