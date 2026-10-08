'use client';

import { motion } from 'framer-motion';
import { Box, Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import { IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function SuccessSolicitudModal({ open = false, solicitudData = null, onClose = () => {} }) {
  const router = useRouter();

  const handleGoToDocuments = () => {
    onClose();
    router.push('/dashboard/cliente/documentos');
  };

  const handleGoToSolicitudes = () => {
    onClose();
    router.push('/dashboard/cliente/solicitudes');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
        }
      }}
    >
      <DialogContent sx={{ p: { xs: 3, sm: 5 } }}>
        <Stack spacing={3} sx={{ textAlign: 'center', py: 2 }}>
          {/* Animated Checkmark */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'success.lighter',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto'
              }}
            >
              <IconCheck size={48} color="currentColor" style={{ color: '#10b981' }} />
            </Box>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              ¡Solicitud Creada!
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Typography variant="body1" color="text.secondary">
              Tu solicitud ha sido registrada exitosamente. Ahora sube tus documentos para acelerar el proceso de aprobación.
            </Typography>
          </motion.div>

          {/* Details if available */}
          {solicitudData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Monto Solicitado:
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      ${Number(solicitudData.monto_solicitado || 0).toLocaleString('es-MX')} MXN
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Plazo:
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {solicitudData.plazo_meses || 24} meses
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Estado:
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: 'warning.main',
                        textTransform: 'capitalize'
                      }}
                    >
                      {solicitudData.status || 'Pendiente'}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </motion.div>
          )}

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleGoToDocuments}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Ir a Subir Documentos
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={handleGoToSolicitudes}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Ver Mis Solicitudes
              </Button>
            </Stack>
          </motion.div>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
