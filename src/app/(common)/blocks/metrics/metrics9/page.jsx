// @project
import branding from '@/branding.json';
import { Metrics9 } from '@/blocks/metrics';

/***************************  METRICS 9 - DATA  ***************************/

const data = {
  heading: 'Data processing at its peak',
  caption: `See the success stories of organizations scaling with ${branding.brandName}`,
  exploreBtn: { children: 'Get Started - It’s Free Now' },
  blockDetail: [
    { counter: 99, defaultUnit: '%', caption: 'Compression efficiency achieved' },
    { counter: 40, defaultUnit: '%', caption: 'Reduction in storage costs' },
    { counter: 80, defaultUnit: '%', caption: 'Reduction in over-provisioning' },
    { counter: 4.5, defaultUnit: '/5', caption: 'Average user satisfaction rating' }
  ]
};

/***************************  BLOCK - METRICS 9  ***************************/

export default function BlockMetrics9() {
  return <Metrics9 {...data} />;
}
