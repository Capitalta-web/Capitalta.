/**
 * Auth API utilities
 * Client-side authentication helpers
 */

/**
 * Sign out the user
 */
export async function logout() {
  try {
    // Import Supabase client to sign out directly
    const { createSupabaseBrowserClient } = await import('@/utils/supabaseClient');
    const supabase = createSupabaseBrowserClient();

    if (supabase) {
      // Sign out from Supabase
      await supabase.auth.signOut();

      // Clear localStorage
      localStorage.removeItem('supabase.auth.token');
    }

    // Redirect to login with a small delay to ensure signOut is processed
    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 500);
  } catch (error) {
    console.error('Logout error:', error);
    // Force redirect even if there's an error
    window.location.href = '/auth/login';
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(email, password) {
  try {
    const response = await fetch('/api/auth/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to sign in');
    }

    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

/**
 * Sign up with email and password
 */
export async function signUp(email, password, fullName) {
  try {
    const response = await fetch('/api/auth/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, full_name: fullName })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to sign up');
    }

    return data;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

/**
 * Reset password
 */
export async function resetPassword(email) {
  try {
    const response = await fetch('/api/auth/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to reset password');
    }

    return data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
}
