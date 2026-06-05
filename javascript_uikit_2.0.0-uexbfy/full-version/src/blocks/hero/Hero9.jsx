'use client';
import PropTypes from 'prop-types';

import { useRef } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion, useScroll, useTransform } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';
import { getBackgroundDots } from '@/utils/getBackgroundDots';

// @assets
import Wave from '@/images/graphics/Wave';

/***************************  HERO - 9  ***************************/

/**
 *
 * Demos:
 * - [Hero9](https://www.Capitalta.io/blocks/hero/hero9)
 *
 * API:
 * - [Hero9 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/hero/hero9#props-details)
 */

export default function Hero9({ chip, headLine, captionLine, primaryBtn, image, listData }) {
  const theme = useTheme();
  const boxRadius = { xs: 24, sm: 32, md: 40 };

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.4, 0.6], [0.9, 0.92, 0.94, 0.96, 1]);

  return (
    <Box ref={containerRef}>
      <Box
        sx={{
          height: { xs: 540, sm: 738, md: 878 },
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1,
          zIndex: -1,
          borderBottomLeftRadius: boxRadius,
          borderBottomRightRadius: boxRadius,
          ...getBackgroundDots(theme.vars.palette.grey[300], 3, 40),
          bgcolor: 'grey.100',
          '&:before': {
            content: `' '`,
            position: 'absolute',
            width: 1,
            height: 1,
            left: 0,
            bottom: 0,
            borderBottomLeftRadius: boxRadius,
            borderBottomRightRadius: boxRadius,
            background: `radial-gradient(47.33% 47.33% at 50% 46.88%, ${withAlpha(theme.vars.palette.grey[100], 0)} 0%, ${theme.vars.palette.grey[100]} 100%)`
          }
        }}
      ></Box>
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
        <Box sx={{ pb: { xs: 2.75, sm: 5.375, md: 6.5 } }}>
          <Stack sx={{ alignItems: 'center', gap: 1.5 }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.215, 0.61, 0.355, 1]
              }}
            >
              <Chip
                variant="outlined"
                label={
                  typeof chip.label === 'string' ? (
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {chip.label}
                    </Typography>
                  ) : (
                    chip.label
                  )
                }
                sx={{ borderColor: 'divider' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.215, 0.61, 0.355, 1]
              }}
            >
              <Typography variant="h1" align="center" sx={{ maxWidth: 800 }}>
                {headLine}
              </Typography>
            </motion.div>
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
              <Wave />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.215, 0.61, 0.355, 1]
              }}
            >
              <Typography variant="h6" align="center" sx={{ color: 'text.secondary', maxWidth: 650 }}>
                {captionLine}
              </Typography>
            </motion.div>
          </Stack>
          <Stack sx={{ alignItems: 'center', gap: 2, mt: { xs: 3, sm: 4, md: 5 } }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.215, 0.61, 0.355, 1]
              }}
            >
              <ButtonAnimationWrapper>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<SvgIcon name="tabler-sparkles" size={16} stroke={3} color="background.default" />}
                  {...primaryBtn}
                />
              </ButtonAnimationWrapper>
            </motion.div>
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
              <Stack direction={{ sm: 'row' }} sx={{ gap: { xs: 1, sm: 3 } }}>
                {listData.map((item, index) => (
                  <Stack direction="row" key={index} sx={{ alignItems: 'center', gap: 1 }}>
                    <SvgIcon
                      {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })}
                      color="text.primary"
                      stroke={1.2}
                    />
                    <Typography variant="body2">{item.title}</Typography>
                  </Stack>
                ))}
              </Stack>
            </motion.div>
          </Stack>
        </Box>
        <Box sx={{ position: 'sticky', top: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.5
            }}
            style={{ scale }}
          >
            <GraphicsImage
              cardMediaProps={{ component: 'img' }}
              image={image}
              sx={{ width: 1, backgroundPositionY: 'top', borderRadius: { xs: 4 }, border: '5px solid', borderColor: 'grey.300' }}
            />
          </motion.div>
        </Box>
      </ContainerWrapper>
    </Box>
  );
}

Hero9.propTypes = {
  chip: PropTypes.object,
  headLine: PropTypes.string,
  captionLine: PropTypes.string,
  primaryBtn: PropTypes.any,
  image: PropTypes.any,
  listData: PropTypes.array
};
