// @project
import branding from '@/branding.json';
import { Cta8 } from '@/blocks/cta';

/***************************  CALL TO ACTION 8 - DATA  ***************************/

const data = {
  heading: `Accelerate data with ${branding.brandName}`,
  caption: `Outstanding customer support! They're responsive and go above and beyond to ensure a smooth experience.`,
  image: { light: '/assets/images/graphics/ai/graphics14-light.svg', dark: '/assets/images/graphics/ai/graphics14-dark.svg' },
  primaryBtn: { children: 'Get Started - It’s Free Now' }
};

/***************************  BLOCK - CALL TO ACTION 8  ***************************/

export default function BlockCta8() {
  return <Cta8 {...data} />;
}
