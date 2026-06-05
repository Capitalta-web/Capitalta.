'use client';

import { Card, CardContent, Box, Stack, Typography, LinearProgress, Grid, Button } from '@mui/material';
import { CircularProgress } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function CreditoActualCard({ solicitud, onViewDetails, onNewSolicitud }) {
  if (!solicitud) {
    return (
      <Card sx={{ boxShadow: 2, borderRadius: 3, height: 1, minHeight: { xs: 'auto', md: 360 } }}>
        <CardContent sx={{ height: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3, textAlign: 'center' }}>
          <AccountBalanceIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Sin créditos activos
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Aún no tienes un proceso de crédito vigente. Inicia una solicitud para comenzar.
          </Typography>
          <Button variant="contained" onClick={onNewSolicitud}>
            Iniciar Solicitud
          </Button>
        </CardContent>
      </Card>
    );
  }

  const montoAprobado = Number(solicitud.monto_aprobado) || 0;
  const montoDesembolsado = Number(solicitud.monto_desembolsado) || 0;
  const porcentajeDraw = montoAprobado > 0 ? Math.round((montoDesembolsado / montoAprobado) * 100) : 0;
  const montoDisponible = montoAprobado - montoDesembolsado;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getEstadoLabel = (estado) => {
    const labels = {
      credito_activo: 'Crédito Activo',
      fondeado: 'Fondeado',
      aprobada: 'Aprobada'
    };
    return labels[estado] || estado;
  };

  return (
    <Card sx={{ boxShadow: 2, borderRadius: 3, height: 1, minHeight: { xs: 'auto', md: 360 } }}>
      <CardContent sx={{ height: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Tu Crédito Actual
          </Typography>
          <Box
            sx={{
              bgcolor: 'success.light',
              color: 'success.main',
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.875rem',
              fontWeight: 600
            }}
          >
            {getEstadoLabel(solicitud.estado)}
          </Box>
        </Box>

        {/* Progreso Circular */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={porcentajeDraw}
              size={104}
              thickness={4}
              sx={{
                color: porcentajeDraw < 50 ? 'success.main' : porcentajeDraw < 80 ? 'warning.main' : 'error.main'
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="primary">
                {porcentajeDraw}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Utilizado
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Grid de montos */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 1.5, bgcolor: '#F3E5F5', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Aprobado
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">
                {formatCurrency(montoAprobado)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 1.5, bgcolor: '#E3F2FD', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Disponible
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="success.main">
                {formatCurrency(montoDisponible)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 1.5, bgcolor: '#E8F5E9', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Desembolsado
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="info.main">
                {formatCurrency(montoDesembolsado)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 1.5, bgcolor: '#FFF3E0', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Plazo
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="warning.main">
                {solicitud.plazo_meses || 'N/A'} meses
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Barra de progreso */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" fontWeight="600">
              Utilización del Crédito
            </Typography>
            <Typography variant="caption" fontWeight="600">
              {formatCurrency(montoDesembolsado)} de {formatCurrency(montoAprobado)}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={porcentajeDraw}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#E0E0E0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundColor: porcentajeDraw < 50 ? '#26A69A' : porcentajeDraw < 80 ? '#F57C00' : '#D32F2F'
              }
            }}
          />
        </Box>

        {/* Próximo pago (si aplica) */}
        {solicitud.proximo_pago && (
          <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1, mb: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccountBalanceIcon color="info" />
              <Stack spacing={0}>
                <Typography variant="caption" color="text.secondary">
                  Próximo Pago
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {solicitud.proximo_pago} - {formatCurrency(solicitud.monto_proximo_pago)}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        )}

        {/* Botón de detalles */}
        <Button variant="contained" fullWidth onClick={onViewDetails} sx={{ mt: 'auto' }}>
          Ver Detalles del Crédito
        </Button>
      </CardContent>
    </Card>
  );
}
