// @mui
import Typography from '@mui/material/Typography';

// @project
import { Hero12 } from '@/blocks/hero';

/***************************  HERO 12 - HEADLINE  ***************************/

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

/***************************  HERO 12 - CAPTIONLINE  ***************************/

function CaptionLineText() {
  const commonProps = { component: 'span', variant: 'h5', sx: { color: 'text.secondary' } };

  return (
    <Typography variant="h6" align="center" sx={{ color: 'text.secondary', maxWidth: { xs: 520, md: 650 } }}>
      Seamlessly fine-tune and&nbsp;<Typography {...commonProps}>optimize your cloud resources</Typography>&nbsp;using&nbsp;
      <Typography {...commonProps}>cutting-edge analytics</Typography>&nbsp;and&nbsp;
      <Typography {...commonProps}>automation tools.</Typography>
    </Typography>
  );
}

/***************************  HERO 12 - DATA  ***************************/

const data = {
  headLine: <HeadlineText />,
  captionLine: <CaptionLineText />,
  exploreBtn: { children: 'Try predictive cost analytics', sx: { textTransform: 'none' } },
  list: ['Optimize cloud costs', 'Automated scaling for efficiency', 'Real-time performance insights', 'Predictive cost analytics']
};

/***************************  BLOCK - HERO 12  ***************************/

export default function BlockHero12() {
  return <Hero12 {...data} />;
}
