// @mui
import Typography from '@mui/material/Typography';

// @project
import { Hero1 } from '@/blocks/hero';
import GraphicsImage from '@/components/GraphicsImage';

/***************************  HERO 1 - HEADLINE  ***************************/

function HeadlineText() {
  return (
    <Typography variant="h1" align="center" sx={{ width: { xs: 343, sm: 700, md: 850 } }}>
      Effortless CRM Management, Seamless Business
      <GraphicsImage
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

/***************************  HERO 1 - DATA  ***************************/

const data = {
  chip: {
    label: 'New Beta Version is Release ',
    link: { children: 'Explore Now', href: '#' }
  },
  headLine: <HeadlineText />,
  captionLine: 'Empowering businesses with a customizable, Data-driven CRM solution.',
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
  primaryBtn: { children: 'Get Started - It’s Free' },
  secondaryBtn: { children: 'Explore CRM' }
};

/***************************  BLOCK - HERO 1  ***************************/

export default function BlockHero1() {
  return <Hero1 {...data} />;
}
