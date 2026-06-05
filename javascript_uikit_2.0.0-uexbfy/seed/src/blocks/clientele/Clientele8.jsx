'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

// @third-party
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  CLIENTELE - 8  ***************************/

/**
 *
 * Demos:
 * - [Clientele8](https://www.saasable.io/blocks/clientele/clientele8)
 *
 * API:
 * - [Clientele8 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/clientele/clientele8#props-details)
 */

export default function Clientele8({ heading, caption, clienteleList }) {
  const theme = useTheme();

  const settings = {
    infinite: false,
    slidesToShow: 5,
    arrows: false,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 3 }
      }
    ]
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack
        sx={{
          gap: { xs: 3, sm: 4 },
          '& svg': { opacity: 0.4, '&:hover': { opacity: 1 } },
          '& .slick-slide > div': { display: 'flex', justifyContent: 'center' },
          '& .slick-slider .slick-track': { display: 'flex', alignItems: 'center' }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 5, x: 0 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Slider {...settings}>
            {clienteleList.map((item, index) => (
              <GraphicsImage
                key={index}
                image={item.image}
                sx={{ width: { xs: 78, sm: 126, lg: 216 }, height: { xs: 108, sm: 138, lg: 188 }, m: 'auto' }}
              />
            ))}
          </Slider>
        </motion.div>
      </Stack>
    </ContainerWrapper>
  );
}

Clientele8.propTypes = { heading: PropTypes.string, caption: PropTypes.string, clienteleList: PropTypes.array };
