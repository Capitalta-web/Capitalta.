// @project
import branding from '@/branding.json';
import { SmallHero7 } from '@/blocks/small-hero';

/***************************  SMALL HERO 7 - DATA  ***************************/

const data = {
  heading: 'Seamless Collaboration, Anytime, Anywhere',
  caption: `Achieve seamless collaboration on any device with ${branding.brandName}’s cross-platform synchronization.`,
  primaryBtn: { children: 'Get Started' },
  image: { light: '/assets/images/graphics/ai/graphics4-light.svg', dark: '/assets/images/graphics/ai/graphics4-dark.svg' }
};

/***************************  BLOCK - SMALL HERO 7  ***************************/

export default function BlockSmallHero7() {
  return <SmallHero7 {...data} />;
}
