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
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PROCESS - 6  ***************************/

/**
 *
 * Demos:
 * - [Process6](https://www.saasable.io/blocks/process/process6)
 *
 * API
 * - [Process6 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/process/process6#props-details)
 */

export default function Process6({ heading, caption, cards }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />

        <Grid container spacing={{ xs: 1.5 }}>
          {cards.map((card, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <GraphicsCard sx={{ height: 1, p: { xs: 2, sm: 3 } }}>
                <Stack sx={{ gap: { xs: 1.5, md: 4 }, height: 1, justifyContent: 'space-between' }}>
                  <Stack sx={{ gap: 2 }}>
                    <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', color: 'primary.main', width: 60, height: 60, borderRadius: 4 }}>
                      <Typography variant="h4">{card.number}</Typography>
                    </Avatar>
                    <Typeset
                      {...{
                        heading: card.title,
                        caption: card.description,
                        headingProps: { variant: 'h4' },
                        captionProps: { variant: 'body1' },
                        stackProps: { sx: { gap: 1 } }
                      }}
                    />
                  </Stack>
                  <List disablePadding>
                    {card.list &&
                      card.list.map((item, index) => (
                        <ListItem disablePadding key={index} sx={{ py: { xs: 0.25, sm: 0.5, md: 0.75 } }}>
                          <ListItemAvatar sx={{ minWidth: 28, height: 24 }}>
                            <SvgIcon name="tabler-rosette-discount-check" stroke={1} color="text.secondary" />
                          </ListItemAvatar>
                          <ListItemText>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {item.primary}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      ))}
                  </List>
                </Stack>
              </GraphicsCard>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Process6.propTypes = { heading: PropTypes.string, caption: PropTypes.string, cards: PropTypes.array };
