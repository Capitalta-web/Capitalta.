// @project
import { Feature14 } from '@/blocks/feature';

/***************************  FEATURE 14 - DATA  ***************************/

const data = {
  heading: 'Dynamic task automation',
  image1: { light: '/assets/images/graphics/ai/graphics2-light.svg', dark: '/assets/images/graphics/ai/graphics2-dark.svg' },
  image2: { light: '/assets/images/graphics/ai/graphics17-light.svg', dark: '/assets/images/graphics/ai/graphics17-dark.svg' },
  title: 'Dynamic task automation',
  description: 'Automate dynamic tasks to enhance workflow efficiency.',
  title2: 'Workflow optimization',
  description2: 'Optimize workflows for increased productivity and efficiency.',
  actionBtn: { children: 'Explore all Features', sx: { textTransform: 'none' } },
  cards: [
    {
      icon: 'tabler-artboard',
      title: 'Scalable data pipelines',
      description: 'Build and manage scalable and efficient data processing pipelines.'
    },
    {
      icon: 'tabler-devices-code',
      title: 'Cross-platform',
      description: 'Compatibility with various platforms for versatile data.'
    },
    {
      icon: 'tabler-route',
      title: 'Workflow optimization',
      description: 'Optimize workflows for increased productivity and efficiency.'
    }
  ]
};

/***************************  BLOCK - FEATURE 14  ***************************/

export default function BlockFeature14() {
  return <Feature14 {...data} />;
}
