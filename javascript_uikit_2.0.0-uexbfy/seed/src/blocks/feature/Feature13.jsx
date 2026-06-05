'use client';
import PropTypes from 'prop-types';

// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
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
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FEATURE - 13  ***************************/

/**
 *
 * Demos:
 * - [Feature13](https://www.saasable.io/blocks/feature/feature13)
 *
 * API
 * - [Feature13 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/feature/feature13#props-details)
 */

export default function Feature13({ heading, caption, image, cards, actionBtn }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.5
          }}
        >
          <Stack sx={{ alignItems: 'center', gap: { xs: 2, sm: 4 } }}>
            <Typeset
              {...{
                heading,
                caption,
                stackProps: { sx: { alignItems: 'center', textAlign: 'center', maxWidth: { xs: 340, sm: 500, md: 615 }, mx: 'auto' } }
              }}
            />
            <ButtonAnimationWrapper>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SvgIcon name="tabler-sparkles" size={16} stroke={3} color="background.default" />}
                {...actionBtn}
              />
            </ButtonAnimationWrapper>
          </Stack>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.5
          }}
        >
          <GraphicsCard>
            <Box sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
              <Grid container direction={{ xs: 'column-reverse', sm: 'row' }} spacing={2.5} sx={{ alignItems: { sm: 'center' } }}>
                <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                  <List disablePadding sx={{ mt: { sm: -1.5 } }}>
                    {cards.map((item, index) => (
                      <ListItem
                        disablePadding
                        key={index}
                        sx={{ pb: { xs: 1, sm: 1.5, md: 2 }, pt: { xs: 1, sm: 3, md: 3 }, alignItems: 'flex-start' }}
                      >
                        <ListItemAvatar sx={{ minWidth: { xs: 52, sm: 60, md: 76 }, height: 60 }}>
                          <Avatar
                            sx={{
                              bgcolor: 'grey.300',
                              width: { sm: 48, md: 60 },
                              height: { sm: 48, md: 60 },
                              borderRadius: 10,
                              '& svg': { width: { xs: 16, sm: 24 }, height: { xs: 16, sm: 24 } }
                            }}
                          >
                            <SvgIcon {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText sx={{ my: 0 }}>
                          <Stack sx={{ gap: { xs: 0.5, sm: 1 } }}>
                            <Typography variant="h4">{item.title}</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                          </Stack>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                {image && (
                  <Grid size={{ xs: 12, sm: 6, md: 7 }}>
                    <GraphicsCard sx={{ height: 1 }}>
                      <GraphicsImage
                        image={image}
                        sx={{
                          height: { xs: 278, sm: 470, md: 533 },
                          backgroundSize: 'contain',
                          backgroundPositionX: { xs: 'center', sm: 'right' },
                          backgroundPositionY: 'center'
                        }}
                      />
                    </GraphicsCard>
                  </Grid>
                )}
              </Grid>
            </Box>
          </GraphicsCard>
        </motion.div>
      </Stack>
    </ContainerWrapper>
  );
}

Feature13.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.any,
  cards: PropTypes.array,
  actionBtn: PropTypes.any
};
