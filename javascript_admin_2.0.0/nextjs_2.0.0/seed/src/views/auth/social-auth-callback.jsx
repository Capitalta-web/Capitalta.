'use client';

import { useEffect } from 'react';

// @next
import { useRouter } from 'next/navigation';

// @third-party
import { enqueueSnackbar } from 'notistack';

// @project
import PageLoader from '@/components/PageLoader';
import { APP_DEFAULT_PATH, AUTH_USER_KEY } from '@/config';
import { createSupabaseClient } from '@/utils/auth-client/supabase';

const supabase = createSupabaseClient();

/***************************  AUTH - CALLBACK  ***************************/

export default function SocialAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const {
          data: { session },
          error
        } = await supabase.auth.getSession();

        if (error) {
          enqueueSnackbar(error.message, { variant: 'error' });
          router.replace('/login');
        } else if (session) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
            access_token: session.access_token
          };

          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
          router.replace(APP_DEFAULT_PATH);
        } else {
          router.replace('/login');
        }
      } catch {
        enqueueSnackbar('something went wrong', { variant: 'error' });
        router.replace('/login');
      }
    };

    handleAuthCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <PageLoader />;
}
