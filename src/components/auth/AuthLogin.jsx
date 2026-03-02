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

// @assets
import { CloseEye, OpenEye } from '@/icons';

/***************************  AUTH - LOGIN  ***************************/

export default function AuthLogin({ inputSx }) {
  const theme = useTheme();
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
    reset,
    formState: { errors }
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    console.log('🔵 Iniciando login con:', data.email);
    setErrorMsg('');
    setIsLoading(true);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      console.error('❌ Supabase no está configurado');
      setErrorMsg('Error de configuración de Supabase.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('🔵 Intentando autenticación...');
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) {
        console.error('❌ Error de autenticación:', error.message);
        setErrorMsg(error.message === 'Invalid login credentials' ? 'Credenciales incorrectas' : error.message);
        setIsLoading(false);
      } else {
        console.log('✅ Autenticación exitosa, obteniendo usuario...');
        // Get user and determine dashboard route
        const { data: { user } } = await supabase.auth.getUser();
        console.log('✅ Usuario:', user?.email);
        if (user) {
          console.log('🔵 Buscando perfil...');
          const { data: profile } = await supabase
            .from('profiles')
            .select('tipo_persona')
            .eq('id', user.id)
            .single();

          console.log('✅ Perfil encontrado:', profile?.tipo_persona);
          // Redirect based on user role
          const dashboard = profile?.tipo_persona === 'administrador' ? '/dashboard/admin' : '/dashboard/cliente';
          console.log('🔵 Redirigiendo a:', dashboard);
          router.push(dashboard);
          router.refresh();
        } else {
          console.error('❌ No se encontró usuario');
          setErrorMsg('No se pudo obtener información del usuario');
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.error('❌ Error capturado:', err);
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setErrorMsg('No se pudo conectar con el servicio de autenticación. Revisa tu conexión o configuración de Supabase.');
      } else {
        setErrorMsg('Ocurrió un error inesperado: ' + err.message);
      }
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
        <Stack sx={{ gap: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Password
          </Typography>
          <OutlinedInput
            {...register('password', passwordSchema)}
            type={isOpen ? 'text' : 'password'}
            placeholder="Enter your password"
            slotProps={{ input: { 'aria-label': 'Password' } }}
            error={errors.password && Boolean(errors.password)}
            endAdornment={
              <IconButton onClick={() => setIsOpen(!isOpen)} rel="noopener noreferrer" aria-label="eye">
                {isOpen ? <OpenEye color={theme.vars.palette.grey[700]} /> : <CloseEye color={theme.vars.palette.grey[700]} />}
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
              href=""
              sx={{ textAlign: 'right', '&:hover': { color: 'primary.dark' } }}
            >
              Forgot Password?
            </Link>
          </Stack>
        </Stack>
        <Button fullWidth type="submit" color="primary" variant="contained" disabled={isLoading} sx={{ mt: { xs: 0.5, sm: 1.5 } }}>
          {isLoading ? 'Iniciando...' : 'Sign In'}
        </Button>
      </Stack>
    </form>
  );
}

AuthLogin.propTypes = { inputSx: PropTypes.any };
