'use client';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

// @mui
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';

// @third-party
import Lightbox from 'yet-another-react-lightbox';
import Slider from 'react-slick';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';

import { SECTION_COMMON_PY } from '@/utils/constant';
import GetImagePath from '@/utils/GetImagePath';

const boxHeight = { xs: 228, sm: 410, md: 554 };

/***************************  GALLERY - GRAPHICS BLOCK ***************************/

function GraphicsBox({ boxData, setIndex, isChangingSlide }) {
  const boxGap = { xs: 1, sm: 1.5 };
  const openLightBox = (index) => {
    if (!isChangingSlide) {
      // Check if not changing slide
      setIndex(index);
    }
  };

  return (
    <Stack sx={{ alignItems: 'center', gap: boxGap, width: { xs: 118, sm: 214, md: 290 }, height: boxHeight }}>
      <GraphicsCard
        bgImage={boxData[0].src}
        sx={{ height: '50%', width: 1, cursor: 'pointer', filter: 'grayscale(1)', '&:hover': { filter: 'none' } }}
        onClick={() => openLightBox(boxData[0].index)}
      />
      <GraphicsCard
        bgImage={boxData[1].src}
        sx={{ height: '50%', width: 1, cursor: 'pointer', filter: 'grayscale(1)', '&:hover': { filter: 'none' } }}
        onClick={() => openLightBox(boxData[1].index)}
      />
    </Stack>
  );
}

/***************************  GALLERY - 4  ***************************/

/**
 *
 * Demos:
 * - [Gallery4](https://www.saasable.io/blocks/gallery/gallery4)
 *
 * API
 * - [Gallery4 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/gallery/gallery4#props-details)
 */

export default function Gallery4({ heading, caption, topics, images }) {
  const [index, setIndex] = useState(-1);
  const [activeTopic, setActiveTopic] = useState(0);
  const [galleryData, setGalleryData] = useState([]);
  const [isChangingSlide, setIsChangingSlide] = useState(false);

  const slickStyle = { alignItems: 'center', '& .slick-slide': { ' > div': { px: 0.75 } } };

  // Prepare the images for the lightbox
  const lightBox = images.map((image) => {
    return { ...images, src: GetImagePath(image.src) };
  });

  // Organize images into groups for the gallery layout
  useEffect(() => {
    const data = [...images];
    const temp = [];
    let count = 2;

    let groupData = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      item.index = i;

      if (count > 0) {
        count--;
        temp.push(item);
        continue;
      } else {
        groupData.push(item);
        if (groupData.length == 2) {
          temp.push({ type: 'box', child: groupData });
          groupData = [];
          count = 2;
        }
      }

      if (i + 1 == data.length && groupData.length > 0) {
        groupData.map((item) => temp.push(item));
      }
    }

    setGalleryData(temp);
  }, [images]);

  const settings = {
    centerMode: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    swipeToSlide: true,
    initialSlide: 0,
    variableWidth: true,
    beforeChange: () => {
      setIsChangingSlide(true); // Set state to indicate slide change is occurring
    },
    afterChange: () => {
      setIsChangingSlide(false); // Reset state after slide change
    }
  };

  const handleChange = (event, newValue) => {
    setActiveTopic(newValue);
  };

  const openLightBox = (index) => {
    if (!isChangingSlide) {
      // Check if not changing slide
      setIndex(index);
    }
  };

  return (
    <Stack sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <ContainerWrapper>
          <Typeset {...{ heading, caption, stackProps: { sx: { alignItems: 'center', textAlign: 'center' } } }} />
        </ContainerWrapper>
        <Stack sx={slickStyle}>
          <Box sx={{ maxWidth: 1 }}>
            <Tabs
              value={activeTopic}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              rel="noopener noreferrer"
              aria-label="scrollable auto tabs example"
              slotProps={{ indicator: { sx: { display: 'none' } } }}
              textColor="secondary"
            >
              {topics.map((item, index) => (
                <Tab
                  label={item}
                  key={index}
                  tabIndex={0}
                  sx={{
                    height: { xs: 52, md: 56 },
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 10,
                    mx: { xs: 0.5, md: 0.75 },
                    bgcolor: activeTopic === index ? 'grey.100' : 'inherit',
                    '&.Mui-focusVisible': {
                      bgcolor: 'grey.300'
                    },
                    '&:hover': { bgcolor: 'grey.50' }
                  }}
                />
              ))}
            </Tabs>
          </Box>
          <Box sx={{ width: 1, mt: { xs: 2, sm: 3 } }}>
            <Slider {...settings}>
              {galleryData.map((item, index) => (
                <Box key={index}>
                  {item.type == 'box' && item.child ? (
                    <GraphicsBox
                      boxData={item.child}
                      // Replace with your actual setIndex function
                      setIndex={(index) => openLightBox(index)}
                      // Replace with your actual isChangingSlide value
                      isChangingSlide={false}
                    />
                  ) : (
                    <GraphicsCard
                      bgImage={item.src}
                      sx={{
                        width: { xs: 222, sm: 412, md: 540 },
                        height: boxHeight,
                        cursor: 'pointer',
                        filter: 'grayscale(1)',
                        '&:hover': { filter: 'none' }
                      }}
                      onClick={() => openLightBox(item.index)}
                    />
                  )}
                </Box>
              ))}
            </Slider>
          </Box>
        </Stack>
      </Stack>
      <Lightbox index={index} slides={lightBox} open={index >= 0} close={() => setIndex(-1)} />
    </Stack>
  );
}

GraphicsBox.propTypes = { boxData: PropTypes.array, setIndex: PropTypes.func, isChangingSlide: PropTypes.bool };

Gallery4.propTypes = { heading: PropTypes.any, caption: PropTypes.any, topics: PropTypes.array, images: PropTypes.any };
