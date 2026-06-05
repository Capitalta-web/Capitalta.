'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, Grid, CircularProgress, Alert } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

// Componentes del dashboard
import AdminStatsCards from '@/components/dashboard/admin/AdminStatsCards';
import SolicitudesPorEstadoChart from '@/components/dashboard/admin/SolicitudesPorEstadoChart';
import TendenciaMontos from '@/components/dashboard/admin/TendenciaMontos';
import SolicitudesRecientesTable from '@/components/dashboard/admin/SolicitudesRecientesTable';
import MetricasSecundarias from '@/components/dashboard/admin/MetricasSecundarias';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados principales
  const [stats, setStats] = useState({
    usuarios: 0,
    solicitudes: 0,
    creditosAprobados: 0,
    montoColocado: 0,
    montoFormatted: '$0 MXN',
    usuariosChange: 0,
    solicitudesChange: 0,
    creditosChange: 0,
    montoChange: 0
  });

  // Datos para gráficos
  const [estadosSolicitudes, setEstadosSolicitudes] = useState({});
  const [solicitudesRecientes, setSolicitudesRecientes] = useState([]);
  const [tendenciaDatos, setTendenciaDatos] = useState([]);

  // Métricas secundarias
  const [metricas, setMetricas] = useState({
    tasaAprobacion: 0,
    promedioMonto: 0,
    montoMinimo: 0,
    montoMaximo: 0,
    proximasCitas: 0,
    citasProximas7Dias: 0,
    solicitudesRechazadas: 0,
    tasaRechazo: 0,
    creditosActivos: 0,
    fondeoEnProceso: 0,
    nuevosSolicitudes: 0,
    solicitudesTotales: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createSupabaseBrowserClient();

      // 1. Contar usuarios
      const { count: usuariosCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

      // 2. Contar solicitudes activas
      const { count: solicitudesCount } = await supabase
        .from('solicitudes_credito')
        .select('*', { count: 'exact', head: true })
        .in('estado', ['solicitud_iniciada', 'integracion_expediente', 'avaluo_en_proceso', 'en_comite', 'formalizacion_notarial', 'fondeo_en_proceso']);

      // 3. Obtener todas las solicitudes para análisis más detallado
      const { data: todasSolicitudes, error: solicitudesError } = await supabase.from('solicitudes_credito').select('*').order('created_at', { ascending: false });

      if (solicitudesError) throw solicitudesError;

      // 4. Obtener perfiles para datos del cliente
      const { data: perfiles } = await supabase.from('profiles').select('id, email, nombre_completo');

      const solicitudesConCliente = (todasSolicitudes || []).map((sol) => ({
        ...sol,
        cliente_nombre: perfiles?.find((p) => p.id === sol.cliente_id)?.nombre_completo || 'N/A',
        cliente_email: perfiles?.find((p) => p.id === sol.cliente_id)?.email || 'N/A'
      }));

      // Calcular métricas
      const creditosAprobados = (todasSolicitudes || []).filter((s) => s.estado === 'aprobada').length;
      const montoTotal = (todasSolicitudes || [])
        .filter((s) => ['credito_activo', 'credito_liquidado', 'fondeado'].includes(s.estado))
        .reduce((acc, s) => acc + (Number(s.monto_aprobado) || 0), 0);

      const creditosActivos = (todasSolicitudes || []).filter((s) => s.estado === 'credito_activo').length;
      const fondeoEnProceso = (todasSolicitudes || []).filter((s) => s.estado === 'fondeo_en_proceso').length;
      const rechazadas = (todasSolicitudes || []).filter((s) => s.estado === 'rechazada').length;

      // Contar por estado
      const estadosCounts = {};
      (todasSolicitudes || []).forEach((sol) => {
        estadosCounts[sol.estado] = (estadosCounts[sol.estado] || 0) + 1;
      });

      // Calcular montos (min, max, promedio)
      const montosAprobados = (todasSolicitudes || [])
        .filter((s) => s.monto_aprobado)
        .map((s) => Number(s.monto_aprobado));
      const promedioMonto = montosAprobados.length > 0 ? montosAprobados.reduce((a, b) => a + b) / montosAprobados.length : 0;
      const montoMinimo = montosAprobados.length > 0 ? Math.min(...montosAprobados) : 0;
      const montoMaximo = montosAprobados.length > 0 ? Math.max(...montosAprobados) : 0;

      // Generar datos de tendencia (últimos 12 meses)
      const tendencia = generarTendenciaMontos(todasSolicitudes || []);

      // Contar solicitudes nuevas esta semana
      const hace7Dias = new Date();
      hace7Dias.setDate(hace7Dias.getDate() - 7);
      const nuevosSolicitudes = (todasSolicitudes || []).filter((s) => new Date(s.created_at) > hace7Dias).length;

      setStats({
        usuarios: usuariosCount || 0,
        solicitudes: solicitudesCount || 0,
        creditosAprobados: creditosAprobados || 0,
        montoColocado: montoTotal,
        montoFormatted: formatoMoneda(montoTotal),
        usuariosIcon: <PeopleIcon />,
        solicitudesIcon: <DescriptionIcon />,
        creditosIcon: <CheckCircleIcon />,
        montoIcon: <MonetizationOnIcon />,
        usuariosChange: 12.5,
        solicitudesChange: 8.2,
        creditosChange: 15.3,
        montoChange: 20.5
      });

      setEstadosSolicitudes(estadosCounts);
      setSolicitudesRecientes(solicitudesConCliente.slice(0, 15)); // Últimas 15 solicitudes
      setTendenciaDatos(tendencia);

      setMetricas({
        tasaAprobacion: (todasSolicitudes || []).length > 0 ? Math.round((creditosAprobados / (todasSolicitudes || []).length) * 100) : 0,
        promedioMonto: promedioMonto,
        montoMinimo: montoMinimo,
        montoMaximo: montoMaximo,
        proximasCitas: 5,
        citasProximas7Dias: 12,
        solicitudesRechazadas: rechazadas,
        tasaRechazo: (todasSolicitudes || []).length > 0 ? Math.round((rechazadas / (todasSolicitudes || []).length) * 100) : 0,
        creditosActivos: creditosActivos,
        fondeoEnProceso: fondeoEnProceso,
        nuevosSolicitudes: nuevosSolicitudes,
        solicitudesTotales: (todasSolicitudes || []).length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Error al cargar datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  const generarTendenciaMontos = (solicitudes) => {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const ahora = new Date();
    const datos = {};

    // Inicializar últimos 12 meses
    for (let i = 11; i >= 0; i--) {
      const fecha = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
      const clave = `${fecha.getFullYear()}-${fecha.getMonth()}`;
      datos[clave] = 0;
    }

    // Sumar montos por mes
    solicitudes
      .filter((s) => ['credito_activo', 'credito_liquidado', 'fondeado'].includes(s.estado))
      .forEach((s) => {
        const fecha = new Date(s.created_at);
        const clave = `${fecha.getFullYear()}-${fecha.getMonth()}`;
        if (datos[clave] !== undefined) {
          datos[clave] += Number(s.monto_aprobado) || 0;
        }
      });

    // Formatear para Recharts
    return Object.entries(datos).map(([clave, monto]) => {
      const [, mes] = clave.split('-');
      const mesIndex = parseInt(mes);
      return {
        mes: meses[mesIndex],
        monto: monto
      };
    });
  };

  const formatoMoneda = (cantidad) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(cantidad);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Dashboard Administrador
        </Typography>
        <Typography color="text.secondary">
          Resumen general del sistema Capitalta - {new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(new Date())}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* 1. Tarjetas de Estadísticas Principales */}
      <AdminStatsCards stats={stats} />

      {/* 2. Gráficos */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <SolicitudesPorEstadoChart data={estadosSolicitudes} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TendenciaMontos data={tendenciaDatos} months={12} />
        </Grid>
      </Grid>

      {/* 3. Tabla de Solicitudes Recientes */}
      <Box sx={{ mb: 4 }}>
        <SolicitudesRecientesTable solicitudes={solicitudesRecientes} />
      </Box>

      {/* 4. Métricas Secundarias */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
          Métricas Adicionales
        </Typography>
        <MetricasSecundarias metrics={metricas} />
      </Box>
    </Box>
  );
}
