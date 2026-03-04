'use client';

import { useState } from 'react';

// @third-party
import { motion } from 'framer-motion';

// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { Feature15, FeatureProducts } from '@/blocks/feature';
import { Hero16 } from '@/blocks/hero';
import ContainerWrapper from '@/components/ContainerWrapper';
import LazySection from '@/components/LazySection';
import SvgIcon from '@/components/SvgIcon';
import { IconType } from '@/enum';

// @data
import { metrics, faq, aboutCapitalta, feature20, hero } from './data';

/***************************  PAGE - MAIN  ***************************/

export default function Main() {
  const theme = useTheme();
  const [monto, setMonto] = useState(250000);
  const [plazo, setPlazo] = useState(24);
  const [tipoCredito, setTipoCredito] = useState('simple');
  const [tasaAnual, setTasaAnual] = useState(36);

  const tasaMensual = tasaAnual / 12 / 100;
  const pagoMensual =
    tasaMensual > 0 && plazo > 0 ? (monto * tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1) : 0;
  const totalPagar = pagoMensual * plazo;
  const interesTotal = totalPagar - monto;

  return (
    <>
      <Hero16 {...hero} />
      <FeatureProducts {...feature20} />
      <ContainerWrapper>
        <Box
          sx={{
            mt: { xs: 6, sm: 8 },
            mb: { xs: 6, sm: 8 },
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 4,
            bgcolor: 'background.paper',
            boxShadow: theme.customShadows ? theme.customShadows.z1 : '0 2px 8px rgba(0,0,0,0.05)',
            border: '1px solid',
            borderColor: 'grey.200'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h3" gutterBottom>
              Calculadora de Crédito
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Simula tu plan de pagos ideal. Ajusta el monto y plazo para ver cómo quedaría tu mensualidad.
            </Typography>
          </Box>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={4}>
                <Stack spacing={3}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Monto Solicitado
                      </Typography>
                      <TextField
                        variant="standard"
                        value={monto.toLocaleString()}
                        onChange={(e) => {
                          const value = e.target.value.replace(/,/g, '');
                          if (!isNaN(value)) {
                            setMonto(Number(value));
                          }
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          disableUnderline: true,
                          style: { fontWeight: 700, fontSize: '1.1rem', color: theme.palette.primary.main }
                        }}
                        sx={{ width: 140, '& input': { textAlign: 'right' } }}
                      />
                    </Stack>
                    <Slider
                      value={typeof monto === 'number' ? monto : 0}
                      onChange={(e, newValue) => setMonto(newValue)}
                      min={50000}
                      max={5000000}
                      step={10000}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                    />
                    <Stack direction="row" justifyContent="space-between" mt={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        $50k
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        $5M
                      </Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Plazo (Meses)
                      </Typography>
                      <Typography variant="h6" color="primary.main">
                        {plazo} meses
                      </Typography>
                    </Stack>
                    <Slider
                      value={typeof plazo === 'number' ? plazo : 0}
                      onChange={(e, newValue) => setPlazo(newValue)}
                      min={6}
                      max={60}
                      step={6}
                      marks
                      valueLabelDisplay="auto"
                    />
                    <Stack direction="row" justifyContent="space-between" mt={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        6 meses
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        60 meses
                      </Typography>
                    </Stack>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="Tipo de crédito"
                        value={tipoCredito}
                        onChange={(event) => setTipoCredito(event.target.value)}
                        variant="outlined"
                      >
                        <MenuItem value="simple">Crédito Revolvente</MenuItem>
                        <MenuItem value="empresarial">Crédito Empresarial</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Tasa anual (%)"
                        type="number"
                        value={tasaAnual}
                        onChange={(event) => setTasaAnual(Number(event.target.value) || 0)}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  color: 'common.white',
                  boxShadow: theme.customShadows ? theme.customShadows.primary : '0 8px 16px rgba(0,0,0,0.24)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Background Pattern */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.08)'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.08)'
                  }}
                />

                <Stack spacing={4} position="relative">
                  <Box textAlign="center">
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                      Pago Mensual Estimado
                    </Typography>
                    <Typography variant="h2" fontWeight={700}>
                      {pagoMensual > 0
                        ? pagoMensual.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
                        : '$0'}
                    </Typography>
                  </Box>

                  <Stack spacing={2} sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 2 }}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Monto del crédito
                      </Typography>
                      <Typography variant="subtitle2">{monto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Tasa de interés anual
                      </Typography>
                      <Typography variant="subtitle2">{tasaAnual}%</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Interés total estimado
                      </Typography>
                      <Typography variant="subtitle2">
                        {interesTotal > 0
                          ? interesTotal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
                          : '$0'}
                      </Typography>
                    </Stack>
                    <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', pt: 2 }}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle1">Total a pagar</Typography>
                        <Typography variant="subtitle1">
                          {totalPagar > 0
                            ? totalPagar.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
                            : '$0'}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{ color: 'primary.main', bgcolor: 'common.white', '&:hover': { bgcolor: 'grey.100' } }}
                      href="/auth/registro"
                    >
                      Solicitar Crédito
                    </Button>
                    <Button
                      variant="outlined"
                      color="inherit"
                      sx={{
                        borderColor: 'rgba(255,255,255,0.5)',
                        color: 'common.white',
                        '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.08)' }
                      }}
                      href={`/calculadoras/calculadora-${tipoCredito}`}
                    >
                      Ver Detalle
                    </Button>
                  </Stack>
                </Stack>
              </Box>
              <Typography variant="caption" sx={{ display: 'block', mt: 2, textAlign: 'center', color: 'text.secondary' }}>
                * Cálculo informativo. Sujeto a aprobación de crédito y condiciones finales.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </ContainerWrapper>

      <LazySection
        sections={[{ importFunc: () => import('@/blocks/metrics').then((module) => ({ default: module.Metrics5 })), props: metrics }]}
        offset="200px"
      />

      <ContainerWrapper>
        <Box sx={{ py: { xs: 6, md: 8 }, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: { xs: 4, md: 6 } }}>
            Aliados Estratégicos
          </Typography>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {[
              { src: '/assets/images/capitalta/burodecredito.jpeg', alt: 'Buró de Crédito', height: 60 },
              { src: '/assets/images/capitalta/carvid.jpeg', alt: 'Carvid', height: 60 },
              { src: '/assets/images/capitalta/check.jpeg', alt: 'Check', height: 60 },
              { src: '/assets/images/capitalta/cisa.png', alt: 'CISA', height: 80 }
            ].map((logo, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box
                  component="img"
                  src={logo.src}
                  alt={logo.alt}
                  sx={{
                    maxHeight: logo.height,
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'grayscale(100%)',
                    opacity: 0.7,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      filter: 'none',
                      opacity: 1,
                      transform: 'scale(1.05)'
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </ContainerWrapper>

      <LazySection
        sections={[{ importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq6 })), props: faq }]}
        offset="200px"
      />
    </>
  );
}
