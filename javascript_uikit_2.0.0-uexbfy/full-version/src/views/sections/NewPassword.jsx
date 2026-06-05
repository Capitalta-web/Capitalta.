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

/***************************  NEW PASSWORD - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'New password' }
];

/***************************  NEW PASSWORD - DATA  ***************************/

const NewPasswordData = {
  typeset: {
    heading: 'New password',
    caption: '',
    figmaLink: FIGMA_LINK.auth.newPassword.link
  },
  src: PRIVIEW_PATH.auth.newPassword
};

/***************************  SECTIONS - NEW PASSWORD  ***************************/

export default function NewPasswordPage() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} New Password Sections`, breadcrumbs }} />
      <ContainerWrapper>
        <Stack sx={{ gap: { xs: 1.5, md: 2.5 }, my: 6 }}>
          <SimulatorTypeset {...NewPasswordData.typeset} />
          <Simulator src={NewPasswordData.src} />
        </Stack>
      </ContainerWrapper>
    </>
  );
}
