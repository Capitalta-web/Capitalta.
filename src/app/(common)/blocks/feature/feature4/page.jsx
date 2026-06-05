// @project
import { Feature4 } from '@/blocks/feature';

/***************************  FEATURE 4 - DATA  ***************************/

const data = {
  heading: 'Streamline your business with our CRM solution',
  caption: 'Discover the features that will transform your customer relationships.',
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
  cards: [
    {
      title: 'Intuitive interface',
      description: 'Our CRM is designed for everyone, from tech-savvy users to those new to CRM. Effortless navigation for users.',
      icon: 'custom-interface'
    },
    {
      title: 'Customization',
      description: `One size doesn't fit all, and neither should your CRM.Create custom fields, modules to suit your requirements.`,
      icon: 'custom-arrow'
    }
  ]
};

/***************************  BLOCK - FEATURE 4  ***************************/

export default function BlockFeature4() {
  return <Feature4 {...data} />;
}
