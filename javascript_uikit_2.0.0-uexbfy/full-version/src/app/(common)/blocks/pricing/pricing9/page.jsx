// @project
import { Pricing9 } from '@/blocks/pricing';

/***************************  PRICING 9 - DATA  ***************************/

const data = {
  heading: 'The affordable unfair advantage',
  caption: 'Choose the plan that aligns with your cloud management requirements.',
  features: [
    { id: 1, label: 'CRA JavaScript' },
    { id: 2, label: 'CRA TypeScript' },
    { id: 3, label: 'Next.js JavaScript' },
    { id: 4, label: 'Next.js TypeScript' },
    { id: 5, label: 'Figma' },
    { id: 6, label: 'SaaS end products' },
    { id: 7, label: 'Subscription based product' }
  ],
  plans: [
    {
      title: 'Standard',
      price: 69,
      active: false,
      featureTitle: 'Features',
      exploreLink: { children: 'Get Started with Standard', sx: { textTransform: 'none' } },
      featuresID: [1, 3]
    },
    {
      title: 'Plus',
      active: true,
      price: 129,
      featureTitle: 'Features',
      exploreLink: { children: 'Get Started with Plus', sx: { textTransform: 'none' } },
      featuresID: [1, 2, 3, 4, 5]
    },
    {
      title: 'Extended',
      price: 599,
      active: false,
      featureTitle: 'Features',
      link: { children: 'Contact us', href: '#' },
      exploreLink: { children: 'Get Started with Extended', sx: { textTransform: 'none' } },
      featuresID: [1, 2, 3, 4, 5, 6, 7]
    }
  ]
};

/***************************  BLOCK - PRICING 9  ***************************/

export default function BlockPricing9() {
  return <Pricing9 {...data} />;
}
