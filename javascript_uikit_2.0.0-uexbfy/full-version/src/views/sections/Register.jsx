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

/***************************  REGISTER - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Register' }
];

/***************************  REGISTER - DATA  ***************************/

const sectionsData = [
  {
    typeset: {
      heading: 'Register section - 01',
      caption: '',
      figmaLink: FIGMA_LINK.auth.register.link
    },
    src: PRIVIEW_PATH.auth.register
  }
];

/***************************  SECTIONS - REGISTER  ***************************/

export default function Register() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Register Section`, breadcrumbs }} />
      <ContainerWrapper>
        <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 }, my: 6 }}>
          {sectionsData.map((item, index) => (
            <Stack key={index} sx={{ gap: { xs: 1.5, md: 2.5 } }}>
              <SimulatorTypeset {...item.typeset} />
              <Simulator src={item.src} defaultHeight={800} />
            </Stack>
          ))}
        </Stack>
      </ContainerWrapper>
    </>
  );
}
