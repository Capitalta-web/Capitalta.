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

/***************************  FEATURE - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Feature' }
];

/***************************  FEATURE - DATA  ***************************/

const sectionsData = [
  {
    typeset: {
      heading: 'Feature section - 01',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature1
    },
    src: PRIVIEW_PATH.feature.feature1
  },
  {
    typeset: {
      heading: 'Feature section - 02',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature2
    },
    src: PRIVIEW_PATH.feature.feature2
  },
  {
    typeset: {
      heading: 'Feature section - 03',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature3
    },
    src: PRIVIEW_PATH.feature.feature3
  },
  {
    typeset: {
      heading: 'Feature section - 04',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature4
    },
    src: PRIVIEW_PATH.feature.feature4
  },
  {
    typeset: {
      heading: 'Feature section - 05',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature5
    },
    src: PRIVIEW_PATH.feature.feature5
  },
  {
    typeset: {
      heading: 'Feature section - 06',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature6
    },
    src: PRIVIEW_PATH.feature.feature6
  },
  {
    typeset: {
      heading: 'Feature section - 07',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature7
    },
    src: PRIVIEW_PATH.feature.feature7
  },
  {
    typeset: {
      heading: 'Feature section - 08',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature8
    },
    src: PRIVIEW_PATH.feature.feature8
  },
  {
    typeset: {
      heading: 'Feature section - 09',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature9
    },
    src: PRIVIEW_PATH.feature.feature9
  },
  {
    typeset: {
      heading: 'Feature section - 10',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature10
    },
    src: PRIVIEW_PATH.feature.feature10
  },
  {
    typeset: {
      heading: 'Feature section - 11',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature11
    },
    src: PRIVIEW_PATH.feature.feature11
  },
  {
    typeset: {
      heading: 'Feature section - 12',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature12
    },
    src: PRIVIEW_PATH.feature.feature12
  },
  {
    typeset: {
      heading: 'Feature section - 13',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature13
    },
    src: PRIVIEW_PATH.feature.feature13
  },
  {
    typeset: {
      heading: 'Feature section - 14',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature14
    },
    src: PRIVIEW_PATH.feature.feature14
  },
  {
    typeset: {
      heading: 'Feature section - 15',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature15
    },
    src: PRIVIEW_PATH.feature.feature15
  },
  {
    typeset: {
      heading: 'Feature section - 16',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature16
    },
    src: PRIVIEW_PATH.feature.feature16
  },
  {
    typeset: {
      heading: 'Feature section - 17',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature17
    },
    src: PRIVIEW_PATH.feature.feature17
  },
  {
    typeset: {
      heading: 'Feature section - 18',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature18
    },
    src: PRIVIEW_PATH.feature.feature18
  },
  {
    typeset: {
      heading: 'Feature section - 19',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature19
    },
    src: PRIVIEW_PATH.feature.feature19
  },
  {
    typeset: {
      heading: 'Feature section - 20',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature20
    },
    src: PRIVIEW_PATH.feature.feature20
  },
  {
    typeset: {
      heading: 'Feature section - 21',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature21
    },
    src: PRIVIEW_PATH.feature.feature21
  },
  {
    typeset: {
      heading: 'Feature section - 22',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature22
    },
    src: PRIVIEW_PATH.feature.feature22
  },
  {
    typeset: {
      heading: 'Feature section - 23',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature23
    },
    src: PRIVIEW_PATH.feature.feature23
  },
  {
    typeset: {
      heading: 'Feature section - 24',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature24
    },
    src: PRIVIEW_PATH.feature.feature24
  },
  {
    typeset: {
      heading: 'Feature section - 25',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature25
    },
    src: PRIVIEW_PATH.feature.feature25
  },
  {
    typeset: {
      heading: 'Feature Section - 26',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature26
    },
    src: PRIVIEW_PATH.feature.feature26
  },
  {
    typeset: {
      heading: 'Feature Section - 27',
      caption: '',
      figmaLink: FIGMA_LINK.feature.variant.feature27
    },
    src: PRIVIEW_PATH.feature.feature27
  }
];

/***************************  SECTIONS - FEATURE  ***************************/

export default function Feature() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Feature Sections`, breadcrumbs }} />
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
