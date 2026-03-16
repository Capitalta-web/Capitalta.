// @project
import { AuthRole } from '@/enum';
import { createSupabaseClient } from '@/utils/auth-client/supabase';

const supabase = createSupabaseClient();

/***************************  SOCIAL AUTH SUPABASE - LOGIN WITH GOOGLE  ***************************/

export function loginWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: { access_type: 'offline', prompt: 'consent' }
    }
  });
}

/***************************  SOCIAL AUTH SUPABASE - LOGIN WITH FACEBOOK  ***************************/

export function loginWithFacebook() {
  return supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      scopes: 'public_profile,email'
    }
  });
}

/***************************  SOCIAL AUTH SUPABASE - GET USER  ***************************/

export function getUser() {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          reject(new Error(error.message));
          return;
        }

        if (!data?.user) {
          reject(new Error('User not found'));
          return;
        }

        const userData = {
          id: data.user.id,
          email: data.user.email,
          role: AuthRole.USER,
          contact: data.user.phone,
          dialcode: '+52',
          firstname: data.user.user_metadata.full_name,
          lastname: ''
        };

        resolve(userData);
      } catch {
        reject(new Error('Server error'));
      }
    })();
  });
}

/***************************  SOCIAL AUTH SUPABASE - SIGN OUT  ***************************/

export function signOut() {
  return supabase.auth.signOut();
}

// Export as a single object for easy import
const SocialSupabaseAuth = { loginWithGoogle, loginWithFacebook, getUser, signOut };

export default SocialSupabaseAuth;
