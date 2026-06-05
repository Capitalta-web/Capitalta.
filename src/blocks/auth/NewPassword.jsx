import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import { Copyright } from '@/components/auth';
import AuthNewPassword from '@/components/auth/AuthNewPassword';
import ContainerWrapper from '@/components/ContainerWrapper';
import LogoSection from '@/components/logo';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import BackgroundCircle from '@/components/BackgroundCircle';

/***************************  SECTIONS - NEW PASSWORD  ***************************/

/**
 *
 * Demos:
 * - [NewPassword](https://www.Capitalta.io/blocks/auth/new-password)
 *
 * API
 * - [NewPassword API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/auth/new-password#props-details)
 */

export default function NewPassword({ heading, caption }) {
  return (
    <ContainerWrapper sx={{ position: 'relative', overflowX: 'hidden' }}>
      <Stack sx={{ height: 1, minHeight: '100vh', justifyContent: 'space-between', gap: 6, py: SECTION_COMMON_PY }}>
        <Stack sx={{ alignItems: 'center', position: 'relative' }}>
          <BackgroundCircle />
          <Stack sx={{ bgcolor: 'grey.100', p: 1.5, borderRadius: 4, mb: 1.5, position: 'relative', zIndex: 1 }}>
            <LogoSection isIcon={true} />
          </Stack>
          <Typeset
            {...{ heading, caption }}
            stackProps={{ sx: { textAlign: 'center', gap: 1, position: 'relative', zIndex: 1 } }}
            captionProps={{ variant: 'body1', sx: { maxWidth: 458 } }}
          />
          <Box sx={{ width: 1, maxWidth: 458, mt: 6, position: 'relative', zIndex: 1 }}>
            <AuthNewPassword inputSx={{ bgcolor: 'background.paper' }} />
          </Box>
        </Stack>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Copyright />
        </Box>
      </Stack>
    </ContainerWrapper>
  );
}

NewPassword.propTypes = { heading: PropTypes.string, caption: PropTypes.string };
