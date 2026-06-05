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
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import SvgIcon from '@/components/SvgIcon';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FEATURE - 16  ***************************/

/**
 *
 * Demos:
 * - [Feature16](https://www.Capitalta.io/blocks/feature/feature16)
 *
 * API
 * - [Feature16 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/feature/feature16#props-details)
 */

export default function Feature16({ heading, caption, cards, actionBtn }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.5
        }}
      >
        <GraphicsCard>
          <Box sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
            <Grid container spacing={{ xs: 2.5, sm: 2, md: 3 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack sx={{ justifyContent: 'space-between', gap: 2, height: 1 }}>
                  <Typography variant="h2" sx={{ maxWidth: { xs: 240, sm: 370, md: 460 } }}>
                    {heading}
                  </Typography>
                  <Stack sx={{ gap: { xs: 1.5, sm: 3 }, alignItems: 'flex-start' }}>
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                      {caption}
                    </Typography>
                    <ButtonAnimationWrapper>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SvgIcon name="tabler-sparkles" size={16} stroke={3} color="background.default" />}
                        {...actionBtn}
                      />
                    </ButtonAnimationWrapper>
                  </Stack>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <List disablePadding>
                  {cards.map((item, index) => (
                    <ListItem disablePadding key={index} sx={{ py: { xs: 1.5, sm: 2, md: 3 }, alignItems: 'flex-start' }}>
                      <ListItemAvatar sx={{ minWidth: { xs: 60, md: 76 }, height: 60 }}>
                        <Avatar
                          sx={{
                            bgcolor: 'grey.300',
                            width: { xs: 48, md: 60 },
                            height: { xs: 48, md: 60 },
                            borderRadius: 4,
                            '& svg': { width: { xs: 16, md: 24 }, height: { xs: 16, md: 24 } }
                          }}
                        >
                          <SvgIcon {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText sx={{ my: 0 }}>
                        <Stack sx={{ gap: { xs: 0.5, sm: 1 } }}>
                          <Typography variant="h4">{item.title}</Typography>
                          <Typography sx={{ color: 'text.secondary', maxWidth: { md: 360 } }}>{item.description}</Typography>
                        </Stack>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}

Feature16.propTypes = { heading: PropTypes.string, caption: PropTypes.string, cards: PropTypes.array, actionBtn: PropTypes.any };
