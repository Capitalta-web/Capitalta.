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

/***************************  TESTIMONIAL - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Testimonial' }
];

/***************************  TESTIMONIAL - DATA  ***************************/

const sectionsData = [
  {
    typeset: {
      heading: 'Testimonial section - 01',
      caption: '',
      figmaLink: FIGMA_LINK.testimonial.variant.testimonial1
    },
    src: PRIVIEW_PATH.testimonial.testimonial1
  },
  {
    typeset: {
      heading: 'Testimonial section - 02',
      caption: '',
      figmaLink: FIGMA_LINK.testimonial.variant.testimonial2
    },
    src: PRIVIEW_PATH.testimonial.testimonial2
  },
  {
    typeset: {
      heading: 'Testimonial section - 03',
      caption: '',
      figmaLink: FIGMA_LINK.testimonial.variant.testimonial3
    },
    src: PRIVIEW_PATH.testimonial.testimonial3
  },
  {
    typeset: {
      heading: 'Testimonial section - 04',
      caption: '',
      figmaLink: FIGMA_LINK.testimonial.variant.testimonial4
    },
    src: PRIVIEW_PATH.testimonial.testimonial4
  },
  {
    typeset: {
      heading: 'Testimonial section - 05',
      caption: '',
      figmaLink: FIGMA_LINK.testimonial.variant.testimonial5
    },
    src: PRIVIEW_PATH.testimonial.testimonial5
  },
  {
    typeset: {
      heading: 'Testimonial section - 06',
      caption: '',
      figmaLink: FIGMA_LINK.testimonial.variant.testimonial6
    },
    src: PRIVIEW_PATH.testimonial.testimonial6
  },
  {
    typeset: {
      heading: 'Testimonial section - 07',
      caption: '',
      figmaLink: FIGMA_LINK.testimonial.variant.testimonial7
    },
    src: PRIVIEW_PATH.testimonial.testimonial7
  },
  {
    typeset: {
      heading: 'Testimonial section - 08',
      caption: '',
      figmaLink: FIGMA_LINK.testimonial.variant.testimonial8
    },
    src: PRIVIEW_PATH.testimonial.testimonial8
  },
  {
    typeset: {
      heading: 'Testimonial section - 09',
      caption: '',
      figmaLink: FIGMA_LINK.testimonial.variant.testimonial9
    },
    src: PRIVIEW_PATH.testimonial.testimonial9
  },
  {
    typeset: {
      heading: 'Testimonial section - 10',
      caption: '',
      figmaLink: FIGMA_LINK.testimonial.variant.testimonial10
    },
    src: PRIVIEW_PATH.testimonial.testimonial10
  },
  {
    typeset: {
      heading: 'Testimonial section - 11',
      caption: '',
      figmaLink: FIGMA_LINK.testimonial.variant.testimonial11
    },
    src: PRIVIEW_PATH.testimonial.testimonial11
  },
  {
    typeset: {
      heading: 'Testimonial section - 12',
      caption: '',
      figmaLink: FIGMA_LINK.testimonial.variant.testimonial12
    },
    src: PRIVIEW_PATH.testimonial.testimonial12
  },
  {
    typeset: {
      heading: 'Testimonial section - 13',
      caption: '',
      figmaLink: FIGMA_LINK.testimonial.variant.testimonial13
    },
    src: PRIVIEW_PATH.testimonial.testimonial13
  }
];

/***************************  SECTIONS - TESTIMONIAL  ***************************/

export default function Testimonial() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Testimonial Section`, breadcrumbs }} />
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
