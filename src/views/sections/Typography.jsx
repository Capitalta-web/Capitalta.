// @mui
import Stack from '@mui/material/Stack';

// @project
import branding from '@/branding.json';
import Typography from '@/blocks/Typography';
import ContainerWrapper from '@/components/ContainerWrapper';
import SectionHero from '@/components/SectionHero';
import SimulatorTypeset from '@/components/SimulatorTypeset';
import { SECTION_PATH } from '@/path';
import { FIGMA_LINK } from '@/utils/constant';

/***************************  TYPOGRAPHY - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Typography' }
];

/***************************  TYPOGRAPHY - DATA  ***************************/

const typographyData = {
  typeset: {
    heading: 'Typography',
    caption: '',
    figmaLink: FIGMA_LINK.typography.link
  }
};

/***************************  SECTIONS - TYPOGRAPHY  ***************************/

export default function TypographyPage() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Typography Section`, breadcrumbs }} />
      <ContainerWrapper>
        <Stack sx={{ gap: { xs: 1.5, md: 2.5 }, my: 6 }}>
          <SimulatorTypeset {...typographyData.typeset} />
          <Typography />
        </Stack>
      </ContainerWrapper>
    </>
  );
}
