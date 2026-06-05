'use client';
import PropTypes from 'prop-types';

// @mui
import Grid from '@mui/material/Grid';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard, IconCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';

import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PROCESS - 2  ***************************/

/**
 *
 * Demos:
 * - [Process2](https://www.saasable.io/blocks/process/process2)
 *
 * API
 * - [Process2 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/process/process2#props-details)
 */

export default function Process2({ heading, caption, cards, bgImage }) {
  const iconProps = { type: IconType.CUSTOM };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 3, sm: 4 }}>
        <Grid size={12}>
          <motion.div
            role="button"
            tabIndex={0}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.5
            }}
          >
            <Typeset {...{ heading, caption }} />
          </motion.div>
        </Grid>
        <Grid container spacing={1.5} size={12}>
          <Grid size={12}>
            <motion.div
              role="button"
              tabIndex={0}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <GraphicsCard bgImage={bgImage} sx={{ height: { xs: 300, md: 360 } }} />
            </motion.div>
          </Grid>
          {cards.map((card, index) => (
            <Grid key={index} size={{ xs: 12, sm: 4 }}>
              <motion.div
                role="button"
                tabIndex={0}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: card.animationDelay }}
              >
                <IconCard
                  icon={{ ...(typeof card.icon === 'string' ? { name: card.icon, ...iconProps } : { ...iconProps, ...card.icon }) }}
                  title={card.title}
                  content={card.content}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

Process2.propTypes = { heading: PropTypes.string, caption: PropTypes.string, cards: PropTypes.array, bgImage: PropTypes.any };
