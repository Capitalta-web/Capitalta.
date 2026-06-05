// @project
import { Cta12 } from '@/blocks/cta';

/***************************  CALL TO ACTION 12 - DATA  ***************************/

const data = {
  heading: 'Connect with top-tier tools available interface',
  caption: 'Discover the features that will transform your customer relationships.',
  primaryBtn: { children: 'See all Integration', href: '#', sx: { textTransform: 'none' } },
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' }
};

/***************************  CALL TO ACTION - 12  ***************************/

export default function BlockCta12() {
  return <Cta12 {...data} />;
}
