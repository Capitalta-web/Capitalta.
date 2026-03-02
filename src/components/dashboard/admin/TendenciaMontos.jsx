'use client';

import { Box, Card, CardContent, Typography, Stack } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Meses en español
const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { value, payload: data } = payload[0];
    return (
      <Box sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 1, border: '1px solid divider' }}>
        <Typography variant="body2" fontWeight="bold">
          {data.mes}
        </Typography>
        <Typography variant="body2" color="success.main">
          ${value.toLocaleString('es-MX')} MXN
        </Typography>
      </Box>
    );
  }
  return null;
};

export default function TendenciaMontos({ data, months = 12 }) {
  // Generar datos de últimos X meses si no se proporcionan
  let chartData;

  if (!data || data.length === 0) {
    const now = new Date();
    chartData = Array.from({ length: months }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);
      const mesIndex = date.getMonth();
      const baseAmount = 500000 + Math.random() * 1000000;
      const variation = Math.sin(i / months * Math.PI) * 300000;
      return {
        mes: MESES[mesIndex],
        monto: Math.max(100000, baseAmount + variation),
        mes_num: date.getMonth()
      };
    });
  } else {
    chartData = data;
  }

  // Calcular máximo y mínimo para estadísticas
  const montos = chartData.map(d => d.monto);
  const montoMax = Math.max(...montos);
  const montoMin = Math.min(...montos);
  const montoPromedio = montos.reduce((a, b) => a + b, 0) / montos.length;

  // Calcular tendencia (comparar último mes vs primero)
  const primerMes = chartData[0].monto;
  const ultimoMes = chartData[chartData.length - 1].monto;
  const tendencia = ((ultimoMes - primerMes) / primerMes) * 100;
  const esTendenciaPositiva = tendencia >= 0;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card sx={{ boxShadow: 2, height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Tendencia de Montos Colocados
          </Typography>
          <Box
            sx={{
              bgcolor: esTendenciaPositiva ? 'success.light' : 'error.light',
              color: esTendenciaPositiva ? 'success.main' : 'error.main',
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 600,
              fontSize: '0.875rem'
            }}
          >
            {esTendenciaPositiva ? '↑' : '↓'} {Math.abs(tendencia).toFixed(1)}%
          </Box>
        </Box>

        <Box sx={{ width: '100%', height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="mes"
                stroke="#9e9e9e"
                style={{ fontSize: '0.875rem' }}
              />
              <YAxis
                stroke="#9e9e9e"
                style={{ fontSize: '0.875rem' }}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="monto"
                stroke="#26A69A"
                strokeWidth={3}
                dot={{ fill: '#26A69A', r: 5 }}
                activeDot={{ r: 7 }}
                name="Monto Colocado"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Estadísticas */}
        <Stack spacing={1} sx={{ mt: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Máximo
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="success.main">
                {formatCurrency(montoMax)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Mínimo
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="error.main">
                {formatCurrency(montoMin)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Promedio
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {formatCurrency(montoPromedio)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Período
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {months} meses
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
