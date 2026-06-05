'use client';

import { Typography, Box } from '@mui/material';
import SolicitudesList from '@/components/dashboard/analista/SolicitudesList';

export default function FondeoPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Módulo de Fondeo
        </Typography>
        <Typography color="text.secondary">Gestión de recursos y activación de créditos aprobados.</Typography>
      </Box>

      <SolicitudesList filterStatus={['aprobada', 'fondeado']} />
    </Box>
  );
}
