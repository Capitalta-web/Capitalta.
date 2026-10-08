'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Stack,
  Typography,
  Chip,
  Divider,
  Grid,
  Card,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  IconButton,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconCheck, IconClock, IconX, IconShieldCheck, IconShieldX } from '@tabler/icons-react';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { evaluarSolicitud } from '@/utils/buro/decision';

const DOCUMENT_TYPES = [
  { id: 'ine', label: 'INE / Pasaporte' },
  { id: 'comprobante_domicilio', label: 'Comprobante de Domicilio' },
  { id: 'nominas', label: 'Últimas 3 Nóminas' },
  { id: 'rfc', label: 'RFC' }
];

const STATUS_OPTIONS = ['pendiente', 'en-revision', 'aprobada', 'rechazada', 'activo', 'cerrado'];

const STATUS_COLOR = {
  pendiente: 'warning', 'en-revision': 'info', aprobada: 'success', rechazada: 'error', activo: 'success', cerrado: 'default'
};

const fmt = (v) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(v || 0);
const calcEdad = (fecha) => {
  if (!fecha) return null;
  const d = new Date(fecha);
  const diff = Date.now() - d.getTime();
  return Math.floor(diff / (365.25 * 24 * 3600 * 1000));
};

function Field({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>{value || '—'}</Typography>
    </Box>
  );
}

function Section({ title, children }) {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: 'primary.main' }}>{title}</Typography>
      {children}
    </Card>
  );
}

export default function SolicitudDetailModal({ solicitud, onClose, onStatusUpdate, updating }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const supabase = createSupabaseBrowserClient();

  const [docs, setDocs] = useState({});
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [buro, setBuro] = useState(null);
  const [buroLoading, setBuroLoading] = useState(false);
  const [buroError, setBuroError] = useState(null);
  const [tasas, setTasas] = useState(null);

  const open = Boolean(solicitud);
  const p = solicitud?.profiles || {};

  useEffect(() => {
    if (!solicitud) return;
    setNewStatus(solicitud.status);
    setNotes(solicitud.admin_notes || '');
    setBuro(null);
    setBuroError(null);
    const fetchData = async () => {
      setLoadingDocs(true);
      try {
        const { data } = await supabase.from('documentos').select('tipo, status').eq('cliente_id', solicitud.cliente_id);
        const map = {};
        data?.forEach((d) => { map[d.tipo] = d; });
        setDocs(map);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingDocs(false);
      }
      // Última consulta de buró para esta solicitud (si existe)
      try {
        const { data: bc } = await supabase
          .from('buro_consultas')
          .select('score, resultado, status, created_at')
          .eq('solicitud_id', solicitud.id)
          .eq('status', 'success')
          .order('created_at', { ascending: false })
          .limit(1);
        if (bc && bc[0]) setBuro(bc[0].resultado);
      } catch (e) {
        console.error('buro fetch', e);
      }
      // Tasas configuradas
      try {
        const { data: tc } = await supabase.from('config_credito').select('*').eq('id', 'default').maybeSingle();
        if (tc) setTasas(tc);
      } catch (e) {
        console.error('tasas fetch', e);
      }
    };
    fetchData();
  }, [solicitud, supabase]);

  const handleConsultarBuro = async () => {
    setBuroLoading(true);
    setBuroError(null);
    try {
      const res = await fetch('/api/admin/buro-consulta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ solicitudId: solicitud.id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al consultar buró');
      setBuro(data.resultado);
    } catch (err) {
      setBuroError(err.message);
    } finally {
      setBuroLoading(false);
    }
  };

  if (!solicitud) return null;

  const nombreCompleto = [p.full_name].filter(Boolean).join(' ') ||
    [solicitud.cliente_nombre].filter(Boolean).join(' ') || p.email || '—';
  const domicilio = [p.domicilio_calle, p.domicilio_numero, p.domicilio_colonia, p.domicilio_cp, p.domicilio_municipio, p.domicilio_estado]
    .filter(Boolean).join(', ');
  const edad = calcEdad(p.fecha_nacimiento);
  const capacidad = (Number(solicitud.ingreso_mensual) || 0) - (Number(solicitud.gastos_mensuales) || 0);
  const docsSubidos = DOCUMENT_TYPES.filter((d) => docs[d.id]).length;
  const decision = evaluarSolicitud({ buro, solicitud, tasas });
  const pct = (v) => (v == null ? '—' : `${Math.round(v * 100)}%`);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile} PaperProps={{ sx: { borderRadius: isMobile ? 0 : 3 } }}>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">Solicitud {String(solicitud.id).slice(0, 8)}</Typography>
            <Typography variant="caption" color="text.secondary">{new Date(solicitud.created_at).toLocaleDateString('es-MX')}</Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={solicitud.status} color={STATUS_COLOR[solicitud.status] || 'default'} size="small" />
            <IconButton onClick={onClose} size="small"><IconX size={20} /></IconButton>
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          {/* Crédito solicitado */}
          <Section title="Crédito solicitado">
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}><Field label="Monto" value={fmt(solicitud.monto_solicitado)} /></Grid>
              <Grid item xs={6} sm={3}><Field label="Plazo" value={`${solicitud.plazo_meses} meses`} /></Grid>
              <Grid item xs={6} sm={3}><Field label="Tipo" value={solicitud.tipo} /></Grid>
              <Grid item xs={6} sm={3}><Field label="Mensualidad aprox." value={fmt((solicitud.monto_solicitado || 0) / (solicitud.plazo_meses || 1))} /></Grid>
              {solicitud.descripcion && <Grid item xs={12}><Field label="Descripción" value={solicitud.descripcion} /></Grid>}
            </Grid>
          </Section>

          {/* Identidad */}
          <Section title="Identidad del solicitante">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><Field label="Nombre completo" value={nombreCompleto} /></Grid>
              <Grid item xs={6} sm={3}><Field label="RFC" value={p.rfc} /></Grid>
              <Grid item xs={6} sm={3}><Field label="CURP" value={p.curp} /></Grid>
              <Grid item xs={6} sm={3}><Field label="Fecha nac." value={p.fecha_nacimiento ? new Date(p.fecha_nacimiento).toLocaleDateString('es-MX') : null} /></Grid>
              <Grid item xs={6} sm={3}><Field label="Edad" value={edad ? `${edad} años` : null} /></Grid>
              <Grid item xs={6} sm={3}><Field label="Teléfono" value={p.phone} /></Grid>
              <Grid item xs={6} sm={3}><Field label="Correo" value={p.email} /></Grid>
              <Grid item xs={12}><Field label="Domicilio" value={domicilio} /></Grid>
            </Grid>
          </Section>

          {/* Financiero */}
          <Section title="Información financiera y laboral">
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}><Field label="Ingreso mensual" value={solicitud.ingreso_mensual ? fmt(solicitud.ingreso_mensual) : null} /></Grid>
              <Grid item xs={6} sm={3}><Field label="Gastos mensuales" value={solicitud.gastos_mensuales ? fmt(solicitud.gastos_mensuales) : null} /></Grid>
              <Grid item xs={6} sm={3}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Capacidad de pago</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: capacidad > 0 ? 'success.main' : 'error.main' }}>
                    {solicitud.ingreso_mensual ? fmt(capacidad) : '—'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}><Field label="Situación laboral" value={solicitud.situacion_laboral} /></Grid>
              <Grid item xs={6} sm={3}><Field label="Empresa" value={solicitud.empresa} /></Grid>
              <Grid item xs={6} sm={3}><Field label="Antigüedad" value={solicitud.antiguedad_laboral} /></Grid>
            </Grid>
          </Section>

          {/* Referencia */}
          <Section title="Referencia personal">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}><Field label="Nombre" value={solicitud.referencia_nombre} /></Grid>
              <Grid item xs={6} sm={4}><Field label="Teléfono" value={solicitud.referencia_telefono} /></Grid>
              <Grid item xs={6} sm={4}><Field label="Relación" value={solicitud.referencia_relacion} /></Grid>
            </Grid>
          </Section>

          {/* Autorización buró + Documentos */}
          <Section title={`Documentos (${docsSubidos}/${DOCUMENT_TYPES.length})`}>
            {loadingDocs ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}><CircularProgress size={20} /></Box>
            ) : (
              <Grid container>
                {DOCUMENT_TYPES.map((d) => (
                  <Grid item xs={12} sm={6} key={d.id}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ py: 0.5 }}>
                      {docs[d.id] ? <IconCheck size={18} color="#10b981" /> : <IconClock size={18} color="#f59e0b" />}
                      <Typography variant="body2">{d.label}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            )}
          </Section>

          {/* Buró de Crédito */}
          <Section title="Buró de Crédito">
            {buroError && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setBuroError(null)}>{buroError}</Alert>}

            {!buro ? (
              <Stack spacing={1.5} alignItems="flex-start">
                <Typography variant="body2" color="text.secondary">
                  Ejecuta la verificación crediticia del solicitante.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={!buroLoading && <IconShieldCheck size={18} />}
                  disabled={buroLoading}
                  onClick={handleConsultarBuro}
                >
                  {buroLoading ? <CircularProgress size={22} /> : 'Consultar Buró'}
                </Button>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">BC Score</Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: `${buro.color}.main`, lineHeight: 1 }}>
                      {buro.score ?? '—'}
                    </Typography>
                  </Box>
                  <Box>
                    <Chip label={`Riesgo: ${buro.nivel_riesgo || '—'}`} color={buro.color || 'default'} sx={{ mb: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Recomendación: {buro.recomendacion || '—'}
                    </Typography>
                  </Box>
                </Stack>

                {buro.resumen && (
                  <Grid container spacing={1.5}>
                    <Grid item xs={6} sm={3}><Field label="Cuentas" value={buro.resumen.cuentas_totales} /></Grid>
                    <Grid item xs={6} sm={3}><Field label="Al corriente" value={buro.resumen.cuentas_al_corriente} /></Grid>
                    <Grid item xs={6} sm={3}><Field label="Deuda total" value={fmt(buro.resumen.deuda_total)} /></Grid>
                    <Grid item xs={6} sm={3}><Field label="Pagos puntuales" value={`${buro.resumen.porcentaje_pagos_puntuales}%`} /></Grid>
                  </Grid>
                )}

                {buro.alertas_hawk?.length > 0 && (
                  <Alert severity="warning">
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Alertas Hawk:</Typography> {buro.alertas_hawk.join(', ')}
                  </Alert>
                )}

                {buro.aviso && <Typography variant="caption" color="text.secondary">{buro.aviso}</Typography>}

                <Button size="small" variant="outlined" disabled={buroLoading} onClick={handleConsultarBuro} sx={{ alignSelf: 'flex-start' }}>
                  {buroLoading ? <CircularProgress size={18} /> : 'Volver a consultar'}
                </Button>
              </Stack>
            )}
          </Section>

          {/* Motor de decisión */}
          <Section title="Motor de Decisión">
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
                <Chip label={`Recomendación: ${decision.label}`} color={decision.color} sx={{ fontWeight: 700 }} />
                {decision.tasaAnual != null && (
                  <Typography variant="body2">Tasa sugerida: <strong>{pct(decision.tasaAnual)} anual</strong></Typography>
                )}
              </Stack>

              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Capacidad disponible</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: decision.disponible > 0 ? 'success.main' : 'error.main' }}>
                      {fmt(decision.disponible)}/mes
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}><Field label="Mensualidad solicitada" value={`${fmt(decision.mensualidad)}/mes`} /></Grid>
                <Grid item xs={6} sm={3}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">DTI (endeudamiento)</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: decision.dti != null && decision.dti > 0.5 ? 'error.main' : 'text.primary' }}>
                      {pct(decision.dti)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}><Field label="Monto máx. sugerido" value={fmt(decision.montoMaximo)} /></Grid>
              </Grid>

              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Factores considerados:</Typography>
                <Stack spacing={0.5}>
                  {decision.razones.map((r, i) => (
                    <Typography key={i} variant="body2" sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
                      <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: `${decision.color}.main`, flexShrink: 0 }} />
                      {r}
                    </Typography>
                  ))}
                </Stack>
              </Box>

              {!buro && (
                <Typography variant="caption" color="warning.main">
                  Consulta el buró arriba para una recomendación completa (la tasa y el score dependen de ello).
                </Typography>
              )}
            </Stack>
          </Section>

          <Divider />

          {/* Decisión */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Decisión del analista</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth size="small">
                  <InputLabel>Estado</InputLabel>
                  <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} label="Estado">
                    {STATUS_OPTIONS.map((s) => <MenuItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField fullWidth size="small" multiline minRows={1} label="Notas internas" value={notes} onChange={(e) => setNotes(e.target.value)} disabled={updating} />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1, flexWrap: 'wrap' }}>
        <Button onClick={onClose} color="inherit" disabled={updating}>Cerrar</Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="error" variant="outlined" disabled={updating} onClick={() => onStatusUpdate('rechazada', notes)}>
          Rechazar
        </Button>
        <Button color="success" variant="outlined" disabled={updating} onClick={() => onStatusUpdate('aprobada', notes)}>
          Aprobar
        </Button>
        <Button variant="contained" disabled={updating || !newStatus} onClick={() => onStatusUpdate(newStatus, notes)}>
          {updating ? <CircularProgress size={22} /> : 'Guardar estado'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
