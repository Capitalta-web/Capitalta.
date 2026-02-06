// @project
import { AUTH_CONFIG_KEY, AUTH_PROVIDER, AUTH_USER_KEY } from '@/config';
import { AuthType } from '@/enum';
import { authProvider } from '@/utils/api/auth/authProvider';
import { socialAuthProvider } from '@/utils/api/socialAuth/socialAuthProvider';
import { attempt } from '@/utils/attempt';
import { authConfigManager } from '@/utils/authConfigManager';
import axiosServices from '@/utils/axios';

export async function login(formData) {
  localStorage.removeItem(AUTH_CONFIG_KEY);

  if (AUTH_PROVIDER === AuthType.FIREBASE) {
    // Firebase handles login via client SDK
    const authHandler = await authProvider();
    return attempt(authHandler.login(formData));
  } else {
    return attempt(axiosServices.post('/api/auth/login', formData));
  }
}

export async function signUp(formData) {
  localStorage.removeItem(AUTH_CONFIG_KEY);
  return attempt(axiosServices.post('/api/auth/signUp', formData));
}

export async function getUser() {
  const isSocial = authConfigManager.isSocialLogin();
  if (isSocial) {
    const socialAuthHandler = await socialAuthProvider();
    if (socialAuthHandler) {
      return attempt(socialAuthHandler.getUser());
    } else {
      return { data: null, error: 'Social auth provider not configured' };
    }
  } else {
    return attempt(axiosServices.get('/api/auth/getUser'));
  }
}

export async function forgotPassword(formData) {
  localStorage.removeItem(AUTH_CONFIG_KEY);
  return attempt(axiosServices.post('/api/auth/forgotPassword', formData));
}

export async function resetPassword(formData) {
  localStorage.removeItem(AUTH_CONFIG_KEY);
  return attempt(axiosServices.post('/api/auth/resetPassword', formData));
}

export async function verifyOtp(formData) {
  localStorage.removeItem(AUTH_CONFIG_KEY);
  return attempt(axiosServices.post('/api/auth/verifyOtp', formData));
}

export async function resendOtp(formData) {
  localStorage.removeItem(AUTH_CONFIG_KEY);
  return attempt(axiosServices.post('/api/auth/resend', formData));
}

export async function logout() {
  const isSocial = authConfigManager.isSocialLogin();
  if (isSocial) {
    const socialAuthHandler = await socialAuthProvider();
    if (socialAuthHandler) {
      await attempt(socialAuthHandler.signOut());
    }
  } else if (AUTH_PROVIDER === AuthType.FIREBASE) {
    const authHandler = await authProvider();
    await attempt(authHandler.signOut());
  } else {
    await axiosServices.post('/api/auth/signOut');
  }

  localStorage.removeItem(AUTH_USER_KEY);
  window.location.pathname = '/login';
  return { data: { message: 'Loggedout' }, error: null };
}

export async function loginWithGoogle() {
  const socialAuthHandler = await socialAuthProvider();

  if (socialAuthHandler) {
    if (!socialAuthHandler.loginWithGoogle) {
      return { data: null, error: 'Login with Google not supported by current provider' };
    }

    return attempt(socialAuthHandler.loginWithGoogle());
  } else {
    return { data: null, error: 'Social auth provider not configured' };
  }
}

export async function loginWithFacebook() {
  const socialAuthHandler = await socialAuthProvider();

  if (socialAuthHandler) {
    if (!socialAuthHandler.loginWithFacebook) {
      return { data: null, error: 'Login with Facebook not supported by current provider' };
    }

    return attempt(socialAuthHandler.loginWithFacebook());
  } else {
    return { data: null, error: 'Social auth provider not configured' };
  }
}
