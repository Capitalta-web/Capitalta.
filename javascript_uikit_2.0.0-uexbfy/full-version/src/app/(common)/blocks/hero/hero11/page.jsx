// @project
import branding from '@/branding.json';
import { Hero11 } from '@/blocks/hero';

/***************************  HERO 11 - DATA  ***************************/

const data = {
  reviewData: {
    avatarList: [
      '/assets/images/user/avatar1.png',
      '/assets/images/user/avatar2.png',
      '/assets/images/user/avatar3.png',
      '/assets/images/user/avatar4.png',
      '/assets/images/user/avatar5.png'
    ],
    rating: 5,
    totalReviews: '200+'
  },
  headLine: 'Seamless Collaboration, Anytime, Anywhere',
  captionLine: `Achieve seamless collaboration on any device with ${branding.brandName}’s cross-platform synchronization.`,
  primaryBtn: { children: 'Get Started' },
  helperText: '1 email per week. No spam. Ever. Unsubscribe anytime',
  image: { light: '/assets/images/graphics/ai/graphics4-light.svg', dark: '/assets/images/graphics/ai/graphics4-dark.svg' },
  benefitData: {
    data1: { counter: '90', defaultUnit: '%', caption: 'Power of AI for navigation and communication' },
    data2: { counter: '150', defaultUnit: '+', caption: 'Showcasing the global impact and adoption' }
  },
  sliderTitle: 'Adaptive workflow',
  listData: [
    { icon: 'tabler-users', title: 'Effortless team collaboration' },
    { icon: 'tabler-link', title: 'Real-time syncing for projects' },
    { icon: 'tabler-history', title: 'Detailed version history' },
    { icon: 'tabler-route-square', title: 'Customizable workflows' },
    { icon: 'tabler-keyframe-align-center', title: 'Centralized project hub' }
  ]
};

/***************************  BLOCK - HERO 11  ***************************/

export default function BlockHero11() {
  return <Hero11 {...data} />;
}
