// @mui
import Typography from '@mui/material/Typography';

// @project
import { Hero18 } from '@/blocks/hero';

/***************************  HERO 18 - HEADLINE  ***************************/

function HeadlineText() {
  return (
    <Typography variant="h1" align="center" sx={{ maxWidth: { sm: 600, md: 800 } }}>
      Empower your Cloud Experience with{' '}
      <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
        Unmatched Optimization Precision
      </Typography>
    </Typography>
  );
}

/***************************  HERO 18 - CAPTIONLINE  ***************************/

function CaptionLineText() {
  const commonProps = { component: 'span', variant: 'h5', sx: { color: 'text.secondary' } };

  return (
    <Typography variant="h6" align="center" sx={{ color: 'text.secondary', maxWidth: { xs: 330, sm: 520, md: 650 } }}>
      Seamlessly fine-tune and&nbsp;<Typography {...commonProps}>optimize your cloud resources</Typography>&nbsp;using&nbsp;
      <Typography {...commonProps}>cutting-edge analytics</Typography>&nbsp;and&nbsp;
      <Typography {...commonProps}>automation tools.</Typography>
    </Typography>
  );
}

/***************************  HERO 18 - DATA  ***************************/

const data = {
  headLine: <HeadlineText />,
  captionLine: <CaptionLineText />,
  exploreBtn: { children: 'Try predictive cost analytics', sx: { textTransform: 'none' } },
  imageList: [
    { image: '/assets/images/hero/medal-1.png' },
    { image: '/assets/images/hero/medal-2.png' },
    { image: '/assets/images/hero/medal-3.png' },
    { image: '/assets/images/hero/medal-4.png' }
  ]
};

/***************************  BLOCK - HERO 18  ***************************/

export default function BlockHero18() {
  return <Hero18 {...data} />;
}
