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
  const palette = theme.vars ? theme.vars.palette : theme.palette;
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

      const raw = await verifyResponse.text();
      let verifyResult = {};
      try {
        verifyResult = raw ? JSON.parse(raw) : {};
      } catch {
        verifyResult = { error: raw };
      }

      if (!verifyResponse.ok) {
        setErrorMsg(verifyResult.error || 'Error al verificar código');
        return;
      }

      router.push('/auth/login?verified=true&email=' + encodeURIComponent(email));
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
            sx={{ '& input:focus-visible': { borderColor: `${palette.primary.main} !important`, borderWidth: '2px !important' } }}
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
                    borderColor: palette.divider,
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
