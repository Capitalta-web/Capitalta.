'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Added

// @mui
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert'; // Added
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { useForm } from 'react-hook-form';

// @project
import { emailSchema, passwordSchema, firstNameSchema, lastNameSchema } from '@/utils/validationSchema';

// @assets
import { CloseEye, OpenEye } from '@/icons';

/***************************  AUTH - REGISTER  ***************************/

export default function AuthRegister({ inputSx }) {
  const theme = useTheme();
  const palette = theme.vars ? theme.vars.palette : theme.palette;
  const router = useRouter(); // Added
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
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
    if (data.password !== data.confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      // Llamar a nuestro endpoint /api/auth/signup (que envía email con OTP)
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          options: {
            data: {
              full_name: `${data.firstname} ${data.lastname}`,
              avatar_url: ''
            }
          }
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMsg(result.error || 'Error al registrarse');
        return;
      }

      // Si el signup fue exitoso, ir a página de verificación OTP
      // Pasar el email para que se muestre en el formulario de verificación
      router.push(`/auth/otp-verification?email=${encodeURIComponent(data.email)}`);
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
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              First Name
            </Typography>
            <OutlinedInput
              {...register('firstname', firstNameSchema)}
              placeholder="First name"
              slotProps={{ input: { 'aria-label': 'First name' } }}
              error={errors.firstname && Boolean(errors.firstname)}
              sx={{ ...inputSx, width: 1 }}
            />
            {errors.firstname?.message && (
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.firstname?.message}
              </Typography>
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Last Name
            </Typography>
            <OutlinedInput
              {...register('lastname', lastNameSchema)}
              placeholder="Last name"
              slotProps={{ input: { 'aria-label': 'Last name' } }}
              error={errors.lastname && Boolean(errors.lastname)}
              sx={{ ...inputSx, width: 1 }}
            />
            {errors.lastname?.message && (
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.lastname?.message}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Stack sx={{ gap: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Email
          </Typography>
          <OutlinedInput
            {...register('email', emailSchema)}
            placeholder="example@gmail.com"
            slotProps={{ input: { 'aria-label': 'Email Address' } }}
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
            Create Password
          </Typography>
          <OutlinedInput
            {...register('password', passwordSchema)}
            type={isOpen ? 'text' : 'password'}
            placeholder="Choose a password"
            slotProps={{ input: { 'aria-label': 'Password' } }}
            error={errors.password && Boolean(errors.password)}
            endAdornment={
              <IconButton disableRipple onClick={() => setIsOpen(!isOpen)} rel="noopener noreferrer" aria-label="eye">
                {isOpen ? <OpenEye color={palette.grey[700]} /> : <CloseEye color={palette.grey[700]} />}
              </IconButton>
            }
            sx={inputSx}
          />
        </Stack>
        <Stack sx={{ gap: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Confirm Password
          </Typography>
          <OutlinedInput
            {...register('confirmPassword', passwordSchema)}
            type={isOpenConfirm ? 'text' : 'password'}
            placeholder="Re-enter your password"
            slotProps={{ input: { 'aria-label': 'Confirm Password' } }}
            error={errors.password && Boolean(errors.password)}
            endAdornment={
              <IconButton disableRipple onClick={() => setIsOpenConfirm(!isOpenConfirm)} rel="noopener noreferrer" aria-label="eye">
                {isOpenConfirm ? <OpenEye color={palette.grey[700]} /> : <CloseEye color={palette.grey[700]} />}
              </IconButton>
            }
            sx={inputSx}
          />
        </Stack>
        <Button fullWidth type="submit" color="primary" variant="contained" disabled={isLoading} sx={{ mt: { xs: 0.5, sm: 1.5 } }}>
          {isLoading ? 'Creando cuenta...' : 'Sign Up'}
        </Button>
      </Stack>
    </form>
  );
}

AuthRegister.propTypes = { inputSx: PropTypes.any };
