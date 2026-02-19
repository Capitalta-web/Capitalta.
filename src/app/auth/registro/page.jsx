'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { IconEye, IconEyeOff } from '@tabler/icons-react';
import OtpInput from 'react-otp-input';

import ContainerWrapper from '@/components/ContainerWrapper';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { sendOtpAction, verifyOtpAction, updateUserAndCreateRequestAction, resendOtpAction } from './actions';

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
  const router = useRouter();
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

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

  // Password fields
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // OTP fields
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [errorPaso, setErrorPaso] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  // Guardamos el userId obtenido en la verificación OTP para evitar llamadas a getUser() que puedan fallar por red
  const [verifiedUserId, setVerifiedUserId] = useState(null);

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

  // Timer effect
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const pasos = ['Monto y plazo', 'Tipo de cliente', 'Datos personales', 'Verificación de correo', 'Confirmación'];

  const puedeVolver = paso > 0 && !loading;
  const esUltimoPaso = paso === pasos.length - 1;

  const manejarSiguiente = async () => {
    if (loading) return;
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
      if (!nombre || !apellido || !email || !telefono || !password || !confirmPassword) {
        setErrorPaso('Por favor completa todos los campos requeridos (Nombre, Apellido, Email, Teléfono, Contraseña).');
        return;
      }

      if (password.length < 6) {
        setErrorPaso('La contraseña debe tener al menos 6 caracteres.');
        return;
      }

      if (password !== confirmPassword) {
        setErrorPaso('Las contraseñas no coinciden. Por favor verifícalas.');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorPaso('Ingresa un correo electrónico válido.');
        return;
      }

      setLoading(true);
      
      // Enviamos todos los datos necesarios para crear el usuario en el paso de OTP
      const cleanEmail = email.trim().toLowerCase();
      
      try {
        const response = await sendOtpAction(
          cleanEmail, 
          password, 
          {
            full_name: `${nombre} ${apellido}`,
            tipo_persona: tipoCliente,
            empresa: empresa || null,
            rfc: rfc || null,
            telefono: telefono || null
          }
        );
        
        if (response.error) {
          setErrorPaso(response.error);
          setLoading(false);
          return;
        }

        // Si la respuesta incluye una sesión, el usuario fue auto-confirmado (o "Confirm Email" está desactivado)
        if (response.data?.session) {
          console.log('Usuario auto-confirmado, saltando OTP');
          const supabase = createSupabaseBrowserClient();
          await supabase.auth.setSession(response.data.session);
          setVerifiedUserId(response.data.user.id);
          setLoading(false);
          // Saltamos el paso de OTP (índice 3) y vamos directo a confirmación (índice 4)
          setPaso(4);
          return;
        }
        
        setOtpSent(true);
        setTimer(60);
        setCanResend(false);
      } catch (err) {
        console.error(err);
        setErrorPaso('Ocurrió un error al enviar el código. Inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    }

    if (paso === 3) {
      if (!otp || otp.length < 6) {
        setErrorPaso('Ingresa el código completo.');
        return;
      }

      setLoading(true);
      // const supabase = createSupabaseBrowserClient();
      // const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' });
      
      const { success, session, user, error } = await verifyOtpAction({ email, token: otp, type: 'signup' });

      if (error || !success) {
        setLoading(false);
        setErrorPaso('Código inválido o expirado.');
        return;
      }

      // Guardamos la sesión en el cliente para mantener el estado de autenticación
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.setSession(session);
      
      // Guardamos el ID verificado para usarlo en el paso final sin depender de la red
      if (user && user.id) {
        setVerifiedUserId(user.id);
      }

      // NO actualizamos perfil aquí para evitar errores de red.
      // Lo haremos en el paso final (handleSubmit) usando Server Action.
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

  const handleSubmit = async () => {
    setLoading(true);
    setSubmitError('');

    try {
      // Usamos el ID verificado en el paso anterior si está disponible
      let targetUserId = verifiedUserId;

      if (!targetUserId) {
        // Fallback: Intentar obtener usuario de la sesión (puede fallar si hay problemas de red)
        const supabase = createSupabaseBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) targetUserId = user.id;
      }

      if (!targetUserId) throw new Error('No se pudo identificar al usuario. Por favor recarga la página.');

      // Usamos Server Action para actualizar perfil y crear solicitud (evita CORS/Fetch errors)
      const { error: actionError } = await updateUserAndCreateRequestAction({
          userId: targetUserId,
          userData: {
            password,
            metadata: {
                full_name: `${nombre} ${apellido}`,
                tipo_persona: tipoCliente,
                empresa: empresa || null,
                rfc: rfc || null,
                telefono: telefono || null
            }
          },
          requestData: {
            monto_solicitado: montoAjustado,
            plazo_meses: plazoAjustado,
            tipo_credito: 'simple', 
            detalles: {
                pago_mensual: pagoMensual,
                tasa_anual: TASA_ANUAL
            },
            estatus: 'pendiente'
          }
      });

      if (actionError) throw new Error(actionError);

      setSubmitError('¡Cuenta creada y solicitud enviada con éxito! Redirigiendo...');
      setTimeout(() => {
        router.push('/dashboard/client');
      }, 2000);

    } catch (err) {
      console.error(err);
      setSubmitError(err.message || 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
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
            helperText={tipoCliente === 'persona_moral' ? 'Requerido' : 'Opcional'}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="RFC"
            value={rfc}
            onChange={(event) => setRfc(event.target.value)}
            required={tipoCliente === 'persona_moral'}
            fullWidth
            helperText={tipoCliente === 'persona_moral' ? 'Requerido' : 'Opcional'}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Confirmar Contraseña"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
           {/* Dynamic Password Feedback */}
           <Typography 
             variant="caption" 
             sx={{ 
               color: password && password.length >= 6 ? 'success.main' : 'text.secondary',
               display: 'flex',
               alignItems: 'center',
               gap: 0.5
             }}
           >
             {password && password.length >= 6 ? '✓ ' : '• '} 
             Mínimo 6 caracteres
           </Typography>
        </Grid>
      </Grid>
    </Stack>
  );

  const handleResend = async () => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    
    // Usamos acción específica de reenvío
    const { error, message } = await resendOtpAction(cleanEmail);
    setLoading(false);
    
    if (error) {
      setErrorPaso(error); // error is a string
    } else {
      setOtpSent(true);
      setTimer(60);
      setCanResend(false);
      // Opcional: mostrar mensaje de éxito
    }
  };

  const renderPaso4 = () => (
    <Stack spacing={3}>
      <Typography variant="h5">Paso 4: Verificación de correo</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 600 }}>
        Te enviamos un correo a <strong>{email}</strong> con un enlace de acceso y un código de verificación. Puedes hacer clic en el enlace para ir directo a tu panel o ingresar el código aquí si lo prefieres.
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="tel"
          shouldAutoFocus
          containerStyle={{ gap: downSM ? 4 : 8, justifyContent: 'center' }}
          inputStyle={{
            width: downSM ? 32 : 45,
            height: downSM ? 40 : 56,
            fontSize: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderStyle: 'solid',
            outline: 'none',
            borderColor: theme.vars.palette.divider
          }}
          renderInput={(props) => <input {...props} />}
        />
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ¿No recibiste el código?
        </Typography>
        <Button 
            disabled={!canResend || loading} 
            onClick={handleResend}
            variant="text"
            sx={{ mt: 1 }}
        >
            {canResend ? 'Reenviar código' : `Reenviar en ${timer}s`}
        </Button>
      </Box>
    </Stack>
  );

  const renderPaso5 = () => (
    <Stack spacing={3}>
      <Typography variant="h5">Paso 5: Confirmación</Typography>
      <Typography variant="h4">¡Todo listo para crear tu cuenta!</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 640 }}>
        Revisa los detalles de tu solicitud. Al confirmar, se creará tu cuenta y un asesor revisará tu información.
      </Typography>

      {submitError && (
        <Alert severity={submitError.includes('éxito') ? 'success' : 'error'} sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

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

      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mt: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
          disabled={loading}
          size="large"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Procesando...' : 'Finalizar y Crear Cuenta'}
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
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errorPaso}
                  </Alert>
                )}
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', pt: 1 }}>
                  <Button variant="text" disabled={!puedeVolver} onClick={manejarAtras}>
                    Atrás
                  </Button>
                  {!esUltimoPaso && (
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={manejarSiguiente}
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                      {loading ? 'Procesando...' : 'Siguiente'}
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
