'use client';

import { Card, CardContent, Box, Stack, Typography, Button, Chip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

export default function ProximaCitaCard({ cita, onAgendar }) {
  if (!cita) {
    return (
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight="bold">
              Agendar Cita
            </Typography>
            <Typography color="text.secondary">
              No tienes citas agendadas. Agenda una cita con uno de nuestros asesores para continuar con tu solicitud.
            </Typography>
            <Button variant="contained" onClick={onAgendar}>
              Agendar Cita Ahora
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ boxShadow: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Próxima Cita
          </Typography>
          <Chip label="Confirmada" color="success" variant="filled" size="small" />
        </Box>

        <Stack spacing={2}>
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
                {cita.sucursal || 'Torre Cuarzo, Piso 33'}
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
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" fullWidth size="small">
              Reprogramar
            </Button>
            <Button variant="outlined" fullWidth size="small" color="error">
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
