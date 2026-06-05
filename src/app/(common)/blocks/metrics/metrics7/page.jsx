// @project
import branding from '@/branding.json';
import { Metrics7 } from '@/blocks/metrics';

/***************************  METRICS 7 - DATA  ***************************/

const data = {
  heading: 'Data processing at its peak',
  caption: `See the success stories of organizations scaling with ${branding.brandName}`,
  bgImage1: { light: '/assets/images/graphics/ai/graphics4-light.svg', dark: '/assets/images/graphics/ai/graphics4-dark.svg' },
  bgImage2: '/assets/images/metrics/metrics.svg',
  blockDetail: [
    { counter: 80, defaultUnit: '%', caption: 'Reduction in over-provisioning' },
    { counter: 3, defaultUnit: 'X', caption: 'Increase in data processing speed' },
    { counter: 99, defaultUnit: '%', caption: 'Compression efficiency achieved' },
    { counter: 4.5, defaultUnit: '/5', caption: 'Average user satisfaction rating' }
  ]
};

/***************************  BLOCK - METRICS 7  ***************************/

export default function BlockMetrics7() {
  return <Metrics7 {...data} />;
}
