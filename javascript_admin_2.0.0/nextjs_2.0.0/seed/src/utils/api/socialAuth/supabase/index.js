// @project
import { AUTH_USER_KEY } from '@/config';
import { AuthRole } from '@/enum';
import { createSupabaseClient } from '@/utils/auth-client/supabase';

const supabase = createSupabaseClient();

/***************************  SOCIAL AUTH SUPABASE - LOGIN WITH GOOGLE  ***************************/

export function loginWithGoogle() {
  return new Promise((resolve, reject) => {
    async () => {
      try {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/social-auth-callback`,
            queryParams: { access_type: 'offline', prompt: 'consent' }
          }
        });
        resolve('');
      } catch {
        reject(new Error('Server error'));
      }
    };
  });
}

/***************************  SOCIAL AUTH SUPABASE - LOGIN WITH FACEBOOK  ***************************/

export function loginWithFacebook() {
  return new Promise((resolve, reject) => {
    async () => {
      try {
        await supabase.auth.signInWithOAuth({
          provider: 'facebook',
          options: {
            redirectTo: `${window.location.origin}/social-auth-callback`,
            scopes: 'public_profile,email'
          }
        });
        resolve('');
      } catch {
        reject(new Error('Server error'));
      }
    };
  });
}

/***************************  SOCIAL AUTH SUPABASE - GET USER  ***************************/

export function getUser() {
  return new Promise((resolve, reject) => {
    async () => {
      try {
        const storedValue = typeof window !== 'undefined' ? localStorage.getItem(AUTH_USER_KEY) : null;
        const parsedValue = storedValue && JSON.parse(storedValue);
        const token = parsedValue?.access_token;

        if (!token) {
          reject(new Error('Token not found'));
          return;
        }

        const { data, error } = await supabase.auth.getUser(token);

        if (error) {
          reject(new Error(error.message));
          return;
        }

        // avatar = data.user.user_metadata.avatar_url

        const userData = {
          id: data.user.id,
          email: data.user.email,
          role: AuthRole.USER,
          contact: data.user.phone,
          dialcode: '+1',
          firstname: data.user.user_metadata.full_name,
          lastname: ''
        };

        resolve(userData);
      } catch {
        reject(new Error('Server error'));
      }
    };
  });
}

/***************************  SOCIAL AUTH SUPABASE - SIGN OUT  ***************************/

export function signOut() {
  return new Promise((resolve, reject) => {
    async () => {
      try {
        await supabase.auth.signOut();
        resolve({ status: 200 });
      } catch {
        reject(new Error('Server error'));
      }
    };
  });
}

// Export as a single object for easy import
const SocialSupabaseAuth = { loginWithGoogle, loginWithFacebook, getUser, signOut };

export default SocialSupabaseAuth;
