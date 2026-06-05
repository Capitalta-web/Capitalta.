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
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FEATURE - BLOCK  ***************************/

function BoxContent({ title, description }) {
  return (
    (title || description) && (
      <Stack sx={{ gap: { xs: 1, md: 1.5 } }}>
        {title && <Typography variant="h3">{title}</Typography>}
        {description && <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>}
      </Stack>
    )
  );
}

/***************************  FEATURE - IMAGE BLOCK  ***************************/

function ImageBlock({ direction = 'left', image, title, description }) {
  const boxPadding = { xs: 3, sm: 4, md: 5 };
  const imgRadius = { xs: 20, md: 24 };
  return (
    <GraphicsCard sx={{ height: 1 }}>
      <GraphicsCard
        sx={{
          bgcolor: 'grey.200',
          py: boxPadding,
          ...(direction === 'left' && { pr: boxPadding }),
          ...(direction === 'right' && { pl: boxPadding }),
          height: { xs: 248, sm: 264, md: 350 }
        }}
      >
        <GraphicsImage
          image={image}
          sx={{
            height: 1,
            ...(direction === 'left' && {
              backgroundPositionX: 'right',
              borderTopRightRadius: imgRadius,
              borderBottomRightRadius: imgRadius
            }),
            ...(direction === 'right' && {
              backgroundPositionX: 'left',
              borderTopLeftRadius: imgRadius,
              borderBottomLeftRadius: imgRadius
            })
          }}
        />
      </GraphicsCard>
      <Box sx={{ p: boxPadding }}>
        <BoxContent {...{ title, description }} />
      </Box>
    </GraphicsCard>
  );
}

/***************************  FEATURE - 1  ***************************/

/**
 *
 * Demos:
 * - [Feature1](https://www.Capitalta.io/blocks/feature/feature1)
 *
 * API
 * - [Feature1 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/feature/feature1#props-details)
 */

export default function Feature1({ heading, caption, blockData1, blockData2, blockData3, actionBtn }) {
  const imgBoxPadding = { xs: 2.5, sm: 4 };

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
          <Typeset {...{ heading, caption, captionProps: { sx: { maxWidth: 750 } } }} />
        </motion.div>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.6
              }}
            >
              <ImageBlock
                {...{
                  image: blockData1.image,
                  title: blockData1.title,
                  description: blockData1.description
                }}
              />
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.7
              }}
            >
              <ImageBlock
                {...{
                  direction: 'right',
                  image: blockData2.image,
                  title: blockData2.title,
                  description: blockData2.description
                }}
              />
            </motion.div>
          </Grid>
          <Grid size={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.5
              }}
            >
              <GraphicsCard>
                <Grid container direction={{ xs: 'column-reverse', sm: 'row' }}>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Stack
                      sx={{
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: { xs: 4, sm: 3 },
                        padding: { xs: 3, sm: 4, md: 5 },
                        height: 1
                      }}
                    >
                      <BoxContent {...{ title: blockData3.title, description: blockData3.description }} />
                      {actionBtn && (
                        <ButtonAnimationWrapper>
                          <Button variant="contained" color="primary" size="medium" {...actionBtn} />
                        </ButtonAnimationWrapper>
                      )}
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                    <GraphicsCard sx={{ bgcolor: 'grey.200', pl: imgBoxPadding, pt: imgBoxPadding, height: { xs: 214, sm: 236, md: 285 } }}>
                      <GraphicsImage
                        image={blockData3.image}
                        sx={{
                          height: 1,
                          backgroundPositionX: 'left',
                          backgroundPositionY: 'top',
                          borderTopLeftRadius: { xs: 12 },
                          borderBottomRightRadius: { xs: 24, sm: 32, md: 40 }
                        }}
                      />
                    </GraphicsCard>
                  </Grid>
                </Grid>
              </GraphicsCard>
            </motion.div>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

BoxContent.propTypes = { title: PropTypes.string, description: PropTypes.string };

ImageBlock.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']),
  image: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string
};

Feature1.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  blockData1: PropTypes.any,
  blockData2: PropTypes.any,
  blockData3: PropTypes.any,
  actionBtn: PropTypes.any
};
