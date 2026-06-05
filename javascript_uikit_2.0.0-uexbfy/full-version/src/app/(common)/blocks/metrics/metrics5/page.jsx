// @project
import branding from '@/branding.json';
import { Metrics5 } from '@/blocks/metrics';

/***************************  METRICS 5 - DATA  ***************************/

const data = {
  heading: 'Data processing at its peak',
  caption: `See the success stories of organizations scaling with ${branding.brandName}`,
  blockDetail: [
    { counter: 99, defaultUnit: '%', caption: 'Compression efficiency achieved' },
    { counter: 40, defaultUnit: '%', caption: 'Reduction in storage costs' },
    { counter: 80, defaultUnit: '%', caption: 'Reduction in over-provisioning' },
    { counter: 4.5, defaultUnit: '/5', caption: 'Average user satisfaction rating' }
  ]
};

/***************************  BLOCK - METRICS 5  ***************************/

export default function BlockMetrics5() {
  return <Metrics5 {...data} />;
}
