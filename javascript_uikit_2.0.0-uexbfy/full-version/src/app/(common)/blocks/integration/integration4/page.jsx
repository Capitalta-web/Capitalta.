// @project
import { Integration4 } from '@/blocks/integration';

/***************************  INTEGRATION 4 - DATA  ***************************/

const tagList = [
  { label: 'Zoom', image: '/assets/images/integration/zoom.png' },
  { label: 'Asana', image: '/assets/images/integration/asana.png' },
  { label: 'Slack', image: '/assets/images/integration/slack.png' },
  { label: 'Intercom', image: '/assets/images/integration/intercom.png' },
  { label: 'Tripadvisor', image: '/assets/images/integration/trip-advicer.png' },
  { label: 'Paypal', image: '/assets/images/integration/paypal.png' },
  { label: 'Google Drive', image: '/assets/images/integration/google-drive.png' },
  { label: 'Jira', image: '/assets/images/integration/jira.png' },
  { label: 'Notion', image: '/assets/images/integration/notion.png' }
];

const marquee1 = [...tagList];
const marquee2 = [...tagList].reverse();
const marquee3 = [...tagList].sort((a, b) => a.label.localeCompare(b.label));
const marquee4 = [...tagList].sort((a, b) => a.label.localeCompare(b.label)).reverse();

const data = {
  headLine: 'Connect with top-tier tools available interface',
  captionLine:
    'Witness the magic of seamless integration with SyncSphere. Connect projects, version histories, and workflows effortlessly.',
  primaryBtn: { children: 'See all Integration', sx: { textTransform: 'none' } },
  marquees: [
    { id: 'marquee1', marqueeProps: { speed: 20, direction: 'left' }, data: marquee1 },
    { id: 'marquee2', marqueeProps: { speed: 30, direction: 'right' }, data: marquee2 },
    { id: 'marquee3', marqueeProps: { speed: 35, direction: 'left' }, data: marquee3 },
    { id: 'marquee4', marqueeProps: { speed: 40, direction: 'right' }, data: marquee4 }
  ]
};

/***************************  BLOCK - INTEGRATION 4  ***************************/

export default function BlockIntegration4() {
  return <Integration4 {...data} />;
}
