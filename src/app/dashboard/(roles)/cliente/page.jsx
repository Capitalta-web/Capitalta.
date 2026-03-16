'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, Grid, CircularProgress, Alert, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

// Componentes
import ClienteDashboardProfile from '@/components/dashboard/cliente/ClienteDashboardProfile';
import CreditoActualCard from '@/components/dashboard/cliente/CreditoActualCard';
import MisSolicitudesTable from '@/components/dashboard/cliente/MisSolicitudesTable';
import ProximaCitaCard from '@/components/dashboard/cliente/ProximaCitaCard';
import DocumentosChecklist from '@/components/dashboard/cliente/DocumentosChecklist';
import MainCard from '@/components/MainCard';
import { DOCUMENTOS_REQUERIDOS } from '@/utils/documentosRequeridos';

export default function ClienteDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solicitudes, setSolicitudes] = useState([]);
  const [creditoActual, setCreditoActual] = useState(null);
  const [cita, setCita] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [canAgendar, setCanAgendar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const supabase = createSupabaseBrowserClient();

      // 1. Obtener usuario autenticado
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error('Error fetching user:', authError);
        router.push('/auth/login');
        return;
      }

      setUser(user);

      // 2. Obtener perfil (Manejo de error si no existe)
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileError) {
        console.warn('Error fetching profile:', profileError);
        // No bloqueamos, usamos datos del user
      }
      setProfile(profileData);

      // 3. Obtener todas las solicitudes del usuario (Manejo de error)
      const { data: solicitudesData, error: solicitudesError } = await supabase
        .from('solicitudes_credito')
        .select('*')
        .eq('cliente_id', user.id)
        .order('created_at', { ascending: false });

      if (solicitudesError) {
        console.warn('Error fetching solicitudes:', solicitudesError);
      }
      setSolicitudes(solicitudesData || []);

        // 4. Obtener crédito más reciente/activo
        if (solicitudesData && solicitudesData.length > 0) {
          const creditoActivo = solicitudesData.find((s) =>
            ['credito_activo', 'credito_liquidado', 'fondeado', 'aprobada'].includes(s.estado)
          ) || solicitudesData[0];
          setCreditoActual(creditoActivo);
        }

        // 5. Obtener cita más próxima
        // Usar maybeSingle() o manejar error si no hay citas, ya que la tabla puede no tener RLS correcto o estar vacía
        const { data: citasData, error: citasError } = await supabase
          .from('citas')
          .select('*')
          .eq('email', user.email) // Usar email en lugar de cliente_id temporalmente si id es null
          .gte('fecha', new Date().toISOString().split('T')[0])
          .order('fecha', { ascending: true })
          .limit(1);

        if (!citasError && citasData && citasData.length > 0) {
          setCita(citasData[0]);
        }

        // 6. Obtener documentos uploadados
        const { data: applications } = await supabase
          .from('solicitudes_credito')
          .select('*')
          .eq('cliente_id', user.id)
          .neq('estado', 'cancelado')
          .neq('estado', 'rechazado')
          .order('created_at', { ascending: false })
          .limit(1);

        const currentApplication = applications && applications.length > 0 ? applications[0] : null;
        if (currentApplication) {
          const { data: docs } = await supabase
            .from('documentos')
            .select('*')
            .eq('solicitud_id', currentApplication.id)
            .order('created_at', { ascending: false });

          const docsList = docs || [];
          setDocumentos(docsList);

          const expedienteCompleto = DOCUMENTOS_REQUERIDOS.every((req) => {
            const requiredCount = req.requiredCount || 1;
            const count = docsList.filter((d) => d.tipo_documento === req.id && d.estado !== 'rechazado').length;
            return count >= requiredCount;
          });
          setCanAgendar(expedienteCompleto);
        } else {
          setDocumentos([]);
          setCanAgendar(false);
        }
      // Eliminamos el bloque if/user duplicado y cerramos el try correctamente
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // No re-lanzamos el error para evitar pantalla de Error 500, mostramos dashboard vacío
    } finally {
      setLoading(false);
    }
  };

  const handleNewSolicitud = () => {
    router.push('/dashboard/cliente/solicitud/nueva');
  };

  const handleEditProfile = () => {
    router.push('/dashboard/profile');
  };

  const handleViewDetails = (solicitud) => {
    // Aquí iría la lógica para ver detalles
    console.log('Ver detalles de solicitud:', solicitud);
  };

  const handleAgendar = () => {
    router.push('/dashboard/cliente/citas');
  };

  const handleCompletarExpediente = () => {
    router.push('/dashboard/cliente/documentos');
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Hola, {profile?.nombre_completo || user?.email?.split('@')[0] || 'Cliente'} 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Este es tu proceso: solicita, sube documentos, agenda una cita y recibe tu propuesta.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            1) Completa tu perfil · 2) Envía tu solicitud · 3) Sube tu expediente · 4) Agenda cita · 5) Revisión y resolución
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewSolicitud}
          size="large"
        >
          Nueva Solicitud
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <MainCard>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>
            ¿Cómo funciona tu préstamo en Capitalta?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Completa tu perfil, crea tu solicitud y sube tu expediente. Cuando el expediente esté completo, se habilita la agenda para una cita
            en sucursal (o con un asesor) para revisar tu caso y continuar con la evaluación.
          </Typography>
        </MainCard>
      </Box>

      {/* Grid Principal */}
      <Grid container spacing={3}>
        {/* Columna izquierda - Perfil y Crédito */}
        <Grid item xs={12} md={4}>
          {/* Perfil */}
          <Box sx={{ mb: 3 }}>
            <ClienteDashboardProfile profile={profile} onEditClick={handleEditProfile} />
          </Box>

          {/* Próxima Cita */}
          <ProximaCitaCard cita={cita} onAgendar={handleAgendar} canAgendar={canAgendar} onCompletarExpediente={handleCompletarExpediente} />
        </Grid>

        {/* Columna derecha - Crédito, Solicitudes y Documentos */}
        <Grid item xs={12} md={8}>
          {/* Crédito Actual */}
          <Box sx={{ mb: 3 }}>
            {creditoActual ? (
              <CreditoActualCard solicitud={creditoActual} onViewDetails={handleViewDetails} />
            ) : (
              <Alert severity="info">
                No tienes créditos activos en este momento. Crea una nueva solicitud para comenzar.
              </Alert>
            )}
          </Box>

          {/* Documentos */}
          <Box sx={{ mb: 3 }}>
            <DocumentosChecklist documentos={documentos} />
          </Box>

          {/* Mis Solicitudes */}
          <MisSolicitudesTable solicitudes={solicitudes} onViewDetails={handleViewDetails} />
        </Grid>
      </Grid>
    </Box>
  );
}
