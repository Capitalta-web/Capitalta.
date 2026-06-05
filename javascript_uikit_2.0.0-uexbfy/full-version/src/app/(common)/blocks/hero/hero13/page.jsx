// @project
import { Hero13 } from '@/blocks/hero';

/***************************  HERO 13 - DATA  ***************************/

const data = {
  heading: 'DataNest → Your Fort Knox of Data Security',
  caption: 'Safeguard your critical information effortlessly with our secure and automated backup solutions.',
  exploreBtn: { children: 'Try predictive cost analytics', sx: { textTransform: 'none' } },
  images: [
    { light: '/assets/images/graphics/ai/hero/graphics6-light.png', dark: '/assets/images/graphics/ai/hero/graphics6-dark.png' },
    { light: '/assets/images/graphics/ai/hero/graphics7-light.png', dark: '/assets/images/graphics/ai/hero/graphics7-dark.png' },
    { light: '/assets/images/graphics/ai/hero/graphics8-light.png', dark: '/assets/images/graphics/ai/hero/graphics8-dark.png' },
    { light: '/assets/images/graphics/ai/hero/graphics9-light.png', dark: '/assets/images/graphics/ai/hero/graphics9-dark.png' },
    { light: '/assets/images/graphics/ai/hero/graphics10-light.png', dark: '/assets/images/graphics/ai/hero/graphics10-dark.png' },
    { light: '/assets/images/graphics/ai/hero/graphics11-light.png', dark: '/assets/images/graphics/ai/hero/graphics11-dark.png' }
  ]
};

/***************************  BLOCK - HERO 13  ***************************/

export default function BlockHero13() {
  return <Hero13 {...data} />;
}
