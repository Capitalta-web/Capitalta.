'use client';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
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
//   title: 'Calculadora Crédito Revolvente | Capitalta'
// };

const LINEA_MIN = 10000;
const LINEA_MAX = 50000000;
const PLAZO_MIN = 1;
const PLAZO_MAX = 120;
const TASA_MIN = 24;
const TASA_MAX = 24;

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

export default function CalculadoraRevolventePage() {
  const [linea, setLinea] = useState(1000000);
  const [porcentajeUso, setPorcentajeUso] = useState(50);
  const [plazo, setPlazo] = useState(24);
  const [tasaAnual, setTasaAnual] = useState(24);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [leadEnviado, setLeadEnviado] = useState(false);
  const [leadCargando, setLeadCargando] = useState(false);
  const [leadError, setLeadError] = useState('');

  const lineaAjustada = useMemo(() => {
    if (!linea || linea <= 0) {
      return 0;
    }

    return Math.min(LINEA_MAX, Math.max(LINEA_MIN, linea));
  }, [linea]);

  const porcentajeAjustado = useMemo(() => {
    if (!porcentajeUso || porcentajeUso < 0) {
      return 0;
    }

    return Math.min(100, Math.max(0, porcentajeUso));
  }, [porcentajeUso]);

  const montoUtilizado = useMemo(() => {
    if (!lineaAjustada || porcentajeAjustado <= 0) {
      return 0;
    }

    return (lineaAjustada * porcentajeAjustado) / 100;
  }, [lineaAjustada, porcentajeAjustado]);

  const plazoAjustado = useMemo(() => {
    if (!plazo || plazo <= 0) {
      return 0;
    }

    return Math.min(PLAZO_MAX, Math.max(PLAZO_MIN, plazo));
  }, [plazo]);

  const tasaAjustada = useMemo(() => {
    if (!tasaAnual || tasaAnual <= 0) {
      return 0;
    }

    return Math.min(TASA_MAX, Math.max(TASA_MIN, tasaAnual));
  }, [tasaAnual]);

  const pagoMensual = useMemo(
    () => calcularPagoMensual(montoUtilizado, plazoAjustado, tasaAjustada),
    [montoUtilizado, plazoAjustado, tasaAjustada]
  );

  const totalPagar = pagoMensual && plazoAjustado ? pagoMensual * plazoAjustado : 0;
  const interesTotal = totalPagar && montoUtilizado ? totalPagar - montoUtilizado : 0;

  const tablaCompleta = useMemo(
    () => construirTablaAmortizacion(montoUtilizado, plazoAjustado, tasaAjustada),
    [montoUtilizado, plazoAjustado, tasaAjustada]
  );

  const comparativa50 =
    lineaAjustada && plazoAjustado && tasaAjustada
      ? ((lineaAjustada * 0.5 * (tasaAjustada / 12 / 100) * Math.pow(1 + tasaAjustada / 12 / 100, plazoAjustado)) /
          (Math.pow(1 + tasaAjustada / 12 / 100, plazoAjustado) - 1)) *
        plazoAjustado
      : 0;

  const comparativa100 =
    lineaAjustada && plazoAjustado && tasaAjustada
      ? ((lineaAjustada * (tasaAjustada / 12 / 100) * Math.pow(1 + tasaAjustada / 12 / 100, plazoAjustado)) /
          (Math.pow(1 + tasaAjustada / 12 / 100, plazoAjustado) - 1)) *
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

  const handleLeadSubmit = async (event) => {
    event.preventDefault();
    setLeadError('');
    setLeadEnviado(false);
    setLeadCargando(false);

    if (!nombre || !email || !telefono) {
      setLeadError('Nombre, email y teléfono son obligatorios.');
      return;
    }

    try {
      setLeadCargando(true);

      const payload = {
        email,
        nombre,
        apellido: '',
        telefono,
        tipo_cliente: 'PM',
        empresa: empresa || null,
        rfc: null,
        monto_solicitado: lineaAjustada || null,
        plazo_meses: plazoAjustado || null,
        tipo_credito: 'revolvente'
      };

      const respuesta = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!respuesta.ok) {
        const data = await respuesta.json().catch(() => ({}));
        setLeadError(data.error || 'No pudimos guardar tu simulación. Intenta de nuevo más tarde.');
        return;
      }

      const leadRespuesta = await respuesta.json().catch(() => null);
      const leadId = leadRespuesta && leadRespuesta.lead && leadRespuesta.lead.id;

      if (leadId && tablaCompleta.length) {
        const cotizacionPayload = {
          lead_id: leadId,
          monto: montoUtilizado,
          plazo: plazoAjustado,
          tasa_anual: tasaAjustada,
          pago_mensual: pagoMensual,
          interes_total: interesTotal,
          total_a_pagar: totalPagar,
          tabla_amortizacion: tablaCompleta
        };

        const respuestaCotizacion = await fetch('/api/cotizaciones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cotizacionPayload)
        });

        if (!respuestaCotizacion.ok) {
          const dataCotizacion = await respuestaCotizacion.json().catch(() => ({}));
          setLeadError(
            dataCotizacion.error || 'Guardamos tus datos, pero no pudimos registrar la cotización. Intenta nuevamente más tarde.'
          );
          return;
        }
      }

      setLeadEnviado(true);
    } catch (error) {
      setLeadError('Ocurrió un error al guardar tu simulación. Intenta nuevamente.');
    } finally {
      setLeadCargando(false);
    }
  };

  const handleDescargarPDF = () => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!tablaCompleta.length) {
      return;
    }

    const ventana = window.open('', '_blank');

    if (!ventana) {
      return;
    }

    const fecha = new Date();
    const filasHTML = tablaCompleta
      .map(
        (fila) =>
          `<tr>
            <td style="padding:4px;border:1px solid #ccc;text-align:center;">${fila.mes}</td>
            <td style="padding:4px;border:1px solid #ccc;text-align:right;">${formatoMoneda(fila.pago)}</td>
            <td style="padding:4px;border:1px solid #ccc;text-align:right;">${formatoMoneda(fila.interes)}</td>
            <td style="padding:4px;border:1px solid #ccc;text-align:right;">${formatoMoneda(fila.capital)}</td>
            <td style="padding:4px;border:1px solid #ccc;text-align:right;">${formatoMoneda(fila.saldo)}</td>
          </tr>`
      )
      .join('');

    const contenido = `<!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charSet="utf-8" />
          <title>Cotización Crédito Revolvente - Capitalta</title>
        </head>
        <body style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding:24px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <img src="/assets/logos/capitalta-logo.svg" alt="Capitalta" style="height:40px;" />
              <h1 style="margin:0;font-size:20px;">Cotización Crédito Revolvente</h1>
            </div>
            <div style="text-align:right;font-size:12px;color:#555;">
              <div>${formatearFecha(fecha)}</div>
              <div>Esta cotización es válida por 30 días</div>
            </div>
          </div>

          <h2 style="font-size:16px;margin-bottom:8px;">Datos del cliente</h2>
          <table style="border-collapse:collapse;width:100%;margin-bottom:16px;font-size:12px;">
            <tbody>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;width:30%;">Nombre</td>
                <td style="padding:4px;border:1px solid #ccc;">${nombre || '-'}</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Email</td>
                <td style="padding:4px;border:1px solid #ccc;">${email || '-'}</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Teléfono</td>
                <td style="padding:4px;border:1px solid #ccc;">${telefono || '-'}</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Empresa</td>
                <td style="padding:4px;border:1px solid #ccc;">${empresa || '-'}</td>
              </tr>
            </tbody>
          </table>

          <h2 style="font-size:16px;margin-bottom:8px;">Parámetros de la cotización</h2>
          <table style="border-collapse:collapse;width:100%;margin-bottom:16px;font-size:12px;">
            <tbody>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;width:30%;">Monto de línea autorizado</td>
                <td style="padding:4px;border:1px solid #ccc;">${formatoMoneda(lineaAjustada)}</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Porcentaje utilizado</td>
                <td style="padding:4px;border:1px solid #ccc;">${porcentajeAjustado}%</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Monto utilizado</td>
                <td style="padding:4px;border:1px solid #ccc;">${formatoMoneda(montoUtilizado)}</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Plazo</td>
                <td style="padding:4px;border:1px solid #ccc;">${plazoAjustado} meses</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Tasa anual estimada</td>
                <td style="padding:4px;border:1px solid #ccc;">${tasaAjustada}%</td>
              </tr>
            </tbody>
          </table>

          <h2 style="font-size:16px;margin-bottom:8px;">Resultados principales</h2>
          <table style="border-collapse:collapse;width:100%;margin-bottom:16px;font-size:12px;">
            <tbody>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;width:30%;">Pago mensual aproximado</td>
                <td style="padding:4px;border:1px solid #ccc;">${formatoMoneda(pagoMensual)}</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Interés total estimado</td>
                <td style="padding:4px;border:1px solid #ccc;">${formatoMoneda(interesTotal)}</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Monto total a pagar</td>
                <td style="padding:4px;border:1px solid #ccc;">${formatoMoneda(totalPagar)}</td>
              </tr>
            </tbody>
          </table>

          <h2 style="font-size:16px;margin-bottom:8px;">Tabla de amortización completa</h2>
          <table style="border-collapse:collapse;width:100%;font-size:11px;">
            <thead>
              <tr>
                <th style="padding:4px;border:1px solid #ccc;text-align:center;">Mes</th>
                <th style="padding:4px;border:1px solid #ccc;text-align:right;">Pago</th>
                <th style="padding:4px;border:1px solid #ccc;text-align:right;">Interés</th>
                <th style="padding:4px;border:1px solid #ccc;text-align:right;">Capital</th>
                <th style="padding:4px;border:1px solid #ccc;text-align:right;">Saldo</th>
              </tr>
            </thead>
            <tbody>
              ${filasHTML}
            </tbody>
          </table>

          <p style="margin-top:16px;font-size:11px;color:#555;">
            Esta cotización es informativa y puede variar según el análisis de Capitalta.
          </p>
        </body>
      </html>`;

    ventana.document.open();
    ventana.document.write(contenido);
    ventana.document.close();
    ventana.focus();
    ventana.print();
  };

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
                  Calculadora avanzada
                </Typography>
                <Typography variant="h2">Crédito Revolvente</Typography>
                <Typography variant="body1" sx={{ maxWidth: 640 }}>
                  Simula cómo cambia tu pago y el interés total en función del porcentaje de la línea que realmente utilizas, con una tabla
                  de amortización completa y comparativas claras.
                </Typography>
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
                  <Typography variant="subtitle2">Rangos de referencia</Typography>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Monto de línea</Typography>
                    <Typography variant="body2">
                      {formatoMoneda(LINEA_MIN)} - {formatoMoneda(LINEA_MAX)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Plazo</Typography>
                    <Typography variant="body2">
                      {PLAZO_MIN} a {PLAZO_MAX} meses
                    </Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Tasa anual estimada</Typography>
                    <Typography variant="body2">
                      {TASA_MIN}% a {TASA_MAX}% anual
                    </Typography>
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
            <Stack spacing={3}>
              <Typography variant="h4">Parámetros de la línea</Typography>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2">Monto de línea autorizado</Typography>
                    <Typography variant="body2">{formatoMoneda(lineaAjustada)}</Typography>
                  </Stack>
                  <Slider
                    value={Math.min(LINEA_MAX, Math.max(LINEA_MIN, linea || LINEA_MIN))}
                    min={LINEA_MIN}
                    max={LINEA_MAX}
                    step={50000}
                    onChange={(_, value) => setLinea(typeof value === 'number' ? value : linea)}
                  />
                  <TextField
                    sx={{ mt: 1.5 }}
                    label="Monto de línea autorizado (MXN)"
                    type="number"
                    value={linea}
                    onChange={(event) => setLinea(Number(event.target.value) || 0)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    helperText={`Rango permitido: ${formatoMoneda(LINEA_MIN)} a ${formatoMoneda(LINEA_MAX)}`}
                  />
                </Box>
                <Box>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2">Porcentaje de la línea utilizado</Typography>
                    <Typography variant="body2">{porcentajeAjustado}%</Typography>
                  </Stack>
                  <Slider
                    value={porcentajeAjustado}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(_, value) => setPorcentajeUso(typeof value === 'number' ? value : porcentajeUso)}
                  />
                  <TextField
                    sx={{ mt: 1.5 }}
                    label="Porcentaje de la línea utilizado (%)"
                    type="number"
                    value={porcentajeUso}
                    onChange={(event) => setPorcentajeUso(Number(event.target.value) || 0)}
                    helperText="Indica qué porcentaje de la línea usarías (0 a 100%)."
                  />
                </Box>
                <Box>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2">Plazo</Typography>
                    <Typography variant="body2">{plazoAjustado} meses</Typography>
                  </Stack>
                  <Slider
                    value={Math.min(PLAZO_MAX, Math.max(PLAZO_MIN, plazo || PLAZO_MIN))}
                    min={PLAZO_MIN}
                    max={PLAZO_MAX}
                    step={1}
                    onChange={(_, value) => setPlazo(typeof value === 'number' ? value : plazo)}
                  />
                  <TextField
                    sx={{ mt: 1.5 }}
                    label="Plazo en meses"
                    type="number"
                    value={plazo}
                    onChange={(event) => setPlazo(Number(event.target.value) || 0)}
                    helperText={`Rango permitido: ${PLAZO_MIN} a ${PLAZO_MAX} meses`}
                  />
                </Box>
                <Box>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2">Tasa anual estimada</Typography>
                    <Typography variant="body2">{tasaAjustada}% (Fija)</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                    La tasa de interés para este producto es fija del 24% anual.
                  </Typography>
                </Box>
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Resultados principales</Typography>
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

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Comparativa de intereses</Typography>
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
                  Si usas alrededor del 50% de la línea, el interés que pagas se aproxima a la mitad del interés estimado al usar el 100%,
                  manteniendo las mismas condiciones de tasa y plazo.
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary" onClick={handleDescargarPDF} disabled={!tablaCompleta.length}>
                  Descargar PDF de la cotización
                </Button>
                <Button variant="outlined" color="primary" href="/auth/registro">
                  Iniciar solicitud en línea
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Typography variant="h4">Compártenos tus datos</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Guarda esta simulación junto con tus datos para que un asesor pueda ayudarte a estructurar la línea revolvente adecuada para
                tu negocio.
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleLeadSubmit}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  bgcolor: 'background.paper'
                }}
              >
                <Stack spacing={2}>
                  <TextField label="Nombre completo" value={nombre} onChange={(event) => setNombre(event.target.value)} required />
                  <TextField label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                  <TextField label="Teléfono" value={telefono} onChange={(event) => setTelefono(event.target.value)} required />
                  <TextField label="Empresa (opcional)" value={empresa} onChange={(event) => setEmpresa(event.target.value)} />
                  {leadError && (
                    <Typography variant="caption" sx={{ color: 'error.main' }}>
                      {leadError}
                    </Typography>
                  )}
                  {leadEnviado && (
                    <Typography variant="caption" sx={{ color: 'success.main' }}>
                      Gracias. Registramos tus datos con esta simulación. Un asesor te contactará pronto.
                    </Typography>
                  )}
                  <Button variant="contained" color="primary" type="submit">
                    Guardar mi simulación
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </ContainerWrapper>

      <ContainerWrapper>
        <Grid container spacing={4} sx={{ mb: { xs: 6, sm: 8 } }}>
          <Grid item xs={12}>
            <Stack spacing={2.5}>
              <Typography variant="h4">Tabla de amortización estimada</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 720 }}>
                Aunque se trata de una línea revolvente, aquí se muestra una estructura de pagos estimada sobre el monto utilizado para
                fines de referencia. Se incluyen los primeros 12 meses y los últimos 3; la tabla completa estará disponible en el PDF.
              </Typography>
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
                    {tablaCompleta.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Ajusta la línea, el porcentaje utilizado, el plazo y la tasa para ver la amortización estimada.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                    {tablaCompleta.length > 0 &&
                      (tablaCompleta.length > 15
                        ? [
                            ...tablaCompleta.slice(0, 12),
                            { mes: '...', pago: null, interes: null, capital: null, saldo: null },
                            ...tablaCompleta.slice(-3)
                          ]
                        : tablaCompleta
                      ).map((fila, index) => {
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
            </Stack>
          </Grid>
        </Grid>
      </ContainerWrapper>
    </>
  );
}
