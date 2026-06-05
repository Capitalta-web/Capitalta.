// @project
import { Process5 } from '@/blocks/process';

/***************************  PROCESS 5 - DATA  ***************************/

const data = {
  heading: 'Fine-tuned resource optimization',
  caption: 'Fine-tune configurations to achieve peak performance while minimizing costs.',
  cards: [
    {
      number: '01',
      title: 'Automated scaling process',
      description: 'Ensures optimal performance without manual intervention.',
      image: { light: '/assets/images/graphics/ai/graphics6-light.svg', dark: '/assets/images/graphics/ai/graphics6-dark.svg' },
      bgPosition: { xs: '73%', md: '60%' },
      list: [
        { primary: `Detects fluctuations in demand.` },
        { primary: 'Automatically adjusts resources.' },
        { primary: 'Ensures optimal performance' },
        { primary: 'Without manual intervention.' }
      ]
    },
    {
      number: '02',
      title: 'Real-time performance monitoring',
      description: 'Proactively addresses issues to maintain uninterrupted operations.',
      image: { light: '/assets/images/graphics/ai/graphics12-light.svg', dark: '/assets/images/graphics/ai/graphics12-dark.svg' },
      bgPosition: { xs: 'bottom', md: 'center 20px' },
      list: [
        { primary: `Constantly monitors cloud` },
        { primary: 'Provides real-time insights' },
        { primary: 'Proactively addresses issues' },
        { primary: 'To maintain uninterrupted operations.' }
      ]
    },
    {
      number: '03',
      title: 'Multi-cloud orchestration',
      description: 'Enhances flexibility and resilience in a multi-cloud environment.',
      image: { light: '/assets/images/graphics/ai/graphics13-light.svg', dark: '/assets/images/graphics/ai/graphics13-dark.svg' },
      bgPosition: { xs: 'bottom', md: 'center 20px' },
      list: [
        { primary: `Seamlessly manages workloads.` },
        { primary: 'Orchestrates tasks and resources' },
        { primary: 'Enhances flexibility and resilience' },
        { primary: 'Without manual intervention.' }
      ]
    }
  ]
};

/***************************  BLOCK - PROCESS 5  ***************************/

export default function BlockProcess5() {
  return <Process5 {...data} />;
}
