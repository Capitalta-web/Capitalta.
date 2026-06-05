'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import PageLoader from '@/components/PageLoader';
import { useAuth } from '@/contexts/AuthContext';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const run = async () => {
      const errorParam = searchParams.get('error');
      const code = searchParams.get('code');
      const type = searchParams.get('type');

      if (errorParam) {
        router.replace(`/auth/login?error=${encodeURIComponent(errorParam)}`);
        return;
      }

      if (!code) {
        router.replace('/auth/login');
        return;
      }

      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        router.replace('/auth/login?error=supabase_not_configured');
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error('Exchange error:', error);
        router.replace('/auth/login?error=callback_failed');
        return;
      }

      // Pequeña pausa para asegurar persistencia de sesión antes de refrescar
      await new Promise(resolve => setTimeout(resolve, 500));

      try {
        await refreshUser();
      } catch (err) {
        console.error('Refresh error:', err);
      }

      // Redirección forzada para evitar bucles de carga
      window.location.href = type === 'recovery' ? '/auth/update-password' : '/dashboard';
    };

    run();
  }, [refreshUser, router, searchParams]);

  return <PageLoader message="Conectando tu cuenta y preparando tu panel..." />;
}

