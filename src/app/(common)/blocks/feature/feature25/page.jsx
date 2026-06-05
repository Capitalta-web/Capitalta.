// @project
import { Feature25 } from '@/blocks/feature';

/***************************  FEATURE 25 - DATA  ***************************/

const data = {
  heading: 'Coding solutions for data scientists',
  caption: 'Streamline your data analysis with tailored coding tools and resources designed specifically for data scientists.',
  topics: [
    {
      icon: 'tabler-sparkles',
      title: 'AI Assistant',
      description:
        'The company aims to automate routine tasks, provide personalized customer experiences, and improve response times. They are also looking to leverage AI technology to gain insights from customer data and optimize their service strategies.',
      image: { light: '/assets/images/graphics/ai/graphics3-light.svg', dark: '/assets/images/graphics/ai/graphics3-dark.svg' },
      actionBtn: { children: 'Explore Assistant' }
    },
    {
      icon: 'tabler-chart-histogram',
      title: 'Simple Analysis',
      description: `he company aims to enhance data-driven decision-making, streamline customer interactions, and boost sales efficiency. They're also looking to stay competitive by adopting modern technology and ensuring they meet customers' evolving expectations.`,
      image: { light: '/assets/images/graphics/ai/graphics30-light.svg', dark: '/assets/images/graphics/ai/graphics30-dark.svg' },
      actionBtn: { children: 'Explore Analysis' }
    },
    {
      icon: 'tabler-users',
      title: 'Easy Collaboration',
      description:
        'The company wants to enhance cross-departmental communication, facilitate real-time information sharing, and increase productivity. They aim to create a more seamless workflow, making it easier for employees to work together and stay aligned on customer-related tasks.',
      image: { light: '/assets/images/graphics/ai/graphics15-light.svg', dark: '/assets/images/graphics/ai/graphics15-dark.svg' },
      actionBtn: { children: 'Explore Collaboration' }
    },
    {
      icon: 'tabler-settings-up',
      title: 'Smart Automation',
      description:
        'The company aims to reduce manual tasks, minimize errors, and enhance customer interactions through automated processes. They’re looking to use AI and machine learning to analyze customer behavior and optimize their strategies, ensuring they stay ahead in a competitive market.',
      image: { light: '/assets/images/graphics/ai/graphics8-light.svg', dark: '/assets/images/graphics/ai/graphics8-dark.svg' },
      actionBtn: { children: 'Explore all Features', sx: { textTransform: 'none' } }
    }
  ]
};

/***************************  BLOCK - FEATURE 25  ***************************/

export default function BlockFeature25() {
  return <Feature25 {...data} />;
}
