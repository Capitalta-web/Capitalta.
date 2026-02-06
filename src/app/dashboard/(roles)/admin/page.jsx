'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%', boxShadow: 2 }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ p: 1, borderRadius: 1, bgcolor: `${color}.light`, color: `${color}.main`, mr: 2 }}>
          {icon}
        </Box>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">Dashboard Administrador</Typography>
        <Typography color="text.secondary">Vista general del sistema Capitalta.</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <StatCard 
            title="Usuarios Totales" 
            value="150" 
            icon={<PeopleIcon />} 
            color="primary" 
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <StatCard 
            title="Solicitudes Activas" 
            value="24" 
            icon={<DescriptionIcon />} 
            color="warning" 
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <StatCard 
            title="Créditos Colocados" 
            value="$12.5M" 
            icon={<MonetizationOnIcon />} 
            color="success" 
          />
        </Grid>

        <Grid xs={12}>
           {/* Placeholder for future charts or detailed tables */}
           <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Actividad Reciente</Typography>
           <Card variant="outlined" sx={{ p: 4, textAlign: 'center', borderStyle: 'dashed' }}>
             <Typography color="text.secondary">Gráficos y registros de auditoría próximamente...</Typography>
           </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
