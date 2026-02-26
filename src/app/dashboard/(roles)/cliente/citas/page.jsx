'use client';

import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  MenuItem,
  TextField,
  Button,
  Stack,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Box,
  CircularProgress
} from '@mui/material';
import MainCard from '@/components/MainCard';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { obtenerProximasFechas, horasDisponibles, sucursalesMock, generarCodigoCita } from '@/utils/citas';

export default function CitasPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [citas, setCitas] = useState([]);
  const [user, setUser] = useState(null);
  const [activeApplication, setActiveApplication] = useState(null);
  const [formData, setFormData] = useState({
    sucursal: '',
    fecha: '',
    hora: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const proximasFechas = obtenerProximasFechas();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setFetching(true);
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        setFetching(false);
        return;
      }
      setUser(user);

      // Fetch active application
      const { data: applications, error: appError } = await supabase
        .from('solicitudes_credito')
        .select('*')
        .eq('cliente_id', user.id)
        .neq('estado', 'cancelado')
        .neq('estado', 'rechazado')
        .order('created_at', { ascending: false })
        .limit(1);

      if (applications && applications.length > 0) {
        setActiveApplication(applications[0]);
      }

      // Since we don't have a direct relation in schema yet, we search by email
      const { data, error } = await supabase.from('citas').select('*').eq('email', user.email).order('fecha', { ascending: true });

      if (error) throw error;
      setCitas(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (!user) throw new Error('Debes iniciar sesión para agendar.');

      const codigo = generarCodigoCita(new Date(formData.fecha), formData.hora);

      const payload = {
        sucursal_id: formData.sucursal,
        fecha: formData.fecha,
        hora: formData.hora,
        nombre_cliente: user.user_metadata?.full_name || 'Usuario',
        email: user.email,
        telefono: user.user_metadata?.telefono || '',
        codigo_cita: codigo,
        cliente_id: user.id,
        solicitud_id: activeApplication?.id
      };

      const res = await fetch('/api/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Error al agendar la cita');

      setMessage({ type: 'success', text: `¡Cita agendada con éxito! Código: ${codigo}` });
      setFormData({ sucursal: '', fecha: '', hora: '' });
      fetchData(); // Refresh list
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'programada':
        return 'primary';
      case 'confirmada':
        return 'success';
      case 'cancelada':
        return 'error';
      case 'completada':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Agendar Cita Presencial
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Reserva una cita con nuestros asesores en sucursal para revisar tu solicitud.
        </Typography>
        {activeApplication && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Agendando cita para solicitud de crédito {activeApplication.tipo_credito.replace('_', ' ')} ($
            {activeApplication.monto_solicitado})
          </Alert>
        )}
      </Grid>

      <Grid item xs={12} md={5}>
        <MainCard title="Nueva Cita">
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {message.text && (
                <Alert severity={message.type} onClose={() => setMessage({ type: '', text: '' })}>
                  {message.text}
                </Alert>
              )}

              <TextField
                select
                label="Sucursal"
                fullWidth
                value={formData.sucursal}
                onChange={(e) => setFormData({ ...formData, sucursal: e.target.value })}
                required
              >
                {sucursalesMock.map((sucursal) => (
                  <MenuItem key={sucursal.id} value={sucursal.id}>
                    {sucursal.nombre} - {sucursal.ciudad}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Fecha"
                fullWidth
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                required
                disabled={!formData.sucursal}
              >
                {proximasFechas.map((fecha, index) => (
                  <MenuItem key={index} value={fecha.toISOString().split('T')[0]}>
                    {fecha.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Hora"
                fullWidth
                value={formData.hora}
                onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                required
                disabled={!formData.fecha}
              >
                {horasDisponibles.map((hora) => (
                  <MenuItem key={hora} value={hora}>
                    {hora}
                  </MenuItem>
                ))}
              </TextField>

              <Button variant="contained" size="large" type="submit" disabled={loading} fullWidth>
                {loading ? 'Agendando...' : 'Confirmar Cita'}
              </Button>
            </Stack>
          </form>
        </MainCard>
      </Grid>

      <Grid item xs={12} md={7}>
        <MainCard title="Mis Citas Programadas">
          {fetching ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : citas.length === 0 ? (
            <Alert severity="info">No tienes citas programadas.</Alert>
          ) : (
            <List>
              {citas.map((cita, index) => (
                <div key={cita.id || index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="subtitle1" component="span">
                            {new Date(cita.fecha + 'T00:00:00').toLocaleDateString('es-MX', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </Typography>
                          <Chip label={cita.status} color={getStatusColor(cita.status)} size="small" />
                        </Stack>
                      }
                      secondary={
                        <Stack component="span" spacing={0.5} sx={{ mt: 1 }}>
                          <Typography variant="body2" component="span" color="text.primary">
                            Hora: {cita.hora} | Código: <strong>{cita.codigo_cita}</strong>
                          </Typography>
                          <Typography variant="caption" component="span" display="block">
                            Sucursal: {sucursalesMock.find((s) => s.id === cita.sucursal_id)?.nombre || cita.sucursal_id}
                          </Typography>
                          {cita.solicitud_id && (
                            <Chip label="Vinculada a solicitud" size="small" variant="outlined" sx={{ mt: 0.5, fontSize: '0.7rem' }} />
                          )}
                        </Stack>
                      }
                    />
                  </ListItem>
                  {index < citas.length - 1 && <Divider component="li" />}
                </div>
              ))}
            </List>
          )}
        </MainCard>
      </Grid>
    </Grid>
  );
}
