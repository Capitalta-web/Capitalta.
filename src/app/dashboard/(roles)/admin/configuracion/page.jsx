'use client';

import { Typography, Box, Grid, Switch, FormControlLabel, Divider } from '@mui/material';
import MainCard from '@/components/MainCard';

export default function ConfiguracionPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">Configuración</Typography>
        <Typography color="text.secondary">Ajustes generales del sistema.</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <MainCard title="Notificaciones">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel control={<Switch defaultChecked />} label="Notificaciones por correo" />
              <FormControlLabel control={<Switch defaultChecked />} label="Alertas de nuevas solicitudes" />
              <FormControlLabel control={<Switch />} label="Resumen semanal" />
            </Box>
          </MainCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <MainCard title="Seguridad">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel control={<Switch defaultChecked />} label="Autenticación de dos factores (2FA)" />
              <FormControlLabel control={<Switch defaultChecked />} label="Forzar cambio de contraseña cada 90 días" />
            </Box>
          </MainCard>
        </Grid>

        <Grid item xs={12}>
          <MainCard title="Sistema">
             <Typography color="text.secondary" sx={{ mb: 2 }}>
               Versión del Sistema: 2.0.0
             </Typography>
             <Divider sx={{ mb: 2 }} />
             <FormControlLabel control={<Switch defaultChecked />} label="Modo Mantenimiento" />
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}
