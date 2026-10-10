'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Button,
  Alert,
  CircularProgress,
  Stack,
  TextField,
  Grid,
  Chip
} from '@mui/material';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import UsuarioDetailModal from '@/components/dashboard/UsuarioDetailModal';

export default function AdminUsuariosPage() {
  const supabase = createSupabaseBrowserClient();
  const { user } = useAuth();

  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal de detalle
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [updating, setUpdating] = useState(false);

  const handleRoleChanged = (userId, newRole) => {
    setUsuarios((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    setSelectedUsuario((prev) => (prev && prev.id === userId ? { ...prev, role: newRole } : prev));
  };

  // Fetch usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setUsuarios(data || []);
        setFilteredUsuarios(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching usuarios:', err);
        setError('Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [supabase]);

  // Apply search filter
  useEffect(() => {
    let filtered = usuarios;

    if (searchTerm) {
      filtered = filtered.filter(u =>
        (u.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (u.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsuarios(filtered);
  }, [searchTerm, usuarios]);

  const handleToggleStatus = async (usuario) => {
    setUpdating(true);

    try {
      const newStatus = usuario.status === 'activo' ? 'inactivo' : 'activo';
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', usuario.id);

      if (updateError) throw updateError;

      // Update local state
      setUsuarios(prev =>
        prev.map(u =>
          u.id === usuario.id
            ? { ...u, status: newStatus }
            : u
        )
      );
    } catch (err) {
      console.error('Error toggling status:', err);
      setError('Error al actualizar el estado del usuario');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink component="button" variant="body2" color="inherit">
            Dashboard
          </MuiLink>
          <Typography color="textPrimary">Gestionar Usuarios</Typography>
        </Breadcrumbs>

        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Gestión de Usuarios
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Search */}
        <Card sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar por email o nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                label="Búsqueda"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="textSecondary">
                Total: {filteredUsuarios.length} usuario{filteredUsuarios.length !== 1 ? 's' : ''}
              </Typography>
            </Grid>
          </Grid>
        </Card>

        {/* Table */}
        {filteredUsuarios.length === 0 ? (
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="textSecondary">
              No hay usuarios para mostrar
            </Typography>
          </Card>
        ) : (
          <TableContainer component={Card}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Correo</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Rol</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsuarios.map(usuario => (
                  <TableRow key={usuario.id}>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {usuario.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {usuario.full_name || '-'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={usuario.role || 'cliente'}
                        color={usuario.role === 'admin' ? 'warning' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Switch
                          checked={usuario.status === 'activo'}
                          onChange={() => handleToggleStatus(usuario)}
                          disabled={updating}
                          size="small"
                        />
                        <Typography variant="caption" color="textSecondary">
                          {usuario.status === 'activo' ? 'Activo' : 'Inactivo'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setSelectedUsuario(usuario)}
                      >
                        Ver detalle
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Ficha de detalle del usuario */}
        <UsuarioDetailModal
          usuario={selectedUsuario}
          currentUserId={user?.id}
          onClose={() => setSelectedUsuario(null)}
          onRoleChanged={handleRoleChanged}
        />
      </Container>
    </Box>
  );
}
