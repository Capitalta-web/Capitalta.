import PropTypes from 'prop-types';
// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FEATURE - CARD  ***************************/

function CommonCard({ title, description, icon }) {
  return (
    <GraphicsCard>
      <Box sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
        <Stack direction="row" sx={{ gap: 1.5, justifyContent: 'space-between' }}>
          <Stack sx={{ gap: { xs: 1, md: 1.5 } }}>
            <Typography variant="h3">{title}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
          </Stack>
          <Box sx={{ p: 1, '& svg': { width: { xs: 24, md: 40 }, height: { xs: 24, md: 40 }, strokeWidth: { xs: 2.5, sm: 2, md: 1.5 } } }}>
            <SvgIcon type={IconType.CUSTOM} {...(typeof icon === 'string' ? { name: icon } : { ...icon })} />
          </Box>
        </Stack>
      </Box>
    </GraphicsCard>
  );
}

/***************************  FEATURE - 4  ***************************/

/**
 *
 * Demos:
 * - [Feature4](https://www.saasable.io/blocks/feature/feature4)
 *
 * API
 * - [Feature4 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/feature/feature4#props-details)
 */

export default function Feature4({ heading, caption, cards, image, showBorder = true }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={1.5} sx={{ height: 1 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 2.5, justifyContent: 'space-between', height: 1 }}>
            <Typeset {...{ heading, caption, stackProps: { sx: { gap: { xs: 1, sm: 1.5 } } } }} />
            <Stack sx={{ gap: 1.5 }}>
              {cards.map((card, index) => (
                <CommonCard key={index} {...card} />
              ))}
            </Stack>
          </Stack>
        </Grid>
        {image && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <GraphicsCard sx={{ height: 1 }}>
              <Box sx={{ pl: { xs: 3, md: 8 }, py: { xs: 3, md: 8 }, minHeight: { xs: 448, sm: 580, md: 723 }, height: 1 }}>
                <GraphicsImage
                  sx={{
                    height: '100%',
                    backgroundPositionX: 'left',
                    backgroundPositionY: 'top',
                    borderTopLeftRadius: { xs: 12 },
                    borderBottomLeftRadius: { xs: 12 },
                    ...(showBorder && {
                      border: '5px solid',
                      borderColor: 'grey.200',
                      borderRight: 'none'
                    })
                  }}
                  image={image}
                />
              </Box>
            </GraphicsCard>
          </Grid>
        )}
      </Grid>
    </ContainerWrapper>
  );
}

CommonCard.propTypes = { title: PropTypes.any, description: PropTypes.any, icon: PropTypes.any };

Feature4.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  cards: PropTypes.array,
  image: PropTypes.any,
  showBorder: PropTypes.bool
};
