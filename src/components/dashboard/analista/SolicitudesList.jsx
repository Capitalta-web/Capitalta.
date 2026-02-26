'use client';

import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
  Paper
} from '@mui/material';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import MainCard from '@/components/MainCard';

import SolicitudDetailDialog from './SolicitudDetailDialog';

const getStatusColor = (status) => {
  switch (status) {
    case 'solicitud_iniciada':
      return 'info';
    case 'en_revision':
      return 'warning';
    case 'en_comite':
      return 'secondary';
    case 'aprobada':
      return 'success';
    case 'rechazada':
      return 'error';
    case 'requiere_informacion':
      return 'warning';
    case 'validado':
      return 'success';
    case 'fondeado':
      return 'success';
    default:
      return 'default';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'solicitud_iniciada':
      return 'Iniciada';
    case 'en_revision':
      return 'En Revisión';
    case 'en_comite':
      return 'En Comité';
    case 'aprobada':
      return 'Aprobada';
    case 'rechazada':
      return 'Rechazada';
    case 'requiere_informacion':
      return 'Req. Información';
    case 'validado':
      return 'Validado';
    case 'fondeado':
      return 'Fondeado';
    default:
      return status;
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
};

export default function SolicitudesList({ limit = null, filterStatus = null }) {
  const [loading, setLoading] = useState(true);
  const [solicitudes, setSolicitudes] = useState([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchSolicitudes = async () => {
    try {
      setLoading(true);
      const supabase = createSupabaseBrowserClient();
      let query = supabase.from('solicitudes_credito').select('*').order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      if (filterStatus) {
        if (Array.isArray(filterStatus)) {
          query = query.in('estado', filterStatus);
        } else {
          query = query.eq('estado', filterStatus);
        }
      }

      const { data: solicitudesData, error } = await query;

      if (error) throw error;

      if (solicitudesData && solicitudesData.length > 0) {
        // Fetch profiles manually
        const userIds = [...new Set(solicitudesData.map((s) => s.cliente_id))];
        const { data: profiles } = await supabase.from('profiles').select('id, nombre_completo, email').in('id', userIds);

        const profilesMap = (profiles || []).reduce(
          (acc, p) => ({
            ...acc,
            [p.id]: { name: p.nombre_completo, email: p.email }
          }),
          {}
        );

        const mappedSolicitudes = solicitudesData.map((s) => ({
          ...s,
          cliente_nombre: profilesMap[s.cliente_id]?.name || 'Usuario Desconocido',
          cliente_email: profilesMap[s.cliente_id]?.email || ''
        }));
        setSolicitudes(mappedSolicitudes);
      } else {
        setSolicitudes([]);
      }
    } catch (error) {
      console.error('Error fetching solicitudes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const handleOpenDialog = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedSolicitud(null);
    setDialogOpen(false);
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedSolicitud) return;

    setActionLoading(true);
    const supabase = createSupabaseBrowserClient();

    try {
      const { error } = await supabase
        .from('solicitudes_credito')
        .update({
          estado: newStatus,
          updated_at: new Date()
        })
        .eq('id', selectedSolicitud.id);

      if (error) throw error;

      // Refresh list
      await fetchSolicitudes();
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <MainCard content={false}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solicitudes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">No hay solicitudes pendientes.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                solicitudes.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2">{row.cliente_nombre}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.cliente_email}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>{row.tipo_credito?.replace('_', ' ')}</TableCell>
                    <TableCell>{formatCurrency(row.monto_solicitado)}</TableCell>
                    <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip label={getStatusLabel(row.estado)} color={getStatusColor(row.estado)} size="small" variant="soft" />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Ver Detalle">
                        <IconButton onClick={() => handleOpenDialog(row)} color="primary">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>

      {/* Detail Dialog */}
      <SolicitudDetailDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        solicitud={selectedSolicitud}
        onStatusUpdate={handleUpdateStatus}
      />
    </>
  );
}
