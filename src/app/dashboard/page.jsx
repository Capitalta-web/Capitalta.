'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { CircularProgress, Box, Typography } from '@mui/material';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        router.push('/auth/login');
        return;
      }

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/login');
        return;
      }

      const { data: profile, error } = await supabase.from('profiles').select('role,tipo_persona').eq('id', user.id).single();

      if (error || !profile) {
        const roleFromJwt = user.user_metadata?.role || 'cliente';
        const dashboard =
          roleFromJwt === 'admin'
            ? '/dashboard/admin'
            : roleFromJwt === 'analista'
              ? '/dashboard/analista'
              : roleFromJwt === 'notario'
                ? '/dashboard/notario'
                : '/dashboard/cliente';
        router.push(dashboard);
      } else {
        const legacyRole = profile.tipo_persona;
        const mappedRole = legacyRole === 'administrador' ? 'admin' : legacyRole;
        const role = profile.role || mappedRole || 'cliente';

        if (role === 'admin') {
          router.push('/dashboard/admin');
        } else if (role === 'analista') {
          router.push('/dashboard/analista');
        } else if (role === 'notario') {
          router.push('/dashboard/notario');
        } else {
          router.push('/dashboard/cliente');
        }
      }
    };

    checkUser();
  }, [router]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: 2 }}>
      <CircularProgress />
      <Typography>Redirigiendo a tu panel...</Typography>
    </Box>
  );
}
