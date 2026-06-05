// @project
import branding from '@/branding.json';
import { Cta10 } from '@/blocks/cta';

/***************************  CALL TO ACTION 10 - DATA  ***************************/

const data = {
  heading: `${branding.brandName} - Your workflow revolution`,
  caption: `Outstanding customer support! They're responsive and go above and beyond to ensure a smooth experience. `,
  primaryBtn: { children: 'Sign up for Free', sx: { textTransform: 'none' } },
  secondaryBtn: { children: 'Explore Feature' },
  image: { light: '/assets/images/graphics/ai/graphics15-light.svg', dark: '/assets/images/graphics/ai/graphics15-dark.svg' },
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '10k+ Reviews (4.5 out of 5)'
  },
  list: [
    {
      icon: 'tabler-credit-card',
      primary: `No credit card required`
    },
    {
      icon: { name: 'tabler-history', size: 22 },
      primary: '14-day free trial'
    }
  ]
};

/***************************  BLOCK - CALL TO ACTION 10  ***************************/

export default function BlockCta10() {
  return <Cta10 {...data} />;
}
