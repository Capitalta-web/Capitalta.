// @project
import { Metrics3 } from '@/blocks/metrics';

/***************************  METRICS 3 - DATA  ***************************/

const data = {
  heading: 'Tailored for your process',
  caption: 'Advanced analytics and reporting, tracking customer behavior, sales trends, and more',
  bgImage: '/assets/images/graphics/ai/background1.svg',
  exploreBtn: { children: 'Get Started - It’s Free Now' },
  blockDetail: [
    {
      counter: 90,
      defaultUnit: '%',
      caption: 'Power of AI for navigation and communication',
      bgImage: '/assets/images/graphics/ai/background1.svg'
    },
    {
      counter: 10,
      defaultUnit: 'x',
      caption: 'Achieving faster sales through streamlined processes.',
      bgImage: '/assets/images/graphics/ai/background1.svg'
    }
  ]
};

/***************************  BLOCK - METRICS 3  ***************************/

export default function BlockMetrics3() {
  return <Metrics3 {...data} />;
}
