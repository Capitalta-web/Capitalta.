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

/***************************  MEGA MENU - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Mega menu' }
];

/***************************  MEGA MENU - DATA  ***************************/

const sectionsData = [
  {
    typeset: {
      heading: 'Mega menu section - 01',
      caption: '',
      figmaLink: FIGMA_LINK.megamenu.variant.megamenu1
    },
    src: PRIVIEW_PATH.megamenu.megamenu1
  },
  {
    typeset: {
      heading: 'Mega menu section - 02',
      caption: '',
      figmaLink: FIGMA_LINK.megamenu.variant.megamenu2
    },
    src: PRIVIEW_PATH.megamenu.megamenu2
  },
  {
    typeset: {
      heading: 'Mega menu section - 03',
      caption: '',
      figmaLink: FIGMA_LINK.megamenu.variant.megamenu3
    },
    src: PRIVIEW_PATH.megamenu.megamenu3
  },
  {
    typeset: {
      heading: 'Mega menu section - 04',
      caption: '',
      figmaLink: FIGMA_LINK.megamenu.variant.megamenu4
    },
    src: PRIVIEW_PATH.megamenu.megamenu4
  },
  {
    typeset: {
      heading: 'Mega menu section - 05',
      caption: '',
      figmaLink: FIGMA_LINK.megamenu.variant.megamenu5
    },
    src: PRIVIEW_PATH.megamenu.megamenu5
  }
];

/***************************  SECTIONS - MEGA MENU  ***************************/

export default function MegaMenu() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Mega Menu Sections`, breadcrumbs }} />
      <ContainerWrapper>
        <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 }, my: 6 }}>
          {sectionsData.map((item, index) => (
            <Stack key={index} sx={{ gap: { xs: 1.5, md: 2.5 } }}>
              <SimulatorTypeset {...item.typeset} />
              <Simulator src={item.src} defaultHeight={760} />
            </Stack>
          ))}
        </Stack>
      </ContainerWrapper>
    </>
  );
}
