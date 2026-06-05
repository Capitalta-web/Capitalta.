// @project
import { TopOffer2 } from '@/blocks/top-offer';

/***************************  TOP OFFER 2 - DATA  ***************************/

const data = {
  heading: 'We’d love to hear from you',
  caption: 'Process data in parallel, significantly boosting data processing speed.',
  icon: 'tabler-settings-up',
  primaryBtn: { children: 'Get Started' }
};

/***************************  BLOCK - TOP OFFER 2  ***************************/

export default function BlockTopOffer2() {
  return <TopOffer2 {...data} />;
}
