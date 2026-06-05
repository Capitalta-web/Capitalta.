// @project
import { Hero19 } from '@/blocks/hero';

/***************************  HERO 19 - DATA  ***************************/

const data = {
  image: { light: '/assets/images/graphics/ai/graphics32-light.svg', dark: '/assets/images/graphics/ai/graphics32-dark.svg' },
  tagline: 'Get 50% off on current version 50% off',
  headLine: 'Instant Performance Tracking',
  list: [
    { primary: 'Optimize cloud costs' },
    { primary: 'Automated scaling for efficiency' },
    { primary: 'Real-time performance insights' }
  ],
  primaryBtn: { children: 'Get Started' },
  secondaryBtn: { children: 'Explore' }
};

/***************************  BLOCK - HERO 19  ***************************/

export default function BlockHero19() {
  return <Hero19 {...data} />;
}
