'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, CircularProgress, Grid } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

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
  const [stats, setStats] = useState({
    usuarios: 0,
    solicitudes: 0,
    creditos: 0, // Placeholder, se calculará sumando montos o counting fondeados
    montoColocado: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const supabase = createSupabaseBrowserClient();

        // 1. Usuarios Totales
        const { count: usuariosCount, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (usersError) console.error('Error fetching users count:', usersError);

        // 2. Solicitudes Activas (no rechazadas, no finalizadas)
        const { count: solicitudesCount, error: solicitudesError } = await supabase
          .from('solicitudes_credito')
          .select('*', { count: 'exact', head: true })
          .in('estado', ['solicitud_iniciada', 'integracion_expediente', 'avaluo_en_proceso', 'en_comite', 'formalizacion_notarial', 'fondeo_en_proceso']);

        if (solicitudesError) console.error('Error fetching solicitudes count:', solicitudesError);

        // 3. Monto Colocado (Suma de montos aprobados en estado 'credito_activo' o 'fondeado')
        // Supabase no soporta SUM directo en query builder fácilmente sin RPC, 
        // así que traemos los registros relevantes (asumiendo volumen moderado para MVP)
        // O usamos count de créditos activos como métrica alternativa simple.
        const { data: creditosData, error: creditosError } = await supabase
          .from('solicitudes_credito')
          .select('monto_aprobado')
          .in('estado', ['credito_activo', 'credito_liquidado', 'fondeado']);

        if (creditosError) console.error('Error fetching creditos data:', creditosError);

        const montoTotal = creditosData?.reduce((acc, curr) => acc + (Number(curr.monto_aprobado) || 0), 0) || 0;

        setStats({
          usuarios: usuariosCount || 0,
          solicitudes: solicitudesCount || 0,
          creditos: creditosData?.length || 0,
          montoColocado: montoTotal
        });

      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatoMoneda = (cantidad) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(cantidad);
  };

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
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Usuarios Totales" 
            value={stats.usuarios} 
            icon={<PeopleIcon />} 
            color="primary" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Solicitudes Activas" 
            value={stats.solicitudes} 
            icon={<DescriptionIcon />} 
            color="warning" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Monto Colocado" 
            value={formatoMoneda(stats.montoColocado)} 
            icon={<MonetizationOnIcon />} 
            color="success" 
          />
        </Grid>

        <Grid item xs={12}>
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
