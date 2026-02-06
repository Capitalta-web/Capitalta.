'use client';

import { Typography, Box, Card, CardContent } from '@mui/material';
import { IconCalendarEvent } from '@tabler/icons-react';

export default function CalendarioPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Calendario
      </Typography>
      <Card sx={{ mt: 2, textAlign: 'center', py: 5 }}>
        <CardContent>
          <IconCalendarEvent size={64} style={{ opacity: 0.5, marginBottom: 16 }} />
          <Typography variant="h5" gutterBottom>
            Próximamente
          </Typography>
          <Typography color="text.secondary">
            El calendario de citas y vencimientos estará disponible en la próxima actualización.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
