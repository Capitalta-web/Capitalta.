'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import ContainerWrapper from '@/components/ContainerWrapper';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
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

function formatoMoneda(valor) {
  if (!valor || Number.isNaN(valor)) {
    return '--';
  }

  return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

function etiquetaEstado(estado) {
  if (estado === 'confirmada' || estado === 'programada') {
    return { label: 'Confirmada', color: 'primary' };
  }

  if (estado === 'completada') {
    return { label: 'Completada', color: 'success' };
  }

  if (estado === 'cancelada') {
    return { label: 'Cancelada', color: 'default' };
  }

  return { label: estado, color: 'default' };
}

export default function MisCitasPage() {
  const router = useRouter();
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    const fetchCitas = async () => {
      setLoading(true);
      const supabase = createSupabaseBrowserClient();
      
      if (!supabase) {
        setLoading(false);
        return;
      }

      // Verificar sesión
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setLoading(false);
        // Opcional: Redirigir al login si no hay sesión
        // router.push('/auth/login'); 
        return;
      }

      setUser(session.user);

      // Obtener citas del usuario (por email)
      const { data, error } = await supabase
        .from('citas')
        .select('*')
        .eq('email', session.user.email)
        .order('fecha', { ascending: false });

      if (!error && data) {
        // Enriquecer datos con nombre de sucursal
        const citasEnriquecidas = data.map(cita => {
          const sucursalInfo = sucursalesMock.find(s => s.id === cita.sucursal_id);
          return {
            ...cita,
            id: cita.codigo_cita || cita.id, // Preferir codigo_cita
            sucursal: sucursalInfo ? sucursalInfo.nombre : cita.sucursal_id,
            direccion: sucursalInfo ? sucursalInfo.direccion : '',
            tipoCredito: 'Crédito Simple', // Placeholder, podría venir de DB si existiera columna
            monto: 0 // Placeholder
          };
        });
        setCitas(citasEnriquecidas);
      }

      setLoading(false);
    };

    fetchCitas();
  }, [router]);

  const citasFiltradas = useMemo(() => {
    if (filtro === 'futuras') {
      const hoy = new Date();
      // Resetear horas para comparar solo fechas si se desea, o mantener precisión
      return citas.filter((cita) => new Date(`${cita.fecha}T${cita.hora}`) >= hoy);
    }

    if (filtro === 'pasadas') {
      const hoy = new Date();
      return citas.filter((cita) => new Date(`${cita.fecha}T${cita.hora}`) < hoy);
    }

    return citas;
  }, [citas, filtro]);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <Typography variant="h5">Inicia sesión para ver tus citas</Typography>
        <Button variant="contained" href="/auth/login/1">Ir al Login</Button>
      </Box>
    );
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Stack spacing={2.5}>
              <Typography variant="overline" sx={{ letterSpacing: 1 }}>
                Mi cuenta
              </Typography>
              <Typography variant="h3">Citas presenciales</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Aquí puedes consultar tus citas presenciales para firma de contrato y entrega de garantías, así como descargar tu
                comprobante con instrucciones detalladas.
              </Typography>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Instrucciones para tu cita</Typography>
                <Stack component="ul" sx={{ pl: 3, m: 0, gap: 0.5 }}>
                  <Typography component="li" variant="body2">
                    Llega 10 minutos antes de la hora programada.
                  </Typography>
                  <Typography component="li" variant="body2">
                    Lleva identificación oficial vigente.
                  </Typography>
                  <Typography component="li" variant="body2">
                    Presenta comprobante de domicilio reciente.
                  </Typography>
                  <Typography component="li" variant="body2">
                    Lleva la documentación del inmueble y avalúo, si aplica.
                  </Typography>
                  <Typography component="li" variant="body2">
                    Lleva una copia impresa o digital de tu cotización.
                  </Typography>
                </Stack>
              </Stack>
              <Button variant="contained" color="primary" href="/mi-cuenta/citas/nueva">
                Agendar nueva cita
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5">Historial de citas</Typography>
                <Stack direction="row" spacing={1}>
                  <Button size="small" variant={filtro === 'todas' ? 'contained' : 'outlined'} onClick={() => setFiltro('todas')}>
                    Todas
                  </Button>
                  <Button size="small" variant={filtro === 'futuras' ? 'contained' : 'outlined'} onClick={() => setFiltro('futuras')}>
                    Futuras
                  </Button>
                  <Button size="small" variant={filtro === 'pasadas' ? 'contained' : 'outlined'} onClick={() => setFiltro('pasadas')}>
                    Pasadas
                  </Button>
                </Stack>
              </Stack>

              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Código</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Sucursal</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {citasFiltradas.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Typography variant="body2" sx={{ color: 'text.secondary', py: 3, textAlign: 'center' }}>
                            Aún no tienes citas registradas. Agenda tu primera cita después de que tu crédito sea aprobado.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                    {citasFiltradas.map((cita) => {
                      const { label, color } = etiquetaEstado(cita.status || cita.estado);

                      return (
                        <TableRow key={cita.id}>
                          <TableCell>
                            <Typography variant="body2">{cita.id}</Typography>
                            {/* 
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {cita.tipoCredito} · {formatoMoneda(cita.monto)}
                            </Typography> 
                            */}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{formatoFecha(cita.fecha)}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {formatoHora(cita.hora)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{cita.sucursal}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {cita.direccion}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip size="small" label={label} color={color} />
                          </TableCell>
                          <TableCell align="right">
                            <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                              {(cita.status === 'confirmada' || cita.status === 'programada') && (
                                <>
                                  {/* 
                                  <Button size="small" variant="text">
                                    Reprogramar
                                  </Button>
                                  <Button size="small" variant="text" color="error">
                                    Cancelar
                                  </Button>
                                  */}
                                </>
                              )}
                              <Button size="small" variant="outlined">
                                Comprobante
                              </Button>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Grid>
        </Grid>
      </ContainerWrapper>
    </Box>
  );
}
