'use client';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ContainerWrapper from '@/components/ContainerWrapper';
import { horasDisponibles, sucursalesMock, obtenerProximasFechas, generarCodigoCita } from '@/utils/citas';

// export const metadata = {
//   title: 'Agendar cita presencial | Capitalta'
// };

function formatoFecha(fecha) {
  return new Intl.DateTimeFormat('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }).format(fecha);
}

function formatoMoneda(valor) {
  if (!valor || Number.isNaN(valor)) {
    return '--';
  }

  return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

export default function NuevaCitaPage() {
  const [paso, setPaso] = useState(0);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [sucursalId, setSucursalId] = useState('');
  const [confirmacionAsistencia, setConfirmacionAsistencia] = useState(false);
  const [codigoCita, setCodigoCita] = useState('');
  const [errorPaso, setErrorPaso] = useState('');

  const montoAprobado = 500000;
  const tipoCredito = 'Crédito Simple';

  const esElegible = true;

  const fechasDisponibles = useMemo(() => obtenerProximasFechas(), []);

  const sucursalSeleccionada = useMemo(() => sucursalesMock.find((sucursal) => sucursal.id === sucursalId) || null, [sucursalId]);

  const esUltimoPaso = paso === 3;
  const puedeVolver = paso > 0;

  const manejarSiguiente = () => {
    setErrorPaso('');

    if (!esElegible) {
      setErrorPaso('Tu crédito aún no está aprobado para agendar una cita.');
      return;
    }

    if (paso === 0) {
      if (!fechaSeleccionada || !horaSeleccionada) {
        setErrorPaso('Selecciona una fecha y un horario disponible.');
        return;
      }
    }

    if (paso === 1) {
      if (!sucursalSeleccionada) {
        setErrorPaso('Selecciona la sucursal donde deseas acudir.');
        return;
      }
    }

    if (paso === 2) {
      if (!confirmacionAsistencia) {
        setErrorPaso('Debes confirmar que asistirás a la cita para poder agendarla.');
        return;
      }

      if (fechaSeleccionada && horaSeleccionada && sucursalSeleccionada) {
        const codigo = generarCodigoCita(fechaSeleccionada, horaSeleccionada);
        setCodigoCita(codigo);
      }
    }

    if (paso < 3) {
      setPaso((valor) => valor + 1);
    }
  };

  const manejarAtras = () => {
    setErrorPaso('');
    if (paso > 0) {
      setPaso((valor) => valor - 1);
    }
  };

  const renderPaso0 = () => (
    <Stack spacing={3}>
      <Typography variant="h5">Paso 1: Selecciona fecha y horario</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 640 }}>
        Elige la fecha y el horario en el que deseas acudir a la sucursal para firmar tu contrato y entregar las garantías. Mostramos solo
        días hábiles y horarios de atención.
      </Typography>

      <Stack spacing={2}>
        <Typography variant="subtitle2">Fecha</Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
          {fechasDisponibles.map((fecha) => {
            const seleccionada = fechaSeleccionada && fecha.toDateString() === fechaSeleccionada.toDateString();

            return (
              <Chip
                key={fecha.toISOString()}
                label={formatoFecha(fecha)}
                color={seleccionada ? 'primary' : 'default'}
                variant={seleccionada ? 'filled' : 'outlined'}
                onClick={() => {
                  setFechaSeleccionada(fecha);
                  setHoraSeleccionada('');
                  setErrorPaso('');
                }}
              />
            );
          })}
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="subtitle2">Horario</Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
          {horasDisponibles.map((hora) => {
            const seleccionada = horaSeleccionada === hora;

            return (
              <Button
                key={hora}
                size="small"
                variant={seleccionada ? 'contained' : 'outlined'}
                onClick={() => {
                  setHoraSeleccionada(hora);
                  setErrorPaso('');
                }}
                disabled={!fechaSeleccionada}
              >
                {hora}
              </Button>
            );
          })}
        </Stack>
        {!fechaSeleccionada && (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Primero selecciona una fecha para ver los horarios disponibles.
          </Typography>
        )}
      </Stack>
    </Stack>
  );

  const renderPaso1 = () => (
    <Stack spacing={3}>
      <Typography variant="h5">Paso 2: Selecciona sucursal</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 640 }}>
        Elige la sucursal de Capitalta donde te resulta más conveniente acudir. Podrás ver la dirección y datos de contacto de cada
        ubicación.
      </Typography>
      <Grid container spacing={2}>
        {sucursalesMock.map((sucursal) => {
          const seleccionada = sucursal.id === sucursalId;

          return (
            <Grid item xs={12} md={6} key={sucursal.id}>
              <Box
                onClick={() => {
                  setSucursalId(sucursal.id);
                  setErrorPaso('');
                }}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: seleccionada ? 'primary.main' : 'grey.200',
                  bgcolor: seleccionada ? 'primary.lighter' : 'background.paper',
                  cursor: 'pointer',
                  height: '100%'
                }}
              >
                <Stack spacing={0.75}>
                  <Typography variant="subtitle1">{sucursal.nombre}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {sucursal.direccion}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {sucursal.ciudad}, {sucursal.estado}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Tel. {sucursal.telefono}
                  </Typography>
                  {seleccionada && <Chip size="small" label="Seleccionada" color="primary" sx={{ alignSelf: 'flex-start', mt: 0.5 }} />}
                </Stack>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );

  const renderPaso2 = () => (
    <Stack spacing={3}>
      <Typography variant="h5">Paso 3: Revisa y confirma</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 640 }}>
        Confirma que los datos de tu cita son correctos. Esta información se utilizará para coordinar la firma del contrato y la entrega de
        garantías.
      </Typography>

      <Box
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'grey.200',
          bgcolor: 'background.paper'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Fecha y hora
            </Typography>
            <Typography variant="body2">
              {fechaSeleccionada ? formatoFecha(fechaSeleccionada) : '--'} {horaSeleccionada || ''}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Sucursal
            </Typography>
            <Typography variant="body2">{sucursalSeleccionada?.nombre || '--'}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {sucursalSeleccionada?.direccion}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Crédito aprobado
            </Typography>
            <Typography variant="body2">
              {tipoCredito} · {formatoMoneda(montoAprobado)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Documentos sugeridos
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Identificación oficial, comprobante de domicilio, documentación del inmueble y avalúo, si aplica.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={confirmacionAsistencia}
            onChange={(event) => {
              setConfirmacionAsistencia(event.target.checked);
              setErrorPaso('');
            }}
          />
        }
        label="Confirmo que asistiré puntualmente a esta cita y llevaré la documentación requerida."
      />
    </Stack>
  );

  const renderPaso3 = () => (
    <Stack spacing={3}>
      <Typography variant="h5">Paso 4: Cita confirmada</Typography>
      <Typography variant="h4">Tu cita presencial ha sido agendada</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 640 }}>
        Te hemos enviado un correo con los detalles de tu cita y las instrucciones para el día de la firma. Conserva tu código de cita, ya
        que lo utilizaremos para dar seguimiento a tu proceso.
      </Typography>

      <Box
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'grey.200',
          bgcolor: 'background.paper'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Código de cita
            </Typography>
            <Typography variant="h6">{codigoCita || 'CAP-XXXX-XXXXXX'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Fecha y hora
            </Typography>
            <Typography variant="body2">
              {fechaSeleccionada ? formatoFecha(fechaSeleccionada) : '--'} {horaSeleccionada || ''}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Sucursal
            </Typography>
            <Typography variant="body2">{sucursalSeleccionada?.nombre || '--'}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {sucursalSeleccionada?.direccion}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Crédito
            </Typography>
            <Typography variant="body2">
              {tipoCredito} · {formatoMoneda(montoAprobado)}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
        <Button variant="contained" color="primary">
          Descargar comprobante de cita
        </Button>
        <Button variant="outlined" color="primary" href="/mi-cuenta/citas">
          Volver a mis citas
        </Button>
      </Stack>
    </Stack>
  );

  let contenidoPaso;

  if (paso === 0) {
    contenidoPaso = renderPaso0();
  } else if (paso === 1) {
    contenidoPaso = renderPaso1();
  } else if (paso === 2) {
    contenidoPaso = renderPaso2();
  } else {
    contenidoPaso = renderPaso3();
  }

  const pasos = ['Fecha y horario', 'Sucursal', 'Confirmación', 'Cita confirmada'];

  return (
    <Box
      sx={{
        bgcolor: 'grey.50',
        minHeight: '100vh',
        py: { xs: 5, sm: 7 }
      }}
    >
      <ContainerWrapper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Stack spacing={2.5} sx={{ position: 'sticky', top: 104 }}>
              <Typography variant="overline" sx={{ letterSpacing: 1 }}>
                Mi cuenta
              </Typography>
              <Typography variant="h3">Agendar cita presencial</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Completa estos pasos para elegir fecha, horario y sucursal para tu cita presencial. Esta visita es obligatoria para
                formalizar tu crédito con Capitalta.
              </Typography>
              {!esElegible && (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'warning.main',
                    bgcolor: 'warning.lighter'
                  }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Aún no puedes agendar una cita
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Tu crédito sigue en revisión. Te notificaremos por correo cuando esté aprobado para que puedas agendar tu cita
                    presencial.
                  </Typography>
                </Box>
              )}
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Progreso</Typography>
                <Stack spacing={0.75}>
                  {pasos.map((etiqueta, indice) => (
                    <Stack
                      key={etiqueta}
                      direction="row"
                      sx={{
                        alignItems: 'center',
                        gap: 1.5,
                        opacity: indice > paso ? 0.6 : 1
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          border: '2px solid',
                          borderColor: indice === paso ? 'primary.main' : indice < paso ? 'success.main' : 'grey.300',
                          bgcolor: indice < paso ? 'success.light' : 'background.paper',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12
                        }}
                      >
                        {indice + 1}
                      </Box>
                      <Typography variant="body2">{etiqueta}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                bgcolor: 'background.paper'
              }}
            >
              <Stack spacing={3}>
                {contenidoPaso}
                {errorPaso && (
                  <Typography variant="caption" sx={{ color: 'error.main' }}>
                    {errorPaso}
                  </Typography>
                )}
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', pt: 1 }}>
                  <Button variant="text" disabled={!puedeVolver} onClick={manejarAtras}>
                    Atrás
                  </Button>
                  {!esUltimoPaso && (
                    <Button variant="contained" color="primary" onClick={manejarSiguiente}>
                      {paso === 2 ? 'Confirmar cita' : 'Siguiente'}
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </ContainerWrapper>
    </Box>
  );
}
