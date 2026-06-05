// @mui
import Typography from '@mui/material/Typography';

// @project
import { Hero7 } from '@/blocks/hero';

/***************************  HERO 7 - HEADLINE  ***************************/

function HeadlineText() {
  return (
    <Typography variant="h1" sx={{ maxWidth: { sm: 600, md: 650 } }}>
      Elevate your Business with our{' '}
      <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
        Cutting-Edge SaaS Platform
      </Typography>
    </Typography>
  );
}

/***************************  HERO 7 - DATA  ***************************/

const data = {
  headLine: <HeadlineText />,
  captionLine: 'Experience peak efficiency with our CRM solution, revolutionizing productivity and success.',
  primaryBtn: { children: 'Get Started - It’s Free Now' },
  image1: '/assets/images/hero/lady.png',
  image2: { light: '/assets/images/graphics/ai/graphics18-light.svg', dark: '/assets/images/graphics/ai/graphics18-dark.svg' },
  reviewData: {
    rating: '4.5 Rating',
    reviews: 'From 200+ reviews'
  }
};

/***************************  BLOCK - HERO 7  ***************************/

export default function BlockHero7() {
  return <Hero7 {...data} />;
}
