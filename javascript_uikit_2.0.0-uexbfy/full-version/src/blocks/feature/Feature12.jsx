'use client';
import PropTypes from 'prop-types';

// @mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard, IconCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FEATURE - 12  ***************************/

/**
 *
 * Demos:
 * - [Feature12](https://www.Capitalta.io/blocks/feature/feature12)
 *
 * API
 * - [Feature12 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/feature/feature12#props-details)
 */

export default function Feature12({ heading, caption, image, features, heading2, caption2, primaryBtn, primaryBtn2, icon, icon2 }) {
  const imagePadding = { xs: 3, sm: 5 };
  const iconProps = { type: IconType.CUSTOM };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4
          }}
        >
          <Typeset {...{ heading, caption }} />
        </motion.div>
        <Stack sx={{ gap: 1.5 }}>
          <Grid container spacing={1.5}>
            {features.map((item, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: item.animationDelay
                  }}
                >
                  <IconCard
                    icon={{ ...(typeof item.icon === 'string' ? { name: item.icon, ...iconProps } : { ...iconProps, ...item.icon }) }}
                    title={item.title}
                    content={item.content}
                    contentCard
                  />
                </motion.div>
              </Grid>
            ))}
            <Grid size={12}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: 0.4
                }}
              >
                <GraphicsCard>
                  <Grid container>
                    <Grid size={{ xs: 12, md: 5 }}>
                      <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
                        <Stack sx={{ gap: { xs: 4, sm: 5, md: 7 } }}>
                          <Stack sx={{ gap: { xs: 1, sm: 1.5 } }}>
                            <Typography variant="h4">{heading2}</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{caption2}</Typography>
                          </Stack>
                          <Stack direction="row" sx={{ gap: 1.5 }}>
                            <ButtonAnimationWrapper>
                              <Button
                                color="primary"
                                size="small"
                                variant="contained"
                                sx={{ px: 2 }}
                                {...primaryBtn}
                                startIcon={
                                  icon && (
                                    <SvgIcon
                                      size={16}
                                      color="background.default"
                                      stroke={2}
                                      {...(typeof icon === 'string' ? { name: icon } : { ...icon })}
                                    />
                                  )
                                }
                              />
                            </ButtonAnimationWrapper>
                            {primaryBtn2 && (
                              <ButtonAnimationWrapper>
                                <Button
                                  color="primary"
                                  size="small"
                                  variant="outlined"
                                  sx={{ px: 2 }}
                                  {...primaryBtn2}
                                  startIcon={
                                    icon2 && (
                                      <SvgIcon {...(typeof icon2 === 'string' ? { name: icon2 } : { ...icon2 })} size={16} stroke={2} />
                                    )
                                  }
                                />
                              </ButtonAnimationWrapper>
                            )}
                          </Stack>
                        </Stack>
                      </Box>
                    </Grid>
                    {image && (
                      <Grid size={{ xs: 12, md: 7 }}>
                        <GraphicsCard sx={{ bgcolor: 'grey.200', height: 1 }}>
                          <Box sx={{ pl: imagePadding, pt: imagePadding, height: { xs: 187, sm: 271, md: 1 } }}>
                            <GraphicsImage
                              image={image}
                              sx={{
                                height: 1,
                                backgroundPositionX: 'left',
                                backgroundPositionY: 'top',
                                borderTopLeftRadius: { xs: 12 },
                                borderBottomRightRadius: { xs: 20, sm: 32, md: 40 },
                                border: '5px solid',
                                borderColor: 'grey.300',
                                borderBottom: 'none',
                                borderRight: 'none'
                              }}
                            />
                          </Box>
                        </GraphicsCard>
                      </Grid>
                    )}
                  </Grid>
                </GraphicsCard>
              </motion.div>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}

Feature12.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.any,
  features: PropTypes.array,
  heading2: PropTypes.string,
  caption2: PropTypes.string,
  primaryBtn: PropTypes.any,
  primaryBtn2: PropTypes.any,
  icon: PropTypes.any,
  icon2: PropTypes.any
};
