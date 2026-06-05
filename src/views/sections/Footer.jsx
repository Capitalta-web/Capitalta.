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

/***************************  FOOTER - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Footer' }
];

/***************************  FOOTER - DATA  ***************************/

const sectionsData = [
  {
    typeset: {
      heading: 'Footer section - 01',
      caption: '',
      figmaLink: FIGMA_LINK.footer.variant.footer1
    },
    src: PRIVIEW_PATH.footer.footer1
  },
  {
    typeset: {
      heading: 'Footer section - 02',
      caption: '',
      figmaLink: FIGMA_LINK.footer.variant.footer2
    },
    src: PRIVIEW_PATH.footer.footer2
  },
  {
    typeset: {
      heading: 'Footer section - 03',
      caption: '',
      figmaLink: FIGMA_LINK.footer.variant.footer3
    },
    src: PRIVIEW_PATH.footer.footer3
  },
  {
    typeset: {
      heading: 'Footer section - 04',
      caption: '',
      figmaLink: FIGMA_LINK.footer.variant.footer4
    },
    src: PRIVIEW_PATH.footer.footer4
  },
  {
    typeset: {
      heading: 'Footer section - 05',
      caption: '',
      figmaLink: FIGMA_LINK.footer.variant.footer5
    },
    src: PRIVIEW_PATH.footer.footer5
  },
  {
    typeset: {
      heading: 'Footer section - 06',
      caption: '',
      figmaLink: FIGMA_LINK.footer.variant.footer6
    },
    src: PRIVIEW_PATH.footer.footer6
  },
  {
    typeset: {
      heading: 'Footer section - 07',
      caption: '',
      figmaLink: FIGMA_LINK.footer.variant.footer7
    },
    src: PRIVIEW_PATH.footer.footer7
  }
];

/***************************  SECTIONS - FOOTER  ***************************/

export default function Footer() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Footer Sections`, breadcrumbs }} />
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
