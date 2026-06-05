'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField, MenuItem, Grid, CircularProgress, Alert, Stack } from '@mui/material';
import MainCard from '@/components/MainCard';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { normalizeRfc, validateRfc } from '@/utils/validators/rfc';

const steps = ['Tipo de Crédito', 'Detalles del Préstamo', 'Información Adicional', 'Confirmación'];

const CREDIT_TYPES = [
  { value: 'simple', label: 'Crédito Revolvente' },
  { value: 'empresarial', label: 'Crédito Empresarial' },
  { value: 'revolvente', label: 'Crédito Revolvente Línea' },
  { value: 'venta_key', label: 'Venta Key' }
];

export default function NuevaSolicitudPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [rfcCheck, setRfcCheck] = useState({ status: 'idle', result: null });

  const [formData, setFormData] = useState({
    tipo_credito: 'simple',
    monto_solicitado: '',
    plazo_meses: '',
    empresa: '',
    rfc: '',
    notas: ''
  });

  const rfcLocal = useMemo(() => validateRfc(formData.rfc), [formData.rfc]);

  const handleNext = () => {
    const nextErrors = {};

    if (activeStep === 1) {
      const monto = Number(formData.monto_solicitado);
      const plazo = Number(formData.plazo_meses);
      if (!monto || monto <= 0) nextErrors.monto_solicitado = 'Ingresa un monto válido';
      if (!plazo || plazo <= 0) nextErrors.plazo_meses = 'Ingresa un plazo válido';
    }

    if (activeStep === 2) {
      const normalized = normalizeRfc(formData.rfc);
      if (!normalized) nextErrors.rfc = 'RFC requerido';
      else if (!rfcLocal.isValid) nextErrors.rfc = rfcLocal.errors[0] || 'RFC inválido';
      else if (rfcCheck.status === 'valid') {
        if (rfcCheck.result?.isRegistered === false) nextErrors.rfc = 'RFC no registrado ante SAT';
      } else if (rfcCheck.status === 'checking') {
        nextErrors.rfc = 'Verificando RFC...';
      } else {
        nextErrors.rfc = 'Verifica el RFC para continuar';
        handleVerifyRfc();
      }
    }

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rfc') {
      setRfcCheck({ status: 'idle', result: null });
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleVerifyRfc = async () => {
    const normalized = normalizeRfc(formData.rfc);
    const local = validateRfc(normalized);
    if (!local.isValid) {
      setRfcCheck({ status: 'invalid', result: { isValid: false, validationErrors: local.errors } });
      setFieldErrors((prev) => ({ ...prev, rfc: local.errors[0] || 'RFC inválido' }));
      return;
    }

    setRfcCheck({ status: 'checking', result: null });
    try {
      const res = await fetch('/api/verificamex/rfc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rfc: normalized })
      });
      const data = await res.json().catch(() => ({}));
      const isValid = data?.isValid === true;
      if (!isValid) {
        const msg = Array.isArray(data?.validationErrors) ? data.validationErrors[0] : 'RFC inválido';
        setRfcCheck({ status: 'invalid', result: data });
        setFieldErrors((prev) => ({ ...prev, rfc: msg }));
        return;
      }

      setRfcCheck({ status: 'valid', result: data });
      setFieldErrors((prev) => {
        const next = { ...prev };
        if (next.rfc) delete next.rfc;
        return next;
      });
    } catch {
      setRfcCheck({ status: 'error', result: null });
      setFieldErrors((prev) => ({ ...prev, rfc: 'No se pudo verificar el RFC en este momento' }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const normalizedRfc = normalizeRfc(formData.rfc);
      const localRfc = validateRfc(normalizedRfc);
      if (!localRfc.isValid) {
        throw new Error(localRfc.errors[0] || 'RFC inválido');
      }
      if (rfcCheck.status === 'valid' && rfcCheck.result?.isRegistered === false) {
        throw new Error('RFC no registrado ante SAT');
      }

      const supabase = createSupabaseBrowserClient();

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) throw new Error('No estás autenticado');

      const { error: insertError } = await supabase.from('solicitudes_credito').insert({
        cliente_id: user.id,
        tipo_credito: formData.tipo_credito,
        monto_solicitado: parseFloat(formData.monto_solicitado),
        plazo_meses: parseInt(formData.plazo_meses),
        estado: 'solicitud_iniciada',
        detalles: {
          empresa: formData.empresa,
          rfc: normalizedRfc,
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
              <Typography variant="h6" gutterBottom>
                Selecciona el tipo de crédito
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select fullWidth label="Tipo de Crédito" name="tipo_credito" value={formData.tipo_credito} onChange={handleChange}>
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
              <Typography variant="h6" gutterBottom>
                Configura tu préstamo
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Monto Solicitado (MXN)"
                name="monto_solicitado"
                type="number"
                value={formData.monto_solicitado}
                onChange={handleChange}
                error={Boolean(fieldErrors.monto_solicitado)}
                helperText={fieldErrors.monto_solicitado || 'Ej. 500000'}
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
                error={Boolean(fieldErrors.plazo_meses)}
                helperText={fieldErrors.plazo_meses || 'Ej. 12, 24, 36'}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Información Adicional (Opcional)
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Nombre de la Empresa" name="empresa" value={formData.empresa} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <TextField
                  fullWidth
                  label="RFC"
                  name="rfc"
                  value={formData.rfc}
                  onChange={(e) => handleChange({ target: { name: 'rfc', value: String(e.target.value || '').toUpperCase() } })}
                  error={Boolean(fieldErrors.rfc)}
                  helperText={
                    fieldErrors.rfc ||
                    (rfcCheck.status === 'valid' && rfcCheck.result?.isRegistered === true
                      ? 'RFC verificado'
                      : rfcCheck.status === 'valid' && rfcCheck.result?.isRegistered === false
                        ? 'RFC válido pero no registrado ante SAT'
                        : 'Ej. XAXX010101000')
                  }
                />
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button variant="outlined" onClick={handleVerifyRfc} disabled={rfcCheck.status === 'checking'}>
                    {rfcCheck.status === 'checking' ? 'Verificando...' : 'Verificar RFC'}
                  </Button>
                </Box>
              </Stack>
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
            <Typography variant="h6" gutterBottom>
              Resumen de Solicitud
            </Typography>
            <Typography>
              <strong>Tipo:</strong> {CREDIT_TYPES.find((t) => t.value === formData.tipo_credito)?.label}
            </Typography>
            <Typography>
              <strong>Monto:</strong> ${formData.monto_solicitado}
            </Typography>
            <Typography>
              <strong>Plazo:</strong> {formData.plazo_meses} meses
            </Typography>
            <Typography>
              <strong>Empresa:</strong> {formData.empresa || 'N/A'}
            </Typography>
            <Typography>
              <strong>RFC:</strong> {normalizeRfc(formData.rfc) || 'N/A'}
            </Typography>
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

      <Box sx={{ mt: 2, mb: 4, minHeight: '200px' }}>{renderStepContent(activeStep)}</Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mr: 1 }}>
            Atrás
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={handleSubmit} disabled={loading} startIcon={loading && <CircularProgress size={20} />}>
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
