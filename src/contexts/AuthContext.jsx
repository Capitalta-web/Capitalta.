'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const supabase = createSupabaseBrowserClient();

  const fetchProfile = async (authUser) => {
    if (!authUser) return null;

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

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
      if (!supabase) {
        setUser(null);
        return;
      }

      // Try to get session
      const { data: { session } } = await supabase.auth.getSession();
      let authUser = session?.user;

      // If no session, try getUser as fallback
      if (!authUser) {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        authUser = currentUser;
      }

      if (!authUser) {
        setUser(null);
        return;
      }

      // Fetch profile data
      const profile = await fetchProfile(authUser);

      // Build final user object
      // Validate role - only allow 'cliente' and 'admin'
      const validRoles = ['cliente', 'admin'];
      const userRole = validRoles.includes(profile?.role) ? profile?.role : 'cliente';

      const userData = {
        ...authUser,
        ...(profile || {}),
        role: userRole
      };

      setUser(userData);
    } catch (err) {
      console.error('Error refreshing user:', err);
      setUser(null);
    } finally {
      setIsProcessing(false);
    }
  };

  // Initialize auth on mount
  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    const initAuth = async () => {
      try {
        await refreshUser();
      } catch (err) {
        console.error('Error in refreshUser:', err);
        if (isMounted) {
          setIsProcessing(false);
        }
      }

      if (!supabase) {
        if (isMounted) {
          setIsProcessing(false);
        }
        return;
      }

      // Subscribe to auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (!isMounted) return;

          if (
            event === 'INITIAL_SESSION' ||
            event === 'SIGNED_IN' ||
            event === 'TOKEN_REFRESHED' ||
            event === 'USER_UPDATED'
          ) {
            if (session?.user) {
              const profile = await fetchProfile(session.user);
              // Validate role - only allow 'cliente' and 'admin'
              const validRoles = ['cliente', 'admin'];
              const userRole = validRoles.includes(profile?.role) ? profile?.role : 'cliente';

              const userData = {
                ...session.user,
                ...(profile || {}),
                role: userRole
              };
              setUser(userData);
            } else {
              setUser(null);
            }
            setIsProcessing(false);
            return;
          }

          if (event === 'SIGNED_OUT') {
            setUser(null);
            setIsProcessing(false);
          }
        }
      );

      // Safety timeout: if onAuthStateChange doesn't fire within 5 seconds, force completion
      timeoutId = setTimeout(() => {
        if (isMounted) {
          console.warn('Auth state change timeout - forcing completion');
          setIsProcessing(false);
        }
      }, 5000);

      return () => {
        subscription?.unsubscribe();
        if (timeoutId) clearTimeout(timeoutId);
      };
    };

    initAuth();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isProcessing, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
