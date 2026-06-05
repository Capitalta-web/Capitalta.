// @mui
import Typography from '@mui/material/Typography';

// @project
import branding from '@/branding.json';

/***************************  HERO - HEADLINE  ***************************/

function HeadlineText() {
  return (
    <Typography variant="h1" sx={{ maxWidth: { sm: 600, md: 650 } }}>
      Unlock the Secret to{' '}
      <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
        High Conversions
      </Typography>
    </Typography>
  );
}

/***************************  HERO - DATA  ***************************/

export const hero = {
  chipTitle: `Welcome to ${branding.brandName}`,
  headLine: <HeadlineText />,
  captionLine: 'Discover the secret weapon that top websites use to achieve remarkable conversion rates in record time.',
  primaryBtn: { children: 'Project Syncing' },
  secondaryBtn: { children: 'Customize Workflows' },
  reviewData: {
    avatarList: [
      '/assets/images/user/avatar1.png',
      '/assets/images/user/avatar2.png',
      '/assets/images/user/avatar3.png',
      '/assets/images/user/avatar4.png',
      '/assets/images/user/avatar5.png'
    ],
    review: '10k+ Reviews (4.5 out of 5)'
  },
  image: { light: '/assets/images/graphics/plugin/graphics1-light.svg', dark: '/assets/images/graphics/plugin/graphics1-dark.svg' }
};
