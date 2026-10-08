'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Stack,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import { IconEye, IconCheck, IconX } from '@tabler/icons-react';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

const STATUS_OPTIONS = ['pendiente', 'en-revision', 'aprobada', 'rechazada', 'activo', 'cerrado'];
const NEXT_STATUS = {
  'pendiente': ['en-revision', 'rechazada'],
  'en-revision': ['aprobada', 'rechazada'],
  'aprobada': ['activo', 'rechazada'],
  'rechazada': ['en-revision'],
  'activo': ['cerrado'],
  'cerrado': []
};

const statusConfig = {
  pendiente: { label: 'Pendiente', color: 'warning' },
  'en-revision': { label: 'En Revisión', color: 'info' },
  aprobada: { label: 'Aprobada', color: 'success' },
  rechazada: { label: 'Rechazada', color: 'error' },
  activo: { label: 'Activo', color: 'success' },
  cerrado: { label: 'Cerrado', color: 'default' }
};

export default function SolicitudesPage() {
  const supabase = createSupabaseBrowserClient();

  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modal state
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  // Filters
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        setLoading(true);

        let query = supabase
          .from('solicitudes')
          .select(`
            *,
            profiles:cliente_id (
              full_name,
              email
            )
          `)
          .order('created_at', { ascending: false });

        if (filterStatus) {
          query = query.eq('status', filterStatus);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        const transformed = (data || []).map(sol => ({
          ...sol,
          cliente_nombre: sol.profiles?.full_name,
          cliente_email: sol.profiles?.email,
        }));

        setSolicitudes(transformed);
        setError(null);
      } catch (err) {
        console.error('Error fetching solicitudes:', err);
        setError('Error al cargar las solicitudes');
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, [supabase, filterStatus]);

  const handleOpenModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setNewStatus(solicitud.status);
    setNotes(solicitud.admin_notes || '');
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSolicitud(null);
    setNewStatus('');
    setNotes('');
  };

  const handleUpdateStatus = async () => {
    if (!selectedSolicitud || !newStatus) return;

    setUpdating(true);

    try {
      const { error: updateError } = await supabase
        .from('solicitudes')
        .update({
          status: newStatus,
          admin_notes: notes || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedSolicitud.id);

      if (updateError) throw updateError;

      // Update local state
      setSolicitudes(prev =>
        prev.map(sol =>
          sol.id === selectedSolicitud.id
            ? { ...sol, status: newStatus, admin_notes: notes }
            : sol
        )
      );

      // Send notification email
      try {
        await fetch('/api/notifications/solicitud-updated', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            solicitudId: selectedSolicitud.id,
            clienteEmail: selectedSolicitud.cliente_email,
            clienteNombre: selectedSolicitud.cliente_nombre,
            newStatus: newStatus,
            notes: notes
          })
        });
      } catch (notifErr) {
        console.error('Error sending notification:', notifErr);
      }

      handleCloseModal();
    } catch (err) {
      console.error('Error updating solicitud:', err);
      setError('Error al actualizar la solicitud');
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedData = solicitudes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Gestión de Solicitudes
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {solicitudes.length} solicitud{solicitudes.length !== 1 ? 'es' : ''} registrada{solicitudes.length !== 1 ? 's' : ''}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Filter */}
      <Card sx={{ p: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filtrar por Estado</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPage(0);
            }}
            label="Filtrar por Estado"
          >
            <MenuItem value="">Todos</MenuItem>
            {STATUS_OPTIONS.map(status => (
              <MenuItem key={status} value={status}>
                {statusConfig[status]?.label || status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Card>

      {/* Table */}
      <Card>
        {solicitudes.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="textSecondary">
              No hay solicitudes para mostrar
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Cliente</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="right">Monto</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">Plazo</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Fecha</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedData.map((sol) => (
                    <TableRow key={sol.id} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                      <TableCell>
                        <Stack spacing={0.3}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {sol.cliente_nombre || 'Sin nombre'}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {sol.cliente_email}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {formatCurrency(sol.monto_solicitado)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {sol.plazo_meses} meses
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={statusConfig[sol.status]?.label || sol.status}
                          color={statusConfig[sol.status]?.color || 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          {formatDate(sol.created_at)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<IconEye size={16} />}
                            onClick={() => handleOpenModal(sol)}
                          >
                            Gestionar
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={solicitudes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página:"
            />
          </>
        )}
      </Card>

      {/* Modal */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          Gestionar Solicitud - {selectedSolicitud?.id?.slice(0, 8)}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedSolicitud && (
            <Stack spacing={3}>
              {/* Solicitud Info */}
              <Card sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Cliente
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {selectedSolicitud.cliente_nombre}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Monto
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatCurrency(selectedSolicitud.monto_solicitado)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Plazo
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {selectedSolicitud.plazo_meses} meses
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Tipo
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                      {selectedSolicitud.tipo}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>

              {/* Current Status */}
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Estado Actual
                </Typography>
                <Chip
                  label={statusConfig[selectedSolicitud.status]?.label || selectedSolicitud.status}
                  color={statusConfig[selectedSolicitud.status]?.color || 'default'}
                  sx={{ mt: 1 }}
                />
              </Box>

              {/* New Status */}
              <FormControl fullWidth>
                <InputLabel>Nuevo Estado</InputLabel>
                <Select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  label="Nuevo Estado"
                  disabled={updating}
                >
                  {STATUS_OPTIONS.map(status => (
                    <MenuItem key={status} value={status}>
                      {statusConfig[status]?.label || status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Notes */}
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notas de Admin"
                placeholder="Razón del cambio, comentarios, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={updating}
                helperText="Estas notas se guardarán con la solicitud"
              />

              {selectedSolicitud.admin_notes && (
                <Alert severity="info">
                  <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                    <strong>Notas anteriores:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {selectedSolicitud.admin_notes}
                  </Typography>
                </Alert>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseModal} disabled={updating}>
            Cancelar
          </Button>
          <Button
            onClick={handleUpdateStatus}
            variant="contained"
            disabled={updating || !newStatus || newStatus === selectedSolicitud?.status}
          >
            {updating ? <CircularProgress size={24} /> : 'Guardar Cambios'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
