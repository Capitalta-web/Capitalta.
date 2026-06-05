// @project
import { Process7 } from '@/blocks/process';

/***************************  PROCESS 7 - DATA  ***************************/

const data = {
  heading: 'Fine-tuned resource optimization',
  caption: 'Fine-tune configurations to achieve peak performance while minimizing costs.',
  image1: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
  image2: { light: '/assets/images/graphics/ai/graphics4-light.svg', dark: '/assets/images/graphics/ai/graphics4-dark.svg' },
  cards: [
    {
      title: 'Automated scaling process',
      description: 'Ensures optimal performance without manual intervention.',
      icon: 'tabler-artboard'
    },
    {
      title: 'Real-time monitoring',
      description: 'Proactively addresses issues to maintain uninterrupted operations.',
      icon: 'tabler-database'
    },
    {
      title: 'Multi-cloud orchestration',
      description: 'Enhances flexibility and resilience in a multi-cloud environment.',
      icon: 'tabler-route'
    }
  ]
};

/***************************  BLOCK - PROCESS 7  ***************************/

export default function BlockProcess7() {
  return <Process7 {...data} />;
}
