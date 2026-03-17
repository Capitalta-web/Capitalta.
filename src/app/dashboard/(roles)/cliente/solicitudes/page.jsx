'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip, Button, CircularProgress } from '@mui/material';
import MainCard from '@/components/MainCard';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

// Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function MisSolicitudesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from('solicitudes_credito')
          .select('*')
          .eq('cliente_id', user.id)
          .order('created_at', { ascending: false });

        if (data) setSolicitudes(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <MainCard>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Mis Solicitudes</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {solicitudes.some((s) => ['credito_activo', 'credito_liquidado', 'fondeado'].includes(s.estado)) && (
            <Button variant="outlined" onClick={() => router.push('/dashboard/cliente/creditos')}>
              Mis Créditos
            </Button>
          )}
          <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => router.push('/dashboard/cliente/solicitud/nueva')}>
            Nueva Solicitud
          </Button>
        </Box>
      </Box>
      {solicitudes.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="body1" color="text.secondary">
            No tienes solicitudes registradas.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {solicitudes.map((solicitud) => (
            <Grid item xs={12} md={6} lg={4} key={solicitud.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" component="div">
                      {solicitud.tipo_credito.replace('_', ' ').toUpperCase()}
                    </Typography>
                    <Chip
                      label={solicitud.estado.replace(/_/g, ' ')}
                      color={
                        ['aprobada', 'fondeado', 'credito_activo', 'credito_liquidado'].includes(solicitud.estado) ? 'success' : 'primary'
                      }
                      size="small"
                    />
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    Monto: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(solicitud.monto_solicitado)}
                  </Typography>
                  <Typography color="text.secondary">Plazo: {solicitud.plazo_meses} meses</Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                    Solicitado el: {new Date(solicitud.fecha_solicitud).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </MainCard>
  );
}
