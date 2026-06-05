// @mui
import Typography from '@mui/material/Typography';

// @project
import { Hero9 } from '@/blocks/hero';

/***************************  HERO 9 - DATA  ***************************/

const data = {
  chip: {
    label: <Typography sx={{ color: 'text.secondary' }}>✦&nbsp;&nbsp; CloudHarmony&apos;s &nbsp;&nbsp;✦</Typography>
  },
  headLine: 'Real-time Performance Monitoring',
  captionLine: 'Identify and resolve issues proactively for uninterrupted operations.',
  primaryBtn: { children: 'Try predictive cost analytics', sx: { textTransform: 'none' } },
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
  listData: [
    { icon: 'tabler-settings-up', title: 'Automated scaling for efficiency' },
    { icon: 'tabler-chart-histogram', title: 'Real-time performance insights' }
  ]
};

/***************************  BLOCK - HERO 9  ***************************/

export default function BlockHero9() {
  return <Hero9 {...data} />;
}
