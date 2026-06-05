'use client';

import { addMonths } from 'date-fns';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ContainerWrapper from '@/components/ContainerWrapper';

// export const metadata = {
//   title: 'Crédito Venta Key | Capitalta'
// };

const VALOR_MIN = 100000;
const VALOR_MAX = 5000000;
const PORCENTAJE_MIN = 30;
const PORCENTAJE_MAX = 40;
const PLAZO_MIN = 6;
const PLAZO_MAX = 18;
const TASA_APERTURA = 0.045;
const TASA_INTERES_ANUAL = 0.24;
const IVA = 0.16;

function formatoMoneda(valor) {
  if (!valor || Number.isNaN(valor)) {
    return '--';
  }

  return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

function formatearFecha(fecha) {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(fecha);
}

export default function CreditoVentaKeyPage() {
  const [valorInmueble, setValorInmueble] = useState(1500000);
  const [porcentajeCredito, setPorcentajeCredito] = useState(35);
  const [plazo, setPlazo] = useState(12);

  const valorAjustado = useMemo(() => {
    if (!valorInmueble || valorInmueble <= 0) {
      return 0;
    }

    return Math.min(VALOR_MAX, Math.max(VALOR_MIN, valorInmueble));
  }, [valorInmueble]);

  const porcentajeAjustado = useMemo(() => {
    if (!porcentajeCredito || porcentajeCredito <= 0) {
      return 0;
    }

    return Math.min(PORCENTAJE_MAX, Math.max(PORCENTAJE_MIN, porcentajeCredito));
  }, [porcentajeCredito]);

  const plazoAjustado = useMemo(() => {
    if (!plazo || plazo <= 0) {
      return 0;
    }

    return Math.min(PLAZO_MAX, Math.max(PLAZO_MIN, plazo));
  }, [plazo]);

  const montoCredito = useMemo(() => {
    if (!valorAjustado || !porcentajeAjustado) {
      return 0;
    }

    return (valorAjustado * porcentajeAjustado) / 100;
  }, [valorAjustado, porcentajeAjustado]);

  const comision = useMemo(() => {
    if (!montoCredito) {
      return 0;
    }

    const base = montoCredito * TASA_APERTURA;

    return base + base * IVA;
  }, [montoCredito]);

  const interesMensual = useMemo(() => {
    if (!montoCredito) {
      return 0;
    }

    const base = (montoCredito * TASA_INTERES_ANUAL) / 12;

    return base + base * IVA;
  }, [montoCredito]);

  const totalIntereses = interesMensual && plazoAjustado ? interesMensual * plazoAjustado : 0;
  const totalAPagar = montoCredito + comision + totalIntereses;

  const fechaLiquidacion = useMemo(() => {
    if (!plazoAjustado) {
      return null;
    }

    const meses = Math.max(PLAZO_MIN, plazoAjustado);

    return addMonths(new Date(), meses);
  }, [plazoAjustado]);

  return (
    <>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: { xs: 6, sm: 8 },
          mb: { xs: 4, sm: 6 }
        }}
      >
        <ContainerWrapper>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Stack spacing={2}>
                <Typography variant="overline" sx={{ letterSpacing: 1 }}>
                  Producto
                </Typography>
                <Typography variant="h2">Crédito Venta Key</Typography>
                <Typography variant="body1" sx={{ maxWidth: 600 }}>
                  Crédito que mueve tu patrimonio, dándote liquidez inmediata para mejorar tu inmueble y maximizar su valor de venta con el
                  respaldo de Capitalta.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', pt: 1 }}>
                  <Button variant="contained" color="secondary" href="/auth/registro">
                    Solicitar Venta Key
                  </Button>
                  <Button variant="outlined" color="inherit" href="/contacto">
                    Contactar asesor
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'primary.dark',
                  border: '1px solid',
                  borderColor: 'primary.light'
                }}
              >
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Resumen rápido</Typography>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Valor máximo del inmueble</Typography>
                    <Typography variant="body2">$5,000,000 MXN</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Porcentaje de crédito</Typography>
                    <Typography variant="body2">30% - 40% del avalúo</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Plazos</Typography>
                    <Typography variant="body2">De 6 a 18 meses</Typography>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </ContainerWrapper>
      </Box>

      <ContainerWrapper>
        <Grid container spacing={4} sx={{ mb: { xs: 4, sm: 6 } }}>
          <Grid item xs={12} md={7}>
            <Stack spacing={2}>
              <Typography variant="h4">¿Qué es Crédito Venta Key?</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Es una solución que te permite obtener liquidez usando tu inmueble como respaldo, para mejorarlo, sanear tus finanzas o
                aprovechar oportunidades mientras se prepara su venta.
              </Typography>
              <Typography variant="subtitle1">Ideal para</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Personas y empresas que buscan capital para remodelar o poner en valor un inmueble antes de venderlo, sin perder de vista la
                claridad en plazos y condiciones.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                bgcolor: 'background.paper'
              }}
            >
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Uso típico del crédito</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Mejoras y adecuaciones al inmueble, liberación de presiones financieras de corto plazo y obtención de liquidez mientras se
                  concreta la venta mediante aliados inmobiliarios.
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </ContainerWrapper>

      <ContainerWrapper>
        <Grid container spacing={4} sx={{ mb: { xs: 4, sm: 6 } }}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h5">Requisitos clave</Typography>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      bgcolor: 'background.paper',
                      height: '100%'
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">Solicitud firmada</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Completar y firmar la solicitud correspondiente al producto Venta Key.
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      bgcolor: 'background.paper',
                      height: '100%'
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">Identificación oficial</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        INE vigente del solicitante y, en su caso, de la persona aval.
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      bgcolor: 'background.paper',
                      height: '100%'
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">Carta de Buró de Crédito</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Autorización y reporte que permita evaluar el historial crediticio del solicitante.
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      bgcolor: 'background.paper',
                      height: '100%'
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">Documentación del inmueble</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Escrituras, avalúo y documentos que acrediten propiedad y situación jurídica del inmueble.
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h5">Condiciones destacadas</Typography>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      bgcolor: 'background.paper',
                      height: '100%'
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">Monto de crédito</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Entre 30% y 40% del avalúo del inmueble, con tope en $5,000,000 MXN de valor de propiedad.
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      bgcolor: 'background.paper',
                      height: '100%'
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">Plazos</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Hasta 18 meses, con posibilidad de liquidar a partir del mes 6, según estructura de la operación.
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      bgcolor: 'background.paper',
                      height: '100%'
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">Comisión por apertura</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        4.5% más IVA sobre el monto de crédito autorizado.
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      bgcolor: 'background.paper',
                      height: '100%'
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">Liquidez y acompañamiento</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Recursos en menos de 20 días y apoyo de aliados inmobiliarios durante el proceso de venta.
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </ContainerWrapper>

      <ContainerWrapper>
        <Grid container spacing={4} sx={{ mb: { xs: 4, sm: 6 } }}>
          <Grid item xs={12} md={5}>
            <Stack spacing={2.5}>
              <Typography variant="h4">Calcula tu Crédito Venta Key</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Ingresa el valor estimado de tu inmueble, el porcentaje de crédito y un plazo para visualizar el monto, la comisión, los
                intereses y un estimado de fecha de liquidación.
              </Typography>
              <TextField
                label="Valor del inmueble (MXN)"
                type="number"
                value={valorInmueble}
                onChange={(event) => setValorInmueble(Number(event.target.value) || 0)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                helperText={`Rango sugerido: ${formatoMoneda(VALOR_MIN)} a ${formatoMoneda(VALOR_MAX)}`}
              />
              <TextField
                label="Porcentaje de crédito (%)"
                type="number"
                value={porcentajeCredito}
                onChange={(event) => setPorcentajeCredito(Number(event.target.value) || 0)}
                helperText={`Rango sugerido: ${PORCENTAJE_MIN}% a ${PORCENTAJE_MAX}%`}
              />
              <TextField
                label="Plazo en meses"
                type="number"
                value={plazo}
                onChange={(event) => setPlazo(Number(event.target.value) || 0)}
                helperText={`Rango sugerido: ${PLAZO_MIN} a ${PLAZO_MAX} meses`}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack spacing={2.5}>
              <Typography variant="h5">Resultados estimados</Typography>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  bgcolor: 'background.paper'
                }}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Monto de crédito estimado
                    </Typography>
                    <Typography variant="body1">{formatoMoneda(montoCredito)}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Comisión por apertura (4.5% + IVA)
                    </Typography>
                    <Typography variant="body1">{formatoMoneda(comision)}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Interés mensual aproximado (2% + IVA)
                    </Typography>
                    <Typography variant="body1">{formatoMoneda(interesMensual)}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Intereses totales estimados
                    </Typography>
                    <Typography variant="body1">{formatoMoneda(totalIntereses)}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Total a pagar estimado
                    </Typography>
                    <Typography variant="body1">{formatoMoneda(totalAPagar)}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Fecha de liquidación estimada
                    </Typography>
                    <Typography variant="body1">{fechaLiquidacion ? formatearFecha(fechaLiquidacion) : '--'}</Typography>
                  </Stack>
                </Stack>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                La fecha de liquidación puede ajustarse según el momento en que se concrete la venta del inmueble y los acuerdos específicos
                de la operación.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary" href="/auth/registro">
                  Solicitar Venta Key
                </Button>
                <Button variant="outlined" color="primary" href="/calculadoras/calculadora-venta-key">
                  Ver calculadora completa
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </ContainerWrapper>

      <ContainerWrapper>
        <Box
          sx={{
            mb: { xs: 6, sm: 8 },
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            bgcolor: 'primary.lighter',
            border: '1px solid',
            borderColor: 'primary.light'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Stack spacing={1}>
                <Typography variant="h5">¿Listo para darle movimiento a tu patrimonio?</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Comparte algunos datos y un asesor de Capitalta te ayudará a estructurar un esquema Venta Key acorde a tu propiedad y tus
                  objetivos.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Button variant="contained" color="primary" href="/auth/registro">
                  Solicitar Venta Key ahora
                </Button>
                <Button variant="outlined" color="primary" href="/contacto">
                  Hablar con un asesor
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </ContainerWrapper>
    </>
  );
}
