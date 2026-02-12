'use client';
import PropTypes from 'prop-types';

import { Card, CardContent, Typography, Box, Chip, Button, Stepper, Step, StepLabel, StepIcon, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

// Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VisibilityIcon from '@mui/icons-material/Visibility';

const PASOS_CREDITO = [
  { id: 'solicitud_iniciada', label: 'Solicitud Inicial', icon: <RequestPageIcon /> },
  { id: 'integracion_expediente', label: 'Integración de Expediente', icon: <FolderIcon /> },
  { id: 'avaluo_en_proceso', label: 'Avalúo de Garantía', icon: <HomeIcon /> },
  { id: 'en_comite', label: 'Comité de Crédito', icon: <GroupsIcon /> },
  { id: 'formalizacion_notarial', label: 'Formalización Notarial', icon: <GavelIcon /> },
  { id: 'fondeo_en_proceso', label: 'Fondeo', icon: <AccountBalanceIcon /> },
  { id: 'credito_activo', label: 'Crédito Activo', icon: <CheckCircleIcon /> }
];

const STATUS_MAPPING = {
  'borrador': 0,
  'solicitud_iniciada': 0,
  'integracion_expediente': 1,
  'avaluo_en_proceso': 2,
  'en_comite': 3,
  'aprobado': 4, // Maps to 'en_comite' or 'formalizacion'? The prompt says 'aprobado' is step 6 in DB but here 4 is comite. Let's align.
  // Wait, DB check constraint says: 'borrador', 'solicitud_iniciada', 'integracion_expediente', 'avaluo_en_proceso', 'en_comite', 'aprobado', 'rechazado', 'formalizacion_notarial', ...
  // Prompt steps:
  // 0: solicitud_iniciada
  // 1: integracion_expediente
  // 2: avaluo_en_proceso
  // 3: en_comite
  // 4: formalizacion_notarial
  // 5: fondeo_en_proceso
  // 6: credito_activo

  // So mapping should be:
  'formalizacion_notarial': 4,
  'cita_agendada': 4, // Sub-step of formalizacion
  'cita_completada': 4, // Sub-step of formalizacion
  'fondeo_en_proceso': 5,
  'fondeado': 5,
  'credito_activo': 6,
  'credito_liquidado': 6
};

// Custom Step Icon Component
function ColorlibStepIcon(props) {
  const { active, completed, icon } = props;
  const stepConfig = PASOS_CREDITO[icon - 1]; // icon is 1-based index provided by Stepper

  return (
    <Box
      sx={{
        bgcolor: active || completed ? 'primary.main' : 'grey.300',
        color: active || completed ? 'common.white' : 'grey.600',
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      }}
    >
      {stepConfig ? stepConfig.icon : icon}
    </Box>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

export default function StatusWidget({ application }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  // Determine current step index
  let currentStep = 0;
  if (STATUS_MAPPING.hasOwnProperty(application.estado)) {
    currentStep = STATUS_MAPPING[application.estado];
  } else if (application.estado === 'aprobado') {
     currentStep = 3; // After comite, before formalizacion? Or part of formalizacion? Let's say end of comite.
  }

  const isRejected = application.estado === 'rechazado' || application.estado === 'cancelado';

  // Action Buttons Logic
  const renderActionButton = () => {
    if (isRejected) return null;

    // Step 2: Integracion Expediente (Index 1)
    if (currentStep === 1) {
      return (
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<UploadFileIcon />}
          onClick={() => router.push('/dashboard/cliente/documentos')}
          fullWidth={isMobile}
        >
          Subir Documentos
        </Button>
      );
    }

    // Step 5: Formalizacion Notarial (Index 4)
    if (currentStep === 4) {
      return (
        <Button 
          variant="contained" 
          color="secondary"
          startIcon={<CalendarMonthIcon />}
          onClick={() => router.push('/dashboard/cliente/citas')}
          fullWidth={isMobile}
        >
          Agendar Cita
        </Button>
      );
    }

    // Step 7: Credito Activo (Index 6)
    if (currentStep === 6) {
      return (
        <Button 
          variant="contained" 
          color="success"
          startIcon={<VisibilityIcon />}
          onClick={() => router.push('/dashboard/cliente/creditos')}
          fullWidth={isMobile}
        >
          Ver Mi Crédito
        </Button>
      );
    }

    return null;
  };

  return (
    <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
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
          <Box sx={{ width: '100%', mb: 4, mt: 3 }}>
            <Stepper 
              activeStep={currentStep} 
              alternativeLabel={!isMobile}
              orientation={isMobile ? 'vertical' : 'horizontal'}
            >
              {PASOS_CREDITO.map((step, index) => (
                <Step key={step.id}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}

        {/* Action Button Area */}
        {!isRejected && renderActionButton() && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            {renderActionButton()}
          </Box>
        )}
        
        {isRejected && (
          <Box sx={{ mt: 2 }}>
             <Typography color="error" variant="body2">
               Su solicitud ha sido rechazada o cancelada. Por favor contacte a soporte para más información.
             </Typography>
          </Box>
        )}

      </CardContent>
    </Card>
  );
}

StatusWidget.propTypes = {
  application: PropTypes.object
};
