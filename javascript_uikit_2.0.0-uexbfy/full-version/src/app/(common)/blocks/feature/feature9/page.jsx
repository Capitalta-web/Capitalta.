// @project
import { Feature9 } from '@/blocks/feature';

/***************************  FEATURE 9 - DATA  ***************************/

const data = {
  heading: 'Our powerful CRM features',
  caption: 'Discover the features that will transform your customer relationships.',
  features: [
    {
      icon: 'custom-brain',
      title: 'AI-powered analytics',
      content: 'Leverage AI for predictive insights and sales opportunities.'
    },
    {
      icon: 'custom-path',
      title: 'Journey mapping',
      content: 'Customer experiences at every touchpoint with it.'
    },
    {
      icon: 'custom-statastic',
      title: 'Voice & speech analytics',
      content: 'Actionable insights from customer interactions through it.'
    },
    {
      icon: 'custom-remote',
      title: 'Sales gamification',
      content: 'Boost sales team motivation and performance with it.'
    },
    {
      icon: 'custom-lock',
      title: 'Subscription management',
      content: 'Effortlessly handle and optimize subscriptions with it.'
    },
    {
      icon: 'custom-interface',
      title: 'Intuitive interface',
      content: 'Simplify user interactions & enhance usability with it.'
    }
  ]
};

/***************************  BLOCK - FEATURE 9  ***************************/

export default function BlockFeature9() {
  return <Feature9 {...data} />;
}
