// @project
import { Feature7 } from '@/blocks/feature';

/***************************  FEATURE 7 - DATA  ***************************/

const data = {
  heading: 'Real-time performance insights',
  caption: 'Gain a competitive edge with real-time performance monitoring.',
  testimonials: [
    {
      image: { light: '/assets/images/graphics/ai/graphics6-light.svg', dark: '/assets/images/graphics/ai/graphics6-dark.svg' },
      features: [
        {
          icon: 'tabler-route',
          title: 'Multi-cloud orchestration',
          content: 'Enhances flexibility and resilience in a multi-cloud environment.'
        }
      ]
    },
    {
      image: { light: '/assets/images/graphics/ai/graphics8-light.svg', dark: '/assets/images/graphics/ai/graphics8-dark.svg' },
      features: [
        {
          icon: 'tabler-route',
          title: 'Multi-cloud orchestration',
          content: 'Enhances flexibility and resilience in a multi-cloud environment.'
        }
      ]
    },
    {
      image: { light: '/assets/images/graphics/ai/graphics3-light.svg', dark: '/assets/images/graphics/ai/graphics3-dark.svg' },
      features: [
        {
          icon: 'tabler-route',
          title: 'Multi-cloud orchestration',
          content: 'Enhances flexibility and resilience in a multi-cloud environment.'
        }
      ]
    }
  ],
  breadcrumbs: [{ title: 'Analytics' }, { title: 'Customization' }, { title: 'Interface' }]
};

/***************************  BLOCK - FEATURE 7  ***************************/

export default function BlockFeature7() {
  return <Feature7 {...data} />;
}
