'use client';

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Typography,
  Chip,
  CircularProgress
} from '@mui/material';
import { useState } from 'react';

const statusConfig = {
  pendiente: { label: 'Pendiente', color: 'warning' },
  'en-revision': { label: 'En Revisión', color: 'info' },
  aprobada: { label: 'Aprobada', color: 'success' },
  rechazada: { label: 'Rechazada', color: 'error' },
  activo: { label: 'Activo', color: 'success' },
  cerrado: { label: 'Cerrado', color: 'default' }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0
  }).format(value);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function TableSolicitudes({
  data = [],
  loading = false,
  onRowClick = null,
  columns = [],
  allowPagination = true
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedData = allowPagination
    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : data;

  // Default columns if not specified
  const defaultColumns = [
    { key: 'id', label: 'ID', width: '80px' },
    { key: 'monto_solicitado', label: 'Monto', width: '150px', format: 'currency' },
    { key: 'plazo_meses', label: 'Plazo', width: '100px', format: 'plazo' },
    { key: 'tipo', label: 'Tipo', width: '120px' },
    { key: 'status', label: 'Estado', width: '130px', format: 'status' },
    { key: 'created_at', label: 'Fecha', width: '150px', format: 'date' },
    ...(onRowClick ? [{ key: 'actions', label: 'Acciones', width: '120px' }] : [])
  ];

  const displayColumns = columns.length > 0 ? columns : defaultColumns;

  const renderCell = (row, col) => {
    const value = row[col.key];

    if (col.format === 'currency') {
      return formatCurrency(value);
    }
    if (col.format === 'date') {
      return formatDate(value);
    }
    if (col.format === 'status') {
      const config = statusConfig[value] || { label: value, color: 'default' };
      return <Chip label={config.label} color={config.color} size="small" />;
    }
    if (col.format === 'plazo') {
      return `${value} meses`;
    }
    if (col.key === 'actions') {
      return (
        <Button
          size="small"
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            onRowClick(row);
          }}
        >
          Ver
        </Button>
      );
    }

    return value || '-';
  };

  if (loading) {
    return (
      <Card sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress />
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="textSecondary">
          No hay solicitudes para mostrar
        </Typography>
      </Card>
    );
  }

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              {displayColumns.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{ width: col.width, fontWeight: 600 }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => onRowClick && onRowClick(row)}
                sx={{
                  cursor: onRowClick ? 'pointer' : 'default',
                  '&:hover': onRowClick ? { backgroundColor: '#f9f9f9' } : {},
                  borderBottom: '1px solid #e0e0e0'
                }}
              >
                {displayColumns.map((col) => (
                  <TableCell key={`${row.id}-${col.key}`}>
                    {renderCell(row, col)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {allowPagination && data.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
        />
      )}
    </Card>
  );
}
