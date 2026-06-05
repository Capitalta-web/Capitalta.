'use client';

import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { Card, CardContent, Box, Stack, Typography, Button, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';

import { DOCUMENTOS_REQUERIDOS } from '@/utils/documentosRequeridos';

export default function DocumentosChecklist({ documentos = [] }) {
  const router = useRouter();

  const docsConStatus = useMemo(() => {
    return DOCUMENTOS_REQUERIDOS.map((doc) => {
      const requiredCount = doc.requiredCount || 1;
      const docsForType = documentos.filter((d) => d.tipo_documento === doc.id);
      const nonRejected = docsForType.filter((d) => d.estado !== 'rechazado');
      const uploadedCount = nonRejected.length;
      const isUploaded = uploadedCount > 0;
      const isComplete = uploadedCount >= requiredCount;
      const isValidated = requiredCount === 1 ? docsForType.some((d) => d.estado === 'validado') : false;
      const status = docsForType.some((d) => d.estado === 'rechazado') ? 'rechazado' : isComplete ? 'subido' : 'pendiente';

      return { ...doc, status, isUploaded, isValidated, requiredCount, uploadedCount, isComplete };
    });
  }, [documentos]);

  // Mapear documentos requeridos con uploads
  const completados = docsConStatus.filter((d) => d.isComplete).length;
  const porcentaje = Math.round((completados / docsConStatus.length) * 100);

  return (
    <Card sx={{ boxShadow: 2, borderRadius: 3, height: 1, minHeight: { xs: 'auto', md: 360 } }}>
      <CardContent sx={{ height: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Expediente
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="primary">
            {completados}/{docsConStatus.length}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Sube tus documentos para habilitar la cita y acelerar la evaluación.
        </Typography>

        {/* Progreso */}
        <Box sx={{ mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={porcentaje}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#E0E0E0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundColor: porcentaje < 50 ? '#FF9800' : porcentaje < 100 ? '#2196F3' : '#4CAF50'
              }
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {porcentaje}% completado
          </Typography>
        </Box>

        {/* Checklist */}
        <Stack spacing={1} sx={{ mb: 2, flex: 1, overflow: 'auto', pr: 0.5 }}>
          {docsConStatus.map((doc) => (
            <Box
              key={doc.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                bgcolor: doc.isValidated ? '#E8F5E9' : doc.isUploaded ? '#E3F2FD' : '#F5F5F5',
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: doc.isValidated ? '#E0F2F1' : doc.isUploaded ? '#BBDEFB' : '#EEEEEE'
                }
              }}
              onClick={() => router.push('/dashboard/cliente/documentos')}
            >
              {doc.status === 'rechazado' ? (
                <ErrorIcon sx={{ color: 'error.main', flexShrink: 0 }} />
              ) : doc.isValidated ? (
                <CheckCircleIcon sx={{ color: 'success.main', flexShrink: 0 }} />
              ) : doc.isUploaded ? (
                <PendingIcon sx={{ color: 'info.main', flexShrink: 0 }} />
              ) : (
                <PendingIcon sx={{ color: 'warning.main', flexShrink: 0 }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  flex: 1,
                  color: doc.isValidated ? 'success.main' : doc.isUploaded ? 'info.main' : 'text.primary',
                  fontWeight: doc.isValidated || doc.isUploaded ? 500 : 400
                }}
              >
                {doc.label}
                {doc.requiredCount > 1 && (
                  <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    ({Math.min(doc.uploadedCount, doc.requiredCount)}/{doc.requiredCount})
                  </Typography>
                )}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Botones */}
        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<CloudUploadIcon />} fullWidth onClick={() => router.push('/dashboard/cliente/documentos')}>
            Subir documentos
          </Button>
          <Button variant="outlined" fullWidth onClick={() => router.push('/dashboard/cliente/documentos')}>
            Ver expediente
          </Button>
        </Stack>

        {porcentaje === 100 && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#E8F5E9', borderRadius: 1, border: '1px solid #4CAF50' }}>
            <Typography variant="body2" color="success.main" fontWeight="600">
              Expediente completo: ya puedes agendar tu cita
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
