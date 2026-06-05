'use client';
import PropTypes from 'prop-types';

import { isValidElement } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard } from '@/components/cards';
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

import { getBackgroundDots } from '@/utils/getBackgroundDots';

/***************************  HERO - 2  ***************************/

/**
 *
 * Demos:
 * - [Hero2](https://www.Capitalta.io/blocks/hero/hero2)
 *
 * API:
 * - [Hero2 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/hero/hero2#props-details)
 */

export default function Hero2({ chip, headLine, captionLine, image, primaryBtn, secondaryBtn }) {
  const theme = useTheme();
  const cardPadding = { xs: 3, sm: 5, md: 8 };
  const imageRadius = { xs: 12, sm: 16, md: 20 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
          delay: 0.1
        }}
      >
        <GraphicsCard
          overLay={`radial-gradient(47.33% 47.33% at 50% 46.88%, ${withAlpha(theme.vars.palette.grey[200], 0)} 0%, ${theme.vars.palette.grey[200]} 100%)`}
        >
          <Box sx={{ px: cardPadding, pt: cardPadding, ...getBackgroundDots(theme.vars.palette.grey[300], 3, 40) }}>
            <Stack sx={{ alignItems: 'center', gap: { xs: 1.5, md: 3 } }}>
              {chip && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <Chip
                    label={
                      typeof chip.label === 'string' ? (
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {chip.label}
                          {chip.link && (
                            <Link
                              component={NextLink}
                              variant="caption"
                              color="primary.main"
                              {...chip.link}
                              underline="hover"
                              sx={{ '&:hover': { color: 'primary.dark' } }}
                              aria-label="chip-link"
                            />
                          )}
                        </Typography>
                      ) : (
                        chip.label
                      )
                    }
                    sx={{ bgcolor: 'background.default' }}
                  />
                </motion.div>
              )}

              {isValidElement(headLine) ? (
                headLine
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                >
                  <Typography variant="h1" align="center" sx={{ width: { xs: 343, sm: 700, md: 850 } }}>
                    {headLine}
                  </Typography>
                </motion.div>
              )}
              {captionLine && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.3,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                >
                  <Typography variant="h6" align="center" sx={{ color: 'text.secondary', width: { xs: 320, sm: 350, md: 500 } }}>
                    {captionLine}
                  </Typography>
                </motion.div>
              )}
            </Stack>
            {(primaryBtn || secondaryBtn) && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
              >
                <Stack direction="row" sx={{ gap: { xs: 1, sm: 2, md: 2.5 }, justifyContent: 'center', mt: { xs: 2, sm: 4 } }}>
                  {primaryBtn && (
                    <ButtonAnimationWrapper>
                      <Button color="primary" size="large" variant="contained" {...primaryBtn} />
                    </ButtonAnimationWrapper>
                  )}
                  {secondaryBtn && (
                    <ButtonAnimationWrapper>
                      <Button color="primary" size="large" variant="outlined" {...secondaryBtn} />
                    </ButtonAnimationWrapper>
                  )}
                </Stack>
              </motion.div>
            )}

            <Box sx={{ mt: { xs: 3, sm: 4, md: 5 }, height: { xs: 196, sm: 360, md: 479 } }}>
              <GraphicsImage
                image={image}
                sx={{
                  height: '100%',
                  border: '5px solid',
                  borderColor: 'grey.300',
                  borderBottom: 'none',
                  backgroundPosition: 'top',
                  borderTopLeftRadius: imageRadius,
                  borderTopRightRadius: imageRadius
                }}
              />
            </Box>
          </Box>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}

Hero2.propTypes = {
  chip: PropTypes.object,
  headLine: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  captionLine: PropTypes.string,
  image: PropTypes.any,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any
};
