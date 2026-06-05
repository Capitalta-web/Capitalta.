// @project
import { Feature16 } from '@/blocks/feature';

/***************************  FEATURE 16 - DATA  ***************************/

const data = {
  heading: 'Regulatory compliance tools',
  caption: `Adhere to industry regulations effortlessly with DataNest's built-in compliance tools.`,
  actionBtn: { children: 'Explore all Features', sx: { textTransform: 'none' } },
  cards: [
    {
      icon: 'tabler-artboard',
      title: 'Scalable data pipelines',
      description: 'Build and manage scalable and efficient data processing pipelines.'
    },
    {
      icon: 'tabler-database',
      title: 'Data quality assurance',
      description: 'Tools to ensure and maintain high data quality and integrity.'
    },
    {
      icon: 'tabler-route',
      title: 'Workflow optimization',
      description: 'Optimize workflows for increased productivity and efficiency.'
    },
    {
      icon: 'tabler-briefcase',
      title: 'Dynamic task automation',
      description: 'Automate dynamic tasks to enhance workflow efficiency.'
    }
  ]
};

/***************************  BLOCK - FEATURE 16  ***************************/

export default function BlockFeature16() {
  return <Feature16 {...data} />;
}
