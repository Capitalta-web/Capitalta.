// @project
import { Feature13 } from '@/blocks/feature';

/***************************  FEATURE 13 - DATA  ***************************/

const data = {
  heading: 'Monitor your cloud infrastructure in real-time.',
  caption: 'Gain insights into performance metrics and proactively address issues for uninterrupted operations.',
  image: { light: '/assets/images/graphics/ai/graphics8-light.svg', dark: '/assets/images/graphics/ai/graphics8-dark.svg' },
  actionBtn: { children: 'Explore all Features', sx: { textTransform: 'none' } },
  cards: [
    {
      icon: 'tabler-artboard',
      title: 'Automated scaling',
      description: 'Dynamically scale resources based on demand, ensuring optimal performance.'
    },
    {
      icon: 'tabler-coin',
      title: 'Cost optimization',
      description: 'Predictive cost analytics for efficient budget management.'
    },
    {
      icon: 'tabler-settings-up',
      title: 'Multi-cloud management',
      description: 'Seamlessly manage and orchestrate workloads across multiple cloud platforms.'
    },
    {
      icon: 'tabler-brain',
      title: 'Intelligent automation',
      description: 'Automation tools for streamlining repetitive tasks and enhancing efficiency.'
    }
  ]
};

/***************************  BLOCK - FEATURE 13  ***************************/

export default function BlockFeature13() {
  return <Feature13 {...data} />;
}
