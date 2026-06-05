// @project
import { Feature17 } from '@/blocks/feature';

/***************************  FEATURE 17 - DATA  ***************************/

const data = {
  heading: 'Monitor your cloud infrastructure in real-time.',
  caption: 'Gain insights into performance metrics and proactively address issues for uninterrupted operations.',
  image: { light: '/assets/images/graphics/ai/graphics3-light.svg', dark: '/assets/images/graphics/ai/graphics3-dark.svg' },
  features: [
    {
      icon: 'tabler-chart-histogram',
      title: 'Parallel processing',
      content: 'Process data in parallel, significantly boosting data processing speed.'
    },
    {
      icon: 'tabler-devices-code',
      title: 'Cross-platform',
      content: 'Compatibility with various platforms for versatile data processing.'
    }
  ],
  actionBtn: { children: 'Explore all Features', sx: { textTransform: 'none' } }
};

/***************************  BLOCK - FEATURE 17  ***************************/

export default function BlockFeature17() {
  return <Feature17 {...data} />;
}
