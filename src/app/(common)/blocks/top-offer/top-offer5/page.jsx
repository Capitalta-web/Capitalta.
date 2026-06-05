// @project
import { TopOffer5 } from '@/blocks/top-offer';

/***************************  TOP OFFER 5 - DATA  ***************************/

const data = {
  bgImage: '/assets/images/graphics/ai/background1.svg',
  heading: 'We’d love to hear from you',
  caption: 'Process data in parallel, significantly boosting data processing speed.',
  icon: 'tabler-settings-up',
  primaryBtn: { children: 'Get Started' }
};

/***************************  BLOCK - TOP OFFER 5  ***************************/

export default function BlockTopOffer5() {
  return <TopOffer5 {...data} />;
}
