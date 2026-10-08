'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Breadcrumbs, Link as MuiLink, Typography } from '@mui/material';
import FormSolicitudWizard from '@/components/dashboard/FormSolicitudWizard';
import SuccessSolicitudModal from '@/components/dashboard/SuccessSolicitudModal';

export default function NewSolicitudPage() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [solicitudData, setSolicitudData] = useState(null);

  const handleSuccess = (solicitud) => {
    setSolicitudData(solicitud);
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="md">
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink component="button" variant="body2" color="inherit" onClick={() => router.push('/dashboard/cliente')}>
            Inicio
          </MuiLink>
          <Typography color="textPrimary">Nueva Solicitud</Typography>
        </Breadcrumbs>

        {/* Form */}
        <FormSolicitudWizard onSuccess={handleSuccess} />
      </Container>

      {/* Success Modal */}
      <SuccessSolicitudModal
        open={showSuccessModal}
        solicitudData={solicitudData}
        onClose={handleCloseModal}
      />
    </Box>
  );
}
