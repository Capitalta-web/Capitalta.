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

// @third-party
import { motion } from 'motion/react';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

import CreditEmpresarial from '@/images/graphics/CreditEmpresarial';
import CreditRevolvente from '@/images/graphics/CreditRevolvente';

export default function FeatureProducts({ heading, caption, features }) {
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;
  const secondaryMain = theme.palette.secondary?.main || theme.palette.primary.dark;

  const getVisual = (item) => {
    const key = item?.visual || item?.id || item?.href || item?.title;
    if (key === 'empresarial' || String(key).includes('empresarial')) return 'empresarial';
    return 'revolvente';
  };

  const renderVisual = (item) => {
    const v = getVisual(item);
    return v === 'empresarial' ? <CreditEmpresarial /> : <CreditRevolvente />;
  };

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
                    zIndex: 0,
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      bgcolor: alpha(primaryMain, 0.04),
                      pointerEvents: 'none',
                      zIndex: 0
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background:
                        getVisual(item) === 'empresarial'
                          ? `radial-gradient(600px circle at 85% 20%, ${alpha(primaryMain, 0.18)}, transparent 45%), radial-gradient(420px circle at 20% 80%, ${alpha(primaryMain, 0.1)}, transparent 55%)`
                          : `radial-gradient(600px circle at 85% 20%, ${alpha(primaryMain, 0.2)}, transparent 45%), radial-gradient(520px circle at 15% 85%, ${alpha(secondaryMain, 0.12)}, transparent 55%)`
                      ,
                      pointerEvents: 'none',
                      zIndex: 0
                    },
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                      borderColor: 'primary.light',
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
                  <Box
                    sx={{
                      position: 'absolute',
                      top: { xs: -14, md: -20 },
                      right: { xs: -18, md: -26 },
                      width: { xs: 180, md: 220 },
                      height: { xs: 140, md: 160 },
                      opacity: 0.95,
                      pointerEvents: 'none',
                      filter: 'saturate(1.05)'
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ width: '100%', height: '100%' }}
                    >
                      {renderVisual(item)}
                    </motion.div>
                  </Box>

                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ position: 'relative' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        className="icon-avatar"
                        sx={{
                          width: 48,
                          height: 48,
                          bgcolor: alpha(primaryMain, 0.1),
                          color: 'primary.main',
                          borderRadius: 3,
                          transition: 'all 0.4s ease'
                        }}
                      >
                        <SvgIcon name={item.icon} size={24} stroke={1.6} />
                      </Avatar>
                      <Stack spacing={0.25}>
                        <Typography variant="overline" sx={{ letterSpacing: 1, color: 'text.secondary', lineHeight: 1 }}>
                          Producto
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.6px' }}>
                          {item.title}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
                      {item.description || item.content}
                    </Typography>

                    {(item.monto || item.plazo) && (
                      <Stack
                        spacing={2}
                        sx={{
                          mt: 2,
                          p: 2.5,
                          bgcolor: alpha(primaryMain, 0.04),
                          border: '1px solid',
                          borderColor: alpha(primaryMain, 0.12),
                          borderRadius: 3,
                          backdropFilter: 'blur(8px)'
                        }}
                      >
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

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 'auto' }}>
                    <Button
                      variant="outlined"
                      size="large"
                      fullWidth
                      href={item.href || '/productos'}
                      sx={{
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600
                      }}
                    >
                      Más información
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      href="/auth/registro"
                      sx={{
                        py: 1.5,
                        borderRadius: 3,
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
                      Solicitar ahora
                    </Button>
                  </Stack>
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
