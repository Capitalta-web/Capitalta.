'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { CircularProgress, Box, Typography } from '@mui/material';

export default function DashboardRedirect() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        router.push('/auth/login');
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/login');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !profile) {
        // Fallback or error handling
        console.error('Error fetching profile:', error);
        // Default to cliente if profile missing (or handle_new_user hasn't run yet)
        router.push('/dashboard/cliente'); 
      } else {
        if (profile.role === 'admin') {
          router.push('/dashboard/admin');
        } else if (profile.role === 'analista') {
          router.push('/dashboard/analista');
        } else {
          router.push('/dashboard/cliente');
        }
      }
      setLoading(false);
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
