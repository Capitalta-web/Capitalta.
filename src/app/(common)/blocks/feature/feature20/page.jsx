// @project
import { Feature20 } from '@/blocks/feature';

/***************************  FEATURE 20 - DATA  ***************************/

const data = {
  heading: 'Intelligent data compression',
  caption: 'Process data faster, enhance system, and gain quicker insights.',
  image: { light: '/assets/images/graphics/ai/graphics4-light.svg', dark: '/assets/images/graphics/ai/graphics4-dark.svg' },
  actionBtn: { children: 'Explore all Features', sx: { textTransform: 'none' } },
  features: [
    {
      icon: 'tabler-chart-histogram',
      title: 'Parallel processing',
      content: 'Process data in parallel, significantly boosting data processing speed.'
    },
    {
      icon: 'tabler-artboard',
      title: 'Scalable data pipelines',
      content: 'Build and manage scalable and efficient data processing pipelines.'
    },
    {
      icon: 'tabler-database',
      title: 'Data quality assurance',
      content: 'Tools to ensure and maintain high data quality and integrity.'
    },
    {
      icon: 'tabler-settings-up',
      title: 'Dynamic task automation',
      content: 'Automate dynamic tasks to enhance workflow efficiency.'
    },
    {
      icon: 'tabler-devices-code',
      title: 'Cross-platform ',
      content: 'Compatibility with various platforms for versatile data processing.'
    },
    {
      icon: 'tabler-route',
      title: 'Workflow optimization',
      content: 'Optimize workflows for increased productivity and efficiency.'
    }
  ]
};

/***************************  BLOCK - FEATURE 20  ***************************/

export default function BlockFeature20() {
  return <Feature20 {...data} />;
}
