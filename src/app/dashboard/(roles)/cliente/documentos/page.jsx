'use client';

import { Box, Typography, Button } from '@mui/material';
import MainCard from '@/components/MainCard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function DocumentosPage() {
  return (
    <MainCard>
      <Typography variant="h4" sx={{ mb: 3 }}>Mis Documentos</Typography>
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Typography variant="h6" gutterBottom>
          Gestión de Documentos
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Aquí podrás subir y gestionar los documentos necesarios para tus solicitudes de crédito.
        </Typography>
        <Button variant="contained" startIcon={<CloudUploadIcon />} disabled>
          Subir Documento (Próximamente)
        </Button>
      </Box>
    </MainCard>
  );
}
