// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import branding from '@/branding.json';
import { Hero8 } from '@/blocks/hero';

/***************************  HERO 8 - HEADLINE  ***************************/

const size = { xs: 56, sm: 68, md: 80 };
const boxStyling = { bgcolor: 'grey.300', borderRadius: 8, py: 1, px: { xs: 1, sm: 2 } };

function HeadlineText() {
  return (
    <Typography
      variant="h1"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: { xs: 0.5, sm: 1 } }}
    >
      Elevate your
      <Stack direction="row">
        <Stack
          sx={{
            bgcolor: 'grey.300',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            width: size,
            height: size,
            color: 'primary.main'
          }}
        >
          ✤
        </Stack>
        <Box sx={boxStyling}>Business</Box>
      </Stack>
      with our
      <Box sx={boxStyling}>Cutting-Edge {branding.brandName}</Box>
    </Typography>
  );
}

/***************************  HERO 8 - DATA  ***************************/

const data = {
  headLine: <HeadlineText />,
  captionLine: 'Our SaaS platform delivers a flawless user experience and unmatched results.',
  primaryBtn: { children: 'Get Started - It’s Free Now' },
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
  listData: [
    { counter: '90', defaultUnit: '%', caption: 'Power of AI for navigation and communication' },
    { counter: '10', defaultUnit: 'x', caption: 'Achieving faster sales through streamlined' },
    { counter: '15', defaultUnit: '%', caption: 'SaaS companies in the last fiscal year.' },
    { counter: '150', defaultUnit: '+', caption: 'Showcasing the global impact and adoption' }
  ]
};

/***************************  BLOCK - HERO 8  ***************************/

export default function BlockHero8() {
  return <Hero8 {...data} />;
}
