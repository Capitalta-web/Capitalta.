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

export default function ClienteDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solicitudes, setSolicitudes] = useState([]);
  const [creditoActual, setCreditoActual] = useState(null);
  const [cita, setCita] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const supabase = createSupabaseBrowserClient();

      // 1. Obtener usuario autenticado
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUser(user);

        // 2. Obtener perfil
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(profileData);

        // 3. Obtener todas las solicitudes del usuario
        const { data: solicitudesData } = await supabase
          .from('solicitudes_credito')
          .select('*')
          .eq('cliente_id', user.id)
          .order('created_at', { ascending: false });

        setSolicitudes(solicitudesData || []);

        // 4. Obtener crédito más reciente/activo
        if (solicitudesData && solicitudesData.length > 0) {
          const creditoActivo = solicitudesData.find((s) =>
            ['credito_activo', 'credito_liquidado', 'fondeado', 'aprobada'].includes(s.estado)
          ) || solicitudesData[0];
          setCreditoActual(creditoActivo);
        }

        // 5. Obtener cita más próxima
        const { data: citasData } = await supabase
          .from('citas')
          .select('*')
          .eq('cliente_id', user.id)
          .gte('fecha', new Date().toISOString().split('T')[0])
          .order('fecha', { ascending: true })
          .limit(1);

        if (citasData && citasData.length > 0) {
          setCita(citasData[0]);
        }

        // 6. Obtener documentos uploadados
        const { data: documentosData } = await supabase
          .from('documentos')
          .select('*')
          .eq('usuario_id', user.id);

        setDocumentos(documentosData || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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
            Bienvenido a tu panel de control. Gestiona tus solicitudes y créditos aquí.
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

      {/* Grid Principal */}
      <Grid container spacing={3}>
        {/* Columna izquierda - Perfil y Crédito */}
        <Grid item xs={12} md={4}>
          {/* Perfil */}
          <Box sx={{ mb: 3 }}>
            <ClienteDashboardProfile profile={profile} onEditClick={handleEditProfile} />
          </Box>

          {/* Próxima Cita */}
          <ProximaCitaCard cita={cita} onAgendar={handleAgendar} />
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
