import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ContainerWrapper from '@/components/ContainerWrapper';
import { createSupabaseServerClient } from '@/utils/supabaseClient';
import LeadsTable from './LeadsTable';

export const dynamic = 'force-dynamic';

export default async function LeadsAdminPage({ searchParams }) {
  const token = searchParams?.token;
  const expectedToken = process.env.ADMIN_CITAS_TOKEN; // Reutilizo el token de admin

  if (expectedToken && token !== expectedToken) {
    notFound();
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return <Typography>Error de configuración de Supabase</Typography>;
  }

  const { data: conversations, error } = await supabase
    .from('chat_conversaciones')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Supabase Error:', error);
    // Si la tabla no existe (migración no aplicada), mostrar mensaje amigable
    if (error.code === '42P01') { // undefined_table
      return (
         <Box sx={{ p: 4, bgcolor: 'background.paper', minHeight: '100vh' }}>
            <ContainerWrapper>
              <Stack spacing={2}>
                <Typography variant="h5" color="error">⚠️ Tabla 'chat_conversaciones' no encontrada</Typography>
                <Typography variant="body1">
                  Parece que la migración de base de datos no se ha aplicado todavía.
                </Typography>
                <Typography variant="body2" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, fontFamily: 'monospace' }}>
                  Ejecuta el archivo SQL: src/supabase/migrations/create_chat_table.sql
                </Typography>
              </Stack>
            </ContainerWrapper>
         </Box>
      );
    }
  }

  return (
    <Box
      sx={{
        bgcolor: 'grey.50',
        minHeight: '100vh',
        py: { xs: 5, sm: 7 }
      }}
    >
      <ContainerWrapper>
        <Stack spacing={4}>
          <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="overline" sx={{ letterSpacing: 1 }}>
                Admin
              </Typography>
              <Button 
                component={Link} 
                href={`/admin/citas?token=${token}`}
                variant="outlined" 
                size="small"
              >
                Ver Citas Agendadas
              </Button>
            </Box>
            <Typography variant="h3">Dashboard de Leads & Chats</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720 }}>
              Historial de conversaciones con el Asistente Virtual. Analiza las interacciones y detecta oportunidades.
            </Typography>
          </Stack>

          <LeadsTable conversations={conversations || []} />
        </Stack>
      </ContainerWrapper>
    </Box>
  );
}
