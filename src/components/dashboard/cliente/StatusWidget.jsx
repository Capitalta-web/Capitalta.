'use client';
import PropTypes from 'prop-types';

import { Card, CardContent, Typography, Box, Chip, Button, Stepper, Step, StepLabel } from '@mui/material';
import { useRouter } from 'next/navigation';

// Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const STEPS = [
  'Solicitud Iniciada',
  'Integración de Expediente',
  'Avalúo',
  'Dictamen Jurídico',
  'Comité de Crédito',
  'Formalización',
  'Fondeo'
];

const STATUS_TO_STEP_INDEX = {
  'solicitud_iniciada': 0,
  'integracion_expediente': 1,
  'avaluo_en_proceso': 2,
  'dictamen_juridico': 3,
  'comite_credito': 4,
  'formalizacion': 5,
  'fondeo': 6,
  'aprobado': 6, // Final step
  'rechazado': -1, // Error state
  'cancelado': -1
};

export default function StatusWidget({ application }) {
  const router = useRouter();

  if (!application) {
    return (
      <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
        <CardContent sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" gutterBottom>
            No tienes solicitudes activas
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Comienza tu proceso de crédito hoy mismo.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => router.push('/dashboard/cliente/solicitud/nueva')}
          >
            Nueva Solicitud
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentStep = STATUS_TO_STEP_INDEX[application.estado] ?? 0;
  const isRejected = application.estado === 'rechazado' || application.estado === 'cancelado';

  return (
    <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Solicitud Activa
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              ID: {application.id.substring(0, 8)}
            </Typography>
          </Box>
          <Chip 
            label={application.estado.replace(/_/g, ' ')} 
            color={isRejected ? 'error' : 'primary'} 
            sx={{ textTransform: 'capitalize' }} 
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Monto Solicitado:</strong> {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(application.monto_solicitado)}
          </Typography>
          <Typography variant="body1">
            <strong>Tipo de Crédito:</strong> {application.tipo_credito.replace(/_/g, ' ')}
          </Typography>
        </Box>

        {/* Stepper */}
        {!isRejected && (
          <Box sx={{ width: '100%', mb: 4, overflowX: 'auto' }}>
            <Stepper activeStep={currentStep} alternativeLabel>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}

        {isRejected && (
          <Box sx={{ p: 2, bgcolor: 'error.lighter', borderRadius: 1, mb: 2 }}>
            <Typography color="error.main" fontWeight="medium">
              Tu solicitud ha sido rechazada o cancelada. Por favor contacta a soporte para más información.
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined" 
            endIcon={<ArrowForwardIcon />} 
            onClick={() => router.push(`/dashboard/cliente/solicitud/${application.id}`)}
          >
            Ver Detalles Completos
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

StatusWidget.propTypes = {
  application: PropTypes.object
};
