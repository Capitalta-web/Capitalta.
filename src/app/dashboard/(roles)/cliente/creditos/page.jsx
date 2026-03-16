'use client';

import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import MainCard from '@/components/MainCard';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { generarTablaAmortizacion } from '@/utils/amortizacion';

export default function MisCreditosPage() {
  const [loading, setLoading] = useState(true);
  const [creditos, setCreditos] = useState([]);

  useEffect(() => {
    fetchCreditos();
  }, []);

  const fetchCreditos = async () => {
    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('solicitudes_credito')
        .select('*')
        .eq('cliente_id', user.id)
        .in('estado', ['credito_activo', 'fondeado', 'credito_liquidado'])
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setCreditos(data || []);
    } catch (error) {
      console.error('Error fetching creditos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (creditos.length === 0) {
    return (
      <MainCard title="Mis Créditos">
        <Alert severity="info">No tienes créditos activos actualmente.</Alert>
      </MainCard>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom>
          Mis Créditos
        </Typography>
      </Grid>

      {creditos.map((credito) => {
        // Generar tabla de amortización simulada (o real si tuviéramos tasa)
        // Asumimos tasa del 18% anual para demo si no existe
        const tasa = 18;
        const tabla = generarTablaAmortizacion(
          credito.monto_solicitado,
          credito.plazo_meses,
          tasa,
          credito.updated_at || new Date().toISOString()
        );

        return (
          <Grid item xs={12} key={credito.id}>
            <MainCard title={`Crédito ${credito.tipo_credito.replace('_', ' ').toUpperCase()}`}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Monto Otorgado
                      </Typography>
                      <Typography variant="h4" component="div">
                        {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(credito.monto_solicitado)}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Chip label={credito.estado.replace('_', ' ')} color="success" variant="outlined" />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Plazo
                      </Typography>
                      <Typography variant="h4" component="div">
                        {credito.plazo_meses} meses
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        Tasa Anual: {tasa}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Próximo Pago
                      </Typography>
                      <Typography variant="h4" component="div">
                        {tabla[0]
                          ? new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(tabla[0].monto_programado)
                          : '$0.00'}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        {tabla[0] ? new Date(tabla[0].fecha_programada).toLocaleDateString() : '-'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Tabla de Amortización
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>No.</TableCell>
                          <TableCell>Fecha</TableCell>
                          <TableCell align="right">Pago</TableCell>
                          <TableCell align="right">Interés</TableCell>
                          <TableCell align="right">Capital</TableCell>
                          <TableCell align="right">Saldo</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tabla.slice(0, 12).map((row) => (
                          <TableRow key={row.numero_pago}>
                            <TableCell>{row.numero_pago}</TableCell>
                            <TableCell>{new Date(row.fecha_programada).toLocaleDateString()}</TableCell>
                            <TableCell align="right">
                              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(row.monto_programado)}
                            </TableCell>
                            <TableCell align="right">
                              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(row.interes)}
                            </TableCell>
                            <TableCell align="right">
                              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(row.capital)}
                            </TableCell>
                            <TableCell align="right">
                              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(row.saldo_restante)}
                            </TableCell>
                          </TableRow>
                        ))}
                        {tabla.length > 12 && (
                          <TableRow>
                            <TableCell colSpan={6} align="center">
                              <Typography variant="caption">Mostrando primeros 12 pagos...</Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        );
      })}
    </Grid>
  );
}
