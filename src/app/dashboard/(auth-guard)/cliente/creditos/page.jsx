'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  Grid,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { IconCreditCard, IconTrendingUp } from '@tabler/icons-react';
import { useAuth } from '@/contexts/AuthContext';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import KPICard from '@/components/dashboard/KPICard';
import CreditDetailModal from '@/components/dashboard/CreditDetailModal';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(value);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-MX');
};

export default function CreditosPage() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createSupabaseBrowserClient();

  const [creditos, setCreditos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCredito, setSelectedCredito] = useState(null);
  const [tasaDesde, setTasaDesde] = useState(null);

  useEffect(() => {
    const fetchTasa = async () => {
      try {
        const { data } = await supabase.from('config_credito').select('tasa_excelente').eq('id', 'default').maybeSingle();
        if (data?.tasa_excelente != null) setTasaDesde(Math.round(Number(data.tasa_excelente) * 100));
      } catch (e) {
        console.error('tasa', e);
      }
    };
    fetchTasa();
  }, [supabase]);

  useEffect(() => {
    const fetchCreditos = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        // For now, we'll fetch solicitudes with status 'activo'
        // In a real app, there would be a separate 'creditos' table
        const { data, error: fetchError } = await supabase
          .from('solicitudes')
          .select('*')
          .eq('cliente_id', user.id)
          .eq('status', 'activo')
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setCreditos(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching creditos:', err);
        setError('Error al cargar los créditos');
        setCreditos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditos();
  }, [user?.id, supabase]);

  // Calculate totals
  const totalMonto = creditos.reduce((sum, c) => sum + (c.monto_solicitado || 0), 0);
  const totalSaldo = creditos.reduce((sum, c) => sum + (c.monto_solicitado * 0.7 || 0), 0); // Simulated
  const proximoPago = creditos.length > 0 ? creditos[0].created_at : null;

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
          <MuiLink component="button" variant="body2" color="inherit" onClick={() => router.push('/dashboard/cliente')}>
            Inicio
          </MuiLink>
          <Typography color="textPrimary">Mis Créditos</Typography>
        </Breadcrumbs>

        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Mis Créditos Activos
        </Typography>

        {/* KPIs */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              title="Total Adeudado"
              value={formatCurrency(totalMonto)}
              icon={IconCreditCard}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              title="Saldo Pendiente"
              value={formatCurrency(totalSaldo)}
              icon={IconTrendingUp}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              title="Créditos Activos"
              value={creditos.length.toString()}
              icon={IconCreditCard}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              title="Tasa desde"
              value={tasaDesde != null ? `${tasaDesde}%` : '—'}
              icon={IconTrendingUp}
              color="primary"
            />
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {creditos.length === 0 ? (
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="textSecondary" sx={{ mb: 2 }}>
              No tienes créditos activos en este momento
            </Typography>
            <Button variant="contained" color="primary" onClick={() => router.push('/dashboard/cliente/nueva')}>
              Solicitar Crédito
            </Button>
          </Card>
        ) : (
          <TableContainer component={Card}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>ID Crédito</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">Monto Original</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">Saldo</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">Cuotas</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">Próxima Cuota</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {creditos.map(credito => (
                  <TableRow key={credito.id}>
                    <TableCell sx={{ fontWeight: 500 }}>{credito.id.slice(0, 8)}</TableCell>
                    <TableCell align="right">{formatCurrency(credito.monto_solicitado)}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={formatCurrency(credito.monto_solicitado * 0.7)}
                        color="warning"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {credito.plazo_meses}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {proximoPago && formatDate(proximoPago)}
                    </TableCell>
                    <TableCell align="center">
                      <Button size="small" variant="outlined" onClick={() => setSelectedCredito(credito)}>
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Info */}
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2">
            💡 Puedes hacer pagos anticipados sin penalización. Contáctanos para más información.
          </Typography>
        </Alert>
      </Container>

      <CreditDetailModal
        open={Boolean(selectedCredito)}
        credito={selectedCredito}
        onClose={() => setSelectedCredito(null)}
      />
    </Box>
  );
}
