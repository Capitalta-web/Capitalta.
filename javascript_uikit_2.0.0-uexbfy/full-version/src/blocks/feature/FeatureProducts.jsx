'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// @third-party
import { motion } from 'motion/react';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

export default function FeatureProducts({ heading, caption, features }) {
  const theme = useTheme();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Typeset heading={heading} caption={caption} stackProps={{ sx: { maxWidth: { md: 600 }, textAlign: 'center', mx: 'auto' } }} />
        </motion.div>

        <Grid container spacing={3}>
          {features.map((item, index) => (
            <Grid key={index} size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ height: '100%' }}
              >
                <Paper
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    transition: 'all 0.3s ease-in-out',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[8], // Matched with Hero7 cards
                      borderColor: 'success.main', // Matched with Hero7 green tone
                      borderWidth: 2,
                      '& .MuiButton-root': {
                         color: 'success.main',
                         borderColor: 'success.main',
                         bgcolor: alpha(theme.palette.success.main, 0.08)
                      }
                    }
                  }}
                  variant="outlined"
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: alpha(theme.palette.success.main, 0.1), // Matched with Hero7 green tone
                        color: 'success.main',
                        borderRadius: 2
                      }}
                    >
                      <SvgIcon name={item.icon} size={28} />
                    </Avatar>
                  </Stack>

                  <Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2, minHeight: { md: 48 } }}>
                      {item.description || item.content}
                    </Typography>

                    {(item.monto || item.plazo) && (
                      <Stack spacing={1.5} sx={{ mt: 2 }}>
                        {item.monto && (
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <SvgIcon name="tabler-currency-dollar" size={18} color="text.secondary" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              Monto:{' '}
                              <Typography component="span" variant="body2">
                                {item.monto}
                              </Typography>
                            </Typography>
                          </Stack>
                        )}
                        {item.plazo && (
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <SvgIcon name="tabler-calendar-time" size={18} color="text.secondary" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              Plazo:{' '}
                              <Typography component="span" variant="body2">
                                {item.plazo}
                              </Typography>
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    )}
                  </Box>

                  <Box sx={{ mt: 'auto', pt: 2 }}>
                    {item.href && (
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        href={item.href}
                        endIcon={<SvgIcon name="tabler-arrow-right" size={16} />}
                      >
                        Ver Detalles
                      </Button>
                    )}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

FeatureProducts.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  features: PropTypes.array
};
