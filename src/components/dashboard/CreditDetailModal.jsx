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
  LinearProgress,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  IconButton,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconCheck, IconClock, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

const DOCUMENT_TYPES = [
  { id: 'ine', label: 'INE / Pasaporte' },
  { id: 'comprobante_domicilio', label: 'Comprobante de Domicilio' },
  { id: 'nominas', label: 'Últimas 3 Nóminas' },
  { id: 'rfc', label: 'RFC' }
];

const STATUS_LABEL = {
  pendiente: { label: 'Pendiente', color: 'warning' },
  'en-revision': { label: 'En revisión', color: 'info' },
  en_revision: { label: 'En revisión', color: 'info' },
  aprobada: { label: 'Aprobada', color: 'success' },
  rechazada: { label: 'Rechazada', color: 'error' },
  activo: { label: 'Activo', color: 'success' },
  cerrado: { label: 'Cerrado', color: 'default' }
};

const formatCurrency = (v) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(v || 0);

export default function CreditDetailModal({ open, credito, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createSupabaseBrowserClient();

  const [docs, setDocs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open || !user?.id) return;
    const fetchDocs = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.from('documentos').select('tipo, status').eq('cliente_id', user.id);
        const map = {};
        data?.forEach((d) => { map[d.tipo] = d; });
        setDocs(map);
      } catch (e) {
        console.error('Error docs:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, [open, user?.id, supabase]);

  if (!credito) return null;

  const docsSubidos = DOCUMENT_TYPES.filter((d) => docs[d.id]).length;
  const docsProgress = (docsSubidos / DOCUMENT_TYPES.length) * 100;
  const st = STATUS_LABEL[credito.status] || { label: credito.status, color: 'default' };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth fullScreen={isMobile} PaperProps={{ sx: { borderRadius: isMobile ? 0 : 3 } }}>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Detalle del Crédito</Typography>
          <IconButton onClick={onClose} size="small"><IconX size={20} /></IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Resumen */}
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="text.secondary">Folio: {String(credito.id).slice(0, 8)}</Typography>
              <Chip label={st.label} color={st.color} size="small" />
            </Stack>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>{formatCurrency(credito.monto_solicitado)}</Typography>
            <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Plazo</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{credito.plazo_meses} meses</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Tipo</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>{credito.tipo}</Typography>
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Avance de documentos */}
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Avance de documentos</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: docsProgress === 100 ? 'success.main' : 'primary.main' }}>
                {Math.round(docsProgress)}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={docsProgress}
              color={docsProgress === 100 ? 'success' : 'primary'}
              sx={{ height: 10, borderRadius: 1, mb: 2 }}
            />

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}><CircularProgress size={24} /></Box>
            ) : (
              <List dense disablePadding>
                {DOCUMENT_TYPES.map((d) => {
                  const subido = docs[d.id];
                  return (
                    <ListItem key={d.id} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {subido ? <IconCheck size={20} color="#10b981" /> : <IconClock size={20} color="#f59e0b" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={d.label}
                        secondary={subido ? 'Cargado' : 'Pendiente'}
                        primaryTypographyProps={{ variant: 'body2' }}
                        secondaryTypographyProps={{ variant: 'caption', color: subido ? 'success.main' : 'warning.main' }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            )}
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, flexDirection: isMobile ? 'column' : 'row', gap: 1 }}>
        <Button fullWidth={isMobile} onClick={onClose} color="inherit">Cerrar</Button>
        {docsProgress < 100 && (
          <Button
            fullWidth={isMobile}
            variant="contained"
            onClick={() => { onClose(); router.push('/dashboard/cliente/documentos'); }}
          >
            Completar documentos
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
