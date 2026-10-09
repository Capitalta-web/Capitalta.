'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { dashboardPathForRole, resolveRole } from '@/utils/auth/roles';
import { CircularProgress, Box, Typography } from '@mui/material';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        router.replace('/auth/login');
        return;
      }

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace('/auth/login');
        return;
      }

      // El rol se lee solo de profiles.role (nunca de user_metadata).
      const { data: profile, error } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
      router.replace(dashboardPathForRole(resolveRole(error ? null : profile)));
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
