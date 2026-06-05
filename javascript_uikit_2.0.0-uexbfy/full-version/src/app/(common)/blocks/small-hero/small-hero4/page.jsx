// @project
import { SmallHero4 } from '@/blocks/small-hero';

/***************************  SMALL HERO 4 - DATA  ***************************/

const data = {
  chip: {
    label: 'New Beta Version is Release ',
    link: { children: 'Explore Now', href: '#' }
  },
  heading: 'Smooth CRM Control, Business Expansion Simplified',
  caption: 'Empowering businesses with a customizable, Data-driven CRM solution.',
  exploreBtn: { children: 'Get Started - It’s Free Now' },
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' }
};

/***************************  BLOCK - SMALL HERO 4  ***************************/

export default function BlockSmallHero4() {
  return <SmallHero4 {...data} />;
}
