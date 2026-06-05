'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { Copyright } from '@/components/auth';
import AuthForgotPassword from '@/components/auth/AuthForgotPassword';
import ContainerWrapper from '@/components/ContainerWrapper';
import LogoSection from '@/components/logo';
import Typeset from '@/components/Typeset';

import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import BackgroundCircle from '@/components/BackgroundCircle';

/***************************  SECTIONS - FORGOT PASSWORD  ***************************/

/**
 *
 * Demos:
 * - [ForgotPassword](https://www.Capitalta.io/blocks/auth/forgot-password)
 *
 * API
 * - [ForgotPassword API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/auth/forgot-password#props-details)
 */

export default function ForgotPassword({ heading, caption }) {
  const theme = useTheme();

  const resendCode = () => {
    console.log('ForgotPassword: resend code');
  };

  return (
    <ContainerWrapper sx={{ position: 'relative', overflowX: 'hidden' }}>
      <Stack sx={{ height: 1, minHeight: '100vh', justifyContent: 'space-between', gap: 6, py: SECTION_COMMON_PY }}>
        <Stack sx={{ alignItems: 'center', position: 'relative' }}>
          <BackgroundCircle />
          <Stack sx={{ bgcolor: 'grey.100', p: 1.5, borderRadius: 4, mb: 1.5 }}>
            <LogoSection isIcon={true} />
          </Stack>
          <Typeset
            {...{ heading, caption }}
            stackProps={{ sx: { textAlign: 'center', gap: 1, position: 'relative', zIndex: 1 } }}
            captionProps={{ variant: 'body1', sx: { maxWidth: 458 } }}
          />
          <Box sx={{ width: 1, maxWidth: 458, mt: 6, position: 'relative', zIndex: 1 }}>
            <AuthForgotPassword inputSx={{ bgcolor: 'background.paper' }} />
            <Typography sx={{ textAlign: 'center', mt: 2.5, color: 'text.secondary' }}>
              Didn’t receive code?{' '}
              <Typography
                component="span"
                variant="subtitle1"
                tabIndex={0}
                onClick={resendCode}
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  '&:focus-visible': generateFocusVisibleStyles(theme.vars.palette.primary.main),
                  '&:hover': { color: 'primary.dark', textDecoration: 'underline' }
                }}
              >
                Resend
              </Typography>
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Copyright />
        </Box>
      </Stack>
    </ContainerWrapper>
  );
}

ForgotPassword.propTypes = { heading: PropTypes.string, caption: PropTypes.string };
