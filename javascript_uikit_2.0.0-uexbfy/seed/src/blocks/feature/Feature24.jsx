'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
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
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import Pattern11 from '@/images/graphics/Pattern11';

/***************************  FEATURE - 24  ***************************/

/**
 *
 * Demos:
 * - [Feature24](https://www.saasable.io/blocks/feature/feature24)
 *
 * API
 * - [Feature24 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/feature/feature24#props-details)
 */

export default function Feature24({ heading, caption, image, list, description }) {
  const theme = useTheme();
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY, overflowX: 'hidden' }}>
      <Grid container direction={{ xs: 'column-reverse', sm: 'row' }} spacing={{ xs: 2, sm: 2.5 }} sx={{ alignItems: { sm: 'center' } }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: { xs: 2, sm: 2.5 } }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.5
              }}
            >
              <Typeset {...{ heading, caption, headingProps: { sx: { maxWidth: '85%' } } }} />
            </motion.div>

            {description && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.6
                }}
              >
                {typeof description === 'string' ? (
                  <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    {description}
                  </Typography>
                ) : (
                  description
                )}
              </motion.div>
            )}

            {list && (
              <List disablePadding sx={{ maxWidth: 530 }}>
                {list.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: item.animationDelay
                    }}
                  >
                    <ListItem disablePadding key={index} sx={{ py: { xs: 1, md: 1.5 }, alignItems: 'flex-start' }}>
                      <ListItemAvatar sx={{ minWidth: 24, height: 24, mr: { xs: 1, md: 1.5 } }}>
                        <SvgIcon
                          name="custom-check"
                          type={IconType.CUSTOM}
                          color="primary.main"
                          twoToneColor={theme.vars.palette.primary.lighter}
                        />
                      </ListItemAvatar>
                      <ListItemText sx={{ my: 0 }}>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          {item.primary}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            )}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} sx={{ position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.5
            }}
          >
            <GraphicsImage image={image} sx={{ position: 'relative', height: { xs: 278, sm: 470, md: 533 }, backgroundSize: 'contain' }} />
          </motion.div>
          <Box
            sx={{
              position: 'absolute',
              zIndex: -1,
              top: { xs: -120, sm: -80, md: -180 },
              right: { xs: -80, sm: -90, md: -60 },
              '& svg': { width: { xs: 263, md: 351 }, height: { xs: 254, md: 339 } },
              ...(theme.direction === ThemeDirection.LTR && { transform: 'scaleX(-1)' })
            }}
          >
            <Pattern11 />
          </Box>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

Feature24.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.any,
  list: PropTypes.array,
  description: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};
