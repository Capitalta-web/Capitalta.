// @project
import { Feature2 } from '@/blocks/feature';

/***************************  FEATURE 2 - DATA  ***************************/

const data = {
  heading: 'Streamline your business with our CRM solution',
  caption: 'Discover the features that will transform your customer relationships.',
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
  features: [
    {
      icon: 'custom-interface',
      title: 'Intuitive interface',
      content: 'Our CRM is designed for everyone, from tech-savvy users to those new'
    },
    {
      icon: 'custom-arrow',
      title: 'Customization',
      content: "One size doesn't fit all, and neither should your CRM."
    },
    {
      icon: 'custom-statastic',
      title: 'Powerful analytics',
      content: 'You can track customer behavior, sales trends, & many more to make'
    }
  ]
};

/***************************  BLOCK - FEATURE 2  ***************************/

export default function BlockFeature2() {
  return <Feature2 {...data} />;
}
