'use client';
import PropTypes from 'prop-types';

// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FEATURE - 27  ***************************/

export default function Feature27({ heading, features, caption }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Typeset {...{ heading, caption }} stackProps={{ sx: { textAlign: 'center' } }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Grid container spacing={1.5}>
            {features.map((item, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <GraphicsCard sx={{ height: 1 }}>
                  <Stack sx={{ gap: { xs: 4, sm: 5, md: 7 }, p: { xs: 2, sm: 3 } }}>
                    {item.image && (
                      <GraphicsImage cardMediaProps={{ component: 'img' }} sx={{ height: 40, width: 40 }} image={item.image} />
                    )}
                    <Typeset
                      {...{ heading: item.title, caption: item.content }}
                      headingProps={{ variant: 'h4' }}
                      captionProps={{ variant: 'body1' }}
                    />
                  </Stack>
                </GraphicsCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Stack>
    </ContainerWrapper>
  );
}

Feature27.propTypes = { heading: PropTypes.string, features: PropTypes.array, caption: PropTypes.string };
