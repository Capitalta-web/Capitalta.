// @project
import { About3 } from '@/blocks/about';

/***************************  ABOUT 3 - DATA  ***************************/

const data = {
  heading: 'Empowering businesses to succeed',
  image: { light: '/assets/images/graphics/ai/graphics2-light.svg', dark: '/assets/images/graphics/ai/graphics2-dark.svg' },
  description:
    "Empower your business with our CRM platform, streamlining sales, marketing, and service processes to drive growth and build stronger customer relationships. Discover our CRM platform's intuitive features, robust analytics, and seamless integrations, trusted by businesses worldwide.",
  list: [
    { title: 'Detects fluctuations in demand.' },
    { title: 'Automatically adjusts resources.' },
    { title: 'Ensures optimal performance' },
    { title: 'Without manual intervention.' }
  ]
};

/***************************  BLOCK - ABOUT 3  ***************************/

export default function BlockAbout3() {
  return <About3 {...data} />;
}
