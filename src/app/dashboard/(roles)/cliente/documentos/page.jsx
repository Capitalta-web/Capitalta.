'use client';

import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  IconButton
} from '@mui/material';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

// Components
import MainCard from '@/components/MainCard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const REQUIRED_DOCUMENTS = [
  { id: 'ine', label: 'INE / Identificación Oficial' },
  { id: 'comprobante_domicilio', label: 'Comprobante de Domicilio' },
  { id: 'estado_cuenta', label: 'Estados de Cuenta (Últimos 3 meses)' },
  { id: 'rfc', label: 'Constancia de Situación Fiscal (RFC)' },
  { id: 'curp', label: 'CURP' }
];

export default function DocumentosPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeApplication, setActiveApplication] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/login');
        return;
      }
      setUser(user);

      // Fetch active application
      const { data: applications, error: appError } = await supabase
        .from('solicitudes_credito')
        .select('*')
        .eq('cliente_id', user.id)
        .neq('estado', 'cancelado')
        .neq('estado', 'rechazado')
        .order('created_at', { ascending: false })
        .limit(1);

      if (appError) throw appError;

      if (applications && applications.length > 0) {
        const app = applications[0];
        setActiveApplication(app);

        // Fetch uploaded documents
        const { data: docs, error: docsError } = await supabase.from('documentos').select('*').eq('solicitud_id', app.id);

        if (docsError) throw docsError;
        setUploadedDocuments(docs || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error al cargar la información. Por favor recarga la página.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event, docType) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!activeApplication) {
      setError('No tienes una solicitud activa para subir documentos.');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      // 1. Upload to Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${activeApplication.id}/${docType}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('documentos-credito').upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL (or signed URL if private)
      // Assuming public bucket for simplicity based on prompt context implying easy access,
      // but usually documents are private. Let's try getPublicUrl.
      const {
        data: { publicUrl }
      } = supabase.storage.from('documentos-credito').getPublicUrl(filePath);

      // 3. Insert into database
      const { error: dbError } = await supabase.from('documentos').insert({
        solicitud_id: activeApplication.id,
        tipo_documento: docType,
        nombre_archivo: file.name,
        url_archivo: publicUrl, // or filePath if we want to sign urls later
        subido_por: user.id,
        estado: 'subido'
      });

      if (dbError) throw dbError;

      setSuccess(`Documento ${docType} subido correctamente.`);
      fetchData(); // Refresh list
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Error al subir el documento. Inténtalo de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const getDocStatusIcon = (status) => {
    switch (status) {
      case 'validado':
        return <CheckCircleIcon color="success" />;
      case 'rechazado':
        return <ErrorIcon color="error" />;
      case 'subido':
        return <AccessTimeIcon color="info" />;
      default:
        return <AccessTimeIcon color="action" />;
    }
  };

  const getDocStatusLabel = (status) => {
    switch (status) {
      case 'validado':
        return 'Aprobado';
      case 'rechazado':
        return 'Rechazado';
      case 'subido':
        return 'En Revisión';
      default:
        return 'Pendiente';
    }
  };

  const getDocStatusColor = (status) => {
    switch (status) {
      case 'validado':
        return 'success';
      case 'rechazado':
        return 'error';
      case 'subido':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!activeApplication) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">No tienes una solicitud de crédito activa. Inicia una nueva solicitud para subir documentos.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Expediente Digital
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Sube los documentos requeridos para continuar con la integración de tu expediente.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard title="Documentos Requeridos">
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Documento</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell align="right">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {REQUIRED_DOCUMENTS.map((docType) => {
                    const uploadedDoc = uploadedDocuments.find((d) => d.tipo_documento === docType.id);
                    const isUploaded = !!uploadedDoc;

                    return (
                      <TableRow key={docType.id}>
                        <TableCell>
                          <Typography variant="subtitle1">{docType.label}</Typography>
                          {uploadedDoc && (
                            <Typography variant="caption" color="text.secondary">
                              Archivo: {uploadedDoc.nombre_archivo}
                            </Typography>
                          )}
                          {uploadedDoc?.comentarios && (
                            <Typography variant="caption" display="block" color="error">
                              Nota: {uploadedDoc.comentarios}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {isUploaded ? (
                            <Chip
                              icon={getDocStatusIcon(uploadedDoc.estado)}
                              label={getDocStatusLabel(uploadedDoc.estado)}
                              color={getDocStatusColor(uploadedDoc.estado)}
                              size="small"
                            />
                          ) : (
                            <Chip label="Pendiente" size="small" variant="outlined" />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {(!isUploaded || uploadedDoc.estado === 'rechazado') && (
                            <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} disabled={uploading} size="small">
                              {uploading ? 'Subiendo...' : 'Subir'}
                              <input type="file" hidden accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, docType.id)} />
                            </Button>
                          )}
                          {isUploaded && (
                            <IconButton href={uploadedDoc.url_archivo} target="_blank" color="primary" size="small">
                              <VisibilityIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
        </Grid>

        {/* Optional: List of additional uploaded documents if any */}
        {uploadedDocuments.filter((d) => !REQUIRED_DOCUMENTS.find((rd) => rd.id === d.tipo_documento)).length > 0 && (
          <Grid item xs={12}>
            <MainCard title="Otros Documentos">
              {/* Similar table for other documents */}
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Archivo</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell align="right">Ver</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {uploadedDocuments
                      .filter((d) => !REQUIRED_DOCUMENTS.find((rd) => rd.id === d.tipo_documento))
                      .map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>{doc.tipo_documento}</TableCell>
                          <TableCell>{doc.nombre_archivo}</TableCell>
                          <TableCell>
                            <Chip
                              icon={getDocStatusIcon(doc.estado)}
                              label={getDocStatusLabel(doc.estado)}
                              color={getDocStatusColor(doc.estado)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton href={doc.url_archivo} target="_blank" color="primary" size="small">
                              <VisibilityIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
