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
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      bgcolor: 'primary.main',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.4s ease'
                    },
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                      borderColor: 'primary.light',
                      '&::before': {
                        transform: 'scaleX(1)'
                      },
                      '& .icon-avatar': {
                        bgcolor: 'primary.main',
                        color: 'common.white',
                        transform: 'scale(1.1) rotate(5deg)',
                        '& svg': {
                          color: 'common.white' // Force icon color to white on hover
                        }
                      }
                    }
                  }}
                  variant="outlined"
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Avatar
                      className="icon-avatar"
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: 'primary.main',
                        borderRadius: 3,
                        transition: 'all 0.4s ease'
                      }}
                    >
                      <SvgIcon name={item.icon} size={32} stroke={1.5} />
                    </Avatar>
                    {item.recommended && (
                      <Chip 
                        label="Recomendado" 
                        color="primary" 
                        size="small" 
                        sx={{ fontWeight: 600, borderRadius: 1 }} 
                      />
                    )}
                  </Stack>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
                      {item.description || item.content}
                    </Typography>

                    {(item.monto || item.plazo) && (
                      <Stack spacing={2} sx={{ mt: 2, p: 2.5, bgcolor: 'grey.50', borderRadius: 2 }}>
                        {item.monto && (
                          <Stack direction="row" alignItems="center" spacing={1.5}>
                            <SvgIcon name="tabler-coin" size={20} color="primary.main" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              Monto: <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>{item.monto}</Box>
                            </Typography>
                          </Stack>
                        )}
                        {item.plazo && (
                          <Stack direction="row" alignItems="center" spacing={1.5}>
                            <SvgIcon name="tabler-calendar-time" size={20} color="primary.main" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              Plazo: <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>{item.plazo}</Box>
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    )}
                  </Box>

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    href={item.href}
                    sx={{
                      mt: 'auto',
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: '0 8px 20px -6px rgba(0,0,0,0.2)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Ver detalles
                  </Button>
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
