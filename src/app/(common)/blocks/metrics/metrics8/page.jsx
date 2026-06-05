// @project
import branding from '@/branding.json';
import { Metrics8 } from '@/blocks/metrics';

/***************************  METRICS 8 - DATA  ***************************/

const data = {
  heading: 'Parallel processing excellence',
  caption: `Experience the power of parallel processing with ${branding.brandName}`,
  blockDetail: [
    { counter: 99, defaultUnit: '%', progress: 99, caption: 'Compression efficiency achieved' },
    { counter: 40, defaultUnit: '%', progress: 40, caption: 'Reduction in storage costs' },
    { counter: 80, defaultUnit: '%', progress: 80, caption: 'Reduction in over-provisioning' },
    { counter: 4.5, defaultUnit: '/5', progress: 90, caption: 'Average user satisfaction rating' }
  ]
};

/***************************  BLOCK - METRICS 8  ***************************/

export default function BlockMetrics8() {
  return <Metrics8 {...data} />;
}
