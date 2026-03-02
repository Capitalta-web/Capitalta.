'use client';
import PropTypes from 'prop-types';

// @mui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { AuthLogin, AuthSocial, Copyright } from '@/components/auth';
import ContainerWrapper from '@/components/ContainerWrapper';
import { NextLink } from '@/components/routes';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  LOGIN - 1  ***************************/

/**
 *
 * Demos:
 * - [Login1](https://www.Capitalta.io/blocks/auth/login/1)
 *
 * API
 * - [Login1 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/auth/login/login1#props-details)
 */

export default function Login1({ heading, caption, signupLink }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY, height: '100vh', minHeight: { md: 930 } }}>
      <Grid container spacing={5} sx={{ height: 'calc(100vh - 70px)' }}>
        <Grid size={{ xs: 12, md: 12 }} sx={{ height: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Stack sx={{ width: { xs: 1, sm: 432, md: 457 }, mx: { xs: 'auto', md: 0 }, height: 'auto', justifyContent: 'space-between' }}>
            <Box>
              <Stack sx={{ gap: { xs: 4, sm: 6 } }}>
                <Typeset {...{ heading, caption }} captionProps={{ variant: 'body1' }} />
                <AuthSocial />
              </Stack>

              <Divider sx={{ mt: { xs: 4, sm: 5 }, mb: 3 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', px: 1.25 }}>
                  Continue with email
                </Typography>
              </Divider>
              <AuthLogin />
              <Typography sx={{ textAlign: 'center', mt: 2.5, color: 'text.secondary' }}>
                Don’t have an account?{' '}
                <Link
                  component={NextLink}
                  variant="subtitle1"
                  underline="hover"
                  href={signupLink || '/auth/signup'}
                  sx={{ '&:hover': { color: 'primary.dark' } }}
                  rel="noopener noreferrer"
                  aria-label="sign up"
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>

            <Box sx={{ mt: { xs: 4.5, sm: 6.5, md: 13.75 } }}>
              <Copyright />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

Login1.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  signupLink: PropTypes.string
};
