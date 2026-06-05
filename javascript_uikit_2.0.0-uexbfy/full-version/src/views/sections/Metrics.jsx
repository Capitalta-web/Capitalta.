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

/***************************  METRICS - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Metrics' }
];

/***************************  METRICS - DATA  ***************************/

const sectionsData = [
  {
    typeset: {
      heading: 'Metrics section - 01',
      caption: '',
      figmaLink: FIGMA_LINK.metrics.variant.metrics1
    },
    src: PRIVIEW_PATH.metrics.metrics1
  },
  {
    typeset: {
      heading: 'Metrics section - 02',
      caption: '',
      figmaLink: FIGMA_LINK.metrics.variant.metrics2
    },
    src: PRIVIEW_PATH.metrics.metrics2
  },
  {
    typeset: {
      heading: 'Metrics section - 03',
      caption: '',
      figmaLink: FIGMA_LINK.metrics.variant.metrics3
    },
    src: PRIVIEW_PATH.metrics.metrics3
  },
  {
    typeset: {
      heading: 'Metrics section - 04',
      caption: '',
      figmaLink: FIGMA_LINK.metrics.variant.metrics4
    },
    src: PRIVIEW_PATH.metrics.metrics4
  },
  {
    typeset: {
      heading: 'Metrics section - 05',
      caption: '',
      figmaLink: FIGMA_LINK.metrics.variant.metrics5
    },
    src: PRIVIEW_PATH.metrics.metrics5
  },
  {
    typeset: {
      heading: 'Metrics section - 06',
      caption: '',
      figmaLink: FIGMA_LINK.metrics.variant.metrics6
    },
    src: PRIVIEW_PATH.metrics.metrics6
  },
  {
    typeset: {
      heading: 'Metrics section - 07',
      caption: '',
      figmaLink: FIGMA_LINK.metrics.variant.metrics7
    },
    src: PRIVIEW_PATH.metrics.metrics7
  },
  {
    typeset: {
      heading: 'Metrics section - 08',
      caption: '',
      figmaLink: FIGMA_LINK.metrics.variant.metrics8
    },
    src: PRIVIEW_PATH.metrics.metrics8
  },
  {
    typeset: {
      heading: 'Metrics section - 09',
      caption: '',
      figmaLink: FIGMA_LINK.metrics.variant.metrics9
    },
    src: PRIVIEW_PATH.metrics.metrics9
  },
  {
    typeset: {
      heading: 'Metrics Section - 10',
      caption: '',
      figmaLink: FIGMA_LINK.metrics.variant.metrics10
    },
    src: PRIVIEW_PATH.metrics.metrics10
  }
];

/***************************  SECTIONS - METRICS  ***************************/

export default function Metrics() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Metrics Sections`, breadcrumbs }} />
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
