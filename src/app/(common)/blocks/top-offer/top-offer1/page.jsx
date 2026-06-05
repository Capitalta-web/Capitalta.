// @project
import { TopOffer1 } from '@/blocks/top-offer';

/***************************  TOP OFFER 1 - DATA  ***************************/

const data = {
  heading: 'Checkout the latest updates on current verison',
  caption: 'Process data in parallel, significantly boosting data processing speed.',
  icon: 'tabler-settings-up',
  primaryBtn: { children: 'Decline' },
  secondaryBtn: { children: 'Read Update' }
};

/***************************  BLOCK - TOP OFFER 1  ***************************/

export default function BlockTopOffer1() {
  return <TopOffer1 {...data} />;
}
