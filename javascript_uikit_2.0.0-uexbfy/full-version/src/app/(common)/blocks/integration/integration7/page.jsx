// @project
import { Integration7 } from '@/blocks/integration';

/***************************  INTEGRATION 7 - DATA  ***************************/

const tagList = [
  { label: 'Goggle Drive', image: '/assets/images/integration/google-drive.png' },
  { label: 'Slack', image: '/assets/images/integration/slack.png' },
  { label: 'Asana', image: '/assets/images/integration/asana.png' },
  { label: 'Tripadvisor', image: '/assets/images/integration/trip-advicer.png' },
  { label: 'Paypal', image: '/assets/images/integration/paypal.png' },
  { label: 'Skype', image: '/assets/images/integration/skype.png' },
  { label: 'Master Card', image: '/assets/images/integration/master-card.png' },
  { label: 'Intercom', image: '/assets/images/integration/intercom.png' },
  { label: 'Facebook Messenger', image: '/assets/images/integration/messenger-facebook.png' }
];

const marquee1 = [...tagList];
const marquee2 = [...tagList].reverse();
const marquee3 = [...tagList].sort((a, b) => a.label.localeCompare(b.label));

const marquees = [
  { id: 'marquee1', marqueeProps: { speed: 20, direction: 'left' }, data: marquee1 },
  { id: 'marquee2', marqueeProps: { speed: 30, direction: 'right' }, data: marquee2 },
  { id: 'marquee3', marqueeProps: { speed: 35, direction: 'left' }, data: marquee3 }
];

const data = {
  headLine: 'Connect with top-tier tools available interface',
  captionLine: 'Discover the features that will transform your customer relationships.',
  primaryBtn: { children: 'See all Integration', sx: { textTransform: 'none' } },
  marquees
};

/***************************  BLOCK - INTEGRATION 7  ***************************/

export default function BlockIntegration7() {
  return <Integration7 {...data} />;
}
