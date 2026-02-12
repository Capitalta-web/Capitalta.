'use client';

import { Typography, Box } from '@mui/material';
import SolicitudesList from '@/components/dashboard/analista/SolicitudesList';

export default function ComitePage() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Comité de Crédito</Typography>
        <Typography color="text.secondary">Solicitudes pendientes de aprobación final.</Typography>
      </Box>

      <SolicitudesList filterStatus={['en_comite']} />
    </Box>
  );
}
