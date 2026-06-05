'use client';
import PropTypes from 'prop-types';

// @next
import { usePathname, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

// @project
import PageLoader from '@/components/PageLoader';
import useCurrentUser from '@/hooks/useCurrentUser';

/***************************  AUTH GUARD  ***************************/

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isProcessing, userData, refreshUser } = useCurrentUser();
  const [stalled, setStalled] = useState(false);

  useEffect(() => {
    if (!isProcessing && (!userData || Object.keys(userData).length === 0) && pathname !== '/auth/login') {
      router.replace('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, pathname, isProcessing]);

  useEffect(() => {
    if (!isProcessing) {
      setStalled(false);
      return undefined;
    }

    const timer = setTimeout(() => setStalled(true), 6500);
    return () => clearTimeout(timer);
  }, [isProcessing]);

  if (isProcessing) {
    return (
      <PageLoader
        message={stalled ? 'Estamos preparando tu panel. Si tarda, reintenta.' : undefined}
        actionLabel={stalled ? 'Reintentar' : undefined}
        onAction={stalled ? refreshUser : undefined}
      />
    );
  }

  return userData && Object.keys(userData).length > 0 ? children : null;
}

AuthGuard.propTypes = { children: PropTypes.node };
