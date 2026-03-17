'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, Grid, CircularProgress } from '@mui/material';
import SolicitudesList from '@/components/dashboard/analista/SolicitudesList';
import MainCard from '@/components/MainCard';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

// Icons
import AssignmentIcon from '@mui/icons-material/Assignment';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const MetricCard = ({ title, count, icon, color, loading }) => (
  <MainCard sx={{ height: '100%', display: 'flex', alignItems: 'center', p: 2 }}>
    <Box sx={{ mr: 2, display: 'flex', p: 1.5, borderRadius: '50%', bgcolor: `${color}.light`, color: `${color}.main` }}>{icon}</Box>
    <Box>
      <Typography variant="body2" color="text.secondary" fontWeight="medium">
        {title}
      </Typography>
      {loading ? (
        <CircularProgress size={20} sx={{ mt: 0.5 }} />
      ) : (
        <Typography variant="h4" fontWeight="bold">
          {count}
        </Typography>
      )}
    </Box>
  </MainCard>
);

export default function AnalistaDashboard() {
  const [metrics, setMetrics] = useState({
    total: 0,
    pendientes: 0,
    aprobadas: 0,
    rechazadas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const supabase = createSupabaseBrowserClient();

      // We can do this in parallel or one query with conditional aggregation if RPC,
      // but simple selects are fine for now or one select all and filter client side if not too many.
      // For scalability, count queries are better.

      const { count: total } = await supabase.from('solicitudes_credito').select('*', { count: 'exact', head: true });

      const { count: pendientes } = await supabase
        .from('solicitudes_credito')
        .select('*', { count: 'exact', head: true })
        .in('estado', ['en_revision', 'solicitud_iniciada', 'requiere_informacion']);

      const { count: aprobadas } = await supabase
        .from('solicitudes_credito')
        .select('*', { count: 'exact', head: true })
        .in('estado', ['aprobada', 'validado', 'en_comite', 'fondeado']);

      const { count: rechazadas } = await supabase
        .from('solicitudes_credito')
        .select('*', { count: 'exact', head: true })
        .eq('estado', 'rechazada');

      setMetrics({
        total: total || 0,
        pendientes: pendientes || 0,
        aprobadas: aprobadas || 0,
        rechazadas: rechazadas || 0
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Dashboard Analista
        </Typography>
        <Typography color="text.secondary">Bienvenido al panel de control de riesgos.</Typography>
      </Box>

      {/* Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Solicitudes"
            count={metrics.total}
            icon={<AssignmentIcon fontSize="large" />}
            color="primary"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Pendientes"
            count={metrics.pendientes}
            icon={<PendingIcon fontSize="large" />}
            color="warning"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Aprobadas / En Proceso"
            count={metrics.aprobadas}
            icon={<CheckCircleIcon fontSize="large" />}
            color="success"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Rechazadas"
            count={metrics.rechazadas}
            icon={<CancelIcon fontSize="large" />}
            color="error"
            loading={loading}
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Solicitudes Recientes
        </Typography>
        <SolicitudesList limit={5} />
      </Box>
    </Box>
  );
}
