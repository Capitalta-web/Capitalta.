// @mui
import Stack from '@mui/material/Stack';

// @project
import branding from '@/branding.json';
import ContainerWrapper from '@/components/ContainerWrapper';
import SectionHero from '@/components/SectionHero';
import Simulator from '@/components/Simulator';
import SimulatorTypeset from '@/components/SimulatorTypeset';

import { PRIVIEW_PATH, SECTION_PATH } from '@/path';
import { FIGMA_LINK } from '@/utils/constant';

/***************************  FORGOT PASSWORD - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Forgot password' }
];

/***************************  FORGOT PASSWORD - DATA  ***************************/

const forgotPasswordData = {
  typeset: {
    heading: 'Forgot password',
    caption: '',
    figmaLink: FIGMA_LINK.auth.forgotPassword.link
  },
  src: PRIVIEW_PATH.auth.forgotPassword
};

/***************************  SECTIONS - FORGOT PASSWORD  ***************************/

export default function ForgotPasswordPage() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Forgot Password Sections`, breadcrumbs }} />
      <ContainerWrapper>
        <Stack sx={{ gap: { xs: 1.5, md: 2.5 }, my: 6 }}>
          <SimulatorTypeset {...forgotPasswordData.typeset} />
          <Simulator src={forgotPasswordData.src} />
        </Stack>
      </ContainerWrapper>
    </>
  );
}
