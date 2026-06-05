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

/***************************  GALLERY - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Gallery' }
];

/***************************  GALLERY - DATA  ***************************/

const sectionsData = [
  {
    typeset: {
      heading: 'Gallery section - 01',
      caption: '',
      figmaLink: FIGMA_LINK.gallery.variant.gallery1
    },
    src: PRIVIEW_PATH.gallery.gallery1
  },
  {
    typeset: {
      heading: 'Gallery section - 02',
      caption: '',
      figmaLink: FIGMA_LINK.gallery.variant.gallery2
    },
    src: PRIVIEW_PATH.gallery.gallery2
  },
  {
    typeset: {
      heading: 'Gallery section - 03',
      caption: '',
      figmaLink: FIGMA_LINK.gallery.variant.gallery3
    },
    src: PRIVIEW_PATH.gallery.gallery3
  },
  {
    typeset: {
      heading: 'Gallery section - 04',
      caption: '',
      figmaLink: FIGMA_LINK.gallery.variant.gallery4
    },
    src: PRIVIEW_PATH.gallery.gallery4
  }
];

/***************************  SECTIONS - GALLERY  ***************************/

export default function Gallery() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Gallery Sections`, breadcrumbs }} />
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
