'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  Card,
  Stack,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
  CircularProgress,
  Divider
} from '@mui/material';
import { IconShieldLock, IconPercentage } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

// Bandas de tasa: clave en BD, etiqueta y rango de score
const BANDAS = [
  { key: 'tasa_excelente', label: 'Excelente (BC Score ≥ 750)' },
  { key: 'tasa_buena', label: 'Bueno (700–749)' },
  { key: 'tasa_regular', label: 'Regular (650–699)' },
  { key: 'tasa_alta', label: 'Riesgo alto (600–649)' },
  { key: 'tasa_muy_alta', label: 'Riesgo muy alto (< 600)' }
];

export default function ConfiguracionBuroPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [cfg, setCfg] = useState({ configurado: false, modo: 'sandbox', producto: 'reporte_credito', endpoint_url: '', updated_at: null });
  const [token, setToken] = useState('');

  // Tasas (en porcentaje para la UI, ej. 24 = 24%)
  const [tasas, setTasas] = useState({ tasa_excelente: 24, tasa_buena: 30, tasa_regular: 38, tasa_alta: 45, tasa_muy_alta: 55 });
  const [tasasSaving, setTasasSaving] = useState(false);
  const [tasasSuccess, setTasasSuccess] = useState(false);
  const [tasasError, setTasasError] = useState(null);

  // Parámetros de crédito
  const [params, setParams] = useState({ monto_minimo: 5000, monto_maximo: 1000000, plazos_meses: '6,12,24,36,48' });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/buro-config');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error');
        setCfg(data);
      } catch (err) {
        setError(err.message);
      }
      // Cargar tasas (decimal -> porcentaje)
      try {
        const { data: tc } = await supabase.from('config_credito').select('*').eq('id', 'default').maybeSingle();
        if (tc) {
          setTasas({
            tasa_excelente: Math.round(Number(tc.tasa_excelente) * 100),
            tasa_buena: Math.round(Number(tc.tasa_buena) * 100),
            tasa_regular: Math.round(Number(tc.tasa_regular) * 100),
            tasa_alta: Math.round(Number(tc.tasa_alta) * 100),
            tasa_muy_alta: Math.round(Number(tc.tasa_muy_alta) * 100)
          });
          setParams({
            monto_minimo: Number(tc.monto_minimo) || 5000,
            monto_maximo: Number(tc.monto_maximo) || 1000000,
            plazos_meses: tc.plazos_meses || '6,12,24,36,48'
          });
        }
      } catch (err) {
        console.error('tasas load', err);
      }
      setLoading(false);
    };
    load();
  }, [supabase]);

  const handleSaveTasas = async () => {
    setTasasSaving(true);
    setTasasError(null);
    setTasasSuccess(false);
    try {
      const payload = {
        id: 'default',
        tasa_excelente: Number(tasas.tasa_excelente) / 100,
        tasa_buena: Number(tasas.tasa_buena) / 100,
        tasa_regular: Number(tasas.tasa_regular) / 100,
        tasa_alta: Number(tasas.tasa_alta) / 100,
        tasa_muy_alta: Number(tasas.tasa_muy_alta) / 100,
        monto_minimo: Number(params.monto_minimo) || 0,
        monto_maximo: Number(params.monto_maximo) || 0,
        plazos_meses: String(params.plazos_meses || '').replace(/\s/g, ''),
        updated_at: new Date().toISOString()
      };
      const { error: e } = await supabase.from('config_credito').upsert(payload, { onConflict: 'id' });
      if (e) throw e;
      setTasasSuccess(true);
    } catch (err) {
      setTasasError(err.message);
    } finally {
      setTasasSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const payload = {
        modo: cfg.modo,
        endpoint_url: cfg.endpoint_url,
        producto: cfg.producto
      };
      if (token.trim()) {
        payload.credenciales = { token: token.trim() };
      }
      const res = await fetch('/api/admin/buro-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar');
      setSuccess(true);
      setToken('');
      setCfg((c) => ({ ...c, configurado: c.configurado || Boolean(payload.credenciales) }));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: 6, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="md">
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink component="button" variant="body2" color="inherit" onClick={() => router.push('/dashboard/admin')}>
            Dashboard
          </MuiLink>
          <Typography color="textPrimary">Configuración de Buró</Typography>
        </Breadcrumbs>

        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
          <IconShieldLock size={28} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Configuración de Buró de Crédito</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Las credenciales se guardan cifradas en el servidor y nunca se muestran de vuelta.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Configuración guardada</Alert>}

        <Card sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="subtitle2">Estado:</Typography>
              {cfg.configurado
                ? <Chip label="Credenciales configuradas" color="success" size="small" />
                : <Chip label="Sin credenciales" color="warning" size="small" />}
              <Chip label={cfg.modo === 'produccion' ? 'Producción' : 'Sandbox'} color={cfg.modo === 'produccion' ? 'primary' : 'default'} size="small" variant="outlined" />
            </Stack>

            <FormControl fullWidth>
              <InputLabel>Modo</InputLabel>
              <Select value={cfg.modo} label="Modo" onChange={(e) => setCfg((c) => ({ ...c, modo: e.target.value }))}>
                <MenuItem value="sandbox">Sandbox (pruebas — datos simulados)</MenuItem>
                <MenuItem value="produccion">Producción (consulta real)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Producto</InputLabel>
              <Select value={cfg.producto} label="Producto" onChange={(e) => setCfg((c) => ({ ...c, producto: e.target.value }))}>
                <MenuItem value="reporte_credito">Reporte de Crédito (BC Score)</MenuItem>
                <MenuItem value="prospector">Prospector</MenuItem>
                <MenuItem value="estimador_ingresos">Estimador de Ingresos</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Endpoint URL de APIF"
              placeholder="https://apif.burodecredito.com.mx/..."
              value={cfg.endpoint_url}
              onChange={(e) => setCfg((c) => ({ ...c, endpoint_url: e.target.value }))}
              helperText="Solo necesario en modo producción"
            />

            <Divider />

            <TextField
              fullWidth
              type="password"
              label={cfg.configurado ? 'Token de acceso (dejar vacío para conservar el actual)' : 'Token de acceso de Buró'}
              placeholder={cfg.configurado ? '•••••••• (configurado)' : 'Pega aquí el token de APIF'}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              helperText="Se guarda cifrado. No se muestra de vuelta por seguridad."
            />

            <Box>
              <Button variant="contained" onClick={handleSave} disabled={saving}>
                {saving ? <CircularProgress size={24} /> : 'Guardar configuración'}
              </Button>
            </Box>

            {cfg.modo === 'produccion' && !cfg.configurado && (
              <Alert severity="info">
                En modo producción necesitas el endpoint y el token reales del contrato con Buró de Crédito.
                Mientras tanto, usa el modo Sandbox para probar el flujo completo.
              </Alert>
            )}
          </Stack>
        </Card>

        {/* Parámetros y tasas de crédito */}
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 4, mb: 1 }}>
          <IconPercentage size={26} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Parámetros y tasas de crédito</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Límites de monto, plazos disponibles y tasa anual sugerida por el motor de decisión según el BC Score.
        </Typography>

        {tasasError && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setTasasError(null)}>{tasasError}</Alert>}
        {tasasSuccess && <Alert severity="success" sx={{ mb: 2 }}>Configuración guardada</Alert>}

        <Card sx={{ p: { xs: 2, sm: 3 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>Límites del crédito</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="number" label="Monto mínimo" value={params.monto_minimo}
                onChange={(e) => setParams((p) => ({ ...p, monto_minimo: e.target.value }))}
                InputProps={{ startAdornment: <Typography variant="body2" sx={{ mr: 0.5 }}>$</Typography> }} inputProps={{ min: 0, step: 1000 }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="number" label="Monto máximo" value={params.monto_maximo}
                onChange={(e) => setParams((p) => ({ ...p, monto_maximo: e.target.value }))}
                InputProps={{ startAdornment: <Typography variant="body2" sx={{ mr: 0.5 }}>$</Typography> }} inputProps={{ min: 0, step: 1000 }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Plazos (meses)" value={params.plazos_meses}
                onChange={(e) => setParams((p) => ({ ...p, plazos_meses: e.target.value }))}
                helperText="Separados por coma. Ej: 6,12,24,36,48" />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>Tasas anuales por nivel de score</Typography>
            </Grid>
            {BANDAS.map((b) => (
              <Grid item xs={12} sm={6} key={b.key}>
                <TextField
                  fullWidth
                  type="number"
                  label={b.label}
                  value={tasas[b.key]}
                  onChange={(e) => setTasas((t) => ({ ...t, [b.key]: e.target.value }))}
                  InputProps={{ endAdornment: <Typography variant="body2" color="text.secondary">% anual</Typography> }}
                  inputProps={{ min: 0, max: 200, step: 0.5, inputMode: 'decimal' }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSaveTasas} disabled={tasasSaving}>
                {tasasSaving ? <CircularProgress size={24} /> : 'Guardar configuración de crédito'}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}
