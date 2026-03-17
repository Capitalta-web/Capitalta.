'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!password || password.length < 8) {
      setErrorMsg('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        setErrorMsg('Error de configuración de Supabase.');
        return;
      }

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        setErrorMsg('La sesión de recuperación no es válida. Abre de nuevo el enlace del correo.');
        return;
      }

      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setErrorMsg(error.message);
        return;
      }

      setSuccessMsg('Contraseña actualizada. Ahora puedes iniciar sesión.');
      setTimeout(() => router.push('/auth/login'), 1200);
    } catch (err) {
      setErrorMsg(err?.message || 'Ocurrió un error inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 8 }}>
      <Container maxWidth="sm">
        <Stack spacing={2.5}>
          <Stack spacing={1}>
            <Typography variant="h3">Crear nueva contraseña</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Define una contraseña nueva para tu cuenta.
            </Typography>
          </Stack>

          {successMsg && <Alert severity="success">{successMsg}</Alert>}
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          <form onSubmit={onSubmit}>
            <Stack spacing={2}>
              <Stack spacing={0.75}>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                  Nueva contraseña
                </Typography>
                <OutlinedInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Stack>
              <Stack spacing={0.75}>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                  Confirmar contraseña
                </Typography>
                <OutlinedInput
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Stack>
              <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar contraseña'}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Container>
    </Box>
  );
}

