'use client';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ContainerWrapper from '@/components/ContainerWrapper';

const MONTO_MIN = 30000;
const MONTO_MAX = 10000000;
const PLAZO_MIN = 3;
const PLAZO_MAX = 60;
const TASA_ANUAL = 18;

// export const metadata = {
//   title: 'Registro | Capitalta'
// };

function calcularPagoMensual(monto, plazo, tasaAnual) {
  const tasaMensual = tasaAnual / 12 / 100;

  if (!monto || !plazo || !tasaMensual) {
    return 0;
  }

  const factor = Math.pow(1 + tasaMensual, plazo);

  return (monto * tasaMensual * factor) / (factor - 1);
}

function formatoMoneda(valor) {
  if (!valor || Number.isNaN(valor)) {
    return '--';
  }

  return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

export default function RegistroWizardPage() {
  const [paso, setPaso] = useState(0);

  const [monto, setMonto] = useState(250000);
  const [plazo, setPlazo] = useState(24);

  const [tipoCliente, setTipoCliente] = useState('');

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [rfc, setRfc] = useState('');

  const [errorPaso, setErrorPaso] = useState('');

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

  const pagoMensual = useMemo(() => calcularPagoMensual(montoAjustado, plazoAjustado, TASA_ANUAL), [montoAjustado, plazoAjustado]);

  const pasos = ['Monto y plazo', 'Tipo de cliente', 'Datos personales', 'Verificación', 'Confirmación'];

  const puedeVolver = paso > 0;
  const esUltimoPaso = paso === pasos.length - 1;

  const manejarSiguiente = () => {
    setErrorPaso('');

    if (paso === 0) {
      if (!montoAjustado || !plazoAjustado) {
        setErrorPaso('Selecciona un monto y plazo dentro de los rangos permitidos.');
        return;
      }
    }

    if (paso === 1) {
      if (!tipoCliente) {
        setErrorPaso('Selecciona el tipo de cliente.');
        return;
      }
    }

    if (paso === 2) {
      if (!nombre || !apellido || !email || !telefono) {
        setErrorPaso('Nombre, apellido, email y teléfono son obligatorios.');
        return;
      }

      if (tipoCliente === 'persona_moral' && (!empresa || !rfc)) {
        setErrorPaso('Empresa y RFC son obligatorios para Persona Moral.');
        return;
      }
    }

    if (paso < pasos.length - 1) {
      setPaso((valor) => valor + 1);
    }
  };

  const manejarAtras = () => {
    setErrorPaso('');
    if (paso > 0) {
      setPaso((valor) => valor - 1);
    }
  };

  const renderPaso1 = () => (
    <Stack spacing={3}>
      <Typography variant="h5">Paso 1: Monto y plazo</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 600 }}>
        Define el monto que te interesa solicitar y el plazo estimado para tu crédito. Con esta información calculamos un pago mensual
        aproximado.
      </Typography>
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
            step={10000}
            onChange={(_, value) => setMonto(typeof value === 'number' ? value : monto)}
          />
          <TextField
            sx={{ mt: 1.5 }}
            label="Monto solicitado (MXN)"
            type="number"
            value={monto}
            onChange={(event) => setMonto(Number(event.target.value) || 0)}
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
      </Stack>

      <Box
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'grey.200',
          bgcolor: 'background.paper'
        }}
      >
        <Stack spacing={1}>
          <Typography variant="subtitle2">Pago mensual estimado</Typography>
          <Typography variant="h5">{formatoMoneda(pagoMensual)}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Estimado calculado con una tasa de referencia del {TASA_ANUAL}% anual. El monto final puede variar tras el análisis de
            Capitalta.
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );

  const renderPaso2 = () => (
    <Stack spacing={3}>
      <Typography variant="h5">Paso 2: Tipo de cliente</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 600 }}>
        Indícanos si solicitas el crédito como persona física o persona moral. Esto nos ayuda a adaptar la documentación y requisitos.
      </Typography>
      <FormControl error={Boolean(errorPaso)}>
        <FormLabel>Selecciona una opción</FormLabel>
        <RadioGroup
          value={tipoCliente}
          onChange={(event) => {
            setTipoCliente(event.target.value);
            setErrorPaso('');
          }}
        >
          <FormControlLabel value="persona_fisica" control={<Radio />} label="Persona Física" />
          <FormHelperText sx={{ ml: 4, mb: 1 }}>
            Créditos a nombre de una persona, con ingresos comprobables y garantías personales o hipotecarias.
          </FormHelperText>
          <FormControlLabel value="persona_moral" control={<Radio />} label="Persona Moral" />
          <FormHelperText sx={{ ml: 4 }}>
            Créditos a nombre de una empresa constituida, con documentación legal y fiscal actualizada.
          </FormHelperText>
        </RadioGroup>
      </FormControl>
    </Stack>
  );

  const renderPaso3 = () => (
    <Stack spacing={3}>
      <Typography variant="h5">Paso 3: Datos personales</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 600 }}>
        Compártenos tus datos básicos para que un asesor de Capitalta pueda contactarte y continuar con tu solicitud.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField label="Nombre" value={nombre} onChange={(event) => setNombre(event.target.value)} required fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Apellido" value={apellido} onChange={(event) => setApellido(event.target.value)} required fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Teléfono" value={telefono} onChange={(event) => setTelefono(event.target.value)} required fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Empresa"
            value={empresa}
            onChange={(event) => setEmpresa(event.target.value)}
            required={tipoCliente === 'persona_moral'}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="RFC"
            value={rfc}
            onChange={(event) => setRfc(event.target.value)}
            required={tipoCliente === 'persona_moral'}
            fullWidth
          />
        </Grid>
      </Grid>
    </Stack>
  );

  const renderPaso4 = () => (
    <Stack spacing={3}>
      <Typography variant="h5">Paso 4: Verificación de seguridad</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 600 }}>
        Hemos enviado un código de verificación al correo registrado {email || '(correo pendiente)'}. Ingresa el código para confirmar tu
        identidad y proteger tu información.
      </Typography>
      <Stack spacing={2}>
        <TextField label="Código OTP" placeholder="Ingresa los 6 dígitos" inputProps={{ maxLength: 6, inputMode: 'numeric' }} />
        <Button variant="text" sx={{ alignSelf: 'flex-start' }}>
          Reenviar código
        </Button>
      </Stack>
    </Stack>
  );

  const renderPaso5 = () => (
    <Stack spacing={3}>
      <Typography variant="h5">Paso 5: Confirmación</Typography>
      <Typography variant="h4">¡Bienvenido a Capitalta!</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 640 }}>
        Hemos recibido tu solicitud con los datos proporcionados. Un asesor revisará tu información y te contactará para los siguientes
        pasos, incluyendo la coordinación de tu cita presencial para firma y entrega de garantías.
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
        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
          Resumen de tu solicitud
        </Typography>
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Monto y plazo
            </Typography>
            <Typography variant="body2">
              {formatoMoneda(montoAjustado)} a {plazoAjustado} meses
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Pago mensual estimado
            </Typography>
            <Typography variant="body2">{formatoMoneda(pagoMensual)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Tipo de cliente
            </Typography>
            <Typography variant="body2">{tipoCliente === 'persona_moral' ? 'Persona Moral' : 'Persona Física'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Contacto
            </Typography>
            <Typography variant="body2">
              {nombre} {apellido}
            </Typography>
            <Typography variant="body2">{email}</Typography>
            <Typography variant="body2">{telefono}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
        <Button variant="contained" color="primary" href="/mi-cuenta">
          Ir a mi cuenta
        </Button>
        <Button variant="outlined" color="primary" href="/calculadoras/calculadora-simple">
          Descargar cotización
        </Button>
      </Stack>
    </Stack>
  );

  let contenidoPaso;

  if (paso === 0) {
    contenidoPaso = renderPaso1();
  } else if (paso === 1) {
    contenidoPaso = renderPaso2();
  } else if (paso === 2) {
    contenidoPaso = renderPaso3();
  } else if (paso === 3) {
    contenidoPaso = renderPaso4();
  } else {
    contenidoPaso = renderPaso5();
  }

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
                Registro guiado
              </Typography>
              <Typography variant="h3">Abre tu solicitud de crédito con Capitalta</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Este flujo en cinco pasos te permite avanzar de forma segura y no invasiva. Podrás ajustar tu monto y plazo, definir tu tipo
                de cliente y registrar tus datos básicos antes de agendar la cita presencial.
              </Typography>
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
                      Siguiente
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
