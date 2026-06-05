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
import { createSupabaseBrowserClient } from '@/utils/supabaseClient'; // Corrected

// @assets
import { CloseEye, OpenEye } from '@/icons';

/***************************  AUTH - REGISTER  ***************************/

export default function AuthRegister({ inputSx }) {
  const theme = useTheme();
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
      setErrorMsg('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setErrorMsg('Supabase configuration error');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: `${data.firstname} ${data.lastname}`,
            avatar_url: ''
          }
        }
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push('/auth/login?registered=true');
        reset();
      }
    } catch (err) {
      setErrorMsg('Unexpected error occurred');
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
                {isOpen ? <OpenEye color={theme.vars.palette.grey[700]} /> : <CloseEye color={theme.vars.palette.grey[700]} />}
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
                {isOpenConfirm ? <OpenEye color={theme.vars.palette.grey[700]} /> : <CloseEye color={theme.vars.palette.grey[700]} />}
              </IconButton>
            }
            sx={inputSx}
          />
        </Stack>
        <Button fullWidth type="submit" color="primary" variant="contained" sx={{ mt: { xs: 0.5, sm: 1.5 } }}>
          Sign Up
        </Button>
      </Stack>
    </form>
  );
}

AuthRegister.propTypes = { inputSx: PropTypes.any };
