'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
  FormControlLabel,
  Switch,
  } from '@mui/material';
import { IconMail, IconPhone, IconBell } from '@tabler/icons-react';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

export default function ConfiguracionPage() {
  // eslint-disable-next-line no-unused-vars
  const supabase = createSupabaseBrowserClient();

  const [config, setConfig] = useState({
    email_notificaciones: 'contacto@capitalta.mx',
    telefono_notificaciones: '',
    notificaciones_nuevas_solicitudes: true,
    notificaciones_documentos: true,
    resumen_diario: true,
    resumen_semanal: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);

        // Get admin config from localStorage or use defaults
        const savedConfig = localStorage.getItem('admin_notifications_config');
        if (savedConfig) {
          setConfig(JSON.parse(savedConfig));
        }

        setError(null);
      } catch (err) {
        console.error('Error loading config:', err);
        setError('Error al cargar la configuración');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      // Validate email
      if (!config.email_notificaciones || !config.email_notificaciones.includes('@')) {
        setError('Por favor ingresa un email válido');
        setSaving(false);
        return;
      }

      // Save to localStorage
      localStorage.setItem('admin_notifications_config', JSON.stringify(config));

      // Also save to Supabase if needed
      // For now, localStorage is sufficient

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error saving config:', err);
      setError('Error al guardar la configuración');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Configuración de Notificaciones
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Configura dónde y cuándo recibir notificaciones sobre solicitudes de crédito
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(false)}>
          ✓ Configuración guardada exitosamente
        </Alert>
      )}

      {/* Contacto Section */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconMail size={20} /> Información de Contacto
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Dónde se enviarán las notificaciones
            </Typography>
          </Box>

          <Divider />

          {/* Email */}
          <TextField
            fullWidth
            label="Email para Notificaciones"
            type="email"
            value={config.email_notificaciones}
            onChange={(e) => handleChange('email_notificaciones', e.target.value)}
            placeholder="admin@capitalta.mx"
            helperText="Email donde se recibirán las notificaciones automáticas"
            disabled={saving}
            InputProps={{
              startAdornment: <IconMail size={18} style={{ marginRight: 8 }} />
            }}
          />

          {/* Phone */}
          <TextField
            fullWidth
            label="Teléfono (Opcional)"
            type="tel"
            value={config.telefono_notificaciones}
            onChange={(e) => handleChange('telefono_notificaciones', e.target.value)}
            placeholder="+52 1234567890"
            helperText="Para notificaciones por SMS (si lo configuras en el futuro)"
            disabled={saving}
            InputProps={{
              startAdornment: <IconPhone size={18} style={{ marginRight: 8 }} />
            }}
          />
        </Stack>
      </Card>

      {/* Notificaciones Section */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconBell size={20} /> Tipos de Notificaciones
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Selecciona qué eventos deseas que generen notificaciones
            </Typography>
          </Box>

          <Divider />

          {/* Event-based Notifications */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Eventos Inmediatos
            </Typography>
            <Stack spacing={1.5}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.notificaciones_nuevas_solicitudes}
                    onChange={(e) => handleChange('notificaciones_nuevas_solicitudes', e.target.checked)}
                    disabled={saving}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Nueva Solicitud de Crédito
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Notificación inmediata cuando un cliente registra una solicitud
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={config.notificaciones_documentos}
                    onChange={(e) => handleChange('notificaciones_documentos', e.target.checked)}
                    disabled={saving}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Documento Cargado
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Notificación cuando un cliente carga documentos requeridos
                    </Typography>
                  </Box>
                }
              />
            </Stack>
          </Box>

          <Divider />

          {/* Summary Notifications */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Resúmenes Periódicos
            </Typography>
            <Stack spacing={1.5}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.resumen_diario}
                    onChange={(e) => handleChange('resumen_diario', e.target.checked)}
                    disabled={saving}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Resumen Diario (9:00 AM)
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Resumen de solicitudes pendientes, aprobadas y rechazadas del día
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={config.resumen_semanal}
                    onChange={(e) => handleChange('resumen_semanal', e.target.checked)}
                    disabled={saving}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Resumen Semanal (Lunes 8:00 AM)
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Resumen de la semana con métricas y tendencias de solicitudes
                    </Typography>
                  </Box>
                }
              />
            </Stack>
          </Box>
        </Stack>
      </Card>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? <CircularProgress size={24} /> : 'Guardar Configuración'}
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            setConfig({
              email_notificaciones: 'contacto@capitalta.mx',
              telefono_notificaciones: '',
              notificaciones_nuevas_solicitudes: true,
              notificaciones_documentos: true,
              resumen_diario: true,
              resumen_semanal: true,
            });
          }}
          disabled={saving}
        >
          Restaurar Defaults
        </Button>
      </Stack>

      {/* Info */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          💡 <strong>Nota:</strong> Las notificaciones por SMS estarán disponibles próximamente. Por ahora solo se envían por correo electrónico.
        </Typography>
      </Alert>
    </Box>
  );
}
