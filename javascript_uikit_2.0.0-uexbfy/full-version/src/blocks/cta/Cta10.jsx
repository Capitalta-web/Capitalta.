'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import { ProfileGroup } from '@/components/cards/profile-card';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  CALL TO ACTION - 10  ***************************/

/**
 *
 * Demos:
 * - [CTA10](https://www.Capitalta.io/blocks/cta/cta10)
 *
 * API:
 * - [CTA10 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/cta/cta10#props-details)
 */

export default function Cta10({ heading, caption, primaryBtn, profileGroups, list, secondaryBtn, image }) {
  const theme = useTheme();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={4} sx={{ alignItems: { sm: 'center' } }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ alignItems: 'flex-start', gap: { xs: 4, sm: 6, md: 6.25 } }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.4
              }}
            >
              <ProfileGroup {...profileGroups} />
            </motion.div>
            <Stack sx={{ gap: { xs: 3, sm: 4, md: 6 } }}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.5
                }}
              >
                <Typeset
                  {...{
                    heading,
                    caption,
                    captionProps: { sx: { maxWidth: 420 }, variant: 'body1' },
                    stackProps: { sx: { gap: 1 } },
                    headingProps: { sx: { maxWidth: { xs: 265, sm: 420 } } }
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.6
                }}
              >
                <Stack sx={{ gap: { xs: 1, sm: 1.5 }, alignItems: 'flex-start' }}>
                  <Stack direction="row" sx={{ gap: 1.5 }}>
                    <ButtonAnimationWrapper>
                      <Button color="primary" size="large" variant="contained" {...primaryBtn} />
                    </ButtonAnimationWrapper>
                    {secondaryBtn && (
                      <ButtonAnimationWrapper>
                        <Button color="primary" size="large" variant="outlined" {...secondaryBtn} />
                      </ButtonAnimationWrapper>
                    )}
                  </Stack>
                  <Stack direction="row" sx={{ gap: 4.75 }}>
                    {list &&
                      list.map((item, index) => (
                        <Stack
                          direction="row"
                          key={index}
                          sx={{ alignItems: 'center', gap: 1, justifyContent: 'center', position: 'relative' }}
                        >
                          {item.icon && (
                            <SvgIcon {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} color="text.secondary" />
                          )}
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item.primary}
                          </Typography>
                          {index !== list.length - 1 && (
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: 5,
                                bgcolor: theme.vars.palette.grey[600],
                                position: 'absolute',
                                right: -24,
                                top: '50%',
                                transform: 'translateY(-50%)'
                              }}
                            />
                          )}
                        </Stack>
                      ))}
                  </Stack>
                </Stack>
              </motion.div>
            </Stack>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.6
            }}
          >
            <GraphicsImage
              image={image}
              sx={{
                width: 1,
                height: { xs: 379, sm: 466, md: 520 },
                backgroundSize: { sm: 'contain' },
                backgroundPositionY: 'center',
                backgroundPositionX: 'left'
              }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

Cta10.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  primaryBtn: PropTypes.any,
  profileGroups: PropTypes.object,
  list: PropTypes.array,
  secondaryBtn: PropTypes.any,
  image: PropTypes.any
};
