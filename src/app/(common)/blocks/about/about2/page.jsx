// @project
import { About2 } from '@/blocks/about';

/***************************  ABOUT 2 - DATA  ***************************/

const data = {
  heading: 'Empowering businesses to succeed',
  image: { light: '/assets/images/graphics/ai/graphics2-light.svg', dark: '/assets/images/graphics/ai/graphics2-dark.svg' },
  caption: 'Learn how our CRM platform empowers businesses of all sizes to achieve their goals and reach new heights',
  title: 'Empower your business with our CRM platform, streamlining sales',
  description:
    'Empower your business with our CRM platform, streamlining sales, marketing, and service processes to drive growth and build stronger customer relationships.',
  primaryBtn: { children: 'Subscribe' }
};

/***************************  BLOCK - ABOUT 2  ***************************/

export default function BlockAbout2() {
  return <About2 {...data} />;
}
