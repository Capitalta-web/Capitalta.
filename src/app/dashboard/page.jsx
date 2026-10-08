'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';

export default function DashboardIndex() {
  const router = useRouter();
  const { user, isProcessing } = useAuth();

  useEffect(() => {
    // If still processing, wait
    if (isProcessing) return;

    // If no user after processing is done, redirect to login
    if (!user) {
      router.replace('/auth/login');
      return;
    }

    // Redirect based on role
    const role = user.role || 'cliente';
    const routes = {
      admin: '/dashboard/admin',
      cliente: '/dashboard/cliente'
    };

    const targetRoute = routes[role] || routes.cliente;
    router.replace(targetRoute);
  }, [user, isProcessing, router]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Stack alignItems="center" spacing={2}>
        <CircularProgress />
        <Typography variant="body2" color="textSecondary">
          Cargando...
        </Typography>
      </Stack>
    </Box>
  );
}
