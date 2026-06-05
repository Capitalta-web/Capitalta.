// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import branding from '@/branding.json';
import { SmallHero6 } from '@/blocks/small-hero';
import LogoSection from '@/components/logo';

/***************************  SMALL HERO 6 - HEADLINE  ***************************/

function HeadlineText() {
  const logoSize = { xs: 56, sm: 68, md: 80 };
  const textSpacing = { xs: 0.5, md: 1 };
  const boxStyling = { bgcolor: 'grey.300', borderRadius: 8, py: 1, px: { xs: 1, sm: 2 } };

  return (
    <Typography variant="h1" align="center">
      <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center', mb: textSpacing }}>
        <Stack
          sx={{ justifyContent: 'center', alignItems: 'center', bgcolor: 'grey.300', borderRadius: 8, width: logoSize, height: logoSize }}
        >
          <LogoSection isIcon={true} />
        </Stack>
        <Box component="span" sx={{ mr: 1, ...boxStyling }}>
          {branding.brandName}
        </Box>
        Unlock
      </Stack>
      <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: textSpacing }}>
        Peak Performance
        <Box sx={{ ...boxStyling }}>in the Cloud</Box>
      </Stack>
    </Typography>
  );
}

/***************************  SMALL HERO 6 - DATA  ***************************/

const data = {
  headLine: <HeadlineText />,
  tagline: 'Optimize your cloud journey',
  primaryBtn: { children: 'Get Started' },
  list: [
    { title: 'Real-time performance insights and more', icon: 'tabler-chart-histogram' },
    { title: 'Automated scaling for efficiency and performance', icon: 'tabler-settings-up' },
    { title: 'Seamless multi-cloud management', icon: 'tabler-coin' }
  ]
};

/***************************  BLOCK - SMALL HERO 6  ***************************/

export default function BlockSmallHero6() {
  return <SmallHero6 {...data} />;
}
