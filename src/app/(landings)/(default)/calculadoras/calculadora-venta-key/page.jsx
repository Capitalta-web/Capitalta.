'use client';

import { addMonths } from 'date-fns';
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
//   title: 'Calculadora Crédito Venta Key | Capitalta'
// };

const VALOR_MIN = 100000;
const VALOR_MAX = 5000000;
const PORCENTAJE_MIN = 30;
const PORCENTAJE_MAX = 40;
const PLAZO_MIN = 6;
const PLAZO_MAX = 18;
const TASA_APERTURA = 0.045;
const TASA_MENSUAL = 0.02;
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

function calcularPagoMensual(monto, plazo) {
  const tasaMensual = TASA_MENSUAL * (1 + IVA);

  if (!monto || !plazo || !tasaMensual) {
    return 0;
  }

  const factor = Math.pow(1 + tasaMensual, plazo);

  return (monto * tasaMensual * factor) / (factor - 1);
}

function construirTablaAmortizacion(monto, plazo) {
  const tasaMensual = TASA_MENSUAL * (1 + IVA);

  if (!monto || !plazo || !tasaMensual) {
    return [];
  }

  const pago = calcularPagoMensual(monto, plazo);
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

export default function CalculadoraVentaKeyPage() {
  const [valorInmueble, setValorInmueble] = useState(1500000);
  const [porcentajeCredito, setPorcentajeCredito] = useState(35);
  const [plazo, setPlazo] = useState(12);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [leadEnviado, setLeadEnviado] = useState(false);
  const [leadCargando, setLeadCargando] = useState(false);
  const [leadError, setLeadError] = useState('');

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

    const tasaMensual = TASA_MENSUAL * (1 + IVA);

    return montoCredito * tasaMensual;
  }, [montoCredito]);

  const pagoMensual = useMemo(() => calcularPagoMensual(montoCredito, plazoAjustado), [montoCredito, plazoAjustado]);

  const totalIntereses = pagoMensual && plazoAjustado ? pagoMensual * plazoAjustado - montoCredito : 0;
  const totalAPagar = montoCredito + comision + totalIntereses;

  const tablaCompleta = useMemo(() => construirTablaAmortizacion(montoCredito, plazoAjustado), [montoCredito, plazoAjustado]);

  const filasTabla =
    tablaCompleta.length > 15
      ? [...tablaCompleta.slice(0, 12), { mes: '...', pago: null, interes: null, capital: null, saldo: null }, ...tablaCompleta.slice(-3)]
      : tablaCompleta;

  const fechaLiquidacion = useMemo(() => {
    if (!plazoAjustado) {
      return null;
    }

    const meses = Math.max(PLAZO_MIN, plazoAjustado);

    return addMonths(new Date(), meses);
  }, [plazoAjustado]);

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
        tipo_cliente: 'PF',
        empresa: empresa || null,
        rfc: null,
        monto_solicitado: montoCredito || null,
        plazo_meses: plazoAjustado || null,
        tipo_credito: 'venta_key'
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
          monto: montoCredito,
          plazo: plazoAjustado,
          tasa_anual: 36,
          pago_mensual: pagoMensual,
          interes_total: totalIntereses,
          total_a_pagar: totalAPagar,
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
          <title>Cotización Crédito Venta Key - Capitalta</title>
        </head>
        <body style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding:24px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <img src="/assets/logos/capitalta-logo.svg" alt="Capitalta" style="height:40px;" />
              <h1 style="margin:0;font-size:20px;">Cotización Crédito Venta Key</h1>
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
                <td style="padding:4px;border:1px solid #ccc;width:30%;">Valor del inmueble</td>
                <td style="padding:4px;border:1px solid #ccc;">${formatoMoneda(valorAjustado)}</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Porcentaje de crédito</td>
                <td style="padding:4px;border:1px solid #ccc;">${porcentajeAjustado}%</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Monto de crédito</td>
                <td style="padding:4px;border:1px solid #ccc;">${formatoMoneda(montoCredito)}</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Plazo</td>
                <td style="padding:4px;border:1px solid #ccc;">${plazoAjustado} meses</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Tasa de interés mensual</td>
                <td style="padding:4px;border:1px solid #ccc;">3% + IVA</td>
              </tr>
            </tbody>
          </table>

          <h2 style="font-size:16px;margin-bottom:8px;">Resultados principales</h2>
          <table style="border-collapse:collapse;width:100%;margin-bottom:16px;font-size:12px;">
            <tbody>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;width:30%;">Comisión por apertura (4.5% + IVA)</td>
                <td style="padding:4px;border:1px solid #ccc;">${formatoMoneda(comision)}</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Interés mensual estimado</td>
                <td style="padding:4px;border:1px solid #ccc;">${formatoMoneda(interesMensual)}</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Intereses totales estimados</td>
                <td style="padding:4px;border:1px solid #ccc;">${formatoMoneda(totalIntereses)}</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Monto total a pagar</td>
                <td style="padding:4px;border:1px solid #ccc;">${formatoMoneda(totalAPagar)}</td>
              </tr>
              <tr>
                <td style="padding:4px;border:1px solid #ccc;">Fecha estimada de liquidación</td>
                <td style="padding:4px;border:1px solid #ccc;">${fechaLiquidacion ? formatearFecha(fechaLiquidacion) : '-'}</td>
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
                <Typography variant="h2">Crédito Venta Key</Typography>
                <Typography variant="body1" sx={{ maxWidth: 640 }}>
                  Simula tu esquema Venta Key con el valor real de tu inmueble, visualiza el monto de crédito, comisiones, intereses y una
                  fecha estimada de liquidación, y descarga una cotización en PDF.
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
                    <Typography variant="body2">Valor del inmueble</Typography>
                    <Typography variant="body2">
                      {formatoMoneda(VALOR_MIN)} - {formatoMoneda(VALOR_MAX)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Porcentaje de crédito</Typography>
                    <Typography variant="body2">
                      {PORCENTAJE_MIN}% a {PORCENTAJE_MAX}% del avalúo
                    </Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Plazo</Typography>
                    <Typography variant="body2">
                      {PLAZO_MIN} a {PLAZO_MAX} meses
                    </Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Interés mensual</Typography>
                    <Typography variant="body2">2% + IVA</Typography>
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
                    <Typography variant="subtitle2">Valor del inmueble</Typography>
                    <Typography variant="body2">{formatoMoneda(valorAjustado)}</Typography>
                  </Stack>
                  <Slider
                    value={Math.min(VALOR_MAX, Math.max(VALOR_MIN, valorInmueble || VALOR_MIN))}
                    min={VALOR_MIN}
                    max={VALOR_MAX}
                    step={50000}
                    onChange={(_, value) => setValorInmueble(typeof value === 'number' ? value : valorInmueble)}
                  />
                  <TextField
                    sx={{ mt: 1.5 }}
                    label="Valor del inmueble (MXN)"
                    type="number"
                    value={valorInmueble}
                    onChange={(event) => setValorInmueble(Number(event.target.value) || 0)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    helperText={`Rango permitido: ${formatoMoneda(VALOR_MIN)} a ${formatoMoneda(VALOR_MAX)}`}
                  />
                </Box>
                <Box>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2">Porcentaje de crédito</Typography>
                    <Typography variant="body2">{porcentajeAjustado}%</Typography>
                  </Stack>
                  <Slider
                    value={Math.min(PORCENTAJE_MAX, Math.max(PORCENTAJE_MIN, porcentajeCredito || PORCENTAJE_MIN))}
                    min={PORCENTAJE_MIN}
                    max={PORCENTAJE_MAX}
                    step={0.5}
                    onChange={(_, value) => setPorcentajeCredito(typeof value === 'number' ? value : porcentajeCredito)}
                  />
                  <TextField
                    sx={{ mt: 1.5 }}
                    label="Porcentaje de crédito (%)"
                    type="number"
                    value={porcentajeCredito}
                    onChange={(event) => setPorcentajeCredito(Number(event.target.value) || 0)}
                    helperText={`Rango permitido: ${PORCENTAJE_MIN}% a ${PORCENTAJE_MAX}%`}
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
                        Monto de crédito estimado
                      </Typography>
                      <Typography variant="body2">{formatoMoneda(montoCredito)}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Comisión por apertura (4.5% + IVA)
                      </Typography>
                      <Typography variant="body2">{formatoMoneda(comision)}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Interés mensual aproximado (3% + IVA)
                      </Typography>
                      <Typography variant="body2">{formatoMoneda(interesMensual)}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Intereses totales estimados
                      </Typography>
                      <Typography variant="body2">{formatoMoneda(totalIntereses)}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Total a pagar estimado
                      </Typography>
                      <Typography variant="body2">{formatoMoneda(totalAPagar)}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Fecha de liquidación estimada
                      </Typography>
                      <Typography variant="body2">{fechaLiquidacion ? formatearFecha(fechaLiquidacion) : '--'}</Typography>
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
                Guarda esta simulación Venta Key junto con tus datos de contacto para que un asesor de Capitalta pueda ayudarte a
                estructurar la operación adecuada para tu propiedad.
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
                Visualiza cómo se distribuyen capital e intereses durante el plazo seleccionado sobre el monto de crédito estimado. Se
                muestran los primeros 12 meses y los últimos 3 para una vista resumida; en el PDF encontrarás la tabla completa.
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
                            Ajusta el valor del inmueble, el porcentaje de crédito y el plazo dentro de los rangos permitidos para ver la
                            amortización estimada.
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
