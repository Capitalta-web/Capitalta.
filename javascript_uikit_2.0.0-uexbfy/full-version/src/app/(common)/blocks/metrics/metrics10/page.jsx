// @project
import { Metrics10 } from '@/blocks/metrics';

/***************************  METRICS 10 - DATA  ***************************/

const data = {
  blockDetail: [
    { counter: 40, defaultUnit: '%', caption: 'Reduction in Storage Costs' },
    {
      counter: 99,
      defaultUnit: '%',
      caption: 'Compression Efficiency Achieved'
    },
    {
      counter: 80,
      defaultUnit: '%',
      caption: 'Reduction in Over-Provisioning'
    },
    {
      counter: 4.5,
      defaultUnit: '/5',
      caption: 'Average User Satisfaction Rating'
    }
  ]
};

/***************************  BLOCK - METRICS 10  ***************************/

export default function BlockMetrics10() {
  return <Metrics10 {...data} />;
}
