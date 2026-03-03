'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { useForm, Controller } from 'react-hook-form';
import OtpInput from 'react-otp-input';

// @project
import { otpSchema } from '@/utils/validationSchema';

/***************************  AUTH - OTP VERIFICATION  ***************************/

export default function AuthOtpVerification() {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');

  // Obtener email del query param
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  // Initialize react-hook-form
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    if (!email) {
      setErrorMsg('Email no encontrado');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      // 1. Llamar a endpoint de verificación OTP
      const verifyResponse = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          code: data.otp
        })
      });

      const verifyResult = await verifyResponse.json();

      if (!verifyResponse.ok) {
        setErrorMsg(verifyResult.error || 'Error al verificar código');
        return;
      }

      // 2. Si el OTP es válido, confirmar email en Supabase (email_confirm: true)
      const confirmResponse = await fetch('/api/auth/confirm-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      });

      const confirmResult = await confirmResponse.json();

      if (!confirmResponse.ok) {
        console.error('Error confirming email:', confirmResult.error);
        // Continuamos aunque falle, el usuario puede intentar login
      } else {
        console.log('Email confirmado exitosamente en Supabase');
      }

      // 3. Éxito - redirigir a dashboard
      // El endpoint de confirmación ya activó la cuenta.
      // Sin embargo, para entrar al dashboard necesitamos una sesión activa.
      // Como acabamos de confirmar el email, lo ideal sería hacer login automático.
      
      // Intento de login automático (opcional, si no redirigir a login)
      try {
        const loginResponse = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: '...' }) // No tenemos password aquí
        });
        // Como no tenemos la contraseña, enviamos al usuario al login con mensaje
        router.push('/auth/login?verified=true&email=' + encodeURIComponent(email));
      } catch (e) {
        router.push('/auth/login?verified=true');
      }
      reset();
    } catch (err) {
      setErrorMsg('Ocurrió un error inesperado');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 2.5 }}>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <Stack sx={{ gap: 0.5 }}>
          <Box
            sx={{ '& input:focus-visible': { borderColor: `${theme.vars.palette.primary.main} !important`, borderWidth: '2px !important' } }}
          >
            <Controller
              control={control}
              name="otp"
              rules={otpSchema}
              render={({ field: { value, onChange } }) => (
                <OtpInput
                  value={value}
                  onChange={onChange}
                  numInputs={6}
                  inputType="tel"
                  shouldAutoFocus
                  disabled={isLoading}
                  containerStyle={{ gap: downSM ? 8 : 12, justifyContent: 'center' }}
                  inputStyle={{
                    width: '100%',
                    maxWidth: 66,
                    height: 56,
                    fontSize: 16,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    outline: 'none',
                    borderColor: theme.vars.palette.divider,
                    opacity: isLoading ? 0.5 : 1
                  }}
                  renderInput={(props) => <input {...props} aria-label="otp" />}
                />
              )}
            />
          </Box>
          {errors.otp?.message && (
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              {errors.otp?.message}
            </Typography>
          )}
        </Stack>
      </Stack>
      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        disabled={isLoading}
        sx={{ mt: { xs: 3, sm: 4 } }}
      >
        {isLoading ? 'Verificando...' : 'Verificar'}
      </Button>
    </form>
  );
}
