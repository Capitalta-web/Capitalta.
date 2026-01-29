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
//   title: 'Crédito Revolvente | Capitalta'
// };

const LINEA_MIN = 10000;
const LINEA_MAX = 50000000;
const PLAZO_MIN = 1;
const PLAZO_MAX = 120;

function formatoMoneda(valor) {
  if (!valor || Number.isNaN(valor)) {
    return '--';
  }

  return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

export default function CreditoRevolventePage() {
  const [linea, setLinea] = useState(1000000);
  const [porcentajeUso, setPorcentajeUso] = useState(50);
  const [plazo, setPlazo] = useState(24);
  const [tasaAnual, setTasaAnual] = useState(24);

  const lineaAjustada = useMemo(() => {
    if (!linea || linea <= 0) {
      return 0;
    }

    return Math.min(LINEA_MAX, Math.max(LINEA_MIN, linea));
  }, [linea]);

  const montoUtilizado = useMemo(() => {
    if (!lineaAjustada || porcentajeUso <= 0) {
      return 0;
    }

    return (lineaAjustada * porcentajeUso) / 100;
  }, [lineaAjustada, porcentajeUso]);

  const plazoAjustado = useMemo(() => {
    if (!plazo || plazo <= 0) {
      return 0;
    }

    return Math.min(PLAZO_MAX, Math.max(PLAZO_MIN, plazo));
  }, [plazo]);

  const tasaMensual = tasaAnual / 12 / 100;

  const pagoMensual = useMemo(() => {
    if (!montoUtilizado || !plazoAjustado || !tasaMensual) {
      return 0;
    }

    const factor = Math.pow(1 + tasaMensual, plazoAjustado);

    return (montoUtilizado * tasaMensual * factor) / (factor - 1);
  }, [montoUtilizado, plazoAjustado, tasaMensual]);

  const totalPagar = pagoMensual && plazoAjustado ? pagoMensual * plazoAjustado : 0;
  const interesTotal = totalPagar && montoUtilizado ? totalPagar - montoUtilizado : 0;

  const comparativa50 =
    lineaAjustada && plazoAjustado && tasaMensual
      ? ((lineaAjustada * 0.5 * tasaMensual * Math.pow(1 + tasaMensual, plazoAjustado)) / (Math.pow(1 + tasaMensual, plazoAjustado) - 1)) *
        plazoAjustado
      : 0;

  const comparativa100 =
    lineaAjustada && plazoAjustado && tasaMensual
      ? ((lineaAjustada * tasaMensual * Math.pow(1 + tasaMensual, plazoAjustado)) / (Math.pow(1 + tasaMensual, plazoAjustado) - 1)) *
        plazoAjustado
      : 0;

  const filasComparativa = [
    {
      escenario: 'Usas 50% de la línea',
      monto: lineaAjustada ? lineaAjustada * 0.5 : 0,
      interes: comparativa50 ? comparativa50 - (lineaAjustada ? lineaAjustada * 0.5 : 0) : 0
    },
    {
      escenario: 'Usas 100% de la línea',
      monto: lineaAjustada || 0,
      interes: comparativa100 ? comparativa100 - (lineaAjustada || 0) : 0
    }
  ];

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
                <Typography variant="h2">Crédito Revolvente</Typography>
                <Typography variant="body1" sx={{ maxWidth: 600 }}>
                  Liquidez que se renueva contigo, para acompañar el ciclo operativo de tu negocio según lo vayas utilizando y pagando.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', pt: 1 }}>
                  <Button variant="contained" color="secondary" href="/auth/registro">
                    Solicitar Crédito Revolvente
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
                    <Typography variant="body2">Montos de línea</Typography>
                    <Typography variant="body2">$10,000 - $50,000,000 MXN</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Plazos</Typography>
                    <Typography variant="body2">1 a 120 meses</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Tasa</Typography>
                    <Typography variant="body2">Tasa fija competitiva, solo sobre lo utilizado</Typography>
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
              <Typography variant="h4">¿Qué es el Crédito Revolvente?</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Es una línea de crédito que puedes usar, pagar y volver a usar, ideal para necesidades recurrentes de liquidez, inventarios
                o gastos operativos de corto y mediano plazo.
              </Typography>
              <Typography variant="subtitle1">Ideal para</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Negocios con ciclos operativos marcados, necesidades constantes de capital de trabajo o empresas que requieren flexibilidad
                para enfrentar imprevistos y aprovechar oportunidades.
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
                  Compra de inventario, pago a proveedores, cobertura de gastos operativos estacionales y atención de oportunidades de
                  negocio de corto plazo.
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
                      <Typography variant="subtitle1">Negocio con al menos 1 año de operación</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Historial mínimo de actividad que permita evaluar el comportamiento del negocio.
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
                      <Typography variant="subtitle1">Flujo de ingresos constante</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Información financiera y de ventas que respalde la capacidad para cubrir los pagos.
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
                      <Typography variant="subtitle1">Garantía inmobiliaria libre de gravamen</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Inmueble que respalde la línea autorizada y su rotación en el tiempo.
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
                      <Typography variant="subtitle1">Montos de línea</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Desde $10,000 hasta $50,000,000 MXN, considerando hasta el 50% del valor del inmueble en garantía.
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
                        De 1 a 120 meses, con revisiones periódicas de la línea y su uso.
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
                      <Typography variant="subtitle1">Intereses solo sobre lo utilizado</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Pagas intereses únicamente sobre el monto efectivamente dispuesto de la línea.
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
                      <Typography variant="subtitle1">Revolvencia automática</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        A medida que pagas capital, tu línea se libera y vuelve a estar disponible para nuevas disposiciones.
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
              <Typography variant="h4">Calcula tu Crédito Revolvente</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Proyecta cómo cambia tu pago mensual y el interés total según el porcentaje de la línea que realmente utilizas.
              </Typography>
              <TextField
                label="Monto de línea autorizado (MXN)"
                type="number"
                value={linea}
                onChange={(event) => setLinea(Number(event.target.value) || 0)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                helperText={`Rango sugerido: ${formatoMoneda(LINEA_MIN)} a ${formatoMoneda(LINEA_MAX)}`}
              />
              <TextField
                label="Porcentaje de la línea utilizado (%)"
                type="number"
                value={porcentajeUso}
                onChange={(event) => setPorcentajeUso(Number(event.target.value) || 0)}
                helperText="Indica qué porcentaje de la línea usarías (0 a 100%)."
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
                        Monto utilizado
                      </Typography>
                      <Typography variant="body2">{formatoMoneda(montoUtilizado)}</Typography>
                    </Stack>
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
                  Solicitar Crédito Revolvente
                </Button>
                <Button variant="outlined" color="primary" href="/calculadoras/calculadora-revolvente">
                  Ver calculadora completa
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack spacing={2.5}>
              <Typography variant="h5">Comparativa de intereses según uso de la línea</Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Escenario</TableCell>
                      <TableCell align="right">Monto utilizado</TableCell>
                      <TableCell align="right">Interés total estimado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filasComparativa.map((fila) => (
                      <TableRow key={fila.escenario}>
                        <TableCell>{fila.escenario}</TableCell>
                        <TableCell align="right">{formatoMoneda(fila.monto)}</TableCell>
                        <TableCell align="right">{formatoMoneda(fila.interes)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Si usas 50% de la línea, el interés total estimado se aproxima al 50% del interés que pagarías usando el 100%, manteniendo
                las mismas condiciones de tasa y plazo.
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
                <Typography variant="h5">¿Quieres liquidez flexible para tu operación?</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Trabajemos juntos para estructurar una línea revolvente que acompañe los ciclos de tu negocio de forma responsable.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Button variant="contained" color="primary" href="/auth/registro">
                  Solicitar Crédito Revolvente ahora
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
