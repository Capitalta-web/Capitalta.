'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Breadcrumbs, Link as MuiLink, Typography, Button, Stack } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import TableSolicitudes from '@/components/dashboard/TableSolicitudes';

export default function MisSolicitudesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createSupabaseBrowserClient();

  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('solicitudes')
          .select('*')
          .eq('cliente_id', user.id)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setSolicitudes(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching solicitudes:', err);
        setError('Error al cargar las solicitudes');
        setSolicitudes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, [user?.id, supabase]);

  const handleRowClick = (solicitud) => {
    // For now, just log it. Later we can navigate to details page
    console.log('Clicked solicitud:', solicitud);
  };

  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Breadcrumbs sx={{ mb: 1.5 }}>
              <MuiLink component="button" variant="body2" color="inherit" onClick={() => router.push('/dashboard/cliente')}>
                Inicio
              </MuiLink>
              <Typography color="textPrimary">Mis Solicitudes</Typography>
            </Breadcrumbs>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Mis Solicitudes de Crédito
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
              Total: {solicitudes.length} solicitud{solicitudes.length !== 1 ? 'es' : ''}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/dashboard/cliente/nueva')}
          >
            + Nueva Solicitud
          </Button>
        </Stack>

        {/* Error */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Table */}
        <TableSolicitudes
          data={solicitudes}
          loading={loading}
          onRowClick={handleRowClick}
          columns={[
            { key: 'id', label: 'ID', width: '60px' },
            { key: 'monto_solicitado', label: 'Monto', width: '130px', format: 'currency' },
            { key: 'plazo_meses', label: 'Plazo', width: '100px', format: 'plazo' },
            { key: 'tipo', label: 'Tipo', width: '110px' },
            { key: 'status', label: 'Estado', width: '120px', format: 'status' },
            { key: 'created_at', label: 'Fecha Solicitud', width: '140px', format: 'date' },
            { key: 'actions', label: '', width: '80px' }
          ]}
          allowPagination={true}
        />
      </Container>
    </Box>
  );
}
