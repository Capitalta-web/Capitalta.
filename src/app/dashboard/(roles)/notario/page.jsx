'use client';

import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';

export default function NotarioDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Panel de Notario
        </Typography>
        <Typography color="text.secondary">Gestión de formalización y firmas de contratos.</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Contratos Pendientes</Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold">
                0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Solicitudes listas para formalizar
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Próximas Firmas</Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold">
                0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Citas agendadas para esta semana
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
