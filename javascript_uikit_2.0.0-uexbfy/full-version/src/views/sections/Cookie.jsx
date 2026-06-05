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

/***************************  COOKIE - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Cookie' }
];

/***************************  COOKIE - DATA  ***************************/

const sectionsData = [
  {
    typeset: {
      heading: 'Cookie section - 01',
      caption: '',
      figmaLink: FIGMA_LINK.cookie.variant.cookie1
    },
    src: PRIVIEW_PATH.cookie.cookie1
  },
  {
    typeset: {
      heading: 'Cookie section - 02',
      caption: '',
      figmaLink: FIGMA_LINK.cookie.variant.cookie2
    },
    src: PRIVIEW_PATH.cookie.cookie2
  },
  {
    typeset: {
      heading: 'Cookie section - 03',
      caption: '',
      figmaLink: FIGMA_LINK.cookie.variant.cookie3
    },
    src: PRIVIEW_PATH.cookie.cookie3
  }
];

/***************************  SECTIONS - COOKIE  ***************************/

export default function Cookie() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Cookie Sections`, breadcrumbs }} />
      <ContainerWrapper>
        <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 }, my: 6 }}>
          {sectionsData.map((item, index) => (
            <Stack key={index} sx={{ gap: { xs: 1.5, md: 2.5 } }}>
              <SimulatorTypeset {...item.typeset} />
              <Simulator src={item.src} defaultHeight={480} />
            </Stack>
          ))}
        </Stack>
      </ContainerWrapper>
    </>
  );
}
