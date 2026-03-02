'use client';

import { Card, CardContent, Box, Stack, Typography, Button, Avatar, Chip, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';

export default function ClienteDashboardProfile({ profile, onEditClick }) {
  const getInitials = (nombre) => {
    if (!nombre) return 'CL';
    return nombre
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getTipoClienteLabel = (tipo) => {
    const labels = {
      persona_fisica: 'Persona Física',
      persona_moral: 'Persona Moral'
    };
    return labels[tipo] || tipo;
  };

  return (
    <Card sx={{ boxShadow: 2 }}>
      <CardContent>
        <Stack spacing={2}>
          {/* Avatar + Nombre */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'primary.main',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
            >
              {getInitials(profile?.nombre_completo)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {profile?.nombre_completo || 'Cliente'}
              </Typography>
              <Chip
                label={getTipoClienteLabel(profile?.tipo_persona)}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
            <Button
              variant="text"
              startIcon={<EditIcon />}
              onClick={onEditClick}
              sx={{ textTransform: 'none' }}
            >
              Editar
            </Button>
          </Box>

          <Divider />

          {/* Información de contacto */}
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" color="primary" />
              <Stack spacing={0}>
                <Typography variant="caption" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body2">{profile?.email || 'N/A'}</Typography>
              </Stack>
            </Box>

            {profile?.telefono && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" color="primary" />
                <Stack spacing={0}>
                  <Typography variant="caption" color="text.secondary">
                    Teléfono
                  </Typography>
                  <Typography variant="body2">{profile.telefono}</Typography>
                </Stack>
              </Box>
            )}

            {profile?.empresa && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon fontSize="small" color="primary" />
                <Stack spacing={0}>
                  <Typography variant="caption" color="text.secondary">
                    Empresa
                  </Typography>
                  <Typography variant="body2">{profile.empresa}</Typography>
                </Stack>
              </Box>
            )}
          </Stack>

          <Divider />

          {/* Botones de acción */}
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" fullWidth onClick={onEditClick}>
              Actualizar Perfil
            </Button>
            <Button variant="outlined" size="small" fullWidth>
              Cambiar Contraseña
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
