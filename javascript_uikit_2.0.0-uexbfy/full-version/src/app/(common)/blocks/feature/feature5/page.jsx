// @project
import { Feature5 } from '@/blocks/feature';

/***************************  FEATURE 5 - DATA  ***************************/

const data = {
  heading: 'Monitor your cloud infrastructure in real-time.',
  caption: 'Gain insights into performance metrics and proactively address issues for uninterrupted operations.',
  image1: { light: '/assets/images/graphics/ai/graphics3-light.svg', dark: '/assets/images/graphics/ai/graphics3-dark.svg' },
  image2: { dark: '/assets/images/graphics/ai/graphics2-dark.svg', light: '/assets/images/graphics/ai/graphics2-light.svg' },
  features: [
    {
      icon: 'tabler-chart-histogram',
      title: 'Parallel processing',
      content: 'Process data in parallel, significantly boosting data processing speed.'
    },
    {
      icon: 'tabler-devices-code',
      title: 'Cross-platform',
      content: 'Compatibility with various platforms for versatile data processing.'
    }
  ],
  features2: [
    {
      icon: 'tabler-settings-up',
      title: 'Automated scaling',
      content: 'Process data in parallel, significantly boosting data processing speed.'
    },
    {
      icon: 'tabler-database-cog',
      title: 'Real-time',
      content: 'Compatibility with various platforms for versatile data processing.'
    }
  ],
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '10k+ Reviews (4.5 out of 5)'
  },
  content: 'Gain insights into performance metrics and proactively address issues for uninterrupted operations.',
  actionBtn: { children: 'Explore all Features', sx: { textTransform: 'none' } }
};

/***************************  BLOCK - FEATURE 5  ***************************/

export default function BlockFeature5() {
  return <Feature5 {...data} />;
}
