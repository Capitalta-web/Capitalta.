// @project
import branding from '@/branding.json';
import { Metrics6 } from '@/blocks/metrics';

/***************************  METRICS 6 - DATA  ***************************/

const data = {
  heading: 'Data processing at its peak',
  caption: `See the success stories of organizations scaling with ${branding.brandName}`,
  bgImage: { light: '/assets/images/graphics/ai/graphics4-light.svg', dark: '/assets/images/graphics/ai/graphics4-dark.svg' },
  blockDetail: [
    { counter: 99, defaultUnit: '%', caption: 'Compression efficiency achieved' },
    { counter: 40, defaultUnit: '%', caption: 'Reduction in storage costs' },
    { counter: 80, defaultUnit: '%', caption: 'Reduction in over-provisioning' }
  ]
};

/***************************  BLOCK - METRICS 6  ***************************/

export default function BlockMetrics6() {
  return <Metrics6 {...data} />;
}
