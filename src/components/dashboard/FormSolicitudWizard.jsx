'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Stepper,
  Step,
  StepLabel,
  MobileStepper,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Alert,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Divider,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useAuth } from '@/contexts/AuthContext';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

const STEPS = ['Crédito', 'Datos personales', 'Domicilio', 'Ingresos', 'Referencia', 'Revisar'];

const ESTADOS_MX = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
  'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero',
  'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
  'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas',
  'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

export default function FormSolicitudWizard({ onSuccess }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuth();
  const supabase = createSupabaseBrowserClient();

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limites, setLimites] = useState({ min: 5000, max: 1000000, plazos: ['6', '12', '24', '36', '48'] });

  useEffect(() => {
    const fetchLimites = async () => {
      if (!supabase) return;
      try {
        const { data } = await supabase.from('config_credito').select('monto_minimo, monto_maximo, plazos_meses').eq('id', 'default').maybeSingle();
        if (data) {
          setLimites({
            min: Number(data.monto_minimo) || 5000,
            max: Number(data.monto_maximo) || 1000000,
            plazos: (data.plazos_meses || '6,12,24,36,48').split(',').map((p) => p.trim()).filter(Boolean)
          });
        }
      } catch (e) {
        console.error('limites', e);
      }
    };
    fetchLimites();
  }, [supabase]);

  const fmtMXN = (n) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

  // Prefill identity desde el perfil si ya existe
  const [form, setForm] = useState({
    // Crédito
    monto: '',
    plazo: '24',
    tipo: 'simple',
    descripcion: '',
    // Datos personales
    nombres: user?.full_name?.split(' ')?.[0] || '',
    apellido_paterno: user?.apellido_paterno || '',
    apellido_materno: user?.apellido_materno || '',
    rfc: user?.rfc || '',
    curp: user?.curp || '',
    fecha_nacimiento: user?.fecha_nacimiento || '',
    telefono: user?.phone || '',
    // Domicilio
    domicilio_calle: user?.domicilio_calle || '',
    domicilio_numero: user?.domicilio_numero || '',
    domicilio_colonia: user?.domicilio_colonia || '',
    domicilio_cp: user?.domicilio_cp || '',
    domicilio_municipio: user?.domicilio_municipio || '',
    domicilio_estado: user?.domicilio_estado || '',
    // Ingresos
    ingreso_mensual: '',
    situacion_laboral: 'empleado',
    empresa: '',
    antiguedad_laboral: '',
    gastos_mensuales: '',
    // Referencia
    referencia_nombre: '',
    referencia_telefono: '',
    referencia_relacion: '',
    // Autorización
    autoriza_buro: false
  });

  const set = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [name]: value }));
    setError(null);
  };

  // Validación por paso
  const validateStep = (step) => {
    switch (step) {
      case 0:
        if (!form.monto || Number(form.monto) <= 0) return 'Ingresa un monto válido mayor a 0';
        if (Number(form.monto) < limites.min) return `El monto mínimo es ${fmtMXN(limites.min)}`;
        if (Number(form.monto) > limites.max) return `El monto máximo es ${fmtMXN(limites.max)}`;
        return null;
      case 1:
        if (!form.nombres.trim()) return 'Ingresa tu(s) nombre(s)';
        if (!form.apellido_paterno.trim()) return 'Ingresa tu apellido paterno';
        if (form.rfc && form.rfc.replace(/\s/g, '').length < 12) return 'El RFC debe tener 12 o 13 caracteres';
        if (form.curp && form.curp.replace(/\s/g, '').length !== 18) return 'La CURP debe tener 18 caracteres';
        if (!form.fecha_nacimiento) return 'Ingresa tu fecha de nacimiento';
        return null;
      case 2:
        if (!form.domicilio_calle.trim()) return 'Ingresa la calle';
        if (!form.domicilio_cp.trim() || form.domicilio_cp.length !== 5) return 'El código postal debe tener 5 dígitos';
        if (!form.domicilio_municipio.trim()) return 'Ingresa el municipio/alcaldía';
        if (!form.domicilio_estado) return 'Selecciona el estado';
        return null;
      case 3:
        if (!form.ingreso_mensual || Number(form.ingreso_mensual) <= 0) return 'Ingresa tu ingreso mensual';
        if (!form.situacion_laboral) return 'Selecciona tu situación laboral';
        return null;
      case 4:
        if (!form.referencia_nombre.trim()) return 'Ingresa el nombre de tu referencia';
        if (!form.referencia_telefono.trim()) return 'Ingresa el teléfono de tu referencia';
        return null;
      case 5:
        return null;
      default:
        return null;
    }
  };

  const handleNext = () => {
    const err = validateStep(activeStep);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    if (activeStep === STEPS.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setError(null);
    setActiveStep((s) => Math.max(0, s - 1));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Actualizar identidad en profiles
      const fullName = [form.nombres, form.apellido_paterno, form.apellido_materno].filter(Boolean).join(' ').trim();
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          apellido_paterno: form.apellido_paterno || null,
          apellido_materno: form.apellido_materno || null,
          rfc: form.rfc ? form.rfc.toUpperCase().replace(/\s/g, '') : null,
          curp: form.curp ? form.curp.toUpperCase().replace(/\s/g, '') : null,
          fecha_nacimiento: form.fecha_nacimiento || null,
          phone: form.telefono || null,
          domicilio_calle: form.domicilio_calle || null,
          domicilio_numero: form.domicilio_numero || null,
          domicilio_colonia: form.domicilio_colonia || null,
          domicilio_cp: form.domicilio_cp || null,
          domicilio_municipio: form.domicilio_municipio || null,
          domicilio_estado: form.domicilio_estado || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // 2. Crear la solicitud con datos financieros + autorización
      const { data, error: insertError } = await supabase
        .from('solicitudes')
        .insert([
          {
            cliente_id: user.id,
            monto_solicitado: Number(form.monto),
            plazo_meses: Number(form.plazo),
            tipo: form.tipo,
            status: 'pendiente',
            descripcion: form.descripcion || null,
            ingreso_mensual: form.ingreso_mensual ? Number(form.ingreso_mensual) : null,
            situacion_laboral: form.situacion_laboral || null,
            antiguedad_laboral: form.antiguedad_laboral || null,
            empresa: form.empresa || null,
            gastos_mensuales: form.gastos_mensuales ? Number(form.gastos_mensuales) : null,
            referencia_nombre: form.referencia_nombre || null,
            referencia_telefono: form.referencia_telefono || null,
            referencia_relacion: form.referencia_relacion || null,
            autoriza_buro: false,
            autoriza_buro_fecha: null
          }
        ])
        .select();

      if (insertError) throw insertError;

      const nueva = data?.[0];

      // Notificar al admin (no bloquea si falla)
      if (nueva) {
        try {
          await fetch('/api/notifications/new-solicitud', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              solicitudId: nueva.id,
              clienteNombre: fullName || user.email,
              clienteEmail: user.email,
              monto: nueva.monto_solicitado,
              plazo: nueva.plazo_meses,
              tipo: nueva.tipo
            })
          });
        } catch (e) {
          console.error('Error notificación:', e);
        }
      }

      if (onSuccess) onSuccess(nueva);
    } catch (err) {
      console.error('Error al enviar solicitud:', err);
      setError(err?.message || 'Error al enviar la solicitud. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Campos por paso
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Monto solicitado ($)"
                type="number"
                value={form.monto}
                onChange={set('monto')}
                inputProps={{ inputMode: 'numeric', min: limites.min, max: limites.max, step: 100 }}
                helperText={`De ${fmtMXN(limites.min)} a ${fmtMXN(limites.max)}`}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Plazo (meses)</InputLabel>
                <Select value={form.plazo} onChange={set('plazo')} label="Plazo (meses)">
                  {limites.plazos.map((p) => <MenuItem key={p} value={p}>{p} meses</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de crédito</InputLabel>
                <Select value={form.tipo} onChange={set('tipo')} label="Tipo de crédito">
                  <MenuItem value="simple">Simple</MenuItem>
                  <MenuItem value="empresarial">Empresarial</MenuItem>
                  <MenuItem value="revolvente">Revolvente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={2} label="Descripción (opcional)" value={form.descripcion} onChange={set('descripcion')} helperText="¿Para qué necesitas el crédito?" />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth required label="Nombre(s)" value={form.nombres} onChange={set('nombres')} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth required label="Apellido paterno" value={form.apellido_paterno} onChange={set('apellido_paterno')} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Apellido materno" value={form.apellido_materno} onChange={set('apellido_materno')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="RFC (con homoclave)" value={form.rfc} onChange={set('rfc')} inputProps={{ maxLength: 13, style: { textTransform: 'uppercase' } }} helperText="13 caracteres" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="CURP" value={form.curp} onChange={set('curp')} inputProps={{ maxLength: 18, style: { textTransform: 'uppercase' } }} helperText="18 caracteres" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Fecha de nacimiento" type="date" value={form.fecha_nacimiento} onChange={set('fecha_nacimiento')} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Teléfono" value={form.telefono} onChange={set('telefono')} inputProps={{ inputMode: 'tel' }} />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={8}>
              <TextField fullWidth required label="Calle" value={form.domicilio_calle} onChange={set('domicilio_calle')} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Número" value={form.domicilio_numero} onChange={set('domicilio_numero')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Colonia" value={form.domicilio_colonia} onChange={set('domicilio_colonia')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Código postal" value={form.domicilio_cp} onChange={set('domicilio_cp')} inputProps={{ inputMode: 'numeric', maxLength: 5 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Municipio / Alcaldía" value={form.domicilio_municipio} onChange={set('domicilio_municipio')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Estado</InputLabel>
                <Select value={form.domicilio_estado} onChange={set('domicilio_estado')} label="Estado">
                  {ESTADOS_MX.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Ingreso mensual neto ($)" type="number" value={form.ingreso_mensual} onChange={set('ingreso_mensual')} inputProps={{ inputMode: 'numeric', min: 0 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Situación laboral</InputLabel>
                <Select value={form.situacion_laboral} onChange={set('situacion_laboral')} label="Situación laboral">
                  <MenuItem value="empleado">Empleado</MenuItem>
                  <MenuItem value="independiente">Independiente</MenuItem>
                  <MenuItem value="empresario">Empresario</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Empresa donde trabajas" value={form.empresa} onChange={set('empresa')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Antigüedad laboral" value={form.antiguedad_laboral} onChange={set('antiguedad_laboral')} helperText="Ej. 3 años" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Gastos mensuales ($)" type="number" value={form.gastos_mensuales} onChange={set('gastos_mensuales')} inputProps={{ inputMode: 'numeric', min: 0 }} helperText="Renta, deudas, etc." />
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Nombre de la referencia" value={form.referencia_nombre} onChange={set('referencia_nombre')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Teléfono de la referencia" value={form.referencia_telefono} onChange={set('referencia_telefono')} inputProps={{ inputMode: 'tel' }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Relación (ej. familiar, amigo)" value={form.referencia_relacion} onChange={set('referencia_relacion')} />
            </Grid>
          </Grid>
        );
      case 5:
        return (
          <Stack spacing={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Revisa tu información</Typography>
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Stack spacing={1}>
                <Row label="Crédito" value={`$${Number(form.monto || 0).toLocaleString('es-MX')} · ${form.plazo} meses · ${form.tipo}`} />
                <Row label="Nombre" value={[form.nombres, form.apellido_paterno, form.apellido_materno].filter(Boolean).join(' ')} />
                <Row label="RFC / CURP" value={`${form.rfc || '—'} / ${form.curp || '—'}`} />
                <Row label="Domicilio" value={`${form.domicilio_calle} ${form.domicilio_numero}, ${form.domicilio_municipio}, ${form.domicilio_estado}`} />
                <Row label="Ingreso mensual" value={`$${Number(form.ingreso_mensual || 0).toLocaleString('es-MX')}`} />
              </Stack>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Revisa que tus datos sean correctos y envía tu solicitud. Un asesor la revisará en 24–48 horas.
            </Typography>
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Card sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Nueva Solicitud de Crédito</Typography>

      {/* Stepper: horizontal en desktop, barra compacta en móvil */}
      {!isMobile ? (
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {STEPS.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
      ) : (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Paso {activeStep + 1} de {STEPS.length}: {STEPS[activeStep]}
          </Typography>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>{error}</Alert>}

      <Box sx={{ minHeight: { xs: 'auto', sm: 220 }, mb: 2 }}>
        {renderStep()}
      </Box>

      {isMobile ? (
        <MobileStepper
          variant="progress"
          steps={STEPS.length}
          position="static"
          activeStep={activeStep}
          sx={{ flexGrow: 1, bgcolor: 'transparent', px: 0 }}
          nextButton={
            <Button size="small" variant="contained" onClick={handleNext} disabled={loading}>
              {loading ? <CircularProgress size={20} /> : activeStep === STEPS.length - 1 ? 'Enviar' : 'Siguiente'}
              {!loading && <IconChevronRight size={18} />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0 || loading}>
              <IconChevronLeft size={18} /> Atrás
            </Button>
          }
        />
      ) : (
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={handleBack} disabled={activeStep === 0 || loading} startIcon={<IconChevronLeft size={18} />}>
            Atrás
          </Button>
          <Button variant="contained" onClick={handleNext} disabled={loading} endIcon={!loading && activeStep < STEPS.length - 1 ? <IconChevronRight size={18} /> : null}>
            {loading ? <CircularProgress size={24} /> : activeStep === STEPS.length - 1 ? 'Enviar Solicitud' : 'Siguiente'}
          </Button>
        </Stack>
      )}
    </Card>
  );
}

function Row({ label, value }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
      <Typography variant="body2" color="text.secondary">{label}:</Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>{value || '—'}</Typography>
    </Box>
  );
}
