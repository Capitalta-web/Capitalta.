'use client';

import { Typography, Box } from '@mui/material';
import SolicitudesList from '@/components/dashboard/analista/SolicitudesList';

export default function AnalistaDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Bandeja de Entrada</Typography>
        <Typography color="text.secondary">Resumen de solicitudes pendientes.</Typography>
      </Box>

      {/* Show recent applications */}
      <SolicitudesList limit={5} />
    </Box>
  );
}
