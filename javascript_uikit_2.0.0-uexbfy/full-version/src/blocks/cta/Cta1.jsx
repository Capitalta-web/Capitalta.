'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  CALL TO ACTION - 1  ***************************/

/**
 *
 * Demos:
 * - [CTA1](https://www.Capitalta.io/blocks/cta/cta1)
 *
 * API:
 * - [CTA1 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/cta/cta1#props-details)
 */

export default function Cta1({ bgImage, heading, caption, primaryBtn }) {
  const theme = useTheme();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: 0.4
        }}
      >
        <GraphicsCard
          {...(bgImage && {
            sx: {
              position: 'relative',
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              '&:before': {
                content: `' '`,
                position: 'absolute',
                width: 1,
                height: 1,
                left: 0,
                bottom: 0,
                background: `linear-gradient(180deg, ${withAlpha(theme.vars.palette.grey[100], 0)} -280%, ${theme.vars.palette.grey[100]} 143.54%)`
              }
            }
          })}
        >
          <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, position: 'relative', width: 1 }}>
            <Stack sx={{ alignItems: 'center', justifyContent: 'center', gap: { xs: 3, sm: 4 } }}>
              <Stack sx={{ gap: 1.5 }}>
                <Typography variant="h2" align="center">
                  {heading}
                </Typography>
                {caption && (
                  <Typography variant="h6" align="center" sx={{ color: 'text.secondary', maxWidth: { sm: 600, md: 700 }, mx: 'auto' }}>
                    {caption}
                  </Typography>
                )}
              </Stack>
              {primaryBtn && (
                <ButtonAnimationWrapper style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Button color="primary" size="large" variant="contained" sx={{ width: { xs: '100%', sm: 'auto' } }} {...primaryBtn} />
                </ButtonAnimationWrapper>
              )}
            </Stack>
          </Box>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}

Cta1.propTypes = { bgImage: PropTypes.any, heading: PropTypes.string, caption: PropTypes.string, primaryBtn: PropTypes.any };
