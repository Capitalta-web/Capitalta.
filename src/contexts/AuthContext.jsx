'use client';
import { createContext, use, useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

/***************************  AUTH - CONTEXT & PROVIDER  ***************************/

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const supabase = createSupabaseBrowserClient();

  const fetchProfile = async (userId) => {
    try {
      const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      return profile;
    } catch (err) {
      console.error('Unexpected error fetching profile:', err);
      return null;
    }
  };

  const refreshUser = async () => {
    setIsProcessing(true);
    try {
      const {
        data: { user: authUser },
        error
      } = await supabase.auth.getUser();

      if (error || !authUser) {
        setUser(null);
      } else {
        const profile = await fetchProfile(authUser.id);
        setUser({
          ...authUser,
          ...profile, // Merge profile data (role, nombre_completo, etc.)
          // Ensure role is present, default to 'cliente' if missing
          role: profile?.role || authUser.user_metadata?.role || 'cliente'
        });
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        // Ignore abort errors
        return;
      }
      console.error('Error refreshing user:', err);
      setUser(null);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    refreshUser();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          const profile = await fetchProfile(session.user.id);
          setUser({
            ...session.user,
            ...profile,
            role: profile?.role || session.user.user_metadata?.role || 'cliente'
          });
        }
        setIsProcessing(false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsProcessing(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthContext value={{ user, isProcessing, refreshUser }}>{children}</AuthContext>;
};

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
