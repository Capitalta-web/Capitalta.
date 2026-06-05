// @mui
import Stack from '@mui/material/Stack';

// @project
import branding from '@/branding.json';
import Color from '@/blocks/Color';
import ContainerWrapper from '@/components/ContainerWrapper';
import SectionHero from '@/components/SectionHero';
import SimulatorTypeset from '@/components/SimulatorTypeset';
import { SECTION_PATH } from '@/path';
import { FIGMA_LINK } from '@/utils/constant';

/***************************  COLOR - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Color' }
];

/***************************  COLOR - DATA  ***************************/

const colorData = {
  typeset: {
    heading: 'Color styles',
    caption: '',
    figmaLink: FIGMA_LINK.color.link
  }
};

/***************************  SECTIONS - COLOR  ***************************/

export default function ColorPage() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Color Section`, breadcrumbs }} />
      <ContainerWrapper>
        <Stack sx={{ gap: { xs: 1.5, md: 2.5 }, my: 6 }}>
          <SimulatorTypeset {...colorData.typeset} />
          <Color />
        </Stack>
      </ContainerWrapper>
    </>
  );
}
