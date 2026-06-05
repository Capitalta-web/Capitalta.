// @mui
import Stack from '@mui/material/Stack';

// @project
import branding from '@/branding.json';
import Icon from '@/blocks/Icon';
import ContainerWrapper from '@/components/ContainerWrapper';
import SectionHero from '@/components/SectionHero';
import SimulatorTypeset from '@/components/SimulatorTypeset';
import { SECTION_PATH } from '@/path';
import { FIGMA_LINK } from '@/utils/constant';

/***************************  ICON - BREADCRUMBS  ***************************/

const breadcrumbs = [
  { title: 'Home', to: process.env.NEXT_PUBLIC_BASE_NAME || '/' },
  { title: 'Blocks', to: SECTION_PATH },
  { title: 'Icon' }
];

/***************************  ICON - DATA  ***************************/

const iconData = {
  typeset: {
    heading: 'Icons',
    caption: '',
    figmaLink: FIGMA_LINK.icon.link
  }
};

/*************************** SECTIONS - ICON  ***************************/

export default function IconPage() {
  return (
    <>
      <SectionHero {...{ heading: `${branding.brandName} Icon Section`, breadcrumbs }} />
      <ContainerWrapper>
        <Stack sx={{ gap: { xs: 1.5, md: 2.5 }, my: 6 }}>
          <SimulatorTypeset {...iconData.typeset} />
          <Icon />
        </Stack>
      </ContainerWrapper>
    </>
  );
}
