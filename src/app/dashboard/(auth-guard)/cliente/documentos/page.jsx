'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  Grid,
  Card,
  Stack,
  LinearProgress,
  Alert,
  CircularProgress
} from '@mui/material';
import { IconUpload, IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

const DOCUMENT_TYPES = [
  { id: 'ine', label: 'INE/Pasaporte', description: 'Copia de tu identificación vigente' },
  { id: 'comprobante_domicilio', label: 'Comprobante de Domicilio', description: 'Recibo de servicios (agua, luz, teléfono)' },
  { id: 'nominas', label: 'Últimas 3 Nóminas', description: 'Comprobantes de ingresos de los últimos 3 meses' },
  { id: 'rfc', label: 'RFC', description: 'Constancia de tu Registro Federal de Contribuyentes' }
];

export default function DocumentosPage() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createSupabaseBrowserClient();

  const [documentos, setDocumentos] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocumentos = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('documentos')
          .select('*')
          .eq('cliente_id', user.id);

        if (fetchError) throw fetchError;

        // Organize by type
        const docsMap = {};
        data?.forEach(doc => {
          docsMap[doc.tipo] = doc;
        });
        setDocumentos(docsMap);
      } catch (err) {
        console.error('Error fetching documentos:', err);
        setError('Error al cargar los documentos');
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentos();
  }, [user?.id, supabase]);

  const handleFileUpload = async (docType, file) => {
    if (!file || !user?.id) return;

    // Validate
    if (file.size > 5 * 1024 * 1024) {
      setError('El archivo es muy grande (máx 5MB)');
      return;
    }

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Formato no válido. Solo PDF, JPG o PNG');
      return;
    }

    setUploading(docType);
    setError(null);

    try {
      // Upload to storage
      const fileName = `${user.id}/${docType}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('documentos')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Save to database
      const { data: docData, error: insertError } = await supabase
        .from('documentos')
        .upsert(
          [{
            cliente_id: user.id,
            tipo: docType,
            url: fileName,
            status: 'pendiente',
            uploaded_at: new Date().toISOString()
          }],
          { onConflict: 'cliente_id,tipo' }
        )
        .select();

      if (insertError) throw insertError;

      // Update state
      setDocumentos(prev => ({
        ...prev,
        [docType]: docData?.[0]
      }));
    } catch (err) {
      console.error('Error uploading documento:', err);
      setError(err?.message || 'Error al cargar el documento');
    } finally {
      setUploading(null);
    }
  };

  const handleInputChange = (docType) => (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(docType, file);
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  const progress = Object.keys(documentos).length / DOCUMENT_TYPES.length * 100;

  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink component="button" variant="body2" color="inherit" onClick={() => router.push('/dashboard/cliente')}>
            Inicio
          </MuiLink>
          <Typography color="textPrimary">Documentos</Typography>
        </Breadcrumbs>

        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Carga tus Documentos
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Necesitamos estos documentos para procesar tu solicitud
        </Typography>

        {/* Progress */}
        <Card sx={{ p: 2, mb: 3, bgcolor: 'info.lighter' }}>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Progreso: {Object.keys(documentos).length}/{DOCUMENT_TYPES.length} documentos
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'info.main' }}>
                {Math.round(progress)}%
              </Typography>
            </Stack>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 1 }} />
          </Stack>
        </Card>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Document Cards */}
        <Grid container spacing={2}>
          {DOCUMENT_TYPES.map(docType => {
            const isLoaded = documentos[docType.id];
            const isUploading = uploading === docType.id;

            return (
              <Grid item xs={12} sm={6} key={docType.id}>
                <Card
                  sx={{
                    p: 2.5,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxSizing: 'border-box',
                    border: isLoaded ? '2px solid #4caf50' : '2px dashed #ccc',
                    bgcolor: isLoaded ? 'success.lighter' : 'background.paper',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'action.hover'
                    }
                  }}
                  component="label"
                >
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleInputChange(docType.id)}
                    disabled={isUploading}
                  />

                  <Stack spacing={1.5} alignItems="center" sx={{ textAlign: 'center' }}>
                    {isLoaded ? (
                      <>
                        <Box sx={{ color: 'success.main', display: 'flex' }}>
                          <IconCheck size={32} />
                        </Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {docType.label}
                        </Typography>
                        <Typography variant="caption" color="success.main">
                          ✓ Cargado
                        </Typography>
                      </>
                    ) : (
                      <>
                        {isUploading ? (
                          <>
                            <CircularProgress size={32} />
                            <Typography variant="caption" color="textSecondary">
                              Cargando...
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Box sx={{ color: 'primary.main', display: 'flex' }}>
                              <IconUpload size={32} />
                            </Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {docType.label}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {docType.description}
                            </Typography>
                            <Box
                              component="span"
                              sx={{
                                mt: 1,
                                px: 2,
                                py: 0.75,
                                border: '1px solid',
                                borderColor: 'primary.main',
                                color: 'primary.main',
                                borderRadius: 1,
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                display: 'inline-block'
                              }}
                            >
                              Selecciona un archivo
                            </Box>
                          </>
                        )}
                      </>
                    )}
                  </Stack>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Info */}
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2">
            📎 Formatos aceptados: PDF, JPG, PNG | Tamaño máximo: 5MB
          </Typography>
        </Alert>
      </Container>
    </Box>
  );
}
