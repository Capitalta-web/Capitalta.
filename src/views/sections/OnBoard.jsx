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

/***************************  ONBOARD - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Onboard' }
];

/***************************  ONBOARD - DATA  ***************************/

const sectionsData = {
  typeset: {
    heading: 'Onboarding',
    caption: '',
    figmaLink: FIGMA_LINK.onboard.link
  },
  src: PRIVIEW_PATH.onboard
};

/***************************  SECTIONS - ONBOARD ***************************/

export default function OnBoard() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Onboard Sections`, breadcrumbs }} />
      <ContainerWrapper>
        <Stack sx={{ gap: { xs: 1.5, md: 2.5 }, my: 6 }}>
          <SimulatorTypeset {...sectionsData.typeset} />
          <Simulator src={sectionsData.src} />
        </Stack>
      </ContainerWrapper>
    </>
  );
}
