'use client';

import { Card, CardContent, Box, Typography, Grid, Chip } from '@mui/material';

const AdminStatsCard = ({ title, value, icon, color, compare, change }) => {
  const isPositive = change >= 0;
  const changeColor = isPositive ? 'success.main' : 'error.main';
  const changeSymbol = isPositive ? '↑' : '↓';

  return (
    <Card sx={{ height: '100%', boxShadow: 2, transition: 'all 0.3s ease', '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' } }}>
      <CardContent>
        {/* Header con icono y título */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          <Box
            sx={{
              p: 1.5,
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${color}.light 0%, ${color}.lighter 100%)`,
              color: `${color}.main`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
        </Box>

        {/* Valor principal */}
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 1.5 }}>
          {value}
        </Typography>

        {/* Comparativa vs período anterior */}
        {compare && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`${changeSymbol} ${Math.abs(change)}%`}
              size="small"
              variant="filled"
              sx={{
                bgcolor: changeColor,
                color: 'white',
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {compare}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default function AdminStatsCards({ stats }) {
  const statCards = [
    {
      title: 'Usuarios Totales',
      value: stats.usuarios.toLocaleString('es-MX'),
      icon: stats.usuariosIcon,
      color: 'primary',
      compare: 'vs mes anterior',
      change: stats.usuariosChange || 12.5
    },
    {
      title: 'Solicitudes Activas',
      value: stats.solicitudes.toLocaleString('es-MX'),
      icon: stats.solicitudesIcon,
      color: 'warning',
      compare: 'en proceso',
      change: stats.solicitudesChange || 8.2
    },
    {
      title: 'Créditos Aprobados',
      value: stats.creditosAprobados.toLocaleString('es-MX'),
      icon: stats.creditosIcon,
      color: 'success',
      compare: 'finalizados',
      change: stats.creditosChange || 15.3
    },
    {
      title: 'Monto Colocado',
      value: stats.montoFormatted,
      icon: stats.montoIcon,
      color: 'info',
      compare: 'total activo',
      change: stats.montoChange || 20.5
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {statCards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <AdminStatsCard
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            compare={card.compare}
            change={card.change}
          />
        </Grid>
      ))}
    </Grid>
  );
}
