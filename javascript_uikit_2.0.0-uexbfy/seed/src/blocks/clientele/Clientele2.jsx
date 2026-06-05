'use client';
import PropTypes from 'prop-types';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  CLIENTELE - 2  ***************************/

/**
 *
 * Demos:
 * - [Clientele2](https://www.saasable.io/blocks/clientele/clientele2)
 *
 * API:
 * - [Clientele2 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/clientele/clientele2#props-details)
 */

export default function Clientele2({ title, clienteleList }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
          delay: 0.2
        }}
      >
        <Stack sx={{ gap: 2.5 }}>
          {title && (
            <Typography variant="subtitle2" align="center" sx={{ color: 'text.secondary' }}>
              {title}
            </Typography>
          )}

          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
              gap: 3,
              '& svg': { opacity: 0.4, transition: 'all 0.5s ease-in-out', '&:hover': { opacity: 1, transition: 'all 0.5s ease-in-out' } }
            }}
          >
            {clienteleList.map((item, index) => (
              <GraphicsImage key={index} {...item} />
            ))}
          </Stack>
        </Stack>
      </motion.div>
    </ContainerWrapper>
  );
}

Clientele2.propTypes = { title: PropTypes.string, clienteleList: PropTypes.array };
