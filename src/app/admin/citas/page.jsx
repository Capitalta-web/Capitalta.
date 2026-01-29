import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { notFound } from 'next/navigation';
import ContainerWrapper from '@/components/ContainerWrapper';
import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { sucursalesMock } from '@/utils/citas';

function formatoFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(fecha);
}

function formatoHora(hora) {
  return hora;
}

function etiquetaEstado(estado) {
  if (estado === 'programada') {
    return { label: 'Programada', color: 'primary' };
  }

  if (estado === 'completada') {
    return { label: 'Completada', color: 'success' };
  }

  if (estado === 'cancelada') {
    return { label: 'Cancelada', color: 'default' };
  }

  return { label: estado || 'Desconocido', color: 'default' };
}

function obtenerSucursal(sucursalId) {
  if (!sucursalId) {
    return null;
  }

  return sucursalesMock.find((sucursal) => sucursal.id === sucursalId) || null;
}

export const dynamic = 'force-dynamic';

export default async function CitasAdminPage({ searchParams }) {
  const token = searchParams?.token;
  const expectedToken = process.env.ADMIN_CITAS_TOKEN;

  if (expectedToken && token !== expectedToken) {
    notFound();
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    notFound();
  }

  const { data, error } = await supabase
    .from('citas')
    .select('*')
    .order('fecha', { ascending: false })
    .order('hora', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const citas = data || [];

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
                href={`/admin/leads?token=${token}`}
                variant="outlined" 
                size="small"
              >
                Ir a Chats & Leads
              </Button>
            </Box>
            <Typography variant="h3">Citas presenciales</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720 }}>
              Vista interna para revisar las citas presenciales agendadas a través del asistente virtual y del portal de Mi Cuenta.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Para acceder, utiliza la URL con el parámetro de seguridad configurado en ADMIN_CITAS_TOKEN.
            </Typography>
          </Stack>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Sucursal</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Contacto</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {citas.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Aún no hay citas registradas en la base de datos.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
                {citas.map((cita) => {
                  const sucursal = obtenerSucursal(cita.sucursal_id);
                  const { label, color } = etiquetaEstado(cita.status);

                  return (
                    <TableRow key={cita.id}>
                      <TableCell>
                        <Typography variant="body2">{cita.codigo_cita || cita.id}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{cita.fecha ? formatoFecha(cita.fecha) : '-'}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {cita.hora ? formatoHora(cita.hora) : '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{sucursal ? sucursal.nombre : cita.sucursal_id || '-'}</Typography>
                        {sucursal && (
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {sucursal.direccion}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{cita.nombre_cliente || '-'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Stack spacing={0.25}>
                          <Typography variant="body2">{cita.email || '-'}</Typography>
                          <Typography variant="body2">{cita.telefono || '-'}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip size="small" label={label} color={color} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </ContainerWrapper>
    </Box>
  );
}

