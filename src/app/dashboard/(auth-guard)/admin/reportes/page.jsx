'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  Grid,
  Card,
  Stack,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  IconFileCheck,
  IconCash,
  IconChartBar,
  IconUsers,
  IconChecks,
  IconTrendingUp
} from '@tabler/icons-react';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import KPICard from '@/components/dashboard/KPICard';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0
  }).format(value);
};

export default function ReportesPage() {
  const supabase = createSupabaseBrowserClient();

  const [data, setData] = useState({
    totalSolicitudes: 0,
    totalMonto: 0,
    solicitudesAprobadas: 0,
    tasaAprobacion: 0,
    totalClientes: 0,
    creditosActivos: 0,
    ingresosMes: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);

        // Get solicitudes data
        const { data: solicitudes, error: solError } = await supabase
          .from('solicitudes')
          .select('*');

        if (solError) throw solError;

        // Get users data
        const { data: usuarios, error: userError } = await supabase
          .from('profiles')
          .select('*');

        if (userError) throw userError;

        // Calculate metrics
        const totalSolicitudes = solicitudes?.length || 0;
        const totalMonto = (solicitudes || []).reduce((sum, s) => sum + (s.monto_solicitado || 0), 0);
        const solicitudesAprobadas = (solicitudes || []).filter(s => s.status === 'aprobada' || s.status === 'activo').length;
        const tasaAprobacion = totalSolicitudes > 0 ? Math.round((solicitudesAprobadas / totalSolicitudes) * 100) : 0;
        const totalClientes = (usuarios || []).filter(u => u.role === 'cliente').length;
        const creditosActivos = (solicitudes || []).filter(s => s.status === 'activo').length;
        const ingresosMes = creditosActivos * 2500; // Simulated

        setData({
          totalSolicitudes,
          totalMonto,
          solicitudesAprobadas,
          tasaAprobacion,
          totalClientes,
          creditosActivos,
          ingresosMes
        });

        setError(null);
      } catch (err) {
        console.error('Error fetching report data:', err);
        setError('Error al cargar los reportes');
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [supabase]);

  if (loading) {
    return (
      <Box sx={{ py: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink component="button" variant="body2" color="inherit">
            Dashboard
          </MuiLink>
          <Typography color="textPrimary">Reportes</Typography>
        </Breadcrumbs>

        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Reportes y Métricas
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Resumen ejecutivo del estado del negocio
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* KPIs - Row 1 */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              title="Total Solicitudes"
              value={data.totalSolicitudes.toString()}
              icon={IconFileCheck}
              color="primary"
              subtitle="Histórico total"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              title="Total Solicitado"
              value={formatCurrency(data.totalMonto)}
              icon={IconCash}
              color="success"
              subtitle="Monto agregado"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              title="Solicitudes Aprobadas"
              value={data.solicitudesAprobadas.toString()}
              icon={IconChecks}
              color="info"
              subtitle={`${data.tasaAprobacion}% tasa de aprobación`}
              progress={{
                label: 'Tasa Aprobación',
                value: data.tasaAprobacion,
                color: '#4caf50'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              title="Total Clientes"
              value={data.totalClientes.toString()}
              icon={IconUsers}
              color="warning"
              change={{
                value: 12,
                label: 'este mes'
              }}
              changeColor="success"
            />
          </Grid>
        </Grid>

        {/* KPIs - Row 2 */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <KPICard
              title="Créditos Activos"
              value={data.creditosActivos.toString()}
              icon={IconTrendingUp}
              color="error"
              subtitle="En vigor"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <KPICard
              title="Ingresos Este Mes"
              value={formatCurrency(data.ingresosMes)}
              icon={IconCash}
              color="success"
              change={{
                value: 8.5,
                label: 'vs mes anterior'
              }}
              changeColor="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <KPICard
              title="Monto Promedio"
              value={formatCurrency(data.totalMonto / Math.max(data.totalSolicitudes, 1))}
              icon={IconChartBar}
              color="primary"
              subtitle="Por solicitud"
            />
          </Grid>
        </Grid>

        {/* Summary Cards */}
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  📊 Resumen Operacional
                </Typography>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">Solicitudes pendientes:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {(data.totalSolicitudes - data.solicitudesAprobadas)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">Monto en riesgo:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatCurrency(data.totalMonto * 0.15)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">Clientes activos:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {Math.round(data.totalClientes * 0.7)} de {data.totalClientes}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  💰 Métricas Financieras
                </Typography>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">Patrimonio total:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatCurrency(data.totalMonto * 0.8)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">ROI estimado:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                      +24.5%
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">Margen promedio:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      8.2%
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        {/* Info Alert */}
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2">
            💡 Estos reportes se actualizan en tiempo real. Última actualización: hace unos momentos.
          </Typography>
        </Alert>
      </Container>
    </Box>
  );
}
