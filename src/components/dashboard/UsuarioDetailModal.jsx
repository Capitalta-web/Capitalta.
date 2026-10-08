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
  IconButton,
  Alert,
  List,
  ListItem,
  ListItemText,
  TextField,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconX, IconAlertTriangle, IconShieldLock, IconCheck, IconClock } from '@tabler/icons-react';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

const DOCUMENT_TYPES = [
  { id: 'ine', label: 'INE / Pasaporte' },
  { id: 'comprobante_domicilio', label: 'Comprobante de Domicilio' },
  { id: 'nominas', label: 'Últimas 3 Nóminas' },
  { id: 'rfc', label: 'RFC' }
];

const fmt = (v) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(v || 0);

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

export default function UsuarioDetailModal({ usuario, currentUserId, onClose, onRoleChanged }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const supabase = createSupabaseBrowserClient();

  const [loading, setLoading] = useState(true);
  const [solicitudes, setSolicitudes] = useState([]);
  const [docs, setDocs] = useState({});
  const [buroHist, setBuroHist] = useState([]);

  // Sub-diálogo de cambio de rol
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [roleLoading, setRoleLoading] = useState(false);
  const [roleError, setRoleError] = useState(null);
  const [role, setRole] = useState(usuario?.role || 'cliente');

  const open = Boolean(usuario);

  useEffect(() => {
    if (!usuario) return;
    setRole(usuario.role || 'cliente');
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [s, d, b] = await Promise.all([
          supabase.from('solicitudes').select('id, monto_solicitado, plazo_meses, tipo, status, created_at').eq('cliente_id', usuario.id).order('created_at', { ascending: false }),
          supabase.from('documentos').select('tipo').eq('cliente_id', usuario.id),
          supabase.from('buro_consultas').select('score, created_at, modo, status').eq('cliente_id', usuario.id).order('created_at', { ascending: false })
        ]);
        setSolicitudes(s.data || []);
        const map = {};
        (d.data || []).forEach((x) => { map[x.tipo] = true; });
        setDocs(map);
        setBuroHist(b.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [usuario, supabase]);

  if (!usuario) return null;

  const esAdmin = role === 'admin';
  const targetRole = esAdmin ? 'cliente' : 'admin';
  const esSiMismo = usuario.id === currentUserId;
  const docsSubidos = DOCUMENT_TYPES.filter((d) => docs[d.id]).length;
  const domicilio = [usuario.domicilio_calle, usuario.domicilio_numero, usuario.domicilio_colonia, usuario.domicilio_cp, usuario.domicilio_municipio, usuario.domicilio_estado].filter(Boolean).join(', ');

  const handleConfirmRole = async () => {
    setRoleLoading(true);
    setRoleError(null);
    try {
      const res = await fetch('/api/admin/promote-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: usuario.id, newRole: targetRole, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al cambiar el rol');
      setRole(targetRole);
      setConfirmOpen(false);
      setPassword('');
      if (onRoleChanged) onRoleChanged(usuario.id, targetRole);
    } catch (err) {
      setRoleError(err.message);
    } finally {
      setRoleLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile} PaperProps={{ sx: { borderRadius: isMobile ? 0 : 3 } }}>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{usuario.full_name || usuario.email}</Typography>
              <Typography variant="caption" color="text.secondary">{usuario.email}</Typography>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label={esAdmin ? 'Administrador' : 'Cliente'} color={esAdmin ? 'warning' : 'default'} size="small" />
              <IconButton onClick={onClose} size="small"><IconX size={20} /></IconButton>
            </Stack>
          </Stack>
        </DialogTitle>

        <DialogContent dividers>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
          ) : (
            <Stack spacing={2}>
              {/* Identidad */}
              <Section title="Información del usuario">
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}><Field label="RFC" value={usuario.rfc} /></Grid>
                  <Grid item xs={6} sm={3}><Field label="CURP" value={usuario.curp} /></Grid>
                  <Grid item xs={6} sm={3}><Field label="Teléfono" value={usuario.phone} /></Grid>
                  <Grid item xs={6} sm={3}><Field label="Estado" value={usuario.status || 'activo'} /></Grid>
                  <Grid item xs={12}><Field label="Domicilio" value={domicilio} /></Grid>
                  <Grid item xs={12} sm={6}><Field label="Registrado" value={usuario.created_at ? new Date(usuario.created_at).toLocaleDateString('es-MX') : null} /></Grid>
                </Grid>
              </Section>

              {/* Solicitudes */}
              <Section title={`Solicitudes (${solicitudes.length})`}>
                {solicitudes.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">Sin solicitudes</Typography>
                ) : (
                  <List dense disablePadding>
                    {solicitudes.map((s) => (
                      <ListItem key={s.id} disableGutters secondaryAction={<Chip label={s.status} size="small" />}>
                        <ListItemText
                          primary={`${fmt(s.monto_solicitado)} · ${s.plazo_meses}m · ${s.tipo}`}
                          secondary={new Date(s.created_at).toLocaleDateString('es-MX')}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Section>

              {/* Documentos + Buró */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Section title={`Documentos (${docsSubidos}/${DOCUMENT_TYPES.length})`}>
                    <List dense disablePadding>
                      {DOCUMENT_TYPES.map((d) => (
                        <ListItem key={d.id} disableGutters sx={{ py: 0.25 }}>
                          {docs[d.id] ? <IconCheck size={16} color="#10b981" style={{ marginRight: 8 }} /> : <IconClock size={16} color="#f59e0b" style={{ marginRight: 8 }} />}
                          <ListItemText primary={d.label} primaryTypographyProps={{ variant: 'body2' }} />
                        </ListItem>
                      ))}
                    </List>
                  </Section>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Section title={`Historial de Buró (${buroHist.length})`}>
                    {buroHist.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">Sin consultas</Typography>
                    ) : (
                      <List dense disablePadding>
                        {buroHist.slice(0, 5).map((b, i) => (
                          <ListItem key={i} disableGutters secondaryAction={b.score != null ? <Chip label={`Score ${b.score}`} size="small" color={b.score >= 700 ? 'success' : b.score >= 600 ? 'warning' : 'error'} /> : null}>
                            <ListItemText
                              primary={new Date(b.created_at).toLocaleDateString('es-MX')}
                              secondary={b.modo}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Section>
                </Grid>
              </Grid>

              <Divider />

              {/* Gestión de rol */}
              <Section title="Rol y permisos">
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} justifyContent="space-between">
                  <Typography variant="body2">
                    Rol actual: <strong>{esAdmin ? 'Administrador' : 'Cliente'}</strong>
                  </Typography>
                  {esSiMismo ? (
                    <Typography variant="caption" color="text.secondary">No puedes cambiar tu propio rol aquí.</Typography>
                  ) : (
                    <Button
                      variant={esAdmin ? 'outlined' : 'contained'}
                      color={esAdmin ? 'inherit' : 'warning'}
                      startIcon={<IconShieldLock size={18} />}
                      onClick={() => { setRoleError(null); setPassword(''); setConfirmOpen(true); }}
                    >
                      {esAdmin ? 'Quitar rol de administrador' : 'Promover a administrador'}
                    </Button>
                  )}
                </Stack>
              </Section>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit">Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Sub-diálogo: confirmación con contraseña */}
      <Dialog open={confirmOpen} onClose={() => !roleLoading && setConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconAlertTriangle size={22} color="#f59e0b" />
            <span>Confirmar cambio de rol</span>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {targetRole === 'admin' ? (
              <Alert severity="warning">
                Estás por dar acceso de <strong>administrador</strong> a <strong>{usuario.email}</strong>. Un admin puede ver
                y modificar TODAS las solicitudes, usuarios, documentos y la configuración del buró. Hazlo solo si confías
                plenamente en esta persona.
              </Alert>
            ) : (
              <Alert severity="info">
                Vas a quitar el rol de administrador a <strong>{usuario.email}</strong>. Perderá el acceso al panel administrativo.
              </Alert>
            )}
            {roleError && <Alert severity="error">{roleError}</Alert>}
            <TextField
              type="password"
              fullWidth
              label="Confirma tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={roleLoading}
              autoFocus
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setConfirmOpen(false)} disabled={roleLoading} color="inherit">Cancelar</Button>
          <Button
            variant="contained"
            color={targetRole === 'admin' ? 'warning' : 'primary'}
            onClick={handleConfirmRole}
            disabled={roleLoading || !password}
          >
            {roleLoading ? <CircularProgress size={22} /> : targetRole === 'admin' ? 'Sí, promover a admin' : 'Quitar admin'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
