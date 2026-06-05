'use client';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ContainerWrapper from '@/components/ContainerWrapper';

// export const metadata = {
//   title: 'Crédito Simple | Capitalta'
// };

const MONTO_MIN = 30000;
const MONTO_MAX = 10000000;
const PLAZO_MIN = 3;
const PLAZO_MAX = 60;

function calcularPagoMensual(monto, plazo, tasaAnual) {
  const tasaMensual = tasaAnual / 12 / 100;

  if (!monto || !plazo || !tasaMensual) {
    return 0;
  }

  const factor = Math.pow(1 + tasaMensual, plazo);

  return (monto * tasaMensual * factor) / (factor - 1);
}

function construirTablaAmortizacion(monto, plazo, tasaAnual) {
  const tasaMensual = tasaAnual / 12 / 100;

  if (!monto || !plazo || !tasaMensual) {
    return [];
  }

  const pago = calcularPagoMensual(monto, plazo, tasaAnual);
  const filas = [];
  let saldo = monto;

  for (let mes = 1; mes <= plazo; mes += 1) {
    const interes = saldo * tasaMensual;
    let capital = pago - interes;

    if (mes === plazo) {
      capital = saldo;
    }

    let nuevoSaldo = saldo - capital;

    if (nuevoSaldo < 0) {
      nuevoSaldo = 0;
    }

    filas.push({
      mes,
      pago,
      interes,
      capital,
      saldo: nuevoSaldo
    });

    saldo = nuevoSaldo;
  }

  return filas;
}

function formatoMoneda(valor) {
  if (!valor || Number.isNaN(valor)) {
    return '--';
  }

  return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

export default function CreditoSimplePage() {
  const [monto, setMonto] = useState(250000);
  const [plazo, setPlazo] = useState(24);
  const [tasaAnual, setTasaAnual] = useState(24);

  const montoAjustado = useMemo(() => {
    if (!monto || monto <= 0) {
      return 0;
    }

    return Math.min(MONTO_MAX, Math.max(MONTO_MIN, monto));
  }, [monto]);

  const plazoAjustado = useMemo(() => {
    if (!plazo || plazo <= 0) {
      return 0;
    }

    return Math.min(PLAZO_MAX, Math.max(PLAZO_MIN, plazo));
  }, [plazo]);

  const pagoMensual = useMemo(
    () => calcularPagoMensual(montoAjustado, plazoAjustado, tasaAnual),
    [montoAjustado, plazoAjustado, tasaAnual]
  );

  const totalPagar = pagoMensual && plazoAjustado ? pagoMensual * plazoAjustado : 0;
  const interesTotal = totalPagar && montoAjustado ? totalPagar - montoAjustado : 0;

  const tablaCompleta = useMemo(
    () => construirTablaAmortizacion(montoAjustado, plazoAjustado, tasaAnual),
    [montoAjustado, plazoAjustado, tasaAnual]
  );

  const filasTabla =
    tablaCompleta.length > 15
      ? [...tablaCompleta.slice(0, 12), { mes: '...', pago: null, interes: null, capital: null, saldo: null }, ...tablaCompleta.slice(-3)]
      : tablaCompleta;

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
                <Typography variant="h2">Crédito Simple</Typography>
                <Typography variant="body1" sx={{ maxWidth: 600 }}>
                  Impulsa tus ideas o capital de trabajo con un solo desembolso, plazos definidos y condiciones claras desde el inicio.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', pt: 1 }}>
                  <Button variant="contained" color="secondary" href="/auth/registro">
                    Solicitar Crédito Simple
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
                    <Typography variant="body2">Montos</Typography>
                    <Typography variant="body2">$30,000 - $10,000,000 MXN</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Plazos</Typography>
                    <Typography variant="body2">3 a 60 meses</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Tasa</Typography>
                    <Typography variant="body2">Tasa fija competitiva</Typography>
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
              <Typography variant="h4">¿Qué es el Crédito Simple?</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Es un crédito con un solo desembolso inicial que te permite financiar proyectos específicos, consolidar pasivos o fortalecer
                tu capital de trabajo con pagos mensuales fijos durante toda la vida del crédito.
              </Typography>
              <Typography variant="subtitle1">Ideal para</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Nuevos inversionistas, personas físicas con actividad empresarial y empresas que necesitan recursos claros y programados
                para ejecutar sus planes.
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
                  Financiamiento para nuevos proyectos, consolidación financiera, liquidez para capital de trabajo y reforzamiento de flujo
                  operativo.
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
                      <Typography variant="subtitle1">Actividad empresarial fija</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Comprobación de una actividad económica estable y formal.
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
                      <Typography variant="subtitle1">Flujo comprobable</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Ingresos demostrables que permitan sostener el pago mensual acordado.
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
                      <Typography variant="subtitle1">Garantía inmobiliaria o prendaria</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Propiedad o activo que respalde la operación según el análisis de Capitalta.
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
                      <Typography variant="subtitle1">Montos</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Desde $30,000 hasta $10,000,000 MXN, sujeto al valor de la garantía.
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
                        De 3 a 60 meses, con pagos mensuales fijos.
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
                      <Typography variant="subtitle1">Tasa fija competitiva</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        La tasa se mantiene estable durante todo el crédito, lo que facilita la planeación.
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
                      <Typography variant="subtitle1">Sin penalización por prepago</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Puedes adelantar pagos o liquidar antes sin costos adicionales por penalizaciones.
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
              <Typography variant="h4">Calcula tu Crédito Simple</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Ingresa un monto, plazo y una tasa anual estimada para conocer un pago mensual aproximado. Los resultados son informativos y
                pueden variar según el análisis de Capitalta.
              </Typography>
              <TextField
                label="Monto solicitado (MXN)"
                type="number"
                value={monto}
                onChange={(event) => setMonto(Number(event.target.value) || 0)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                helperText={`Rango sugerido: ${formatoMoneda(MONTO_MIN)} a ${formatoMoneda(MONTO_MAX)}`}
              />
              <TextField
                label="Plazo en meses"
                type="number"
                value={plazo}
                onChange={(event) => setPlazo(Number(event.target.value) || 0)}
                helperText={`Rango sugerido: ${PLAZO_MIN} a ${PLAZO_MAX} meses`}
              />
              <TextField
                label="Tasa anual fija (%)"
                type="number"
                value={tasaAnual}
                InputProps={{
                  readOnly: true,
                }}
                helperText="La tasa de interés para este producto es fija del 24% anual."
              />
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Resumen estimado</Typography>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    bgcolor: 'background.paper'
                  }}
                >
                  <Stack spacing={1.25}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Pago mensual aproximado
                      </Typography>
                      <Typography variant="h6">{formatoMoneda(pagoMensual)}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Interés total estimado
                      </Typography>
                      <Typography variant="body2">{formatoMoneda(interesTotal)}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Monto total a pagar
                      </Typography>
                      <Typography variant="body2">{formatoMoneda(totalPagar)}</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary" href="/auth/registro">
                  Solicitar Crédito Simple
                </Button>
                <Button variant="outlined" color="primary" href="/calculadoras/calculadora-simple">
                  Ver calculadora completa
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack spacing={2.5}>
              <Typography variant="h5">Tabla de amortización estimada</Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mes</TableCell>
                      <TableCell align="right">Pago</TableCell>
                      <TableCell align="right">Interés</TableCell>
                      <TableCell align="right">Capital</TableCell>
                      <TableCell align="right">Saldo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filasTabla.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Ingresa un monto, plazo y tasa válida para ver la amortización estimada.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                    {filasTabla.map((fila, index) => {
                      if (fila.mes === '...') {
                        return (
                          <TableRow key={`ellipsis-${index}`}>
                            <TableCell colSpan={5} align="center">
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                ...
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      }

                      return (
                        <TableRow key={fila.mes}>
                          <TableCell>{fila.mes}</TableCell>
                          <TableCell align="right">{formatoMoneda(fila.pago)}</TableCell>
                          <TableCell align="right">{formatoMoneda(fila.interes)}</TableCell>
                          <TableCell align="right">{formatoMoneda(fila.capital)}</TableCell>
                          <TableCell align="right">{formatoMoneda(fila.saldo)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Para una simulación detallada, con tabla completa y descarga en PDF, utiliza la calculadora avanzada de Crédito Simple.
              </Typography>
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
                <Typography variant="h5">¿Listo para impulsar tu próximo proyecto?</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Comparte algunos datos básicos y un asesor de Capitalta te acompañará para estructurar el Crédito Simple que mejor se
                  adapte a tu capacidad de pago.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Button variant="contained" color="primary" href="/auth/registro">
                  Solicitar Crédito Simple ahora
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
