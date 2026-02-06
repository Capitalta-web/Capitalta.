'use client';

import { Typography, Box, Grid, Avatar, Divider, TextField, Button } from '@mui/material';
import MainCard from '@/components/MainCard';
import useCurrentUser from '@/hooks/useCurrentUser';

export default function ProfilePage() {
  const { userData } = useCurrentUser();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">Mi Perfil</Typography>
        <Typography color="text.secondary">Administra tu información personal.</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <MainCard contentSX={{ textAlign: 'center' }}>
            <Avatar 
              sx={{ width: 100, height: 100, margin: '0 auto', mb: 2, bgcolor: 'primary.main', fontSize: '2.5rem' }}
            >
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre Completo"
                  defaultValue={userData?.nombre_completo || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  defaultValue={userData?.email || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" disabled>
                  Guardar Cambios (Próximamente)
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}

function ChipRole({ role }) {
  const getRoleLabel = (r) => {
    switch(r) {
      case 'admin': return 'Administrador';
      case 'analista': return 'Analista de Crédito';
      case 'cliente': return 'Cliente';
      default: return r;
    }
  };

  const getRoleColor = (r) => {
    switch(r) {
      case 'admin': return 'error.main';
      case 'analista': return 'warning.main';
      default: return 'primary.main';
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
