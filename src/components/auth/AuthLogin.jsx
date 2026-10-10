'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Added

// @mui
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert'; // Added
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { useForm } from 'react-hook-form';

// @project
import { emailSchema, passwordSchema } from '@/utils/validationSchema';
import { NextLink } from '../routes';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient'; // Added
import { dashboardForRole } from '@/utils/auth/roles';

// @assets
import { CloseEye, OpenEye } from '@/icons';

/***************************  AUTH - LOGIN  ***************************/

export default function AuthLogin({ inputSx }) {
  const theme = useTheme();
  const palette = theme.vars ? theme.vars.palette : theme.palette;
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added
  const [errorMsg, setErrorMsg] = useState(''); // Added

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    setErrorMsg('');
    setIsLoading(true);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setErrorMsg('Error de configuración de Supabase.');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) {
        let msg = error.message;
        if (msg === 'Invalid login credentials') msg = 'Correo o contraseña incorrectos.';
        if (msg === 'Email not confirmed') msg = 'Tu correo no ha sido confirmado. Revisa tu bandeja de entrada.';
        setErrorMsg(msg);
        return;
      } else {
        // Get user and determine dashboard route
        const {
          data: { user }
        } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

          // El rol solo se toma de profiles.role (user_metadata lo puede escribir el propio usuario).
          const dashboard = dashboardForRole(profile?.role);
          router.refresh();
          router.replace(dashboard);
        } else {
          setErrorMsg('No se pudo obtener información del usuario');
          return;
        }
      }
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setErrorMsg('No se pudo conectar con el servicio de autenticación. Revisa tu conexión o configuración de Supabase.');
      } else {
        setErrorMsg('Ocurrió un error inesperado: ' + err.message);
      }
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 2.5 }}>
        {registered && <Alert severity="success">Registro exitoso. Por favor inicia sesión.</Alert>}
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <Stack sx={{ gap: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Email
          </Typography>
          <OutlinedInput
            {...register('email', emailSchema)}
            placeholder="example@gmail.com"
            slotProps={{ input: { 'aria-label': 'Correo electrónico' } }}
            error={errors.email && Boolean(errors.email)}
            sx={{ ...inputSx }}
          />
          {errors.email?.message && (
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              {errors.email?.message}
            </Typography>
          )}
        </Stack>
        <Stack sx={{ gap: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Contraseña
          </Typography>
          <OutlinedInput
            {...register('password', passwordSchema)}
            type={isOpen ? 'text' : 'password'}
            placeholder="Enter your password"
            slotProps={{ input: { 'aria-label': 'Contraseña' } }}
            error={errors.password && Boolean(errors.password)}
            endAdornment={
              <IconButton onClick={() => setIsOpen(!isOpen)} rel="noopener noreferrer" aria-label="Mostrar u ocultar contraseña">
                {isOpen ? <OpenEye color={palette.grey[700]} /> : <CloseEye color={palette.grey[700]} />}
              </IconButton>
            }
            sx={inputSx}
          />
          <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: errors.password?.message ? 'space-between' : 'flex-end', width: 1 }}
          >
            {errors.password?.message && (
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.password?.message}
              </Typography>
            )}
            <Link
              component={NextLink}
              underline="hover"
              variant="caption2"
              href="/auth/forgot-password"
              sx={{ textAlign: 'right', '&:hover': { color: 'primary.dark' } }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Stack>
        </Stack>
        <Button fullWidth type="submit" color="primary" variant="contained" disabled={isLoading} sx={{ mt: { xs: 0.5, sm: 1.5 } }}>
          {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
        </Button>
      </Stack>
    </form>
  );
}

AuthLogin.propTypes = { inputSx: PropTypes.any };
