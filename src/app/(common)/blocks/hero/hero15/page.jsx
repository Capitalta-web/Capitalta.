// @project
import { Hero15 } from '@/blocks/hero';

/***************************  HERO 15 - DATA  ***************************/

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
  heading: 'Seize the Future of Business ✦ Technology',
  caption: 'Empowering businesses with a customizable, Data-driven CRM solution.',
  image: { light: '/assets/images/graphics/ai/graphics16-light.svg', dark: '/assets/images/graphics/ai/graphics16-dark.svg' },
  bgImage: '/assets/images/hero/background.jpg',
  benefitData: { counter: '90', defaultUnit: '%', caption: 'Power of AI for navigation and communication' },
  primaryBtn: { children: 'Get Started' },
  secondaryBtn: { children: 'Explore' }
};

/***************************  BLOCK - HERO 15  ***************************/

export default function BlockHero15() {
  return <Hero15 {...data} />;
}
