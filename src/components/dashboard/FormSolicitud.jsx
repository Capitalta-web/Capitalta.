'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

export default function FormSolicitud({ onSuccess, loading: externalLoading = false }) {
  const { user } = useAuth();
  const supabase = createSupabaseBrowserClient();

  const [formData, setFormData] = useState({
    monto: '',
    plazo: '24',
    tipo: 'simple',
    descripcion: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.monto || !formData.plazo || !formData.tipo) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    if (Number(formData.monto) <= 0) {
      setError('El monto debe ser mayor a 0');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: insertError } = await supabase
        .from('solicitudes')
        .insert([
          {
            cliente_id: user.id,
            monto_solicitado: Number(formData.monto),
            plazo_meses: Number(formData.plazo),
            tipo: formData.tipo,
            status: 'pendiente',
            descripcion: formData.descripcion || null
          }
        ])
        .select();

      if (insertError) {
        throw insertError;
      }

      const newSolicitud = data?.[0];

      // Send notification email to admin
      if (newSolicitud) {
        try {
          await fetch('/api/notifications/new-solicitud', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              solicitudId: newSolicitud.id,
              clienteNombre: user.nombre || user.email,
              clienteEmail: user.email,
              monto: newSolicitud.monto_solicitado,
              plazo: newSolicitud.plazo_meses,
              tipo: newSolicitud.tipo
            })
          });
        } catch (emailErr) {
          console.error('Error sending notification email:', emailErr);
          // Don't fail the solicitud creation if email fails
        }
      }

      setSuccess(true);
      setFormData({
        monto: '',
        plazo: '24',
        tipo: 'simple',
        descripcion: ''
      });

      // Callback after success - pass the complete solicitud data
      if (onSuccess) {
        setTimeout(() => onSuccess(newSolicitud), 1000);
      }
    } catch (err) {
      console.error('Error creating solicitud:', err);
      setError(err?.message || 'Error al crear la solicitud. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const isLoading = loading || externalLoading;

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Nueva Solicitud de Crédito
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          ✓ Solicitud creada exitosamente. Redirigiendo...
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Monto */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Monto Solicitado ($)"
              name="monto"
              type="number"
              value={formData.monto}
              onChange={handleChange}
              disabled={isLoading}
              required
              inputProps={{ step: '100', min: '0' }}
              helperText="Cantidad que deseas solicitar"
            />
          </Grid>

          {/* Plazo */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={isLoading}>
              <InputLabel>Plazo (meses)</InputLabel>
              <Select
                name="plazo"
                value={formData.plazo}
                onChange={handleChange}
                label="Plazo (meses)"
              >
                <MenuItem value="6">6 meses</MenuItem>
                <MenuItem value="12">12 meses</MenuItem>
                <MenuItem value="24">24 meses</MenuItem>
                <MenuItem value="36">36 meses</MenuItem>
                <MenuItem value="48">48 meses</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Tipo de Crédito */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={isLoading}>
              <InputLabel>Tipo de Crédito</InputLabel>
              <Select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                label="Tipo de Crédito"
              >
                <MenuItem value="simple">Simple</MenuItem>
                <MenuItem value="empresarial">Empresarial</MenuItem>
                <MenuItem value="revolvente">Revolvente</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Status Info */}
          <Grid item xs={12} sm={6}>
            <Box sx={{
              p: 2,
              bgcolor: 'info.light',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center'
            }}>
              <Typography variant="body2" color="info.main">
                Tu solicitud será revisada en 24-48 horas
              </Typography>
            </Box>
          </Grid>

          {/* Descripción */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción (opcional)"
              name="descripcion"
              multiline
              rows={3}
              value={formData.descripcion}
              onChange={handleChange}
              disabled={isLoading}
              helperText="Cuéntanos para qué necesitas el crédito"
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                sx={{ minWidth: 150 }}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Enviar Solicitud'}
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                disabled={isLoading}
                onClick={() => setFormData({
                  monto: '',
                  plazo: '24',
                  tipo: 'simple',
                  descripcion: ''
                })}
              >
                Limpiar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
