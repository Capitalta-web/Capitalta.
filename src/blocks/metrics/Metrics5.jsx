'use client';
import PropTypes from 'prop-types';

import { useEffect } from 'react';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { animate, motion, useMotionValue, useTransform } from 'motion/react';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

function AnimatedCounter({ startCount, endCount }) {
  const countValue = useMotionValue(startCount);
  const rounded = useTransform(countValue, (value) => Math.round(value));

  useEffect(() => {
    const controls = animate(countValue, endCount, { duration: 5, ease: 'linear' });

    return () => controls.stop();
  }, [countValue, endCount]);

  return <motion.pre style={{ margin: 0 }}>{rounded}</motion.pre>;
}

/***************************  METRICS - 5  ***************************/

/**
 *
 * Demos:
 * - [Metrics5](https://www.Capitalta.io/blocks/metrics/metrics5)
 *
 * API:
 * - [Metrics5 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/metrics/metrics5#props-details)
 */

export default function Metrics5({ heading, caption, blockDetail }) {
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;
  const primaryDark = theme.palette.primary.dark;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        sx={{
          position: 'relative',
          borderRadius: 6,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: alpha(primaryMain, 0.14),
          bgcolor: alpha(primaryMain, 0.02)
        }}
      >
        <Box
          component={motion.div}
          animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          sx={{
            position: 'absolute',
            top: { xs: -120, md: -160 },
            right: { xs: -140, md: -180 },
            width: { xs: 280, md: 360 },
            height: { xs: 280, md: 360 },
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${alpha(primaryMain, 0.35)}, transparent 60%)`,
            filter: 'blur(2px)'
          }}
        />
        <Box
          component={motion.div}
          animate={{ y: [0, 12, 0], x: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          sx={{
            position: 'absolute',
            bottom: { xs: -140, md: -170 },
            left: { xs: -160, md: -220 },
            width: { xs: 320, md: 420 },
            height: { xs: 320, md: 420 },
            borderRadius: '50%',
            background: `radial-gradient(circle at 40% 40%, ${alpha(primaryDark, 0.28)}, transparent 62%)`,
            filter: 'blur(2px)'
          }}
        />

        <Stack sx={{ gap: { xs: 3, sm: 4 }, position: 'relative', p: { xs: 3, sm: 4, md: 5 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Typeset
            {...{
              heading,
              caption,
              stackProps: { sx: { alignItems: 'center', textAlign: 'center' } },
              headingProps: {
                sx: {
                  background: `linear-gradient(90deg, ${primaryMain} 0%, ${primaryDark} 55%, ${primaryMain} 100%)`,
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  letterSpacing: '-0.6px'
                }
              },
              captionProps: { sx: { width: { xs: 1, sm: '80%', md: '65%' } } }
            }}
          />
        </motion.div>
        <Grid container spacing={1.5}>
          {blockDetail.map((item, index) => (
            <Grid key={index} size={{ xs: 6, md: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: index * 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                style={{ height: '100%' }}
              >
                <GraphicsCard
                  sx={{
                    p: { xs: 2, sm: 2.25, md: 3 },
                    height: 1,
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: alpha(primaryMain, 0.12),
                    bgcolor: alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(520px circle at 30% 0%, ${alpha(primaryMain, 0.16)}, transparent 55%)`,
                      opacity: 0.9
                    }
                  }}
                >
                  <Stack sx={{ gap: 0.5, alignItems: 'center' }}>
                    <Stack direction="row" sx={{ alignItems: 'flex-end' }}>
                      <Typography component="div" variant="h1">
                        <AnimatedCounter startCount={0} endCount={item.counter} />
                      </Typography>
                      <Typography component="div" variant="h3" sx={{ color: 'text.secondary', mb: { xs: 0.25, md: 0.625 } }}>
                        {item.defaultUnit}
                      </Typography>
                    </Stack>
                    <Typography align="center" sx={{ color: 'text.secondary' }}>
                      {item.caption}
                    </Typography>
                  </Stack>
                </GraphicsCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Stack>
      </Box>
    </ContainerWrapper>
  );
}

AnimatedCounter.propTypes = { startCount: PropTypes.number, endCount: PropTypes.number };

Metrics5.propTypes = { heading: PropTypes.any, caption: PropTypes.any, blockDetail: PropTypes.any };
