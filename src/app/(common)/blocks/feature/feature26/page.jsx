// @project
import { Feature26 } from '@/blocks/feature';

/***************************  FEATURE 26 - DATA  ***************************/

const data = {
  headLine: 'Empower education anywhere',
  captionLine: 'Unlock limitless learning opportunities with cutting-edge tools and technology.',
  avatarList: [
    '/assets/images/user/avatar1.png',
    '/assets/images/user/avatar2.png',
    '/assets/images/user/avatar3.png',
    '/assets/images/user/avatar4.png',
    '/assets/images/user/avatar5.png',
    '/assets/images/user/avatar6.png',
    '/assets/images/user/avatar7.png',
    '/assets/images/user/avatar8.png'
  ],
  feature1: {
    icon: 'tabler-settings-up',
    title: 'Cross-Platform',
    content: 'Enhances flexibility and resilience in a multi-cloud environment.',
    animationDelay: 0.2,
    image: '/assets/images/graphics/ai/feature/5.png'
  },
  feature2: {
    icon: 'tabler-settings-up',
    title: 'Automated scaling',
    content: 'Ensures optimal performance without manual intervention.',
    animationDelay: 0.2,
    image: '/assets/images/graphics/ai/feature/6.png'
  },
  feature3: {
    title: 'Parallel Processing',
    content: 'Process data in parallel, significantly boosting data processing speed.'
  }
};

/***************************  BLOCK - FEATURE 26  ***************************/

export default function BlockFeature26() {
  return <Feature26 {...data} />;
}
