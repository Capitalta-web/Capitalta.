'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import Star from '@/images/graphics/Star';

/***************************  FEATURE - 22  ***************************/

/**
 *
 * Demos:
 * - [Feature22](https://www.saasable.io/blocks/feature/feature22)
 *
 * API
 * - [Feature22 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/feature/feature22#props-details)
 */

export default function Feature22({ heading, features, caption }) {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const partitionInExtraSmall = 1;
  const partitionInSmall = 2;
  const partitionInLarge = 3;

  const columns = downSM ? partitionInExtraSmall : downMD ? partitionInSmall : partitionInLarge;

  const calculateElementsInLastRow = (dataArray, columns) => {
    const totalItems = dataArray.length;
    const elementsInLastRow = totalItems % columns || columns;
    return elementsInLastRow;
  };

  const calculateIndexOfFirstElementInLastRow = (dataArray, elementsInLastRow) => {
    const totalItems = dataArray.length;
    const indexOfFirstElementInLastRow = totalItems - elementsInLastRow;
    return indexOfFirstElementInLastRow;
  };

  const elementsInLastRow = calculateElementsInLastRow(features, columns);
  const indexOfFirstElementInLastRow = calculateIndexOfFirstElementInLastRow(features, elementsInLastRow);

  const calculateIndexOfLastElementOfEachRow = (dataArray, columns) => {
    const indices = [];
    const totalItems = dataArray.length;
    const rows = Math.ceil(totalItems / columns);

    for (let i = 1; i <= rows; i++) {
      const lastIndexInRow = i * columns - 1;
      indices.push(lastIndexInRow < totalItems ? lastIndexInRow : totalItems - 1);
    }

    return indices;
  };

  const indicesOfLastElements = calculateIndexOfLastElementOfEachRow(features, columns);

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.3
          }}
        >
          <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.4
          }}
        >
          <GraphicsCard sx={{ position: 'relative', overflow: 'visible' }}>
            <Box sx={{ p: 3 }}>
              <Grid container>
                {features.map((item, index) => (
                  <Grid
                    key={index}
                    size={{ xs: 12 / partitionInExtraSmall, sm: 12 / partitionInSmall, md: 12 / partitionInLarge }}
                    sx={{
                      position: 'relative',
                      ...(index < indexOfFirstElementInLastRow && { borderBottom: `1px solid ${theme.vars.palette.grey[300]}` }),
                      ...(!indicesOfLastElements.includes(index) && { borderRight: `1px solid ${theme.vars.palette.grey[300]}` })
                    }}
                  >
                    <Stack
                      sx={{
                        gap: { xs: 3, sm: 4 },
                        height: 1,
                        py: { xs: 1.5, sm: 3, md: 4 },
                        px: { xs: 0, sm: 3, md: 4 },
                        alignItems: 'flex-start',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Stack>
                        {item.image && (
                          <Avatar sx={{ width: 60, height: 60, bgcolor: 'grey.200' }}>
                            <GraphicsImage cardMediaProps={{ component: 'img' }} sx={{ height: 24 }} image={item.image} />
                          </Avatar>
                        )}
                        <Stack sx={{ gap: { xs: 0.5, md: 1 }, mt: { xs: 3, sm: 4 } }}>
                          {item.title && <Typography variant="h4">{item.title}</Typography>}
                          {item.content && <Typography sx={{ color: 'text.secondary' }}>{item.content}</Typography>}
                        </Stack>
                      </Stack>
                      {item.actionBtn && <Button variant="contained" color="primary" {...item.actionBtn} />}
                    </Stack>
                    {index < indexOfFirstElementInLastRow && !indicesOfLastElements.includes(index) && (
                      <Stack sx={{ position: 'absolute', bottom: -9, right: -9 }}>
                        <Star />
                      </Stack>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Box>
          </GraphicsCard>
        </motion.div>
      </Stack>
    </ContainerWrapper>
  );
}

Feature22.propTypes = { heading: PropTypes.string, features: PropTypes.array, caption: PropTypes.string };
