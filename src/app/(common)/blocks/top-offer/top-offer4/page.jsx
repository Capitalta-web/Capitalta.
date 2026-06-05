// @project
import { TopOffer4 } from '@/blocks/top-offer';

/***************************  TOP OFFER 4 - DATA  ***************************/

const data = {
  offer: {
    label: 'We’ve just launched a new feature!',
    secondaryLabel: 'Check out the',
    link: { children: 'New Dashboard', href: '#' }
  }
};

/***************************  BLOCK - TOP OFFER 4  ***************************/

export default function BlockTopOffer4() {
  return <TopOffer4 {...data} />;
}
