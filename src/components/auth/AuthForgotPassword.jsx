'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { useForm } from 'react-hook-form';

// @project
import { emailSchema } from '@/utils/validationSchema';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

/***************************  AUTH - FORGOT PASSWORD  ***************************/

export default function AuthForgotPassword({ inputSx }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        setErrorMsg('Error de configuración de Supabase.');
        return;
      }

      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, { redirectTo });
      if (error) {
        setErrorMsg(error.message);
        return;
      }

      setSuccessMsg('Te enviamos un correo para restablecer tu contraseña. Revisa tu bandeja de entrada y spam.');
      reset();
    } catch (err) {
      setErrorMsg(err?.message || 'Ocurrió un error inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 2 }}>
        {successMsg && <Alert severity="success">{successMsg}</Alert>}
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <Stack sx={{ gap: 0.5 }}>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          Email
        </Typography>
        <OutlinedInput
          {...register('email', emailSchema)}
          placeholder="example@gmail.com"
          slotProps={{ input: { 'aria-label': 'Email address' } }}
          error={errors.email && Boolean(errors.email)}
          sx={{ ...inputSx }}
        />
        {errors.email?.message && (
          <Typography variant="caption" sx={{ color: 'error.main' }}>
            {errors.email?.message}
          </Typography>
        )}
        </Stack>
      </Stack>
      <Button fullWidth type="submit" color="primary" variant="contained" disabled={isLoading} sx={{ mt: { xs: 3, sm: 4 } }}>
        {isLoading ? 'Enviando...' : 'Enviar enlace'}
      </Button>
    </form>
  );
}

AuthForgotPassword.propTypes = { inputSx: PropTypes.any };
