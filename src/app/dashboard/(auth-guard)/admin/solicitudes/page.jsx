'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Card
} from '@mui/material';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import TableSolicitudes from '@/components/dashboard/TableSolicitudes';
import SolicitudDetailModal from '@/components/dashboard/SolicitudDetailModal';

const STATUS_OPTIONS = [
  'pendiente',
  'en-revision',
  'aprobada',
  'rechazada',
  'activo',
  'cerrado'
];

export default function AdminSolicitudesPage() {
  const supabase = createSupabaseBrowserClient();

  const [solicitudes, setSolicitudes] = useState([]);
  const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCliente, setFilterCliente] = useState('');

  // Modal
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Fetch solicitudes
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('solicitudes')
          .select(`
            *,
            profiles:cliente_id (
              id,
              email,
              full_name,
              apellido_paterno,
              apellido_materno,
              rfc,
              curp,
              fecha_nacimiento,
              phone,
              domicilio_calle,
              domicilio_numero,
              domicilio_colonia,
              domicilio_cp,
              domicilio_municipio,
              domicilio_estado
            )
          `)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        // Transform data to flat structure
        const transformed = data?.map(sol => ({
          ...sol,
          cliente_email: sol.profiles?.email,
          cliente_nombre: sol.profiles?.full_name
        })) || [];

        setSolicitudes(transformed);
        setFilteredSolicitudes(transformed);
        setError(null);
      } catch (err) {
        console.error('Error fetching solicitudes:', err);
        setError('Error al cargar las solicitudes');
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, [supabase]);

  // Apply filters
  useEffect(() => {
    let filtered = solicitudes;

    if (filterStatus) {
      filtered = filtered.filter(s => s.status === filterStatus);
    }

    if (filterCliente) {
      filtered = filtered.filter(s =>
        (s.cliente_email?.toLowerCase() || '').includes(filterCliente.toLowerCase()) ||
        (s.cliente_nombre?.toLowerCase() || '').includes(filterCliente.toLowerCase())
      );
    }

    setFilteredSolicitudes(filtered);
  }, [filterStatus, filterCliente, solicitudes]);

  // Handle status change
  const handleOpenModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
  };

  const handleCloseModal = () => {
    setSelectedSolicitud(null);
  };

  const handleUpdateStatus = async (statusArg, notesArg) => {
    if (!selectedSolicitud || !statusArg) return;

    setUpdating(true);

    try {
      const { error: updateError } = await supabase
        .from('solicitudes')
        .update({
          status: statusArg,
          updated_at: new Date().toISOString(),
          admin_notes: notesArg || null
        })
        .eq('id', selectedSolicitud.id);

      if (updateError) throw updateError;

      // Update local state
      setSolicitudes(prev =>
        prev.map(sol =>
          sol.id === selectedSolicitud.id
            ? { ...sol, status: statusArg, admin_notes: notesArg }
            : sol
        )
      );

      handleCloseModal();
      setError(null);
    } catch (err) {
      console.error('Error updating solicitud:', err);
      setError('Error al actualizar el estado');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink component="button" variant="body2" color="inherit">
            Dashboard
          </MuiLink>
          <Typography color="textPrimary">Solicitudes</Typography>
        </Breadcrumbs>

        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Gestión de Solicitudes
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Filters */}
        <Card sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar por email o nombre..."
                value={filterCliente}
                onChange={(e) => setFilterCliente(e.target.value)}
                label="Cliente"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Estado"
                >
                  <MenuItem value="">Todos</MenuItem>
                  {STATUS_OPTIONS.map(status => (
                    <MenuItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary" sx={{ pt: 1 }}>
                Total: {filteredSolicitudes.length} solicitud{filteredSolicitudes.length !== 1 ? 'es' : ''}
              </Typography>
            </Grid>
          </Grid>
        </Card>

        {/* Table */}
        <TableSolicitudes
          data={filteredSolicitudes.map(s => ({
            ...s,
            cliente: s.cliente_nombre || s.cliente_email,
            monto_solicitado: s.monto_solicitado,
            plazo_meses: s.plazo_meses,
            status: s.status,
            created_at: s.created_at
          }))}
          loading={loading}
          onRowClick={handleOpenModal}
          columns={[
            { key: 'id', label: 'ID', width: '70px' },
            { key: 'cliente', label: 'Cliente', width: '150px' },
            { key: 'monto_solicitado', label: 'Monto', width: '120px', format: 'currency' },
            { key: 'plazo_meses', label: 'Plazo', width: '100px', format: 'plazo' },
            { key: 'status', label: 'Estado', width: '120px', format: 'status' },
            { key: 'created_at', label: 'Fecha', width: '130px', format: 'date' },
            { key: 'actions', label: '', width: '80px' }
          ]}
          allowPagination={true}
        />

        {/* Modal de detalle completo + decisión */}
        <SolicitudDetailModal
          solicitud={selectedSolicitud}
          onClose={handleCloseModal}
          onStatusUpdate={handleUpdateStatus}
          updating={updating}
        />
      </Container>
    </Box>
  );
}
