'use client';

import { useEffect, useMemo, useState } from 'react';

import { Typography, Box, Grid, Avatar, TextField, Button, Alert, Snackbar, CircularProgress, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
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
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    setNombreCompleto(userData?.nombre_completo || userData?.user_metadata?.full_name || '');
    setTelefono(userData?.telefono || userData?.user_metadata?.telefono || '');
  }, [userData]);

  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !userData?.id) return;

    setUploadingAvatar(true);
    setErrorMsg('');

    try {
      const bucket = 'avatars';
      // Asegurar bucket
      const ensureResp = await fetch('/api/storage/ensure-bucket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bucket, public: true })
      });

      if (!ensureResp.ok) throw new Error('No se pudo preparar el almacenamiento de avatares.');

      const fileExt = file.name.split('.').pop();
      const fileName = `${userData.id}/avatar_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);

      // Actualizar perfil y auth metadata
      const { error: profileError } = await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', userData.id);
      if (profileError) throw profileError;

      const { error: authError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });
      if (authError) throw authError;

      await refreshUser();
      setSuccessOpen(true);
    } catch (err) {
      setErrorMsg(err.message || 'Error al subir la imagen');
    } finally {
      setUploadingAvatar(false);
    }
  };

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
            <Box sx={{ position: 'relative', width: 100, height: 100, margin: '0 auto', mb: 2 }}>
              <Avatar
                sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: '2.5rem' }}
                src={userData?.avatar_url || userData?.user_metadata?.avatar_url || userData?.user_metadata?.picture || ''}
              >
                {userData?.nombre_completo?.charAt(0) || userData?.email?.charAt(0) || 'U'}
              </Avatar>
              {uploadingAvatar && (
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(255,255,255,0.7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                  <CircularProgress size={30} />
                </Box>
              )}
              <label htmlFor="avatar-upload">
                <input accept="image/*" id="avatar-upload" type="file" style={{ display: 'none' }} onChange={handleAvatarUpload} disabled={uploadingAvatar} />
                <IconButton
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    right: -5,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                    width: 32,
                    height: 32,
                    boxShadow: 2
                  }}
                  disabled={uploadingAvatar}
                >
                  <PhotoCameraIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </label>
            </Box>
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
