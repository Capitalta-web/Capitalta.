'use client';
import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

// @project
import GetImagePath from '@/utils/GetImagePath';
import { SocialTypes } from '@/enum';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

/***************************  SOCIAL BUTTON - DATA  ***************************/

const authButtons = [
  {
    label: 'Google',
    provider: 'google',
    icon: '/assets/images/social/google.svg',
    title: 'Sign in with Google'
  },
  {
    label: 'Apple',
    provider: null,
    icon: { light: '/assets/images/social/apple-light.svg', dark: '/assets/images/social/apple-dark.svg' },
    title: 'Sign in with Apple'
  },
  {
    label: 'Facebook',
    provider: null,
    icon: '/assets/images/social/facebook.svg',
    title: 'Sign in with Facebook'
  }
];

/***************************  AUTH - SOCIAL  ***************************/

export default function AuthSocial({ type = SocialTypes.VERTICAL, buttonSx }) {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    if (!provider) return;

    setLoadingProvider(provider);
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      console.error('Supabase client not initialized');
      setLoadingProvider(null);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`
        }
      });

      if (error) {
        console.error(`Error with ${provider} OAuth:`, error);
      }
    } catch (err) {
      console.error(`Unexpected error during ${provider} login:`, err);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <Stack direction={type === SocialTypes.VERTICAL ? 'column' : 'row'} sx={{ gap: 1 }}>
      {authButtons.map((item, index) => (
        <Button
          key={index}
          variant="outlined"
          fullWidth
          disabled={loadingProvider === item.provider || !item.provider}
          onClick={() => handleSocialLogin(item.provider)}
          sx={{
            borderColor: 'grey.600',
            textTransform: 'none',
            ...(type === SocialTypes.HORIZONTAL && { borderRadius: 4, '.MuiButton-startIcon': { m: 0 } }),
            ...buttonSx
          }}
          startIcon={
            loadingProvider === item.provider ? (
              <CircularProgress size={16} />
            ) : (
              <CardMedia component="img" src={GetImagePath(item.icon)} sx={{ width: 16, height: 16 }} alt={item.label} loading="lazy" />
            )
          }
        >
          {type === SocialTypes.VERTICAL && item.title}
        </Button>
      ))}
    </Stack>
  );
}

AuthSocial.propTypes = { type: PropTypes.any, SocialTypes: PropTypes.any, VERTICAL: PropTypes.any, buttonSx: PropTypes.any };
