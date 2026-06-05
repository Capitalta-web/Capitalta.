// @mui
import Typography from '@mui/material/Typography';

// @project
import { Hero10 } from '@/blocks/hero';

/***************************  HERO 10 - HEADLINE  ***************************/

function HeadlineText() {
  return (
    <Typography variant="h1" sx={{ maxWidth: { sm: 600, md: 650 } }}>
      Effortless Collaboration,{' '}
      <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
        Perfect Harmony
      </Typography>
    </Typography>
  );
}

/***************************  HERO 10 - DATA  ***************************/

const data = {
  chipTitle: 'Adaptive workflow',
  headLine: <HeadlineText />,
  captionLine: 'Identify bottlenecks, optimize processes, and continuously improve your workflows.',
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
  image: { light: '/assets/images/graphics/ai/graphics6-light.svg', dark: '/assets/images/graphics/ai/graphics6-dark.svg' }
};

/***************************  BLOCK - HERO 10  ***************************/

export default function BlockHero10() {
  return <Hero10 {...data} />;
}
