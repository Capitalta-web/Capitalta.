import PropTypes from 'prop-types';
// @mui
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { AuthRegister, AuthSocial, Copyright } from '@/components/auth';
import ContainerWrapper from '@/components/ContainerWrapper';
import LogoSection from '@/components/logo';
import { NextLink } from '@/components/routes';
import Typeset from '@/components/Typeset';

import { SocialTypes } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import Circles from '@/images/Circles';

/***************************  REGISTER  ***************************/

/**
 *
 * Demos:
 * - [Register](https://www.Capitalta.io/blocks/auth/register)
 *
 * API
 * - [Register API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/auth/register#props-details)
 */

export default function Register({ heading, caption }) {
  return (
    <ContainerWrapper sx={{ position: 'relative', overflowX: 'hidden' }}>
      <Stack sx={{ minHeight: { md: 800 }, justifyContent: 'space-between', gap: { xs: 3, sm: 4 }, py: SECTION_COMMON_PY }}>
        <Stack sx={{ alignItems: 'center', position: 'relative' }}>
          <Box
            sx={{
              width: 1,
              position: 'absolute',
              top: { xs: '-29%', sm: '-50%', md: '-45%' },
              left: '50%',
              zIndex: -1,
              transform: { xs: 'translateX(-50%) scale(1.5)', md: 'translateX(-50%) scale(1)' },
              height: { xs: 500, sm: 750 },
              '& svg': { width: 1, height: 1 }
            }}
          >
            <Circles />
          </Box>
          <Box sx={{ bgcolor: 'grey.100', p: 1.5, borderRadius: 4, mb: 1.5 }}>
            <LogoSection isIcon={true} />
          </Box>
          <Typeset {...{ heading, caption }} stackProps={{ sx: { textAlign: 'center' } }} captionProps={{ variant: 'body1' }} />

          <Box sx={{ width: 1, maxWidth: 458, mt: 6 }}>
            <AuthRegister inputSx={{ bgcolor: 'background.paper' }} />
            <Typography sx={{ textAlign: 'center', mt: 2.5, color: 'text.secondary' }}>
              Already have an account?{' '}
              <Link
                component={NextLink}
                underline="hover"
                variant="subtitle1"
                href=""
                sx={{ '&:hover': { color: 'primary.dark' } }}
                rel="noopener noreferrer"
                aria-label="sign up"
              >
                Sign In
              </Link>
            </Typography>
            <Divider sx={{ my: { xs: 4, sm: 5 } }}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', px: 1.25 }}>
                OR Continue with
              </Typography>
            </Divider>
            <AuthSocial type={SocialTypes.HORIZONTAL} />
          </Box>
        </Stack>
        <Box>
          <Copyright />
        </Box>
      </Stack>
    </ContainerWrapper>
  );
}

Register.propTypes = { heading: PropTypes.string, caption: PropTypes.string };
