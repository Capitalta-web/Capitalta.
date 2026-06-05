'use client';

import { Typography, Box } from '@mui/material';
import SolicitudesList from '@/components/dashboard/analista/SolicitudesList';

export default function SolicitudesPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Todas las Solicitudes
        </Typography>
        <Typography color="text.secondary">Listado completo de solicitudes de crédito.</Typography>
      </Box>

      <SolicitudesList />
    </Box>
  );
}
