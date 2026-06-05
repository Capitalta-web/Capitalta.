'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  Button,
  TablePagination,
  Avatar,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Colores para estados
const ESTADO_COLORS = {
  solicitud_iniciada: { bg: '#E3F2FD', text: '#1976D2' },
  integracion_expediente: { bg: '#F3E5F5', text: '#7B1FA2' },
  avaluo_en_proceso: { bg: '#FFF3E0', text: '#F57C00' },
  en_comite: { bg: '#F3E5F5', text: '#C2185B' },
  formalizacion_notarial: { bg: '#E0F2F1', text: '#00897B' },
  fondeado: { bg: '#E8F5E9', text: '#388E3C' },
  credito_activo: { bg: '#E0F2F1', text: '#00796B' },
  credito_liquidado: { bg: '#ECEFF1', text: '#455A64' },
  aprobada: { bg: '#E8F5E9', text: '#2E7D32' },
  rechazada: { bg: '#FFEBEE', text: '#C62828' },
  requiere_informacion: { bg: '#FFFDE7', text: '#F57F17' },
  validado: { bg: '#E8F5E9', text: '#1B5E20' }
};

const ESTADO_LABELS = {
  solicitud_iniciada: 'Iniciada',
  integracion_expediente: 'Integración',
  avaluo_en_proceso: 'Avalúo',
  en_comite: 'En Comité',
  formalizacion_notarial: 'Formalización',
  fondeado: 'Fondeado',
  credito_activo: 'Activo',
  credito_liquidado: 'Liquidado',
  aprobada: 'Aprobada',
  rechazada: 'Rechazada',
  requiere_informacion: 'Req. Info',
  validado: 'Validado'
};

export default function SolicitudesRecientesTable({ solicitudes = [] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSolicitud(null);
  };

  const paginatedSolicitudes = solicitudes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  const getInitials = (nombre) => {
    if (!nombre) return 'N/A';
    return nombre
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const calcularDiasAtrás = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const ahora = new Date();
    const diferencia = ahora - date;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Ayer';
    if (dias < 7) return `${dias} días atrás`;
    if (dias < 30) return `${Math.floor(dias / 7)} semanas atrás`;
    return `${Math.floor(dias / 30)} meses atrás`;
  };

  if (solicitudes.length === 0) {
    return (
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            No hay solicitudes registradas
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Solicitudes Recientes
          </Typography>

          <TableContainer>
            <Table size="small">
              <TableHead sx={{ bgcolor: '#F5F5F5' }}>
                <TableRow>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Monto</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Creada</TableCell>
                  <TableCell align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedSolicitudes.map((solicitud, index) => (
                  <TableRow
                    key={solicitud.id || index}
                    sx={{
                      '&:hover': { bgcolor: '#F5F5F5' },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.75rem' }}>
                          {getInitials(solicitud.cliente_nombre || solicitud.cliente_id)}
                        </Avatar>
                        <Typography variant="body2" fontWeight="500">
                          {solicitud.cliente_nombre || 'N/A'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {solicitud.cliente_email || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {formatCurrency(solicitud.monto_solicitado || solicitud.monto_aprobado)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={ESTADO_LABELS[solicitud.estado] || solicitud.estado}
                        size="small"
                        sx={{
                          bgcolor: ESTADO_COLORS[solicitud.estado]?.bg || '#E0E0E0',
                          color: ESTADO_COLORS[solicitud.estado]?.text || '#616161',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {calcularDiasAtrás(solicitud.created_at)}
                      </Typography>
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(solicitud.created_at)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="text"
                        startIcon={<VisibilityIcon fontSize="small" />}
                        onClick={() => handleOpenDialog(solicitud)}
                        sx={{ textTransform: 'none' }}
                      >
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={solicitudes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página:"
          />
        </CardContent>
      </Card>

      {/* Dialog de detalles */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight="bold">Detalles de Solicitud</DialogTitle>
        <DialogContent>
          {selectedSolicitud && (
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Cliente
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {selectedSolicitud.cliente_nombre || 'N/A'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body2">{selectedSolicitud.cliente_email || 'N/A'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Monto Solicitado
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">
                  {formatCurrency(selectedSolicitud.monto_solicitado)}
                </Typography>
              </Box>
              {selectedSolicitud.monto_aprobado && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Monto Aprobado
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    {formatCurrency(selectedSolicitud.monto_aprobado)}
                  </Typography>
                </Box>
              )}
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Estado
                </Typography>
                <Chip
                  label={ESTADO_LABELS[selectedSolicitud.estado] || selectedSolicitud.estado}
                  sx={{
                    bgcolor: ESTADO_COLORS[selectedSolicitud.estado]?.bg || '#E0E0E0',
                    color: ESTADO_COLORS[selectedSolicitud.estado]?.text || '#616161',
                    fontWeight: 500,
                    mt: 1
                  }}
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Plazo
                </Typography>
                <Typography variant="body2">{selectedSolicitud.plazo_meses || 'N/A'} meses</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Fecha de Creación
                </Typography>
                <Typography variant="body2">{formatDate(selectedSolicitud.created_at)}</Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
