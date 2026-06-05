'use client';
import PropTypes from 'prop-types';

// @mui
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  CALL TO ACTION - 13  ***************************/

/**
 *
 * Demos:
 * - [CTA12](https://www.Capitalta.io/blocks/cta/cta12)
 *
 * API:
 * - [CTA12 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/cta/cta12#props-details)
 */

export default function Cta13({ heading, caption, listData }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.5
          }}
        >
          <Typeset
            {...{
              heading,
              caption,
              stackProps: { sx: { alignItems: 'center', textAlign: 'center' } },
              captionProps: { sx: { maxWidth: 650 } }
            }}
          />
        </motion.div>
        <Stack sx={{ gap: 1.5, alignItems: 'center', mx: { md: 14 } }}>
          {listData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.5
              }}
              style={{ width: '100%' }}
            >
              <GraphicsCard key={index} sx={{ width: 1, p: { xs: 2, md: 3 }, borderRadius: { xs: 4, sm: 6 } }}>
                <Stack
                  direction={{ sm: 'row' }}
                  sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1.5 }}
                >
                  <Stack sx={{ gap: { xs: 0.5, sm: 1, md: 1.5 } }}>
                    <Stack
                      direction={{ xs: 'column-reverse', sm: 'row' }}
                      sx={{ gap: 1.5, alignItems: { xs: 'flex-start', sm: 'center' } }}
                    >
                      <Typography variant="h4">{item.title}</Typography>
                      <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                        {item.chips.map((chip, index) => (
                          <Chip
                            key={index}
                            size="small"
                            icon={<SvgIcon name={chip.icon} color="text.secondary" size={20} />}
                            label={chip.name}
                            slotProps={{ label: { sx: { typography: 'body2', pl: 1, pr: 1, color: 'text.secondary' } } }}
                            sx={{ bgcolor: 'grey.300', height: 32, py: 0.5, px: 1.25, borderRadius: 8 }}
                          />
                        ))}
                      </Stack>
                    </Stack>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      {item.description}
                    </Typography>
                  </Stack>
                  <Button color="primary" variant="outlined" {...item.btn} />
                </Stack>
              </GraphicsCard>
            </motion.div>
          ))}
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}

Cta13.propTypes = { heading: PropTypes.string, caption: PropTypes.string, listData: PropTypes.array };
