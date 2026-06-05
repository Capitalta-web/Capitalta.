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

/***************************  LOGIN - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Login' }
];

/***************************  LOGIN - DATA  ***************************/

const sectionsData = [
  {
    typeset: {
      heading: 'Login section - 01',
      caption: '',
      figmaLink: FIGMA_LINK.auth.login.variant.login1
    },
    src: PRIVIEW_PATH.auth.login.login1
  },
  {
    typeset: {
      heading: 'Login section - 02',
      caption: '',
      figmaLink: FIGMA_LINK.auth.login.variant.login2
    },
    src: PRIVIEW_PATH.auth.login.login2
  },
  {
    typeset: {
      heading: 'Login section - 03',
      caption: '',
      figmaLink: FIGMA_LINK.auth.login.variant.login3
    },
    src: PRIVIEW_PATH.auth.login.login3
  },
  {
    typeset: {
      heading: 'Login section - 04',
      caption: '',
      figmaLink: FIGMA_LINK.auth.login.variant.login4
    },
    src: PRIVIEW_PATH.auth.login.login4
  },
  {
    typeset: {
      heading: 'Login section - 05',
      caption: '',
      figmaLink: FIGMA_LINK.auth.login.variant.login5
    },
    src: PRIVIEW_PATH.auth.login.login5
  }
];

/***************************  SECTIONS - LOGIN  ***************************/

export default function Login() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Login Sections`, breadcrumbs }} />
      <ContainerWrapper>
        <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 }, my: 6 }}>
          {sectionsData.map((item, index) => (
            <Stack key={index} sx={{ gap: { xs: 1.5, md: 2.5 } }}>
              <SimulatorTypeset {...item.typeset} />
              <Simulator src={item.src} defaultHeight={800} />
            </Stack>
          ))}
        </Stack>
      </ContainerWrapper>
    </>
  );
}
