'use client';

import { Card, CardContent, Grid, Box, Typography, Stack, LinearProgress } from '@mui/material';

export default function MetricasSecundarias({ metrics }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  return (
    <Grid container spacing={3}>
      {/* Tasa de Aprobación */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>
              Tasa de Aprobación
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
              <Typography variant="h3" fontWeight="bold" color="success.main">
                {metrics.tasaAprobacion || 0}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                de solicitudes
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={metrics.tasaAprobacion || 0}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#E0E0E0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  backgroundColor: '#26A69A'
                }
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {metrics.creditosAprobados || 0} de {metrics.solicitudesTotales || 0} aprobadas
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Promedio de Monto */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>
              Promedio de Monto
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="primary.main" sx={{ mb: 1 }}>
              {formatCurrency(metrics.promedioMonto || 0)}
            </Typography>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                Mín: {formatCurrency(metrics.montoMinimo || 0)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Máx: {formatCurrency(metrics.montoMaximo || 0)}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Próximas Citas */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>
              Próximas Citas
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
              <Typography variant="h3" fontWeight="bold" color="warning.main">
                {metrics.proximasCitas || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                hoy
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              +{metrics.citasProximas7Dias || 0} en próximos 7 días
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Solicitudes Rechazadas */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>
              Solicitudes Rechazadas
            </Typography>
            <Typography variant="h3" fontWeight="bold" color="error.main">
              {metrics.solicitudesRechazadas || 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {metrics.tasaRechazo || 0}% del total
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Créditos Activos */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>
              Créditos Activos
            </Typography>
            <Typography variant="h3" fontWeight="bold" color="success.main">
              {metrics.creditosActivos || 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              generando ingresos
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Fondeo en Proceso */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>
              Fondeo en Proceso
            </Typography>
            <Typography variant="h3" fontWeight="bold" color="info.main">
              {metrics.fondeoEnProceso || 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              esperando desembolso
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Nuevas Solicitudes */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>
              Nuevas Solicitudes
            </Typography>
            <Typography variant="h3" fontWeight="bold" color="secondary.main">
              {metrics.nuevosSolicitudes || 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              esta semana
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
