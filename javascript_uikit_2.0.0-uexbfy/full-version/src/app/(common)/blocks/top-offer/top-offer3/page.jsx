// @project
import { TopOffer3 } from '@/blocks/top-offer';

/***************************  TOP OFFER 3 - DATA  ***************************/

const data = {
  offer: {
    label: 'We’ve just launched a new feature! Check out the',
    link: { children: 'New Dashboard', href: '#' }
  }
};

/***************************  BLOCK - TOP OFFER 3  ***************************/

export default function BlockTopOffer3() {
  return <TopOffer3 {...data} />;
}
