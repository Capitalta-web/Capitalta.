'use client';

import { useEffect, useMemo, useState } from 'react';

import { Typography, Box, Grid, Avatar, TextField, Button, Alert, Snackbar } from '@mui/material';
import MainCard from '@/components/MainCard';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useAuth } from '@/contexts/AuthContext';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

export default function ProfilePage() {
  const { userData } = useCurrentUser();
  const { refreshUser } = useAuth();

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [nombreCompleto, setNombreCompleto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    setNombreCompleto(userData?.nombre_completo || userData?.user_metadata?.full_name || '');
    setTelefono(userData?.telefono || userData?.user_metadata?.telefono || '');
  }, [userData]);

  const handleSave = async () => {
    setErrorMsg('');
    setIsSaving(true);
    try {
      if (!userData?.id || !supabase) {
        setErrorMsg('No se pudo identificar el usuario.');
        return;
      }

      const profileUpdate = {
        nombre_completo: nombreCompleto,
        updated_at: new Date().toISOString()
      };

      if (userData && 'telefono' in userData) {
        profileUpdate.telefono = telefono;
      }

      const { error: profileError } = await supabase.from('profiles').update(profileUpdate).eq('id', userData.id);
      if (profileError) {
        setErrorMsg(profileError.message);
        return;
      }

      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: nombreCompleto,
          nombre_completo: nombreCompleto,
          telefono
        }
      });

      if (authError) {
        setErrorMsg(authError.message);
        return;
      }

      await refreshUser();
      setSuccessOpen(true);
    } catch (err) {
      setErrorMsg(err?.message || 'Ocurrió un error inesperado.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Mi Perfil
        </Typography>
        <Typography color="text.secondary">Administra tu información personal.</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <MainCard contentSX={{ textAlign: 'center' }}>
            <Avatar sx={{ width: 100, height: 100, margin: '0 auto', mb: 2, bgcolor: 'primary.main', fontSize: '2.5rem' }}>
              {userData?.nombre_completo?.charAt(0) || userData?.email?.charAt(0) || 'U'}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {userData?.nombre_completo || 'Usuario'}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {userData?.email}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <ChipRole role={userData?.role} />
            </Box>
          </MainCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <MainCard title="Información Personal">
            <Grid container spacing={2}>
              {errorMsg && (
                <Grid item xs={12}>
                  <Alert severity="error">{errorMsg}</Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField fullWidth label="Nombre Completo" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Correo Electrónico" value={userData?.email || ''} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleSave} disabled={isSaving || !nombreCompleto}>
                  {isSaving ? 'Guardando...' : 'Guardar cambios'}
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      <Snackbar open={successOpen} autoHideDuration={2500} onClose={() => setSuccessOpen(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Perfil actualizado
        </Alert>
      </Snackbar>
    </Box>
  );
}

function ChipRole({ role }) {
  const getRoleLabel = (r) => {
    switch (r) {
      case 'admin':
        return 'Administrador';
      case 'analista':
        return 'Analista de Crédito';
      case 'cliente':
        return 'Cliente';
      default:
        return r;
    }
  };

  const getRoleColor = (r) => {
    switch (r) {
      case 'admin':
        return 'error.main';
      case 'analista':
        return 'warning.main';
      default:
        return 'primary.main';
    }
  };

  if (!role) return null;

  return (
    <Typography
      variant="caption"
      sx={{
        bgcolor: getRoleColor(role),
        color: 'white',
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        textTransform: 'uppercase',
        fontWeight: 'bold'
      }}
    >
      {getRoleLabel(role)}
    </Typography>
  );
}
