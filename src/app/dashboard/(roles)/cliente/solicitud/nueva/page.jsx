'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  MenuItem,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import MainCard from '@/components/MainCard';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

const steps = ['Tipo de Crédito', 'Detalles del Préstamo', 'Información Adicional', 'Confirmación'];

const CREDIT_TYPES = [
  { value: 'simple', label: 'Crédito Simple' },
  { value: 'empresarial', label: 'Crédito Empresarial' },
  { value: 'revolvente', label: 'Crédito Revolvente' },
  { value: 'venta_key', label: 'Venta Key' }
];

export default function NuevaSolicitudPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    tipo_credito: 'simple',
    monto_solicitado: '',
    plazo_meses: '',
    empresa: '',
    rfc: '',
    notas: ''
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const supabase = createSupabaseBrowserClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No estás autenticado');

      const { error: insertError } = await supabase
        .from('solicitudes_credito')
        .insert({
          cliente_id: user.id,
          tipo_credito: formData.tipo_credito,
          monto_solicitado: parseFloat(formData.monto_solicitado),
          plazo_meses: parseInt(formData.plazo_meses),
          estado: 'solicitud_iniciada',
          detalles: {
            empresa: formData.empresa,
            rfc: formData.rfc,
            notas: formData.notas
          }
        });

      if (insertError) throw insertError;

      router.push('/dashboard/cliente');
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al crear la solicitud');
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Selecciona el tipo de crédito</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Tipo de Crédito"
                name="tipo_credito"
                value={formData.tipo_credito}
                onChange={handleChange}
              >
                {CREDIT_TYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
             <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Configura tu préstamo</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Monto Solicitado (MXN)"
                name="monto_solicitado"
                type="number"
                value={formData.monto_solicitado}
                onChange={handleChange}
                helperText="Ej. 500000"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Plazo (Meses)"
                name="plazo_meses"
                type="number"
                value={formData.plazo_meses}
                onChange={handleChange}
                helperText="Ej. 12, 24, 36"
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
             <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Información Adicional (Opcional)</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre de la Empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="RFC"
                name="rfc"
                value={formData.rfc}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notas Adicionales"
                name="notas"
                value={formData.notas}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Box sx={{ py: 2 }}>
            <Typography variant="h6" gutterBottom>Resumen de Solicitud</Typography>
            <Typography><strong>Tipo:</strong> {CREDIT_TYPES.find(t => t.value === formData.tipo_credito)?.label}</Typography>
            <Typography><strong>Monto:</strong> ${formData.monto_solicitado}</Typography>
            <Typography><strong>Plazo:</strong> {formData.plazo_meses} meses</Typography>
            <Typography><strong>Empresa:</strong> {formData.empresa || 'N/A'}</Typography>
            <Alert severity="info" sx={{ mt: 2 }}>
              Al enviar esta solicitud, un asesor revisará tu información y se pondrá en contacto contigo.
            </Alert>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <MainCard>
      <Box sx={{ p: 3, pb: 0 }}>
        <Typography variant="h4">Nueva Solicitud de Crédito</Typography>
      </Box>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 2, mb: 4, minHeight: '200px' }}>
        {renderStepContent(activeStep)}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mr: 1 }}>
            Atrás
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Enviando...' : 'Enviar Solicitud'}
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Siguiente
          </Button>
        )}
      </Box>
    </MainCard>
  );
}
