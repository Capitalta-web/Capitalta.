// @next
import dynamic from 'next/dynamic';

// @project
const AuthSocialCallback = dynamic(() => import('@/views/auth/social-auth-callback'));

/***************************  SOCIAL AUTH CALLBACK  ***************************/

export default function SocialAuthCallback() {
  return <AuthSocialCallback />;
}
