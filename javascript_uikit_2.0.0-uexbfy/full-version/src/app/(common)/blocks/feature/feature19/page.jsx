'use client';

// @mui
import { useColorScheme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// @project
import { Feature19 } from '@/blocks/feature';
import { ThemeMode } from '@/config';
import { withAlpha } from '@/utils/colorUtils';

// @assets
import Pattern1 from '@/images/graphics/Pattern1';
import Pattern2 from '@/images/graphics/Pattern2';

/***************************  FEATURE 19 - IMAGE CONTENT  ***************************/

function ImageContent1() {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();

  return (
    <Box sx={{ width: { xs: 135, sm: 150, md: 200, lg: 260 }, height: 'auto', mx: 'auto' }}>
      <Pattern1 fill={withAlpha(theme.vars.palette.grey[colorScheme === ThemeMode.DARK ? 50 : 200], 0.4)} />
    </Box>
  );
}

function ImageContent2() {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();

  return (
    <Box sx={{ width: { xs: 100, sm: 110, md: 160 }, height: 'auto', mx: 'auto' }}>
      <Pattern2 fill={withAlpha(theme.vars.palette.grey[colorScheme === ThemeMode.DARK ? 50 : 200], 0.4)} />
    </Box>
  );
}

/***************************  FEATURE 19 - DATA  ***************************/

const data = {
  heading: 'Adaptive workflow solutions',
  caption: `Adapt to changing needs, streamline processes, and boost productivity with ease.`,
  blockData1: {
    actionBtn: { children: 'Learn More' },
    image: { dark: '/assets/images/graphics/ai/graphics4-dark.svg', light: '/assets/images/graphics/ai/graphics4-light.svg' },
    title: 'Dynamic task automation',
    description: 'Adapt to changing needs, streamline processes, and boost productivity with ease.'
  },
  blockData2: {
    actionBtn: { children: 'Learn More' },
    image: { dark: '/assets/images/graphics/ai/graphics5-dark.svg', light: '/assets/images/graphics/ai/graphics5-light.svg' },
    title: 'Workflow analytics',
    description: 'Gain insights into workflows for continuous improvement.'
  },
  blockData3: { description: 'Tailor workflows to adapt to changing business needs.', image: <ImageContent1 /> },
  blockData4: { description: 'Prioritize tasks dynamically for optimized task management.', image: <ImageContent2 /> }
};

/***************************  BLOCK - FEATURE 19  ***************************/

export default function BlockFeature19() {
  return <Feature19 {...data} />;
}
