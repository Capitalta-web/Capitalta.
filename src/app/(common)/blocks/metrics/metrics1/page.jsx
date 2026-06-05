// @project
import { Metrics1 } from '@/blocks/metrics';

/***************************  METRICS 1 - DATA  ***************************/

const data = {
  heading: 'Made to fit your workflow, you are in control',
  caption: 'With advanced analytics and reporting, you can track customer behavior, sales trends, & many more to make',
  bgImage: '/assets/images/graphics/ai/background1.svg',
  blockDetail: [
    { counter: 90, defaultUnit: '%', caption: 'Power of AI for navigation and communication' },
    { counter: 10, defaultUnit: 'x', caption: 'Achieving faster sales through streamlined processes.' }
  ]
};

/***************************  BLOCK - METRICS 1  ***************************/

export default function BlockMetrics1() {
  return <Metrics1 {...data} />;
}
