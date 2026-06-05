// @project
import { Feature24 } from '@/blocks/feature';

/***************************  FEATURE 24 - DATA  ***************************/

const data = {
  heading: 'Lightning-fast performance',
  caption: 'Accelerate page load times, enhance user experience, improve search engine optimisation, and get higher conversion rates.',
  image: { light: '/assets/images/graphics/ai/graphics8-light.svg', dark: '/assets/images/graphics/ai/graphics8-dark.svg' },
  list: [
    { primary: 'Enhance your website performance with LiteSpeed web servers and the LSCWP Cache plugin.' },
    { primary: 'A high-performance CDN providing real-time analytics, HTTP/2 support, and robust security features.' },
    { primary: 'Activate object cache to trim website response time by up to 3x.' },
    { primary: 'Enjoy low latency and lightning-fast data transfer with IPv6 and HTTP/3.' }
  ]
};

/***************************  BLOCK - FEATURE 24  ***************************/

export default function BlockFeature24() {
  return <Feature24 {...data} />;
}
