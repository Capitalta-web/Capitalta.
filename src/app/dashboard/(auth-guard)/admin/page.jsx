'use client';
import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip, Stack, Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isProcessing } = useAuth();
  const supabase = createSupabaseBrowserClient();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ totalSolicitudes: 0, enRevision: 0, usuarios: 0, creditosActivos: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch real KPI data for admin
  useEffect(() => {
    const fetchStats = async () => {
      if (!supabase || user?.role !== 'admin') return;

      const next = { totalSolicitudes: 0, enRevision: 0, usuarios: 0, creditosActivos: 0 };

      try {
        const { data } = await supabase.from('solicitudes').select('id, status');
        if (data) {
          next.totalSolicitudes = data.length;
          next.enRevision = data.filter((s) => ['pendiente', 'en-revision', 'en_revision'].includes(s.status)).length;
          next.creditosActivos = data.filter((s) => s.status === 'activo').length;
        }
      } catch (err) {
        console.error('Error fetching solicitudes:', err);
      }

      try {
        const { data } = await supabase.from('profiles').select('id').eq('role', 'cliente');
        if (data) next.usuarios = data.length;
      } catch (err) {
        console.error('Error fetching usuarios:', err);
      }

      setStats(next);
    };

    fetchStats();
  }, [supabase, user?.role]);

  // Redirect non-admin users after component mounts
  useEffect(() => {
    if (mounted && user && user.role !== 'admin') {
      console.log('Usuario no-admin detectado, redirigiendo...', { role: user.role });
      router.replace('/dashboard/cliente');
    }
  }, [user?.role, router, mounted]);

  // Show loading while processing
  if (isProcessing || !mounted) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If user loaded but not admin, don't render content
  if (user && user.role !== 'admin') {
    return null;
  }

  // Show content only if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Acceso denegado</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 4, alignItems: 'center' }}>
        <Typography variant="h4">
          Panel Administrativo - {user?.full_name || 'Administrador'}
        </Typography>
        <Chip
          label={`Rol: Administrador`}
          color="success"
          variant="filled"
        />
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ cursor: 'pointer' }} onClick={() => router.push('/dashboard/admin/solicitudes')}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Solicitudes
              </Typography>
              <Typography variant="h5">{stats.totalSolicitudes}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                En Revisión
              </Typography>
              <Typography variant="h5">{stats.enRevision}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ cursor: 'pointer' }} onClick={() => router.push('/dashboard/admin/usuarios')}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Usuarios (Clientes)
              </Typography>
              <Typography variant="h5">{stats.usuarios}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Créditos Activos
              </Typography>
              <Typography variant="h5">{stats.creditosActivos}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Accesos Rápidos
          </Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => router.push('/dashboard/admin/solicitudes')}
            >
              Ver Solicitudes
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.push('/dashboard/admin/usuarios')}
            >
              Gestionar Usuarios
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.push('/dashboard/admin/reportes')}
            >
              Ver Reportes
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Typography sx={{ mt: 4, color: 'text.secondary' }}>
        ¡Bienvenido al panel administrativo de Capitalta! Aquí puedes gestionar solicitudes, usuarios y ver reportes del sistema.
      </Typography>
    </Box>
  );
}
