// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import branding from '@/branding.json';
import { Hero14 } from '@/blocks/hero';
import LogoSection from '@/components/logo';

/***************************  HERO 14 - HEADLINE  ***************************/

const logoSize = { xs: 56, sm: 68, md: 80 };
const textSpacing = { xs: 0.5, md: 1 };
const boxStyling = { bgcolor: 'grey.300', borderRadius: 8, py: 1, px: { xs: 1, sm: 2 } };

function HeadlineText() {
  return (
    <Typography variant="h1" align="center">
      <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center', mb: textSpacing }}>
        <Stack
          sx={{ justifyContent: 'center', alignItems: 'center', bgcolor: 'grey.300', borderRadius: 8, width: logoSize, height: logoSize }}
        >
          <LogoSection isIcon={true} />
        </Stack>
        <Box component="span" sx={{ width: 'fit-content', mr: 1, ...boxStyling }}>
          {branding.brandName}
        </Box>
        Unlock
      </Stack>
      <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: textSpacing }}>
        Peak Performance<Box sx={boxStyling}>in the Cloud</Box>
      </Stack>
    </Typography>
  );
}

/***************************  HERO 14 - DATA  ***************************/

const data = {
  headLine: <HeadlineText />,
  captionLine: `Monitor your cloud infrastructure in real-time with ${branding.brandName} comprehensive performance metrics.`,
  tagline: 'Optimize Your Cloud Journey',
  primaryBtn: { children: 'Get Started' },
  list: [
    { title: 'Real-time performance insights and more', icon: 'tabler-chart-histogram' },
    { title: 'Automated scaling for efficiency and performance', icon: 'tabler-settings-up' },
    { title: 'Seamless multi-cloud management', icon: 'tabler-coin' }
  ]
};

/***************************  BLOCK - HERO 14  ***************************/

export default function BlockHero14() {
  return <Hero14 {...data} />;
}
