// @project
import { Process8 } from '@/blocks/process';

/***************************  PROCESS 8 - DATA  ***************************/

const data = {
  heading: 'Scalable data pipelines creation',
  caption: 'Streamline data workflows for maximum productivity and flexibility.',
  image: { light: '/assets/images/graphics/ai/graphics11-light.svg', dark: '/assets/images/graphics/ai/graphics11-dark.svg' },
  cards: [
    {
      title: 'Multi-cloud orchestration',
      description: 'Enhances flexibility and resilience in a multi-cloud environment.',
      icon: 'tabler-artboard'
    },
    {
      title: 'Real-time performance monitoring',
      description: 'Proactively addresses issues to maintain uninterrupted operations.',
      icon: 'tabler-database'
    },
    {
      title: 'Automated scaling process',
      description: 'Ensures optimal performance without manual intervention.',
      icon: 'tabler-route'
    }
  ]
};

/***************************  BLOCK - PROCESS 8  ***************************/

export default function BlockProcess8() {
  return <Process8 {...data} />;
}
