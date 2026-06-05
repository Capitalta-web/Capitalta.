// @project
import { Feature8 } from '@/blocks/feature';

/***************************  FEATURE 8 - DATA  ***************************/

const data = {
  heading: 'Streamline your business with our CRM solution',
  caption: 'Discover the features that will transform your customer relationships.',
  cards: [
    {
      title: 'Automated scaling process',
      description: 'Ensures optimal performance without manual intervention.',
      image: { light: '/assets/images/graphics/ai/graphics9-light.svg', dark: '/assets/images/graphics/ai/graphics9-dark.svg' },
      icon: 'tabler-artboard'
    },
    {
      title: 'Real-time performance monitoring',
      description: 'Proactively addresses issues to maintain uninterrupted operations.',
      image: { light: '/assets/images/graphics/ai/graphics10-light.svg', dark: '/assets/images/graphics/ai/graphics10-dark.svg' },
      icon: 'tabler-database'
    },
    {
      title: 'Multi-cloud orchestration',
      description: 'Enhances flexibility and resilience in a multi-cloud environment.',
      image: { light: '/assets/images/graphics/ai/graphics11-light.svg', dark: '/assets/images/graphics/ai/graphics11-dark.svg' },
      icon: 'tabler-route'
    },
    {
      title: 'Parallel processing',
      description: 'Process data in parallel, significantly boosting data processing speed.',
      image: { light: '/assets/images/graphics/ai/graphics12-light.svg', dark: '/assets/images/graphics/ai/graphics12-dark.svg' },
      icon: 'tabler-chart-histogram'
    }
  ]
};

/***************************  BLOCK - FEATURE 8  ***************************/

export default function BlockFeature8() {
  return <Feature8 {...data} />;
}
