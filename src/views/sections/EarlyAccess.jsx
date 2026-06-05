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

/***************************  EARLY ACCESS - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Early access' }
];

/***************************  EARLY ACCESS - DATA  ***************************/

const sectionsData = {
  typeset: {
    heading: 'Early access',
    caption: '',
    figmaLink: FIGMA_LINK.earlyAccess.link
  },
  src: PRIVIEW_PATH.earlyAccess
};

/***************************  SECTIONS - EARLY ACCESS ***************************/

export default function EarlyAccess() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Early Access Sections`, breadcrumbs }} />
      <ContainerWrapper>
        <Stack sx={{ gap: { xs: 1.5, md: 2.5 }, my: 6 }}>
          <SimulatorTypeset {...sectionsData.typeset} />
          <Simulator src={sectionsData.src} />
        </Stack>
      </ContainerWrapper>
    </>
  );
}
