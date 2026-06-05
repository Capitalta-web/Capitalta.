// @project
import branding from '@/branding.json';
import { Cta9 } from '@/blocks/cta';

/***************************  CALL TO ACTION 9 - DATA  ***************************/

const data = {
  heading: `Enhance collaboration with ${branding.brandName}`,
  caption: `Outstanding customer support! They're responsive and go above and beyond to ensure a smooth experience. `,
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
  primaryBtn: { children: 'Get Started - It’s Free Now' }
};

/***************************  BLOCK - CALL TO ACTION 9  ***************************/

export default function BlockCta9() {
  return <Cta9 {...data} />;
}
