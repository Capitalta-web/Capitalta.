'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, Grid, Switch, FormControlLabel, Divider, Alert, CircularProgress } from '@mui/material';
import MainCard from '@/components/MainCard';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

export default function ConfiguracionPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // System Config State
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // User Preferences State
  const [preferences, setPreferences] = useState({
    email_notifications: true,
    new_request_alerts: true,
    weekly_summary: false,
    two_factor_auth: false,
    force_password_change: true // This might be a system policy viewed as a toggle here?
  });

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      // 1. Fetch System Config (Maintenance Mode)
      const { data: systemConfig } = await supabase.from('system_config').select('*');

      if (systemConfig) {
        const maintMode = systemConfig.find((c) => c.key === 'maintenance_mode');
        if (maintMode) setMaintenanceMode(maintMode.value);
      }

      // 2. Fetch User Preferences (Notifications, Security)
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('preferences').eq('id', user.id).single();

        if (profile?.preferences) {
          // Merge with defaults to ensure all keys exist
          setPreferences((prev) => ({ ...prev, ...profile.preferences }));
        }
      }
    } catch (err) {
      console.error('Error loading config:', err);
      // Don't block UI on error, just log
    } finally {
      setLoading(false);
    }
  };

  const handleSystemConfigChange = async (key, value) => {
    try {
      // Optimistic update
      if (key === 'maintenance_mode') setMaintenanceMode(value);

      const { error } = await supabase.from('system_config').upsert({ key, value, updated_at: new Date() });

      if (error) throw error;
      showSuccess('Configuración del sistema actualizada');
    } catch (err) {
      console.error('Error updating system config:', err);
      setError('Error al actualizar configuración del sistema');
      // Revert optimistic update if needed (omitted for brevity)
    }
  };

  const handlePreferenceChange = (key) => async (event) => {
    const value = event.target.checked;

    // Optimistic update
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);

    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { error } = await supabase.from('profiles').update({ preferences: newPreferences, updated_at: new Date() }).eq('id', user.id);

      if (error) throw error;
      showSuccess('Preferencias actualizadas');
    } catch (err) {
      console.error('Error updating preferences:', err);
      setError('Error al actualizar preferencias');
      // Revert
      setPreferences((prev) => ({ ...prev, [key]: !value }));
    }
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Configuración
        </Typography>
        <Typography color="text.secondary">Ajustes generales del sistema y preferencias.</Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <MainCard title="Notificaciones">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={<Switch checked={preferences.email_notifications} onChange={handlePreferenceChange('email_notifications')} />}
                label="Notificaciones por correo"
              />
              <FormControlLabel
                control={<Switch checked={preferences.new_request_alerts} onChange={handlePreferenceChange('new_request_alerts')} />}
                label="Alertas de nuevas solicitudes"
              />
              <FormControlLabel
                control={<Switch checked={preferences.weekly_summary} onChange={handlePreferenceChange('weekly_summary')} />}
                label="Resumen semanal"
              />
            </Box>
          </MainCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <MainCard title="Seguridad">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={<Switch checked={preferences.two_factor_auth} onChange={handlePreferenceChange('two_factor_auth')} />}
                label="Autenticación de dos factores (2FA)"
              />
              <FormControlLabel
                control={<Switch checked={preferences.force_password_change} onChange={handlePreferenceChange('force_password_change')} />}
                label="Recordatorio de cambio de contraseña (90 días)"
              />
            </Box>
          </MainCard>
        </Grid>

        <Grid item xs={12}>
          <MainCard title="Sistema">
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Versión del Sistema: 2.0.0
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControlLabel
              control={
                <Switch checked={maintenanceMode} onChange={(e) => handleSystemConfigChange('maintenance_mode', e.target.checked)} />
              }
              label="Modo Mantenimiento"
            />
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
              Activar el modo mantenimiento impedirá el acceso a usuarios no administradores.
            </Typography>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}
