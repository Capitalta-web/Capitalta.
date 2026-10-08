'use client';
import { Box, Typography, Card, CardContent, Grid, Button, Chip, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { useEffect, useState } from 'react';

export default function ClienteDashboard() {
  const router = useRouter();
  const { user, isProcessing } = useAuth();
  const supabase = createSupabaseBrowserClient();

  const [stats, setStats] = useState({ solicitudes: 0, enProceso: 0, documentos: 0, creditos: 0 });

  // Redirect admin users to admin dashboard - IMMEDIATE CHECK
  useEffect(() => {
    if (user?.role === 'admin') {
      console.log('Admin detected on cliente page, redirecting to admin...');
      router.replace('/dashboard/admin');
      return;
    }
  }, [user?.role, router]);

  // Fetch real KPI counts for the client
  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id || !supabase) return;

      const next = { solicitudes: 0, enProceso: 0, documentos: 0, creditos: 0 };

      // Solicitudes del cliente
      try {
        const { data } = await supabase
          .from('solicitudes')
          .select('id, status')
          .eq('cliente_id', user.id);
        if (data) {
          next.solicitudes = data.length;
          next.enProceso = data.filter((s) => ['pendiente', 'en-revision', 'en_revision'].includes(s.status)).length;
          next.creditos = data.filter((s) => s.status === 'activo').length;
        }
      } catch (err) {
        console.error('Error fetching solicitudes count:', err);
      }

      // Documentos cargados
      try {
        const { data } = await supabase.from('documentos').select('id').eq('cliente_id', user.id);
        if (data) next.documentos = data.length;
      } catch (err) {
        console.error('Error fetching documentos count:', err);
      }

      setStats(next);
    };

    fetchStats();
  }, [user?.id, supabase]);

  // Show loading while processing auth OR if redirecting admin
  if (isProcessing || user?.role === 'admin') {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 4, alignItems: 'center' }}>
        <Typography variant="h4">
          Tu Panel de Control
        </Typography>
        <Chip
          label={`Rol: ${user?.role || 'Sin rol'}`}
          color={user?.role === 'cliente' ? 'success' : 'warning'}
          variant="outlined"
        />
      </Stack>

      <Typography sx={{ mb: 3 }}>
        Bienvenido, {user?.full_name || 'Cliente'}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Mis Solicitudes
              </Typography>
              <Typography variant="h5">{stats.solicitudes}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                En Proceso
              </Typography>
              <Typography variant="h5">{stats.enProceso}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ cursor: 'pointer' }} onClick={() => router.push('/dashboard/cliente/documentos')}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Documentos
              </Typography>
              <Typography variant="h5">{stats.documentos}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ cursor: 'pointer' }} onClick={() => router.push('/dashboard/cliente/creditos')}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Mis Créditos
              </Typography>
              <Typography variant="h5">{stats.creditos}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={() => router.push('/dashboard/cliente/nueva')}>
          Nueva Solicitud
        </Button>
      </Box>

      <Typography sx={{ mt: 4, color: 'text.secondary' }}>
        Aquí puedes ver el estado de tus solicitudes de crédito y documentos
      </Typography>
    </Box>
  );
}
