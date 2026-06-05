// @mui
import Typography from '@mui/material/Typography';

function HeadlineText() {
  return (
    <Typography variant="h1" sx={{ maxWidth: { sm: 380, md: 650 } }}>
      Learn New Skills Every Day with{' '}
      <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
        Top Online Instructors
      </Typography>
    </Typography>
  );
}

export const hero = {
  headLine: <HeadlineText />,
  captionLine: 'Discover our versatile Capitalta solutions and services designed to elevate learner success to new heights.',
  primaryBtn: { children: 'Get Started - It’s Free Now' },
  image1: '/assets/images/lms/hero.png',
  image2: { light: '/assets/images/lms/graphics/graphics2-light.svg', dark: '/assets/images/lms/graphics/graphics2-dark.svg' },
  reviewData: {
    rating: '4.5 Rating',
    reviews: 'From 200+ reviews'
  }
};
