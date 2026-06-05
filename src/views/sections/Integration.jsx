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

/***************************  INTEGRATION - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Integration' }
];

/***************************  INTEGRATION - DATA  ***************************/

const sectionsData = [
  {
    typeset: {
      heading: 'Integration section - 01',
      caption: '',
      figmaLink: FIGMA_LINK.integration.variant.integration1
    },
    src: PRIVIEW_PATH.integration.integration1
  },
  {
    typeset: {
      heading: 'Integration section - 02',
      caption: '',
      figmaLink: FIGMA_LINK.integration.variant.integration2
    },
    src: PRIVIEW_PATH.integration.integration2
  },
  {
    typeset: {
      heading: 'Integration section - 03',
      caption: '',
      figmaLink: FIGMA_LINK.integration.variant.integration3
    },
    src: PRIVIEW_PATH.integration.integration3
  },
  {
    typeset: {
      heading: 'Integration section - 04',
      caption: '',
      figmaLink: FIGMA_LINK.integration.variant.integration4
    },
    src: PRIVIEW_PATH.integration.integration4
  },
  {
    typeset: {
      heading: 'Integration section - 05',
      caption: '',
      figmaLink: FIGMA_LINK.integration.variant.integration5
    },
    src: PRIVIEW_PATH.integration.integration5
  },
  {
    typeset: {
      heading: 'Integration section - 06',
      caption: '',
      figmaLink: FIGMA_LINK.integration.variant.integration6
    },
    src: PRIVIEW_PATH.integration.integration6
  },
  {
    typeset: {
      heading: 'Integration section - 07',
      caption: '',
      figmaLink: FIGMA_LINK.integration.variant.integration7
    },
    src: PRIVIEW_PATH.integration.integration7
  },
  {
    typeset: {
      heading: 'Integration section - 08',
      caption: '',
      figmaLink: FIGMA_LINK.integration.variant.integration8
    },
    src: PRIVIEW_PATH.integration.integration8
  },
  {
    typeset: {
      heading: 'Integration Section - 09',
      caption: '',
      figmaLink: FIGMA_LINK.integration.variant.integration9
    },
    src: PRIVIEW_PATH.integration.integration9
  }
];

/***************************  SECTIONS - INTEGRATION  ***************************/

export default function Integration() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Integration Sections`, breadcrumbs }} />
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
