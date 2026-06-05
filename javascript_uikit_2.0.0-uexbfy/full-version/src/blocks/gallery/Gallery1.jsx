'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';

import { SECTION_COMMON_PY } from '@/utils/constant';
import GetImagePath from '@/utils/GetImagePath';

/***************************  GALLERY 1 - HELPER  ***************************/

// Determines grid size for images based on index and total count for responsive layout
function getGridSize(index, length) {
  const dualOnSmall = () => {
    const partition = index % 4 === 2 || index % 4 === 3;
    return (index + 1 == length && length % 2 != 0) || !partition ? 12 : 6;
  };

  switch (length) {
    case 1:
      return { xs: 12 };
    case 2:
      return { xs: 12, sm: 6 };
    case 4:
      return { xs: 12, sm: 6 };
    case 5:
      return { xs: dualOnSmall(), sm: index < 2 ? 6 : 4 };
    case 7:
      return {
        xs: dualOnSmall(),
        sm: index < 2 ? 6 : index >= 2 && index <= 4 ? 4 : index == 5 ? 9 : 3,
        md: index < 2 ? 6 : index >= 2 && index <= 4 ? 4 : index == 5 ? 5 : 7
      };
    default:
      return { xs: dualOnSmall(), sm: 4 };
  }
}

/***************************  GALLERY - 1  ***************************/

/**
 *
 * Demos:
 * - [Gallery1](https://www.Capitalta.io/blocks/gallery/gallery1)
 *
 * API
 * - [Gallery1 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/gallery/gallery1#props-details)
 */

export default function Gallery1({ heading, caption, images }) {
  const [index, setIndex] = useState(-1);

  // Map over images to create an array for the lightbox
  const lightBox = images.map((image) => {
    return { ...images, src: GetImagePath(image.src) };
  });

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset {...{ heading, caption }} />
        <Grid container spacing={1.5}>
          {images.map((item, index) => (
            <Grid key={index} size={getGridSize(index, images.length)}>
              <Box sx={{ borderRadius: 10, overflow: 'hidden' }}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <GraphicsCard
                    bgImage={item.src}
                    sx={{ height: { xs: 200, sm: 300, md: 366 }, cursor: 'pointer' }}
                    onClick={() => setIndex(index)}
                  />
                </motion.div>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Lightbox index={index} slides={lightBox} open={index >= 0} close={() => setIndex(-1)} />
    </ContainerWrapper>
  );
}

Gallery1.propTypes = { heading: PropTypes.any, caption: PropTypes.any, images: PropTypes.any };
