'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

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
  Chip,
  Button
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ESTADO_COLORS = {
  solicitud_iniciada: { bg: '#E3F2FD', text: '#1976D2' },
  integracion_expediente: { bg: '#F3E5F5', text: '#7B1FA2' },
  avaluo_en_proceso: { bg: '#FFF3E0', text: '#F57C00' },
  en_comite: { bg: '#F3E5F5', text: '#C2185B' },
  aprobada: { bg: '#E8F5E9', text: '#388E3C' },
  rechazada: { bg: '#FFEBEE', text: '#C62828' },
  credito_activo: { bg: '#E0F2F1', text: '#00796B' },
  fondeado: { bg: '#E8F5E9', text: '#2E7D32' }
};

const ESTADO_LABELS = {
  solicitud_iniciada: 'Iniciada',
  integracion_expediente: 'Integración',
  avaluo_en_proceso: 'Avalúo',
  en_comite: 'En Comité',
  aprobada: 'Aprobada',
  rechazada: 'Rechazada',
  credito_activo: 'Activo',
  fondeado: 'Fondeado'
};

export default function MisSolicitudesTable({ solicitudes = [], onViewDetails }) {
  const router = useRouter();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(dateString));
  };

  const rows = useMemo(() => solicitudes.slice(0, 5), [solicitudes]);

  return (
    <Card sx={{ boxShadow: 2, borderRadius: 3, height: 1, minHeight: { xs: 'auto', md: 360 } }}>
      <CardContent sx={{ height: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Mis Solicitudes
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Revisa el estado de tu solicitud y continúa con el siguiente paso.
        </Typography>

        {rows.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 5, flex: 1 }}>
            Aún no tienes solicitudes. Inicia una para comenzar tu proceso.
          </Typography>
        ) : (
          <TableContainer sx={{ flex: 1 }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: '#F5F5F5' }}>
                <TableRow>
                  <TableCell>Referencia</TableCell>
                  <TableCell align="right">Monto</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Creada</TableCell>
                  <TableCell align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((solicitud, index) => (
                  <TableRow
                    key={solicitud.id || index}
                    sx={{
                      '&:hover': { bgcolor: '#F5F5F5' },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        #{solicitud.id?.substring(0, 8).toUpperCase() || 'N/A'}
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
                        {formatDate(solicitud.created_at)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="text"
                        endIcon={<OpenInNewIcon fontSize="small" />}
                        onClick={() =>
                          onViewDetails ? onViewDetails(solicitud) : solicitud?.id ? router.push(`/dashboard/cliente/solicitudes/${solicitud.id}`) : null
                        }
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
        )}

        <TableContainer sx={{ pt: 2 }}>
          <Button
            variant={rows.length === 0 ? 'contained' : 'outlined'}
            fullWidth
            onClick={() => router.push(rows.length === 0 ? '/dashboard/cliente/solicitud/nueva' : '/dashboard/cliente/solicitudes')}
          >
            {rows.length === 0 ? 'Crear solicitud' : 'Ver todas'}
          </Button>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
