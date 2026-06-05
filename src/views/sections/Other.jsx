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

/***************************  OTHER - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Other' }
];

/***************************  OTHER - DATA  ***************************/

const sectionsData = [
  {
    typeset: {
      heading: 'Extra section - 01',
      caption: '',
      figmaLink: FIGMA_LINK.other.variant.other1
    },
    src: PRIVIEW_PATH.other.other1
  },
  {
    typeset: {
      heading: 'Extra section - 02',
      caption: '',
      figmaLink: FIGMA_LINK.other.variant.other2
    },
    src: PRIVIEW_PATH.other.other2
  },
  {
    typeset: {
      heading: 'Extra section - 03',
      caption: '',
      figmaLink: FIGMA_LINK.other.variant.other3
    },
    src: PRIVIEW_PATH.other.other3
  }
];

/***************************  SECTIONS - OTHER  ***************************/

export default function Other() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Extra Sections`, breadcrumbs }} />
      <ContainerWrapper>
        <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 }, my: 6 }}>
          {sectionsData.map((item, index) => (
            <Stack key={index} sx={{ gap: { xs: 1.5, md: 2.5 } }}>
              <SimulatorTypeset {...item.typeset} />
              <Simulator src={item.src} />
            </Stack>
          ))}
        </Stack>
      </ContainerWrapper>
    </>
  );
}
