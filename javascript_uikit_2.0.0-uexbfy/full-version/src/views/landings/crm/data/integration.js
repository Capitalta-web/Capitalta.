// @project
import { PAGE_PATH } from '@/path';

const tagList = [
  {
    label: 'Slack',
    icon: 'tabler-brand-slack'
  },
  {
    label: 'Abstract',
    icon: 'tabler-brand-abstract'
  },
  {
    label: 'Asana',
    icon: 'tabler-brand-asana'
  },
  {
    label: 'Back Bone',
    icon: 'tabler-brand-backbone'
  },
  {
    label: 'Intercom',
    icon: 'tabler-brand-intercom'
  },
  {
    label: 'Master Card',
    icon: 'tabler-brand-mastercard'
  },
  {
    label: 'Skype',
    icon: 'tabler-brand-skype'
  },
  {
    label: 'Google Drive',
    icon: 'tabler-brand-google-drive'
  },
  {
    label: 'Tripadvisor',
    icon: 'tabler-brand-tripadvisor'
  },
  {
    label: 'Facebook Messenger',
    icon: 'tabler-brand-messenger'
  },
  {
    label: 'Paypal',
    icon: 'tabler-brand-paypal'
  }
];

const marquee1 = [...tagList];
const marquee2 = [...tagList].reverse();
const marquee3 = [...tagList].sort((a, b) => a.label.localeCompare(b.label));
const marquee4 = [...tagList].sort((a, b) => a.label.localeCompare(b.label)).reverse();

const marquees = [
  {
    id: 'marquee1',
    marqueeProps: { speed: 20, direction: 'left' },
    data: marquee1
  },
  {
    id: 'marquee2',
    marqueeProps: { speed: 30, direction: 'right' },
    data: marquee2
  },
  {
    id: 'marquee3',
    marqueeProps: { speed: 35, direction: 'left' },
    data: marquee3
  },
  {
    id: 'marquee4',
    marqueeProps: { speed: 40, direction: 'right' },
    data: marquee4
  }
];

export const integration = {
  headLine: 'Effortless integrations for your stack',
  captionLine: 'Effortlessly integrate your stack with our seamless integrations.',
  primaryBtn: {
    children: 'See all Integration',
    href: PAGE_PATH.integration,
    target: '_blank',
    rel: 'noopener noreferrer',
    sx: { textTransform: 'none' }
  },
  marquees
};
