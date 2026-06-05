// @project
import { Process6 } from '@/blocks/process';

/***************************  PROCESS 6 - DATA  ***************************/

const data = {
  heading: 'Fine-tuned resource optimization',
  caption: 'Fine-tune configurations to achieve peak performance while minimizing costs.',
  cards: [
    {
      number: '01',
      title: 'Automated scaling process',
      description: 'Ensures optimal performance without manual intervention.',
      list: [
        { primary: `Detects fluctuations in demand.` },
        { primary: 'Automatically adjusts resources.' },
        { primary: 'Ensures optimal performance' }
      ]
    },
    {
      number: '02',
      title: 'Real-time monitoring',
      description: 'Proactively addresses issues to maintain uninterrupted operations.',
      list: [
        { primary: `Constantly monitors cloud` },
        { primary: 'Provides real-time insights' },
        { primary: 'Proactively addresses issues' }
      ]
    },
    {
      number: '03',
      title: 'Multi-cloud orchestration',
      description: 'Enhances flexibility and resilience in a multi-cloud environment.',
      list: [
        { primary: `Seamlessly manages workloads.` },
        { primary: 'Orchestrates tasks and resources' },
        { primary: 'Enhances flexibility and resilience' }
      ]
    }
  ]
};

/***************************  BLOCK - PROCESS 6  ***************************/

export default function BlockProcess6() {
  return <Process6 {...data} />;
}
