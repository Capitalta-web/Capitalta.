// @project
import { PAGE_PATH } from '@/path';

export const integration2 = {
  headLine: 'Seamless coinomi mobile app integration',
  captionLine: 'The coinomi mobile ecosystem for a unified and streamlined experience',
  primaryBtn: {
    children: 'See all Integration',
    href: PAGE_PATH.integration,
    target: '_blank',
    rel: 'noopener noreferrer',
    sx: { textTransform: 'none' }
  },
  tagList: [
    { label: 'Slack', icon: 'tabler-brand-slack' },
    { label: 'Abstract', icon: 'tabler-brand-abstract' },
    { label: 'Asana', icon: 'tabler-brand-asana' },
    { label: 'Back Bone', icon: 'tabler-brand-backbone' },
    { label: 'Intercom', icon: 'tabler-brand-intercom' },
    { label: 'Master Card', icon: 'tabler-brand-mastercard' },
    { label: 'Skype', icon: 'tabler-brand-skype' },
    { label: 'Google Drive', icon: 'tabler-brand-google-drive' },
    { label: 'Tripadvisor', icon: 'tabler-brand-tripadvisor' },
    { label: 'Facebook Messenger', icon: 'tabler-brand-messenger' },
    { label: 'Paypal', icon: 'tabler-brand-paypal' }
  ]
};

const tagListImage = [
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

const marqueeImage1 = [...tagListImage];
const marqueeImage2 = [...tagListImage].reverse();
const marqueeImage3 = [...tagListImage].sort((a, b) => a.label.localeCompare(b.label));
const marqueeImage4 = [...tagListImage].sort((a, b) => a.label.localeCompare(b.label)).reverse();

export const integration4 = {
  headLine: 'Effortless integration with leading platforms',
  captionLine:
    'Effortlessly connect your digital assets across blockchain networks and financial platforms with robust API and integration tools.',
  primaryBtn: { children: 'See all Integration', sx: { textTransform: 'none' } },
  marquees: [
    { id: 'marqueeImage1', marqueeProps: { speed: 20, direction: 'left' }, data: marqueeImage1 },
    { id: 'marqueeImage2', marqueeProps: { speed: 30, direction: 'right' }, data: marqueeImage2 },
    { id: 'marqueeImage3', marqueeProps: { speed: 35, direction: 'left' }, data: marqueeImage3 },
    { id: 'marqueeImage4', marqueeProps: { speed: 40, direction: 'right' }, data: marqueeImage4 }
  ]
};
