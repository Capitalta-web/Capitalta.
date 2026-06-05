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

/***************************  TEAM - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Team' }
];

/***************************  TEAM - DATA  ***************************/

const sectionsData = [
  {
    typeset: {
      heading: 'Team section  - 01',
      caption: '',
      figmaLink: FIGMA_LINK.team.variant.team1
    },
    src: PRIVIEW_PATH.team.team1
  },
  {
    typeset: {
      heading: 'Team section  - 02',
      caption: '',
      figmaLink: FIGMA_LINK.team.variant.team2
    },
    src: PRIVIEW_PATH.team.team2
  },
  {
    typeset: {
      heading: 'Team section  - 03',
      caption: '',
      figmaLink: FIGMA_LINK.team.variant.team3
    },
    src: PRIVIEW_PATH.team.team3
  },
  {
    typeset: {
      heading: 'Team section  - 04',
      caption: '',
      figmaLink: FIGMA_LINK.team.variant.team4
    },
    src: PRIVIEW_PATH.team.team4
  },
  {
    typeset: {
      heading: 'Team section  - 05',
      caption: '',
      figmaLink: FIGMA_LINK.team.variant.team5
    },
    src: PRIVIEW_PATH.team.team5
  },
  {
    typeset: {
      heading: 'Team section  - 06',
      caption: '',
      figmaLink: FIGMA_LINK.team.variant.team6
    },
    src: PRIVIEW_PATH.team.team6
  },
  {
    typeset: {
      heading: 'Team section  - 07',
      caption: '',
      figmaLink: FIGMA_LINK.team.variant.team7
    },
    src: PRIVIEW_PATH.team.team7
  },
  {
    typeset: {
      heading: 'Team section  - 08',
      caption: '',
      figmaLink: FIGMA_LINK.team.variant.team8
    },
    src: PRIVIEW_PATH.team.team8
  }
];

/***************************  SECTIONS - TEAM  ***************************/

export default function Team() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Team Sections`, breadcrumbs }} />
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
