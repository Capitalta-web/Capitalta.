import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FEATURE - CONTENT BLOCK  ***************************/

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

const boxPadding = { xs: 3, sm: 4, md: 5 };

/***************************  FEATURE - IMAGE BLOCK  ***************************/

function ImageBlock({ direction = 'left', image, title, description }) {
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
          image={image}
        />
      </GraphicsCard>
      <Box sx={{ p: boxPadding }}>
        <BoxContent {...{ title, description }} />
      </Box>
    </GraphicsCard>
  );
}

/***************************  FEATURE - 3  ***************************/

/**
 *
 * Demos:
 * - [Feature3](https://www.saasable.io/blocks/feature/feature3)
 *
 * API
 * - [Feature3 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/feature/feature3#props-details)
 */

export default function Feature3({ heading, caption, blockData1, blockData2, blockData3, actionBtn }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset {...{ heading, caption, captionProps: { sx: { maxWidth: 750 } } }} />
        <Grid container spacing={1.5} direction={{ xs: 'column-reverse', sm: 'row' }}>
          <Grid size={{ xs: 12, sm: 5 }}>
            <GraphicsCard sx={{ height: 1 }}>
              <Stack sx={{ height: 1 }}>
                <GraphicsCard sx={{ bgcolor: 'grey.200', pl: boxPadding, py: boxPadding, height: { xs: 214, sm: 1 } }}>
                  <GraphicsImage
                    sx={{
                      height: 1,
                      backgroundPositionX: 'left',
                      backgroundPositionY: 'top',
                      borderTopLeftRadius: { xs: 12 },
                      borderBottomLeftRadius: { xs: 12 }
                    }}
                    image={blockData1.image}
                  />
                </GraphicsCard>
                <Stack sx={{ gap: 4, alignItems: 'flex-start', padding: { xs: 3, sm: 4, md: 5 } }}>
                  <BoxContent {...{ title: blockData1.title, description: blockData1.description }} />
                  {actionBtn && <Button variant="contained" color="primary" {...actionBtn} />}
                </Stack>
              </Stack>
            </GraphicsCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 7 }}>
            <Grid container spacing={1.5}>
              <Grid size={12}>
                <ImageBlock
                  {...{
                    direction: 'right',
                    image: blockData2.image,
                    title: blockData2.title,
                    description: blockData2.description
                  }}
                />
              </Grid>
              <Grid size={12}>
                <ImageBlock
                  {...{
                    image: blockData3.image,
                    title: blockData3.title,
                    description: blockData3.description
                  }}
                />
              </Grid>
            </Grid>
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

Feature3.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  blockData1: PropTypes.any,
  blockData2: PropTypes.any,
  blockData3: PropTypes.any,
  actionBtn: PropTypes.any
};
