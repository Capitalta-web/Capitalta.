// @project
import { Feature3 } from '@/blocks/feature';

/***************************  FEATURE 3 - DATA  ***************************/

const data = {
  heading: 'Streamline your business with our CRM solution',
  caption: 'Discover the features that will transform your customer relationships.',
  blockData1: {
    image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
    title: 'Powerful analytics',
    description: 'You can track customer behavior, sales trends, & many more to make'
  },
  blockData2: {
    image: { dark: '/assets/images/graphics/ai/graphics1-dark.svg', light: '/assets/images/graphics/ai/graphics1-light.svg' },
    title: 'Intuitive interface',
    description: 'Our CRM is designed for everyone, from tech-savvy users to those new to CRM. Effortless navigation for every user.'
  },
  blockData3: {
    image: { dark: '/assets/images/graphics/ai/graphics1-dark.svg', light: '/assets/images/graphics/ai/graphics1-light.svg' },
    title: 'Customization',
    description: `One size doesn't fit all, and neither should your CRM. Create custom fields, modules to suit your requirements.`
  },
  actionBtn: { children: 'Get Started' }
};

/***************************  BLOCK - FEATURE 3  ***************************/

export default function BlockFeature3() {
  return <Feature3 {...data} />;
}
