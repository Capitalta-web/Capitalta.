'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PROCESS - 5  ***************************/

/**
 *
 * Demos:
 * - [Process5](https://www.Capitalta.io/blocks/process/process5)
 *
 * API
 * - [Process5 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/process/process5#props-details)
 */

export default function Process5({ heading, caption, cards }) {
  const theme = useTheme();

  const grey100 = theme.vars.palette.grey[100];
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(102.5% 2% at 51.72% 41.83%, ${withAlpha(grey100, 0)} 0%, ${grey100} 100%)`
      : `radial-gradient(102.5% 102.5% at 51.72% 41.83%, ${withAlpha(grey100, 0)} 0%, ${grey100} 100%)`;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4
          }}
        >
          <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
        </motion.div>
        {cards.map((card, index) => (
          <Grid
            container
            direction={index % 2 == 0 ? 'row' : 'row-reverse'}
            spacing={{ xs: 1.5, sm: 2, md: 3 }}
            key={index}
            sx={{ alignItems: 'end', height: 1 }}
          >
            {card.image && (
              <Grid size={{ xs: 12, sm: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4
                  }}
                  style={{ height: '100%' }}
                >
                  <GraphicsCard sx={{ height: 1 }}>
                    <GraphicsImage
                      image={card.image}
                      sx={{
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: card.bgPosition,
                        transform:
                          index === 0 ? { xs: 'scale(1.6)', sm: 'scale(1.5)', md: 'scale(2)' } : { xs: 'scale(1.1)', sm: 'scale(1)' },
                        height: 300
                      }}
                    >
                      <Box sx={{ height: 1, background: gradient }} />
                    </GraphicsImage>
                  </GraphicsCard>
                </motion.div>
              </Grid>
            )}
            <Grid size={{ xs: 12, sm: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.5
                }}
              >
                <Stack direction="column" sx={{ gap: { xs: 1.5, sm: 2, md: 3 }, pb: { sm: 1.5 } }}>
                  <Avatar variant="rounded" sx={{ bgcolor: 'grey.100', color: 'primary.main', width: 60, height: 60, borderRadius: 4 }}>
                    <Typography variant="h4">{card.number}</Typography>
                  </Avatar>
                  <Stack sx={{ gap: 1.5 }}>
                    <Typeset
                      {...{
                        heading: card.title,
                        caption: card.description,
                        headingProps: { variant: 'h4' },
                        captionProps: { variant: 'body1' },
                        stackProps: { sx: { gap: 1 } }
                      }}
                    />
                    <Grid container>
                      {card.list &&
                        card.list.map((item, index) => (
                          <Grid key={index} size={{ xs: 12, md: 6 }}>
                            <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center', py: { xs: 0.25, md: 0.75 } }}>
                              <SvgIcon name="tabler-rosette-discount-check" stroke={1} color="text.secondary" />
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {item.primary}
                              </Typography>
                            </Stack>
                          </Grid>
                        ))}
                    </Grid>
                  </Stack>
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        ))}
      </Stack>
    </ContainerWrapper>
  );
}

Process5.propTypes = { heading: PropTypes.string, caption: PropTypes.string, cards: PropTypes.array };
