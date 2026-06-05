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
//   title: 'Calculadora Crédito Empresarial | Capitalta'
// };

const MONTO_MIN = 20000;
const MONTO_MAX = 50000000;
const PLAZO_MIN = 1;
const PLAZO_MAX = 120;
const TASA_MIN = 24;
const TASA_MAX = 24;

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

function formatearFecha(fecha) {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(fecha);
}

export default function CalculadoraEmpresarialPage() {
  const [monto, setMonto] = useState(1000000);
  const [plazo, setPlazo] = useState(36);
  const [tasaAnual, setTasaAnual] = useState(24);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [leadEnviado, setLeadEnviado] = useState(false);
  const [leadError, setLeadError] = useState('');

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

  const tasaAjustada = useMemo(() => {
    if (!tasaAnual || tasaAnual <= 0) {
      return 0;
    }

    return Math.min(TASA_MAX, Math.max(TASA_MIN, tasaAnual));
  }, [tasaAnual]);

  const pagoMensual = useMemo(
    () => calcularPagoMensual(montoAjustado, plazoAjustado, tasaAjustada),
    [montoAjustado, plazoAjustado, tasaAjustada]
  );

  const totalPagar = pagoMensual && plazoAjustado ? pagoMensual * plazoAjustado : 0;
  const interesTotal = totalPagar && montoAjustado ? totalPagar - montoAjustado : 0;

  const tablaCompleta = useMemo(
    () => construirTablaAmortizacion(montoAjustado, plazoAjustado, tasaAjustada),
    [montoAjustado, plazoAjustado, tasaAjustada]
  );

  const filasTabla =
    tablaCompleta.length > 15
      ? [...tablaCompleta.slice(0, 12), { mes: '...', pago: null, interes: null, capital: null, saldo: null }, ...tablaCompleta.slice(-3)]
      : tablaCompleta;

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
        monto_solicitado: montoAjustado || null,
        plazo_meses: plazoAjustado || null,
        tipo_credito: 'empresarial'
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
          monto: montoAjustado,
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
          <title>Cotización Crédito Empresarial - Capitalta</title>
        </head>
        <body style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding:24px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <img src="/assets/logos/capitalta-logo.svg" alt="Capitalta" style="height:40px;" />
              <h1 style="margin:0;font-size:20px;">Cotización Crédito Empresarial</h1>
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
                <td style="padding:4px;border:1px solid #ccc;width:30%;">Monto solicitado</td>
                <td style="padding:4px;border:1px solid #ccc;">${formatoMoneda(montoAjustado)}</td>
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
                <Typography variant="h2">Crédito Empresarial</Typography>
                <Typography variant="body1" sx={{ maxWidth: 640 }}>
                  Proyecta tu Crédito Empresarial con montos, plazos y tasas acordes al tamaño de tu operación, revisa la tabla de
                  amortización y genera un PDF para compartir la propuesta internamente.
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
                    <Typography variant="body2">Monto</Typography>
                    <Typography variant="body2">
                      {formatoMoneda(MONTO_MIN)} - {formatoMoneda(MONTO_MAX)}
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
              <Typography variant="h4">Parámetros del crédito</Typography>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2">Monto solicitado</Typography>
                    <Typography variant="body2">{formatoMoneda(montoAjustado)}</Typography>
                  </Stack>
                  <Slider
                    value={Math.min(MONTO_MAX, Math.max(MONTO_MIN, monto || MONTO_MIN))}
                    min={MONTO_MIN}
                    max={MONTO_MAX}
                    step={50000}
                    onChange={(_, value) => setMonto(typeof value === 'number' ? value : monto)}
                  />
                  <TextField
                    sx={{ mt: 1.5 }}
                    label="Monto solicitado (MXN)"
                    type="number"
                    value={monto}
                    onChange={(event) => setMonto(Number(event.target.value) || 0)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    helperText={`Rango permitido: ${formatoMoneda(MONTO_MIN)} a ${formatoMoneda(MONTO_MAX)}`}
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
                Guarda esta simulación junto con tus datos de contacto para que un asesor de Capitalta pueda ayudarte a ajustar la
                estructura del crédito a tu empresa.
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
                Observa cómo se distribuyen capital e intereses durante la vida del crédito. Se muestran los primeros 12 meses y los últimos
                3 para una vista resumida; en el PDF encontrarás la tabla completa.
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
                    {filasTabla.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Ajusta el monto, plazo y tasa dentro de los rangos permitidos para ver la amortización estimada.
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
            </Stack>
          </Grid>
        </Grid>
      </ContainerWrapper>
    </>
  );
}
