'use client';

import { Card, CardContent, Box, Stack, Typography, Button, Chip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

export default function ProximaCitaCard({ cita, onAgendar, canAgendar, onCompletarExpediente }) {
  if (!cita) {
    return (
      <Card sx={{ boxShadow: 2, borderRadius: 3, height: 1, minHeight: { xs: 'auto', md: 360 } }}>
        <CardContent sx={{ height: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              Agendar Cita
            </Typography>
            <Typography color="text.secondary">
              {canAgendar
                ? 'Cuando tu expediente esté completo, agenda una cita con un asesor para revisar tu caso.'
                : 'Completa tu expediente para habilitar la agenda y continuar con tu solicitud.'}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
              <Button variant="contained" onClick={onAgendar} disabled={!canAgendar}>
                Agendar cita
              </Button>
              {!canAgendar && (
                <Button variant="outlined" onClick={onCompletarExpediente}>
                  Completar expediente
                </Button>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ boxShadow: 2, borderRadius: 3, height: 1, minHeight: { xs: 'auto', md: 360 } }}>
      <CardContent sx={{ height: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Próxima Cita
          </Typography>
          <Chip label="Confirmada" color="success" variant="filled" size="small" />
        </Box>

        <Stack spacing={2} sx={{ flex: 1 }}>
          {/* Fecha y hora */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EventIcon color="primary" />
            <Stack spacing={0}>
              <Typography variant="caption" color="text.secondary">
                Fecha y Hora
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {cita.fecha} - {cita.hora}
              </Typography>
            </Stack>
          </Box>

          {/* Ubicación */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocationOnIcon color="primary" />
            <Stack spacing={0}>
              <Typography variant="caption" color="text.secondary">
                Ubicación
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {cita.sucursal || 'Oficinas Satélite'}
              </Typography>
            </Stack>
          </Box>

          {/* Asesor */}
          {cita.asesor && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PersonIcon color="primary" />
              <Stack spacing={0}>
                <Typography variant="caption" color="text.secondary">
                  Asesor
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {cita.asesor}
                </Typography>
              </Stack>
            </Box>
          )}

          {/* Código de cita */}
          <Box sx={{ p: 1.5, bgcolor: '#F5F5F5', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Código de Cita
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="primary">
              {cita.codigo || 'N/A'}
            </Typography>
          </Box>

          {/* Botones */}
          <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
            <Button variant="outlined" fullWidth size="small" onClick={onAgendar}>
              Reprogramar
            </Button>
            <Button variant="outlined" fullWidth size="small" color="error" onClick={onAgendar}>
              Ver / gestionar
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
