'use client';

import { Card, CardContent, Box, Stack, Typography, Button, Checkbox, FormControlLabel, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const DOCUMENTOS_REQUERIDOS = [
  {
    id: 'identificacion',
    nombre: 'Identificación (DNI/Pasaporte)',
    completado: false
  },
  {
    id: 'comprobante_domicilio',
    nombre: 'Comprobante de Domicilio',
    completado: false
  },
  {
    id: 'ultimas_declaraciones',
    nombre: 'Últimas 3 Declaraciones de Impuestos',
    completado: false
  },
  {
    id: 'comprobante_ingresos',
    nombre: 'Comprobante de Ingresos',
    completado: false
  },
  {
    id: 'avance_credito',
    nombre: 'Avance de Crédito (si aplica)',
    completado: false
  }
];

export default function DocumentosChecklist({ documentos = [] }) {
  // Mapear documentos requeridos con uploads
  const docsConStatus = DOCUMENTOS_REQUERIDOS.map((doc) => ({
    ...doc,
    completado: documentos.some((d) => d.tipo_documento === doc.id && d.estado === 'validado')
  }));

  const completados = docsConStatus.filter((d) => d.completado).length;
  const porcentaje = Math.round((completados / docsConStatus.length) * 100);

  return (
    <Card sx={{ boxShadow: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Documentos Requeridos
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="primary">
            {completados}/{docsConStatus.length}
          </Typography>
        </Box>

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
        <Stack spacing={1} sx={{ mb: 2 }}>
          {docsConStatus.map((doc) => (
            <Box
              key={doc.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                bgcolor: doc.completado ? '#E8F5E9' : '#F5F5F5',
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: doc.completado ? '#E0F2F1' : '#EEEEEE'
                }
              }}
            >
              {doc.completado ? (
                <CheckCircleIcon sx={{ color: 'success.main', flexShrink: 0 }} />
              ) : (
                <PendingIcon sx={{ color: 'warning.main', flexShrink: 0 }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  flex: 1,
                  color: doc.completado ? 'success.main' : 'text.primary',
                  textDecoration: doc.completado ? 'line-through' : 'none',
                  fontWeight: doc.completado ? 500 : 400
                }}
              >
                {doc.nombre}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Botones */}
        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<CloudUploadIcon />} fullWidth>
            Subir Documento
          </Button>
          <Button variant="outlined" fullWidth>
            Ver Todos
          </Button>
        </Stack>

        {porcentaje === 100 && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#E8F5E9', borderRadius: 1, border: '1px solid #4CAF50' }}>
            <Typography variant="body2" color="success.main" fontWeight="600">
              ✓ Todos los documentos han sido subidos y validados
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
