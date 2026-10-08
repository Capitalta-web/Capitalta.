'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createSupabaseBrowserClient();

      try {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;

        if (!user) {
          router.replace('/auth/login');
          return;
        }

        // Check if profile exists
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // If profile doesn't exist, create it
        if (!profile) {
          const newProfile = {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || 'Usuario',
            role: 'cliente'
          };

          await supabase
            .from('profiles')
            .insert([newProfile]);
        }

        // Redirect to dashboard
        router.replace('/dashboard');
      } catch (err) {
        console.error('Callback error:', err);
        router.replace('/auth/login');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: 2 }}>
      <CircularProgress />
      <Typography>Confirmando tu cuenta...</Typography>
    </Box>
  );
}
