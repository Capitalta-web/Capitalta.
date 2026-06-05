// @project
import { SOCIAL_AUTH_PROVIDER } from '@/config';

// Mapping of auth types to dynamic imports
const socialAuthProviderMapping = {
  supabase: () => import('@/utils/api/socialAuth/supabase').then((mod) => mod.default),
  firebase: () => import('@/utils/api/socialAuth/firebase').then((mod) => mod.default)
};

// Dynamically loads and returns the auth provider based on SOCIAL_AUTH_PROVIDER.
export async function socialAuthProvider() {
  if (!SOCIAL_AUTH_PROVIDER) {
    return null; // or undefined
  }

  return await socialAuthProviderMapping[SOCIAL_AUTH_PROVIDER]();
}
