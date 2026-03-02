'use client';

import { Box, Card, CardContent, Typography, Stack } from '@mui/material';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
  solicitud_iniciada: '#FFA726', // Orange
  integracion_expediente: '#42A5F5', // Blue
  avaluo_en_proceso: '#AB47BC', // Purple
  en_comite: '#EC407A', // Pink
  formalizacion_notarial: '#29B6F6', // Light Blue
  fondeado: '#66BB6A', // Green
  credito_activo: '#26A69A', // Teal
  credito_liquidado: '#78909C', // Grey
  aprobada: '#26C6DA', // Cyan
  rechazada: '#EF5350', // Red
  requiere_informacion: '#FFD54F', // Yellow
  validado: '#56C596' // Dark Green
};

const ESTADO_LABELS = {
  solicitud_iniciada: 'Iniciada',
  integracion_expediente: 'Integración',
  avaluo_en_proceso: 'Avalúo',
  en_comite: 'En Comité',
  formalizacion_notarial: 'Formalización',
  fondeado: 'Fondeado',
  credito_activo: 'Crédito Activo',
  credito_liquidado: 'Liquidado',
  aprobada: 'Aprobada',
  rechazada: 'Rechazada',
  requiere_informacion: 'Req. Información',
  validado: 'Validado'
};

export default function SolicitudesPorEstadoChart({ data }) {
  // Transformar datos para Recharts
  const chartData = Object.entries(data).map(([estado, count]) => ({
    name: ESTADO_LABELS[estado] || estado,
    value: count,
    estado: estado
  }));

  // Filtrar estados con 0 solicitudes
  const filteredData = chartData.filter(item => item.value > 0);

  const totalSolicitudes = filteredData.reduce((acc, item) => acc + item.value, 0);

  // Custom label para mostrar porcentaje
  const renderCustomLabel = ({ name, value, percent }) => {
    const percentage = (percent * 100).toFixed(1);
    if (percentage < 8) return null; // No mostrar label si es muy pequeño
    return `${percentage}%`;
  };

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const percentage = ((value / totalSolicitudes) * 100).toFixed(1);
      return (
        <Box sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 1, border: '1px solid divider' }}>
          <Typography variant="body2" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2" color="primary">
            {value} solicitudes ({percentage}%)
          </Typography>
        </Box>
      );
    }
    return null;
  };

  if (filteredData.length === 0) {
    return (
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Typography color="text.secondary" align="center">
            Sin solicitudes para mostrar
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ boxShadow: 2, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
          Distribución de Solicitudes por Estado
        </Typography>

        <Box sx={{ width: '100%', height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.estado] || '#8884d8'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value, entry) => `${entry.payload.name} (${entry.payload.value})`}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Estadísticas resumidas */}
        <Stack spacing={1} sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Total de solicitudes: <strong>{totalSolicitudes}</strong>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Estados activos: <strong>{filteredData.length}</strong>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
