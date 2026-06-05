// @mui
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// @project
import { Hero3 } from '@/blocks/hero';

/***************************  HERO 3 - HEADLINE  ***************************/

function HeadlineText() {
  return (
    <Typography variant="h1" sx={{ width: { xs: 343, sm: 700, md: 850 } }}>
      Effortless CRM Management, Seamless Business
      <CardMedia
        sx={{
          display: 'inline-block',
          height: { xs: 32, sm: 45, md: 57 },
          width: { xs: 61, sm: 86, md: 109 },
          backgroundSize: 'contain',
          mx: { xs: 0.5, sm: 1, md: 1.5 },
          verticalAlign: 'sub'
        }}
        image="/assets/images/graphics/ai/rocket.svg"
      />
      Growth
    </Typography>
  );
}

/***************************  HERO 3 - DATA  ***************************/

const data = {
  chip: {
    label: 'New Beta Version is Release ',
    link: { children: 'Explore Now', href: '#' }
  },
  headLine: <HeadlineText />,
  boxImage1: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
  boxImage2: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
  boxImage3: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
  description: 'Empowering businesses with a customizable, Data-driven CRM solution.',
  listData: [
    { title: 'Features', link: { href: '#' } },
    { title: 'Integration', link: { href: '#' } },
    { title: 'Integration', link: { href: '#' } }
  ],
  exploreBtn: { children: 'Explore CRM' }
};

/***************************  BLOCK - HERO 3  ***************************/

export default function BlockHero3() {
  return <Hero3 {...data} />;
}
