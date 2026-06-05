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

/***************************  CONTACT US - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Contact us' }
];

/***************************  CONTACT US - DATA  ***************************/

const sectionsData = [
  {
    typeset: {
      heading: 'Contact us section - 01',
      caption: '',
      figmaLink: FIGMA_LINK.contactUs.variant.contactUs1
    },
    src: PRIVIEW_PATH.contactUs.contactUs1
  },
  {
    typeset: {
      heading: 'Contact us section - 02',
      caption: '',
      figmaLink: FIGMA_LINK.contactUs.variant.contactUs2
    },
    src: PRIVIEW_PATH.contactUs.contactUs2
  },
  {
    typeset: {
      heading: 'Contact us section - 03',
      caption: '',
      figmaLink: FIGMA_LINK.contactUs.variant.contactUs3
    },
    src: PRIVIEW_PATH.contactUs.contactUs3
  },
  {
    typeset: {
      heading: 'Contact us section - 04',
      caption: '',
      figmaLink: FIGMA_LINK.contactUs.variant.contactUs4
    },
    src: PRIVIEW_PATH.contactUs.contactUs4
  },
  {
    typeset: {
      heading: 'Contact us section - 05',
      caption: '',
      figmaLink: FIGMA_LINK.contactUs.variant.contactUs5
    },
    src: PRIVIEW_PATH.contactUs.contactUs5
  },
  {
    typeset: {
      heading: 'Contact us section - 06',
      caption: '',
      figmaLink: FIGMA_LINK.contactUs.variant.contactUs6
    },
    src: PRIVIEW_PATH.contactUs.contactUs6
  }
];

/***************************  SECTIONS - CONTACT US  ***************************/

export default function ContactUs() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Contact Us Sections`, breadcrumbs }} />
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
