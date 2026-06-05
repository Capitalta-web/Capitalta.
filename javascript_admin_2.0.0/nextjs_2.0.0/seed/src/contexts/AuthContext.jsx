'use client';
import { createContext, use, useEffect, useState } from 'react';

// @project
import { AUTH_USER_KEY } from '@/config';
import { getUser } from '@/utils/api/auth';

/***************************  AUTH - CONTEXT & PROVIDER  ***************************/

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);

  const fetchUser = async () => {
    const { data, error } = await getUser();
    if (error || !data) {
      localStorage.removeItem(AUTH_USER_KEY);
      setUser(null);
      return;
    }

    setUser(data);
  };

  const manageUserData = async (localStorageData) => {
    const parsedAuthData = localStorageData ? JSON.parse(localStorageData) : null;
    if (parsedAuthData?.access_token) {
      setIsProcessing(true);
      await fetchUser();
      setIsProcessing(false);
    } else {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const localStorageData = typeof window !== 'undefined' ? localStorage.getItem(AUTH_USER_KEY) : null;
    manageUserData(localStorageData);

    const handleStorageEvent = (e) => {
      if (e.storageArea === localStorage && e.key === AUTH_USER_KEY) {
        manageUserData(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthContext value={{ user, isProcessing }}>{children}</AuthContext>;
};

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
