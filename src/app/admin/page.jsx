'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, Card, Stack, Typography, Button, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { IconFileText, IconCircleCheck, IconClock, IconArrowRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import KPICard from '@/components/dashboard/KPICard';

const statusConfig = {
  pendiente: { label: 'Pendiente', color: 'warning' },
  'en-revision': { label: 'En Revisión', color: 'info' },
  aprobada: { label: 'Aprobada', color: 'success' },
  rechazada: { label: 'Rechazada', color: 'error' },
  activo: { label: 'Activo', color: 'success' },
  cerrado: { label: 'Cerrado', color: 'default' }
};

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [data, setData] = useState({
    totalSolicitudes: 0,
    pendientes: 0,
    aprobadas: 0,
    rechazadas: 0,
    activas: 0,
    montoTotal: 0,
  });

  const [recentSolicitudes, setRecentSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all solicitudes
        const { data: solicitudes, error: solError } = await supabase
          .from('solicitudes')
          .select(`
            *,
            profiles:cliente_id (
              full_name,
              email
            )
          `)
          .order('created_at', { ascending: false });

        if (solError) throw solError;

        const sols = solicitudes || [];

        // Calculate metrics
        const metrics = {
          totalSolicitudes: sols.length,
          pendientes: sols.filter(s => s.status === 'pendiente').length,
          aprobadas: sols.filter(s => s.status === 'aprobada').length,
          rechazadas: sols.filter(s => s.status === 'rechazada').length,
          activas: sols.filter(s => s.status === 'activo').length,
          montoTotal: sols.reduce((sum, s) => sum + (s.monto_solicitado || 0), 0),
        };

        setData(metrics);

        // Get recent solicitudes (last 5)
        const recent = sols
          .slice(0, 5)
          .map(s => ({
            ...s,
            cliente_nombre: s.profiles?.full_name,
            cliente_email: s.profiles?.email,
          }));

        setRecentSolicitudes(recent);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard Administrativo
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Gestión de solicitudes de crédito
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* KPIs */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Total de Solicitudes"
            value={data.totalSolicitudes.toString()}
            icon={IconFileText}
            color="primary"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Pendientes de Revisar"
            value={data.pendientes.toString()}
            icon={IconClock}
            color="warning"
            subtitle="Requieren atención"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Aprobadas"
            value={data.aprobadas.toString()}
            icon={IconCircleCheck}
            color="success"
            subtitle={`${Math.round((data.aprobadas / Math.max(data.totalSolicitudes, 1)) * 100)}% tasa`}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Monto Total"
            value={formatCurrency(data.montoTotal)}
            icon={IconFileText}
            color="info"
            subtitle="Solicitado"
          />
        </Grid>
      </Grid>

      {/* Quick Action Button */}
      {data.pendientes > 0 && (
        <Alert
          severity="warning"
          icon={<IconClock size={20} />}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => router.push('/admin/solicitudes?status=pendiente')}
              endIcon={<IconArrowRight size={16} />}
            >
              Ver
            </Button>
          }
          sx={{ mb: 3 }}
        >
          <strong>{data.pendientes} solicitud{data.pendientes !== 1 ? 'es' : ''}</strong> pendiente{data.pendientes !== 1 ? 's' : ''} de revisar
        </Alert>
      )}

      {/* Recent Solicitudes */}
      <Card>
        <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Solicitudes Recientes
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Últimas 5 solicitudes registradas
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={() => router.push('/admin/solicitudes')}
              endIcon={<IconArrowRight size={16} />}
            >
              Ver todas
            </Button>
          </Stack>
        </Box>

        {recentSolicitudes.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="textSecondary">
              No hay solicitudes registradas
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Cliente</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">Monto</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">Plazo</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Fecha</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentSolicitudes.map((sol) => (
                  <TableRow key={sol.id} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                    <TableCell>
                      <Stack spacing={0.3}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {sol.cliente_nombre || 'Sin nombre'}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {sol.cliente_email}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatCurrency(sol.monto_solicitado)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {sol.plazo_meses} meses
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={statusConfig[sol.status]?.label || sol.status}
                        color={statusConfig[sol.status]?.color || 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {formatDate(sol.created_at)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => router.push(`/admin/solicitudes?id=${sol.id}`)}
                      >
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </Box>
  );
}
