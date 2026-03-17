'use client';
import { createContext, use, useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

/***************************  AUTH - CONTEXT & PROVIDER  ***************************/

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const supabase = createSupabaseBrowserClient();

  const attachLeadToUser = async (authUser, profile) => {
    if (!authUser || !supabase || typeof window === 'undefined') return profile;

    const leadId = window.localStorage.getItem('capitalta_lead_id');
    const draftRaw = window.localStorage.getItem('capitalta_lead_draft');
    let draft = null;
    try {
      draft = draftRaw ? JSON.parse(draftRaw) : null;
    } catch {
      draft = null;
    }

    if (!leadId && !draft) return profile;

    try {
      const res = await fetch('/api/leads/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId, draft })
      });

      const payload = await res.json().catch(() => ({}));
      if (res.ok && payload?.lead?.id) {
        window.localStorage.setItem('capitalta_lead_id', payload.lead.id);
      }

      const finalLeadId = payload?.lead?.id || leadId;
      if (finalLeadId && profile) {
        const existingPrefs = profile.preferences && typeof profile.preferences === 'object' ? profile.preferences : {};
        const nextPrefs = { ...existingPrefs, lead_id: finalLeadId };

        const { data: updatedProfile } = await supabase
          .from('profiles')
          .update({ preferences: nextPrefs })
          .eq('id', authUser.id)
          .select()
          .single();

        if (updatedProfile) profile = updatedProfile;
      }

      if (res.ok) {
        window.localStorage.removeItem('capitalta_lead_draft');
      }
    } catch {
      return profile;
    }

    return profile;
  };

  const fetchProfile = async (authUser) => {
    if (!authUser) return null;

    try {
      const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', authUser.id).single();

      if (error) {
        // If profile not found (PGRST116), try to create it manually as fallback
        if (error.code === 'PGRST116') {
          console.warn('Profile not found for user, attempting to create default profile...');
          
          const newProfile = {
            id: authUser.id,
            email: authUser.email,
            nombre_completo: authUser.user_metadata?.full_name || authUser.user_metadata?.nombre_completo || 'Usuario Nuevo',
            role: authUser.user_metadata?.role || 'cliente'
          };

          const { data: insertedProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([newProfile])
            .select()
            .single();

          if (insertError) {
            console.error('Error auto-creating profile:', insertError);
            return null;
          }

          return attachLeadToUser(authUser, insertedProfile);
        }

        console.error('Error fetching profile:', error);
        return null;
      }
      return attachLeadToUser(authUser, profile);
    } catch (err) {
      if (err.name === 'AbortError') return null;
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

      const {
        data: { user: authUser },
        error
      } = await supabase.auth.getUser();

      if (error || !authUser) {
        setUser(null);
      } else {
        const profile = await fetchProfile(authUser);
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

    if (!supabase) {
      setIsProcessing(false);
      return;
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          const profile = await fetchProfile(session.user);
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

  return <AuthContext.Provider value={{ user, isProcessing, refreshUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
