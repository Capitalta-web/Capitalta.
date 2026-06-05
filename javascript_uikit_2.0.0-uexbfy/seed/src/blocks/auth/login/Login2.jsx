'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

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
import { GraphicsCard } from '@/components/cards';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  LOGIN - 2  ***************************/

/**
 *
 * Demos:
 * - [Login2](https://www.saasable.io/blocks/auth/login/2)
 *
 * API
 * - [Login2 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/auth/login/login2#props-details)
 */

export default function Login2({ heading, caption, image }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <GraphicsCard sx={{ width: { sm: 'fit-content', md: 1 }, mx: 'auto' }}>
        <Grid container sx={{ width: { sm: 506, md: 1 } }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mx: { xs: 'auto', md: 0 }, p: { xs: 2, sm: 4, md: 8 } }}>
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
                  underline="hover"
                  variant="subtitle1"
                  href=""
                  sx={{ '&:hover': { color: 'primary.dark' } }}
                  rel="noopener noreferrer"
                  aria-label="sign up"
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Grid sx={{ display: { xs: 'none', md: 'block' } }} size={{ xs: 12, md: 6 }}>
            <GraphicsCard sx={{ height: 1, bgcolor: 'grey.200' }}>
              <Box sx={{ pl: 8, py: 8, height: 1 }}>
                <GraphicsImage
                  image={image}
                  sx={{
                    height: 1,
                    backgroundPositionX: 'left',
                    backgroundPositionY: 'top',
                    borderTopLeftRadius: 12,
                    borderBottomLeftRadius: 12
                  }}
                />
              </Box>
            </GraphicsCard>
          </Grid>
        </Grid>
      </GraphicsCard>
      <Box sx={{ mt: 3.5 }}>
        <Copyright />
      </Box>
    </ContainerWrapper>
  );
}

Login2.propTypes = { heading: PropTypes.string, caption: PropTypes.string, image: PropTypes.any };
