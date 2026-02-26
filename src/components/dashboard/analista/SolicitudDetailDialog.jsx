'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Divider,
  Chip,
  Tabs,
  Tab,
  Paper,
  CircularProgress,
  TextField,
  IconButton,
  Tooltip,
  Link,
  Alert
} from '@mui/material';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

// Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const getStatusColor = (status) => {
  switch (status) {
    case 'solicitud_iniciada':
      return 'info';
    case 'en_revision':
      return 'warning';
    case 'aprobada':
      return 'success';
    case 'rechazada':
      return 'error';
    case 'requiere_informacion':
      return 'warning';
    case 'validado':
      return 'success';
    default:
      return 'default';
  }
};

const formatCurrency = (amount) => {
  if (!amount) return '$0.00';
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`solicitud-tabpanel-${index}`} aria-labelledby={`solicitud-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function SolicitudDetailDialog({ open, onClose, solicitud, onStatusUpdate }) {
  const [tabValue, setTabValue] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [avaluo, setAvaluo] = useState(null);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [loadingAvaluo, setLoadingAvaluo] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Avaluo Form State
  const [avaluoForm, setAvaluoForm] = useState({
    valor_inmueble: '',
    situacion_legal: '',
    perito_nombre: '',
    fecha_avaluo: new Date().toISOString().split('T')[0]
  });

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    if (open && solicitud) {
      fetchDocuments();
      fetchAvaluo();
    }
  }, [open, solicitud]);

  const fetchDocuments = async () => {
    try {
      setLoadingDocs(true);
      const { data, error } = await supabase
        .from('documentos')
        .select('*')
        .eq('solicitud_id', solicitud.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoadingDocs(false);
    }
  };

  const fetchAvaluo = async () => {
    try {
      setLoadingAvaluo(true);
      const { data, error } = await supabase.from('avaluos').select('*').eq('solicitud_id', solicitud.id).single();

      if (error && error.code !== 'PGRST116') throw error; // Ignore not found error

      if (data) {
        setAvaluo(data);
        setAvaluoForm({
          valor_inmueble: data.valor_inmueble,
          situacion_legal: data.situacion_legal || '',
          perito_nombre: data.perito_nombre || '',
          fecha_avaluo: data.fecha_avaluo
        });
      } else {
        setAvaluo(null);
        // Reset form
        setAvaluoForm({
          valor_inmueble: '',
          situacion_legal: '',
          perito_nombre: '',
          fecha_avaluo: new Date().toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('Error fetching avaluo:', error);
    } finally {
      setLoadingAvaluo(false);
    }
  };

  const handleDocumentAction = async (docId, status) => {
    try {
      setActionLoading(true);
      const { error } = await supabase.from('documentos').update({ estado: status }).eq('id', docId);

      if (error) throw error;
      await fetchDocuments();
    } catch (error) {
      console.error('Error updating document:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveAvaluo = async () => {
    try {
      setActionLoading(true);

      const avaluoData = {
        solicitud_id: solicitud.id,
        ...avaluoForm
      };

      let error;
      if (avaluo) {
        // Update
        const { error: updateError } = await supabase.from('avaluos').update(avaluoData).eq('id', avaluo.id);
        error = updateError;
      } else {
        // Insert
        const { error: insertError } = await supabase.from('avaluos').insert(avaluoData);
        error = insertError;
      }

      if (error) throw error;

      await fetchAvaluo();
      alert('Avalúo guardado correctamente');
    } catch (error) {
      console.error('Error saving avaluo:', error);
      alert('Error al guardar avalúo: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!solicitud) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6">Detalle de Solicitud</Typography>
          <Typography variant="caption" color="text.secondary">
            ID: {solicitud.id}
          </Typography>
        </Box>
        <Chip label={solicitud.estado} color={getStatusColor(solicitud.estado)} />
      </DialogTitle>

      <Divider />

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="solicitud tabs">
            <Tab icon={<PersonIcon />} label="General" iconPosition="start" />
            <Tab icon={<DescriptionIcon />} label="Documentos" iconPosition="start" />
            <Tab icon={<AttachMoneyIcon />} label="Avalúo" iconPosition="start" />
          </Tabs>
        </Box>

        {/* TAB 1: GENERAL INFO */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Cliente
              </Typography>
              <Typography variant="h6">{solicitud.cliente_nombre}</Typography>
              <Typography variant="body2">{solicitud.cliente_email}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Fecha de Solicitud
              </Typography>
              <Typography variant="body1">{new Date(solicitud.created_at).toLocaleString()}</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Tipo de Crédito
              </Typography>
              <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                {solicitud.tipo_credito?.replace('_', ' ')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Monto Solicitado
              </Typography>
              <Typography variant="h6" color="primary.main">
                {formatCurrency(solicitud.monto_solicitado)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Plazo
              </Typography>
              <Typography variant="body1">{solicitud.plazo_meses} meses</Typography>
            </Grid>

            {solicitud.detalles && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                  Información Adicional
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                    {JSON.stringify(solicitud.detalles, null, 2)}
                  </pre>
                </Paper>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        {/* TAB 2: DOCUMENTOS */}
        <TabPanel value={tabValue} index={1}>
          {loadingDocs ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : documents.length === 0 ? (
            <Alert severity="info">No hay documentos subidos para esta solicitud.</Alert>
          ) : (
            <Grid container spacing={2}>
              {documents.map((doc) => (
                <Grid item xs={12} key={doc.id}>
                  <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {doc.tipo_documento}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {doc.nombre_archivo} • {new Date(doc.created_at).toLocaleDateString()}
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <Chip
                          label={doc.estado}
                          size="small"
                          color={doc.estado === 'validado' ? 'success' : doc.estado === 'rechazado' ? 'error' : 'default'}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="outlined" size="small" startIcon={<OpenInNewIcon />} href={doc.url_archivo} target="_blank">
                        Ver
                      </Button>
                      <IconButton color="success" onClick={() => handleDocumentAction(doc.id, 'validado')} disabled={actionLoading}>
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDocumentAction(doc.id, 'rechazado')} disabled={actionLoading}>
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>

        {/* TAB 3: AVALÚO */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Valor del Inmueble (MXN)"
                type="number"
                value={avaluoForm.valor_inmueble}
                onChange={(e) => setAvaluoForm({ ...avaluoForm, valor_inmueble: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de Avalúo"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={avaluoForm.fecha_avaluo}
                onChange={(e) => setAvaluoForm({ ...avaluoForm, fecha_avaluo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre del Perito"
                value={avaluoForm.perito_nombre}
                onChange={(e) => setAvaluoForm({ ...avaluoForm, perito_nombre: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Situación Legal"
                value={avaluoForm.situacion_legal}
                onChange={(e) => setAvaluoForm({ ...avaluoForm, situacion_legal: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSaveAvaluo} disabled={actionLoading}>
                {avaluo ? 'Actualizar Avalúo' : 'Guardar Avalúo'}
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>

      <Divider />

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} color="inherit">
          Cerrar
        </Button>
        <Button
          variant="outlined"
          color="warning"
          startIcon={<PendingIcon />}
          onClick={() => onStatusUpdate('en_revision')}
          disabled={actionLoading}
        >
          En Revisión
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<CancelIcon />}
          onClick={() => onStatusUpdate('rechazada')}
          disabled={actionLoading}
        >
          Rechazar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CheckCircleIcon />}
          onClick={() => onStatusUpdate('en_comite')}
          disabled={actionLoading}
        >
          Enviar a Comité
        </Button>
      </DialogActions>
    </Dialog>
  );
}
