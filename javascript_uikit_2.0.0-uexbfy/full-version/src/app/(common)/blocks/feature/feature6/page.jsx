// @project
import { Feature6 } from '@/blocks/feature';

/***************************  FEATURE 6 - DATA  ***************************/

const data = {
  heading: 'Intelligent data compression',
  caption: 'Maximize storage efficiency without compromising data integrity.',
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
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
    },
    {
      icon: 'tabler-keyframe-align-center',
      title: 'Automated scaling',
      content: 'Ensures optimal performance without manual intervention.'
    },
    {
      icon: 'tabler-settings-up',
      title: 'Enhances flexibility',
      content: 'Enhances flexibility and resilience in a multi-cloud environment.'
    }
  ]
};

/***************************  BLOCK - FEATURE 6  ***************************/

export default function BlockFeature6() {
  return <Feature6 {...data} />;
}
