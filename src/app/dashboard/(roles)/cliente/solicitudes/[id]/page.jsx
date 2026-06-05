'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MainCard from '@/components/MainCard';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value || 0);

export default function SolicitudDetallePage() {
  const params = useParams();
  const router = useRouter();
  const solicitudId = params?.id ? String(params.id) : null;

  const [loading, setLoading] = useState(true);
  const [solicitud, setSolicitud] = useState(null);
  const [error, setError] = useState(null);

  const createdAt = useMemo(() => {
    const value = solicitud?.fecha_solicitud || solicitud?.created_at;
    if (!value) return null;
    const dt = new Date(value);
    return Number.isNaN(dt.getTime()) ? null : dt;
  }, [solicitud]);

  useEffect(() => {
    const fetchSolicitud = async () => {
      if (!solicitudId) return;

      setLoading(true);
      setError(null);
      try {
        const supabase = createSupabaseBrowserClient();
        if (!supabase) throw new Error('Supabase no configurado');

        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (!user) {
          router.replace('/auth/login');
          return;
        }

        const { data, error: queryError } = await supabase
          .from('solicitudes_credito')
          .select('*')
          .eq('id', solicitudId)
          .eq('cliente_id', user.id)
          .single();

        if (queryError || !data) throw new Error(queryError?.message || 'Solicitud no encontrada');
        setSolicitud(data);
      } catch (err) {
        setError(err?.message || 'No se pudo cargar la solicitud');
        setSolicitud(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitud();
  }, [router, solicitudId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <MainCard title="Detalle de solicitud">
        <Stack sx={{ gap: 2 }}>
          <Alert severity="error">{error}</Alert>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={() => router.push('/dashboard/cliente/solicitudes')}>
              Volver
            </Button>
            <Button variant="contained" onClick={() => router.push('/dashboard/cliente/solicitud/nueva')}>
              Nueva solicitud
            </Button>
          </Stack>
        </Stack>
      </MainCard>
    );
  }

  const detalles = solicitud?.detalles && typeof solicitud.detalles === 'object' ? solicitud.detalles : {};

  return (
    <Stack sx={{ gap: 3 }}>
      <MainCard
        title="Detalle de solicitud"
        secondary={
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={(solicitud?.estado || 'N/A').replace(/_/g, ' ')} color="primary" variant="outlined" />
          </Stack>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Tipo
            </Typography>
            <Typography variant="h6">{(solicitud?.tipo_credito || 'N/A').replace(/_/g, ' ')}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Fecha
            </Typography>
            <Typography variant="h6">{createdAt ? createdAt.toLocaleDateString('es-MX') : 'N/A'}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Monto solicitado
            </Typography>
            <Typography variant="h6">{formatCurrency(solicitud?.monto_solicitado)}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Plazo
            </Typography>
            <Typography variant="h6">{solicitud?.plazo_meses ? `${solicitud.plazo_meses} meses` : 'N/A'}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Empresa
            </Typography>
            <Typography variant="body1">{detalles?.empresa || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              RFC
            </Typography>
            <Typography variant="body1">{detalles?.rfc || 'N/A'}</Typography>
          </Grid>
        </Grid>
      </MainCard>

      <MainCard title="Siguientes pasos">
        <Stack sx={{ gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Para avanzar, sube tu expediente y agenda una cita con un asesor. Si ya completaste tus documentos, podrás continuar con la evaluación.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button variant="outlined" onClick={() => router.push('/dashboard/cliente/solicitudes')}>
              Volver a solicitudes
            </Button>
            <Button variant="outlined" onClick={() => router.push('/dashboard/cliente/documentos')}>
              Ver expediente
            </Button>
            <Button variant="contained" onClick={() => router.push('/dashboard/cliente/citas')}>
              Agendar cita
            </Button>
          </Stack>
        </Stack>
      </MainCard>
    </Stack>
  );
}

