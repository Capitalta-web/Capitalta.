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

/***************************  OTP VERIFICATION - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Otp verification' }
];

/***************************  OTP VERIFICATION - DATA  ***************************/

const otpVerificationData = {
  typeset: {
    heading: 'OTP verification',
    caption: '',
    figmaLink: FIGMA_LINK.auth.otpVerification.link
  },
  src: PRIVIEW_PATH.auth.otpVerification
};

/***************************  SECTIONS - OTP VERIFICATION  ***************************/

export default function OtpVerificationPage() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} OTP Verification Sections`, breadcrumbs }} />
      <ContainerWrapper>
        <Stack sx={{ gap: { xs: 1.5, md: 2.5 }, my: 6 }}>
          <SimulatorTypeset {...otpVerificationData.typeset} />
          <Simulator src={otpVerificationData.src} />
        </Stack>
      </ContainerWrapper>
    </>
  );
}
