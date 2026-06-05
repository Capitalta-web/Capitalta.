// @project
import { Feature18 } from '@/blocks/feature';

/***************************  FEATURE 18 - DATA  ***************************/

const data = {
  heading: 'Dynamic task automation',
  caption: 'Gain insights into performance metrics and proactively address issues for uninterrupted operations.',
  topics: [
    {
      icon: 'tabler-sparkles',
      title: 'AI Assistant',
      title2: 'Advanced AI integration',
      description: 'Leverage cutting-edge AI to enhance decision-making and streamline operations.',
      image: { light: '/assets/images/graphics/ai/graphics12-light.svg', dark: '/assets/images/graphics/ai/graphics12-dark.svg' },
      list: [
        { primary: 'Intelligent decision support' },
        { primary: 'Predictive analytics' },
        { primary: 'Natural language processing' },
        { primary: 'Real-time insights' }
      ],
      actionBtn: { children: 'Explore all Features', sx: { textTransform: 'none' } },
      actionBtn2: { children: 'Customize' }
    },
    {
      icon: 'tabler-chart-histogram',
      title: 'Simple Analysis',
      title2: 'Data lifecycle management',
      description: 'Process data in parallel, significantly boosting data processing speed.',
      image: { light: '/assets/images/graphics/ai/graphics7-light.svg', dark: '/assets/images/graphics/ai/graphics7-dark.svg' },
      list: [{ primary: 'Fortress for your data' }, { primary: 'Granular access controls' }, { primary: 'Automated backup solutions' }],
      actionBtn: { children: 'Explore all Features' },
      actionBtn2: { children: 'Customize' }
    },
    {
      icon: 'tabler-users',
      title: 'Easy Collaboration',
      title2: 'Seamless teamwork',
      description: 'Foster collaboration with intuitive tools designed for team success.',
      image: { light: '/assets/images/graphics/ai/graphics4-light.svg', dark: '/assets/images/graphics/ai/graphics4-dark.svg' },
      list: [{ primary: 'Shared workspaces' }, { primary: 'Real-time collaboration' }, { primary: 'Task assignment and tracking' }],
      actionBtn: { children: 'Explore all Features' },
      actionBtn2: { children: 'Customize' }
    },
    {
      icon: 'tabler-settings-up',
      title: 'Smart Automation',
      title2: 'Intelligent task management',
      description: 'Automate repetitive tasks and focus on what truly matters with smart solutions.',
      image: { light: '/assets/images/graphics/ai/graphics9-light.svg', dark: '/assets/images/graphics/ai/graphics9-dark.svg' },
      list: [{ primary: 'Workflow automation' }, { primary: 'Trigger-based actions' }, { primary: 'Scalable solutions' }],
      actionBtn: { children: 'Explore all Features', sx: { textTransform: 'none' } },
      actionBtn2: { children: 'Customize' }
    }
  ]
};

/***************************  BLOCK - FEATURE 18  ***************************/

export default function BlockFeature18() {
  return <Feature18 {...data} />;
}
