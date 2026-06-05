// @project
import { About1 } from '@/blocks/about';

/***************************  ABOUT 1 - DATA  ***************************/

const data = {
  heading: 'Empowering businesses to succeed',
  image: { light: '/assets/images/graphics/ai/graphics2-light.svg', dark: '/assets/images/graphics/ai/graphics2-dark.svg' },
  description1:
    'Empower your business with our CRM platform, streamlining sales, marketing, and service processes to drive growth and build stronger customer relationships.',
  description2:
    'Discover our CRM platforms intuitive features, robust analytics, and seamless integrations, trusted by businesses worldwide.'
};

/***************************  BLOCK - ABOUT 1  ***************************/

export default function BlockAbout1() {
  return <About1 {...data} />;
}
