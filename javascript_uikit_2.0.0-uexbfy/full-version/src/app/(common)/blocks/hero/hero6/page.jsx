// @project
import { Hero6 } from '@/blocks/hero';

/***************************  HERO 6 - DATA  ***************************/

const data = {
  chip: { label: 'Beyond Software' },
  heading: 'Seize the Future of Business ✦ Technology',
  caption: 'Our SaaS platform delivers a flawless user experience and unmatched results.',
  primaryBtn: { children: 'Get Started - It’s Free' },
  secondaryBtn: { children: 'Explore Pro' },
  images: [
    { light: '/assets/images/graphics/ai/hero/graphics1-light.png', dark: '/assets/images/graphics/ai/hero/graphics1-dark.png' },
    { light: '/assets/images/graphics/ai/hero/graphics2-light.png', dark: '/assets/images/graphics/ai/hero/graphics2-dark.png' },
    { light: '/assets/images/graphics/ai/hero/graphics3-light.png', dark: '/assets/images/graphics/ai/hero/graphics3-dark.png' },
    { light: '/assets/images/graphics/ai/hero/graphics4-light.png', dark: '/assets/images/graphics/ai/hero/graphics4-dark.png' },
    { light: '/assets/images/graphics/ai/hero/graphics5-light.png', dark: '/assets/images/graphics/ai/hero/graphics5-dark.png' }
  ]
};

/***************************  BLOCK - HERO 6  ***************************/

export default function BlockHero6() {
  return <Hero6 {...data} />;
}
