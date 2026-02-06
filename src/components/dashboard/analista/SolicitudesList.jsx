'use client';

import { useState, useEffect } from 'react';
import { 
  Typography, Box, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, Button, 
  IconButton, Tooltip, CircularProgress, Dialog,
  DialogTitle, DialogContent, DialogActions, Grid,
  Divider, Paper
} from '@mui/material';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import MainCard from '@/components/MainCard';

// Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';

const getStatusColor = (status) => {
  switch(status) {
    case 'solicitud_iniciada': return 'info';
    case 'en_revision': return 'warning';
    case 'aprobada': return 'success';
    case 'rechazada': return 'error';
    case 'requiere_informacion': return 'warning';
    default: return 'default';
  }
};

const getStatusLabel = (status) => {
  switch(status) {
    case 'solicitud_iniciada': return 'Iniciada';
    case 'en_revision': return 'En Revisión';
    case 'aprobada': return 'Aprobada';
    case 'rechazada': return 'Rechazada';
    case 'requiere_informacion': return 'Req. Información';
    default: return status;
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
};

export default function SolicitudesList({ limit = null }) {
  const [loading, setLoading] = useState(true);
  const [solicitudes, setSolicitudes] = useState([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchSolicitudes = async () => {
    try {
      setLoading(true);
      const supabase = createSupabaseBrowserClient();
      let query = supabase
        .from('solicitudes_credito')
        .select('*')
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data: solicitudesData, error } = await query;

      if (error) throw error;

      if (solicitudesData && solicitudesData.length > 0) {
        // Fetch profiles manually
        const userIds = [...new Set(solicitudesData.map(s => s.cliente_id))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, nombre_completo, email')
          .in('id', userIds);
        
        const profilesMap = (profiles || []).reduce((acc, p) => ({ 
          ...acc, 
          [p.id]: { name: p.nombre_completo, email: p.email } 
        }), {});

        const mappedSolicitudes = solicitudesData.map(s => ({
            ...s,
            cliente_nombre: profilesMap[s.cliente_id]?.name || 'Usuario Desconocido',
            cliente_email: profilesMap[s.cliente_id]?.email || '',
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
                      <Typography variant="caption" color="text.secondary">{row.cliente_email}</Typography>
                    </TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>{row.tipo_credito?.replace('_', ' ')}</TableCell>
                    <TableCell>{formatCurrency(row.monto_solicitado)}</TableCell>
                    <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusLabel(row.estado)} 
                        color={getStatusColor(row.estado)} 
                        size="small" 
                        variant="soft"
                      />
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
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Detalle de Solicitud
          <Chip 
            label={selectedSolicitud ? getStatusLabel(selectedSolicitud.estado) : ''} 
            color={selectedSolicitud ? getStatusColor(selectedSolicitud.estado) : 'default'}
          />
        </DialogTitle>
        <Divider />
        <DialogContent>
          {selectedSolicitud && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">Cliente</Typography>
                <Typography variant="h6">{selectedSolicitud.cliente_nombre}</Typography>
                <Typography variant="body2">{selectedSolicitud.cliente_email}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">Fecha de Solicitud</Typography>
                <Typography variant="body1">{new Date(selectedSolicitud.created_at).toLocaleString()}</Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="text.secondary">Tipo de Crédito</Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                  {selectedSolicitud.tipo_credito?.replace('_', ' ')}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="text.secondary">Monto Solicitado</Typography>
                <Typography variant="h6" color="primary.main">
                  {formatCurrency(selectedSolicitud.monto_solicitado)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="text.secondary">Plazo</Typography>
                <Typography variant="body1">{selectedSolicitud.plazo_meses} meses</Typography>
              </Grid>

              {selectedSolicitud.detalles && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Información Adicional</Typography>
                    <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                        {JSON.stringify(selectedSolicitud.detalles, null, 2)}
                      </pre>
                    </Paper>
                  </Grid>
                </>
              )}
            </Grid>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cerrar
          </Button>
          <Button 
            variant="outlined" 
            color="warning" 
            startIcon={<PendingIcon />}
            onClick={() => handleUpdateStatus('en_revision')}
            disabled={actionLoading}
          >
            En Revisión
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            startIcon={<CancelIcon />}
            onClick={() => handleUpdateStatus('rechazada')}
            disabled={actionLoading}
          >
            Rechazar
          </Button>
          <Button 
            variant="contained" 
            color="success" 
            startIcon={<CheckCircleIcon />}
            onClick={() => handleUpdateStatus('aprobada')}
            disabled={actionLoading}
          >
            Aprobar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
