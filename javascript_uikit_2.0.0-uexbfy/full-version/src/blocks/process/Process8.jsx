'use client';
import PropTypes from 'prop-types';

// @mui
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PROCESS - 8  ***************************/

/**
 *
 * Demos:
 * - [Process8](https://www.Capitalta.io/blocks/process/process8)
 *
 * API
 * - [Process8 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/process/process8#props-details)
 */

export default function Process8({ heading, caption, image, cards }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
        <GraphicsCard sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
          <Grid container spacing={3} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, sm: 6 }} sx={{ px: { xs: 0, sm: 2.5, lg: 8 } }}>
              <GraphicsImage image={image} sx={{ height: { xs: 290, md: 328 }, backgroundPositionY: 'top' }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <List disablePadding>
                {cards.map((card, index) => (
                  <ListItem
                    disablePadding
                    key={index}
                    sx={{
                      py: { xs: 1.5, md: 2 },
                      '&:first-of-type': { pt: 0 },
                      '&:last-of-type': { pb: 0 },
                      alignItems: 'flex-start'
                    }}
                  >
                    <ListItemAvatar sx={{ minWidth: { xs: 48, sm: 60 }, mr: { xs: 1.5, sm: 2 } }}>
                      <Avatar sx={{ width: { xs: 48, sm: 60 }, height: { xs: 48, sm: 60 }, bgcolor: 'grey.300', borderRadius: 4 }}>
                        <SvgIcon {...(typeof card.icon === 'string' ? { name: card.icon } : { ...card.icon })} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="h4">{card.title}</Typography>}
                      secondary={
                        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
                          {card.description}
                        </Typography>
                      }
                      sx={{ my: 0 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </GraphicsCard>
      </Stack>
    </ContainerWrapper>
  );
}

Process8.propTypes = { heading: PropTypes.string, caption: PropTypes.string, image: PropTypes.any, cards: PropTypes.array };
