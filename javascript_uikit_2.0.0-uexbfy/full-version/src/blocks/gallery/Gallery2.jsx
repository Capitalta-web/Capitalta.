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

/***************************  GALLERY 2 - HELPER  ***************************/

// Determines grid size for images based on index and total count for responsive layout
function getGridSize(index, length) {
  switch (length) {
    case 1:
      return 12;
    case 2:
      return 6;
    case 3:
      return 4;
    case 4:
      return 6;
    case 5:
      return index < 2 ? 6 : 4;
    default:
      return 4;
  }
}

/***************************  GALLERY - 2  ***************************/

/**
 *
 * Demos:
 * - [Gallery2](https://www.Capitalta.io/blocks/gallery/gallery2)
 *
 * API
 * - [Gallery2 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/gallery/gallery2#props-details)
 */

export default function Gallery2({ heading, caption, images }) {
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
            <Grid key={index} size={{ xs: 6, sm: getGridSize(index, images.length) }}>
              <Box sx={{ overflow: 'hidden', borderRadius: 10 }}>
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

Gallery2.propTypes = { heading: PropTypes.any, caption: PropTypes.any, images: PropTypes.any };
