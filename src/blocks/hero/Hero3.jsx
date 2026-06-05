'use client';
import PropTypes from 'prop-types';

import { isValidElement } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  IAMGE - CARD  ***************************/

function ImageBlock({ image }) {
  const imagePadding = { xs: 0, md: 4 };
  const imageLeftRadius = { xs: 12, sm: 32, md: 12 };
  const imageRightRadius = { xs: 0, sm: 32, md: 0 };

  return (
    <GraphicsCard sx={{ bgcolor: 'grey.200' }}>
      <Box sx={{ py: imagePadding, pl: imagePadding, height: { xs: 0, sm: 175, md: 302 } }}>
        <GraphicsImage
          image={image}
          sx={{
            height: '100%',
            backgroundPositionX: 'left',
            backgroundPositionY: 'top',
            borderTopLeftRadius: imageLeftRadius,
            borderTopRightRadius: imageRightRadius,
            borderBottomRightRadius: imageRightRadius,
            borderBottomLeftRadius: imageLeftRadius
          }}
        />
      </Box>
    </GraphicsCard>
  );
}

/***************************  HERO - 3  ***************************/

/**
 *
 * Demos:
 * - [Hero3](https://www.Capitalta.io/blocks/hero/hero3)
 *
 * API:
 * - [Hero3 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/hero/hero3#props-details)
 */

export default function Hero3({ chip, headLine, boxImage1, boxImage2, boxImage3, listData, description, exploreBtn }) {
  const theme = useTheme();
  const block1ImagePadding = { xs: 2.5, sm: 4 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 } }}>
        <Stack sx={{ alignItems: 'start', gap: { xs: 1.5, md: 3 } }}>
          {chip && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.215, 0.61, 0.355, 1]
              }}
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
                        />
                      )}
                    </Typography>
                  ) : (
                    chip.label
                  )
                }
                sx={{ bgcolor: 'grey.100' }}
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
                delay: 0.5,
                ease: [0.215, 0.61, 0.355, 1]
              }}
            >
              <Typography variant="h1" align="center" sx={{ width: { xs: 343, sm: 700, md: 850 } }}>
                {headLine}
              </Typography>
            </motion.div>
          )}
        </Stack>

        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 5, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.2,
                delay: 0.5
              }}
            >
              <GraphicsCard>
                <Box sx={{ pl: block1ImagePadding, pt: block1ImagePadding, height: { xs: 197, sm: 335, md: 478 } }}>
                  <GraphicsImage
                    image={boxImage1}
                    sx={{
                      height: '100%',
                      border: '5px solid',
                      borderColor: 'grey.200',
                      borderBottom: 'none',
                      borderRight: 'none',
                      backgroundPositionX: 'left',
                      backgroundPositionY: 'top',
                      borderTopLeftRadius: { xs: 12 },
                      borderBottomRightRadius: { xs: 20, sm: 32, md: 40 }
                    }}
                  />
                </Box>
              </GraphicsCard>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, sm: 3.5, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.6
              }}
            >
              <GraphicsCard>
                <Box sx={{ height: { xs: 'auto', sm: 335, md: 478 } }}>
                  {boxImage2 && (
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <ImageBlock image={boxImage2} />
                    </Box>
                  )}
                  {listData?.length && (
                    <Box sx={{ px: { xs: 2.5, md: 4 }, pt: { xs: 1, md: 1.5 }, pb: { xs: 1, md: 2.5 } }}>
                      <List sx={{ p: 0 }}>
                        {listData.map((item, index) => (
                          <ListItem key={index} sx={{ px: 0 }} divider={index !== listData.length - 1}>
                            <ListItemText primary={item.title} slotProps={{ primary: { variant: 'subtitle1', color: 'text.secondary' } }} />
                            {item.link && (
                              <Link
                                component={NextLink}
                                sx={{
                                  p: 0,
                                  height: 24,
                                  '&:hover svg': { color: 'primary.main' },
                                  '&:focus-visible': { ...generateFocusVisibleStyles(theme.vars.palette.primary.main) }
                                }}
                                {...item.link}
                                rel="noopener noreferrer"
                                aria-label="feature-link"
                              >
                                <motion.div whileHover={{ y: -2, x: 2 }} transition={{ duration: 0.5 }}>
                                  <SvgIcon name="tabler-arrow-up-right" color="text.secondary" />
                                </motion.div>
                              </Link>
                            )}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </Box>
              </GraphicsCard>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, sm: 3.5, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.7
              }}
            >
              <GraphicsCard>
                <Stack sx={{ justifyContent: 'space-between', height: { xs: 'auto', sm: 335, md: 478 } }}>
                  {boxImage3 && (
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <ImageBlock image={boxImage3} />
                    </Box>
                  )}
                  <Box sx={{ px: { xs: 2.5, md: 4 }, pt: { xs: 2.5, sm: 3 }, pb: { xs: 2.5, md: 4 } }}>
                    <Stack sx={{ gap: 1.5 }}>
                      {description && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {description}
                        </Typography>
                      )}
                      {exploreBtn && (
                        <ButtonAnimationWrapper style={{ width: '100%' }}>
                          <Button color="primary" fullWidth size="small" variant="outlined" {...exploreBtn} />
                        </ButtonAnimationWrapper>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </GraphicsCard>
            </motion.div>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

ImageBlock.propTypes = { image: PropTypes.any };

Hero3.propTypes = {
  chip: PropTypes.object,
  headLine: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  boxImage1: PropTypes.any,
  boxImage2: PropTypes.any,
  boxImage3: PropTypes.any,
  listData: PropTypes.array,
  description: PropTypes.string,
  exploreBtn: PropTypes.any
};
