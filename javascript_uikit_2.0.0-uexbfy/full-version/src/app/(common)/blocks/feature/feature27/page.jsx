// @project
import { Feature27 } from '@/blocks/feature';

/***************************  FEATURE 27 - DATA  ***************************/

const data = {
  heading: 'Key highlights from our journey',
  caption: 'Recognizing our journey of excellence through prestigious awards and milestones.',
  features: [
    {
      image: '/assets/images/other/award-1.svg',
      title: 'Visionary Award',
      content: 'Acknowledged for innovation and change.'
    },
    {
      image: '/assets/images/other/award-2.svg',
      title: 'Loyalty Award',
      content: 'Recognized for customer satisfaction.'
    },
    {
      image: '/assets/images/other/award-3.svg',
      title: 'Universal Award',
      content: 'Empowering brands worldwide.'
    },
    {
      image: '/assets/images/other/award-4.svg',
      title: 'Design Award',
      content: 'Recognized for design excellence.'
    }
  ]
};

/***************************  BLOCK - FEATURE 27  ***************************/

export default function BlockFeature27() {
  return <Feature27 {...data} />;
}
